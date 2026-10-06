<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthFormCard from '@/components/auth/AuthFormCard.vue'
import AuthSuccessState from '@/components/auth/AuthSuccessState.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { useDemoForm } from '@/composables/useDemoForm'
import { isValidEmail } from '@/utils/validation'

const email = ref('')
const { attempted, loading, succeeded, submit } = useDemoForm()

function validateEmail() {
  if (!email.value.trim()) return 'Enter the email on the account'
  return isValidEmail(email.value) ? '' : 'Enter a valid email address'
}

const emailError = computed(() => (attempted.value ? validateEmail() : ''))

function onSubmit() {
  void submit(!validateEmail())
}
</script>

<template>
  <AuthSuccessState
    v-if="succeeded"
    title="Check your inbox"
    description="If this were connected, a reset link would be sent to that address. Nothing was sent in this UI preview."
  >
    <AppButton block to="/login">Back to Sign In</AppButton>
  </AuthSuccessState>

  <AuthFormCard
    v-else
    eyebrow="Recovery"
    title="Reset your password"
    description="Enter the work email on the account. We’ll show the next step here — no message is sent yet."
  >
    <form class="auth-form" novalidate @submit.prevent="onSubmit">
      <AppInput
        id="forgot-email"
        v-model="email"
        name="email"
        type="email"
        label="Email"
        placeholder="you@company.com"
        autocomplete="email"
        :error="emailError"
        :disabled="loading"
      />
      <AppButton type="submit" block size="lg" :loading="loading" :disabled="loading">
        Send Reset Link
      </AppButton>
    </form>

    <template #footer>
      <p class="auth-switch">
        <RouterLink to="/login">Back to Sign In</RouterLink>
      </p>
    </template>
  </AuthFormCard>
</template>
