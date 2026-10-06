<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import AuthFormCard from '@/components/auth/AuthFormCard.vue'
import AuthSuccessState from '@/components/auth/AuthSuccessState.vue'
import PasswordField from '@/components/auth/PasswordField.vue'
import PasswordStrength from '@/components/auth/PasswordStrength.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useDemoForm } from '@/composables/useDemoForm'
import { passwordStrength } from '@/utils/validation'

const form = reactive({
  password: '',
  confirm: '',
})

const { attempted, loading, succeeded, submit } = useDemoForm()

function validate() {
  const strength = passwordStrength(form.password)
  return {
    password: !form.password
      ? 'Enter a new password'
      : strength === 'weak'
        ? 'Use at least 8 characters with mixed types'
        : '',
    confirm: !form.confirm
      ? 'Confirm your new password'
      : form.confirm === form.password
        ? ''
        : 'Passwords do not match',
  }
}

const errors = computed(() => (attempted.value ? validate() : { password: '', confirm: '' }))
const isValid = computed(() => Object.values(validate()).every((value) => !value))

function onSubmit() {
  void submit(isValid.value)
}
</script>

<template>
  <AuthSuccessState
    v-if="succeeded"
    title="Password updated"
    description="This is a UI preview. The password was not changed. You can return to sign in and continue reviewing the screens."
  >
    <AppButton block to="/login">Return to Sign In</AppButton>
  </AuthSuccessState>

  <AuthFormCard
    v-else
    eyebrow="Recovery"
    title="Set a new password"
    description="Choose a password you can defend. Strength is checked in the browser only — nothing is saved yet."
  >
    <form class="auth-form" novalidate @submit.prevent="onSubmit">
      <div class="auth-password-group">
        <PasswordField
          id="reset-password"
          v-model="form.password"
          name="new-password"
          label="New password"
          autocomplete="new-password"
          :error="errors.password"
          :disabled="loading"
        />
        <PasswordStrength :password="form.password" />
      </div>
      <PasswordField
        id="reset-confirm"
        v-model="form.confirm"
        name="confirm-password"
        label="Confirm password"
        autocomplete="new-password"
        :error="errors.confirm"
        :disabled="loading"
      />
      <AppButton type="submit" block size="lg" :loading="loading" :disabled="loading">
        Update Password
      </AppButton>
    </form>

    <template #footer>
      <p class="auth-switch">
        <RouterLink to="/login">Back to Sign In</RouterLink>
      </p>
    </template>
  </AuthFormCard>
</template>
