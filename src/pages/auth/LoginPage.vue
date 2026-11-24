<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthFormCard from '@/components/auth/AuthFormCard.vue'
import PasswordField from '@/components/auth/PasswordField.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { requestSsoLogin } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { isValidEmail } from '@/utils/validation'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const attempted = ref(false)
const loading = ref(false)
const serverError = ref('')
const emailServerError = ref('')

watch(
  () => [form.email, form.password],
  () => {
    if (serverError.value) {
      serverError.value = ''
    }
    if (emailServerError.value) {
      emailServerError.value = ''
    }
  },
)

function validate() {
  return {
    email: !form.email.trim()
      ? 'Enter your work email'
      : isValidEmail(form.email)
        ? ''
        : 'Enter a valid email address',
    password: form.password ? '' : 'Enter your password',
  }
}

const errors = computed(() => {
  const v = attempted.value ? validate() : { email: '', password: '' }
  if (emailServerError.value) {
    v.email = emailServerError.value
  }
  return v
})

const isValid = computed(() => Object.values(validate()).every((value) => !value))

const onSubmit = async () => {
  attempted.value = true
  serverError.value = ''
  emailServerError.value = ''

  if (!isValid.value || loading.value) return

  loading.value = true

  try {
    // 1. Post credentials directly to backend API route
    const result = await requestSsoLogin({
      email: form.email.trim(),
      password: form.password,
    })

    // 2. Save pending authentication session for OTP verification
    authStore.setPendingAuth({
      email: form.email.trim(),
      token: result.token,
      consume_url: result.consume_url,
      user: result.user,
      phone: result.user?.phone || null,
    })

    // 3. Navigate user to OTP verification page
    await router.push({
      path: '/verify-otp',
      query: { email: form.email.trim() },
    })
  } catch (error: any) {
    loading.value = false
    console.error('Login failed', error)

    // Map the 401 error back to the form validation state
    if (error.response?.status === 401) {
      emailServerError.value = error.response.data?.message || 'Invalid email or password.'
    } else if (error.response?.status === 422 && error.response.data?.errors?.email?.[0]) {
      emailServerError.value = error.response.data.errors.email[0]
    } else if (error.response?.data?.message) {
      serverError.value = error.response.data.message
    } else {
      serverError.value = 'An error occurred during login. Please try again.'
    }
  }
}
</script>

<template>
  <AuthFormCard
    eyebrow="Account"
    title="Welcome back"
    description="Sign in to continue to your valuation workspace."
  >
    <form class="auth-form" novalidate @submit.prevent="onSubmit">
      <AppAlert v-if="serverError" tone="error" class="mb-3">
        {{ serverError }}
      </AppAlert>

      <AppInput
        id="login-email"
        v-model="form.email"
        name="email"
        type="email"
        label="Email"
        placeholder="you@company.com"
        autocomplete="email"
        :error="errors.email"
        :disabled="loading"
      />
      <PasswordField
        id="login-password"
        v-model="form.password"
        name="password"
        autocomplete="current-password"
        :error="errors.password"
        :disabled="loading"
      />
      <div class="login-options">
        <AppCheckbox v-model="form.remember" :disabled="loading">Remember me</AppCheckbox>
        <RouterLink class="login-options__forgot" to="/forgot-password">Forgot password?</RouterLink>
      </div>
      <AppButton type="submit" block size="lg" :loading="loading" :disabled="loading">
        Sign In
      </AppButton>
    </form>

    <template #footer>
      <p class="auth-switch">
        Don’t have an account?
        <RouterLink to="/get-started">Create account</RouterLink>
      </p>
    </template>
  </AuthFormCard>
</template>

<style scoped>
.login-options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.login-options__forgot {
  color: var(--color-brand-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}

.login-options__forgot:hover {
  text-decoration: underline;
}
</style>
