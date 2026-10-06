<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import AuthFormCard from '@/components/auth/AuthFormCard.vue'
import AuthSuccessState from '@/components/auth/AuthSuccessState.vue'
import PasswordField from '@/components/auth/PasswordField.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { useDemoForm } from '@/composables/useDemoForm'
import { isValidEmail } from '@/utils/validation'

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const { attempted, loading, succeeded, submit, reset } = useDemoForm()

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

const errors = computed(() => (attempted.value ? validate() : { email: '', password: '' }))
const isValid = computed(() => Object.values(validate()).every((value) => !value))

function onSubmit() {
  void submit(isValid.value)
}
</script>

<template>
  <AuthSuccessState
    v-if="succeeded"
    title="Welcome back"
    description="This is a UI preview. Sign-in is not connected yet, so no workspace session was created."
  >
    <AppButton block to="/">Return home</AppButton>
    <AppButton block variant="outline" @click="reset">Back to sign in</AppButton>
  </AuthSuccessState>

  <AuthFormCard
    v-else
    eyebrow="Account"
    title="Welcome back"
    description="Sign in to continue to your valuation workspace."
  >
    <form class="auth-form" novalidate @submit.prevent="onSubmit">
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
