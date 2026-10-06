<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import AuthFormCard from '@/components/auth/AuthFormCard.vue'
import AuthSuccessState from '@/components/auth/AuthSuccessState.vue'
import PasswordField from '@/components/auth/PasswordField.vue'
import PasswordStrength from '@/components/auth/PasswordStrength.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { useDemoForm } from '@/composables/useDemoForm'
import { isValidEmail, passwordStrength } from '@/utils/validation'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  password: '',
  confirm: '',
  terms: false,
})

const { attempted, loading, succeeded, submit } = useDemoForm()

function emptyErrors() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirm: '',
    terms: '',
  }
}

function validate() {
  const strength = passwordStrength(form.password)

  return {
    firstName: form.firstName.trim() ? '' : 'Enter your first name',
    lastName: form.lastName.trim() ? '' : 'Enter your last name',
    email: !form.email.trim()
      ? 'Enter your work email'
      : isValidEmail(form.email)
        ? ''
        : 'Enter a valid email address',
    company: form.company.trim() ? '' : 'Enter your company',
    password: !form.password
      ? 'Create a password'
      : strength === 'weak'
        ? 'Use at least 8 characters with mixed types'
        : '',
    confirm: !form.confirm
      ? 'Confirm your password'
      : form.confirm === form.password
        ? ''
        : 'Passwords do not match',
    terms: form.terms ? '' : 'Accept the terms to continue',
  }
}

const errors = computed(() => (attempted.value ? validate() : emptyErrors()))
const isValid = computed(() => Object.values(validate()).every((value) => !value))

function onSubmit() {
  void submit(isValid.value)
}
</script>

<template>
  <AuthSuccessState
    v-if="succeeded"
    title="Account created"
    description="This is a UI preview. No account was created and nothing was sent. You can continue exploring the sign-in screens."
  >
    <AppButton block to="/login">Sign in</AppButton>
    <AppButton block variant="outline" to="/">Return home</AppButton>
  </AuthSuccessState>

  <AuthFormCard
    v-else
    wide
    eyebrow="Get started"
    title="Start with clarity."
    description="Create a workspace for owners, advisors, and finance teams to assess worth and keep the reasoning in one place."
  >
    <form class="auth-form" novalidate @submit.prevent="onSubmit">
      <div class="auth-form__row">
        <AppInput
          id="register-first-name"
          v-model="form.firstName"
          name="given-name"
          label="First name"
          autocomplete="given-name"
          :error="errors.firstName"
          :disabled="loading"
        />
        <AppInput
          id="register-last-name"
          v-model="form.lastName"
          name="family-name"
          label="Last name"
          autocomplete="family-name"
          :error="errors.lastName"
          :disabled="loading"
        />
      </div>
      <AppInput
        id="register-email"
        v-model="form.email"
        name="email"
        type="email"
        label="Work email"
        placeholder="you@company.com"
        autocomplete="email"
        :error="errors.email"
        :disabled="loading"
      />
      <AppInput
        id="register-company"
        v-model="form.company"
        name="organization"
        label="Company"
        autocomplete="organization"
        :error="errors.company"
        :disabled="loading"
      />
      <div class="auth-password-group">
        <PasswordField
          id="register-password"
          v-model="form.password"
          name="new-password"
          label="Password"
          autocomplete="new-password"
          :error="errors.password"
          :disabled="loading"
        />
        <PasswordStrength :password="form.password" />
      </div>
      <PasswordField
        id="register-confirm"
        v-model="form.confirm"
        name="confirm-password"
        label="Confirm password"
        autocomplete="new-password"
        :error="errors.confirm"
        :disabled="loading"
      />
      <AppCheckbox v-model="form.terms" :error="errors.terms" :disabled="loading">
        <span class="auth-legal">
          I agree to the
          <RouterLink to="/terms">Terms</RouterLink>
          and
          <RouterLink to="/privacy">Privacy Policy</RouterLink>.
        </span>
      </AppCheckbox>
      <AppButton type="submit" block size="lg" :loading="loading" :disabled="loading">
        Create Account
      </AppButton>
    </form>

    <template #footer>
      <p class="auth-switch">
        Already have an account?
        <RouterLink to="/login">Sign in</RouterLink>
      </p>
    </template>
  </AuthFormCard>
</template>
