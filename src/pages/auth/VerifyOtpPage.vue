<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthFormCard from '@/components/auth/AuthFormCard.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { requestResendOtp, requestVerifyOtp } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Retrieve email from pendingAuth or route query
const email = computed(() => {
  return (
    authStore.pendingAuth?.email ||
    (typeof route.query.email === 'string' ? route.query.email : '')
  )
})

// Masked display email (e.g. r***@valu8er.com)
const maskedEmail = computed(() => {
  const raw = email.value
  if (!raw || !raw.includes('@')) return raw
  const [name, domain] = raw.split('@')
  if (name.length <= 2) return `${name[0]}*@${domain}`
  return `${name[0]}${'*'.repeat(Math.min(name.length - 2, 4))}${name.slice(-1)}@${domain}`
})

// 6-digit OTP state
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])

const loading = ref(false)
const resending = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Resend timer countdown (60s)
const resendTimer = ref(60)
let timerInterval: ReturnType<typeof setInterval> | null = null

function startResendTimer() {
  resendTimer.value = 60
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (resendTimer.value > 0) {
      resendTimer.value--
    } else {
      if (timerInterval) clearInterval(timerInterval)
    }
  }, 1000)
}

const timerFormatted = computed(() => {
  const mins = Math.floor(resendTimer.value / 60)
  const secs = resendTimer.value % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
})

const isComplete = computed(() => {
  return otpDigits.value.every((digit) => digit.trim() !== '')
})

function setInputRef(el: any, index: number) {
  if (el) {
    inputRefs.value[index] = el
  }
}

function handleInput(event: Event, index: number) {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '')

  errorMessage.value = ''
  successMessage.value = ''

  if (value.length > 0) {
    otpDigits.value[index] = value.slice(-1)

    // Automatically focus next input box
    if (index < 5) {
      nextTick(() => {
        inputRefs.value[index + 1]?.focus()
        inputRefs.value[index + 1]?.select()
      })
    } else if (index === 5 && isComplete.value) {
      // Auto-submit when all 6 digits entered
      submitOtp()
    }
  } else {
    otpDigits.value[index] = ''
  }
}

function handleKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace') {
    if (!otpDigits.value[index] && index > 0) {
      // Move to previous box if current is already empty
      otpDigits.value[index - 1] = ''
      nextTick(() => {
        inputRefs.value[index - 1]?.focus()
      })
    } else {
      otpDigits.value[index] = ''
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text') || ''
  const digits = pasted.replace(/\D/g, '').slice(0, 6).split('')

  if (digits.length === 0) return

  digits.forEach((digit, i) => {
    if (i < 6) {
      otpDigits.value[i] = digit
    }
  })

  errorMessage.value = ''

  // Focus appropriate box
  const targetIndex = Math.min(digits.length, 5)
  nextTick(() => {
    inputRefs.value[targetIndex]?.focus()
  })

  // Auto-submit if all 6 digits were pasted
  if (digits.length === 6) {
    submitOtp()
  }
}

async function submitOtp() {
  if (!isComplete.value || loading.value) return

  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  const fullOtp = otpDigits.value.join('')

  try {
    const verified = await requestVerifyOtp(
      {
        email: email.value,
        otp: fullOtp,
        token: authStore.pendingAuth?.token,
      },
      authStore.pendingAuth || undefined,
    )

    // 1. Activate session in Pinia store and local storage
    authStore.setSession({
      user: verified.user,
      token: verified.token,
      consume_url: verified.consume_url,
    })

    // 2. Clear pending state
    authStore.clearPendingAuth()

    // 3. Navigate user to /home
    await router.push('/home')
  } catch (err: any) {
    loading.value = false
    console.error('OTP Verification failed:', err)

    if (err.response?.data?.message) {
      errorMessage.value = err.response.data.message
    } else if (err.message) {
      errorMessage.value = err.message
    } else {
      errorMessage.value = 'Invalid or expired verification code. Please try again.'
    }

    // Focus the first empty or first input box
    nextTick(() => {
      inputRefs.value[0]?.focus()
      inputRefs.value[0]?.select()
    })
  }
}

async function onResendCode() {
  if (resendTimer.value > 0 || resending.value) return

  resending.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await requestResendOtp({
      email: email.value,
      token: authStore.pendingAuth?.token,
    })

    successMessage.value = response.message || 'A new 6-digit verification code has been sent.'
    startResendTimer()

    // Clear and focus first input
    otpDigits.value = ['', '', '', '', '', '']
    nextTick(() => {
      inputRefs.value[0]?.focus()
    })
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Failed to resend code. Please try again shortly.'
  } finally {
    resending.value = false
  }
}

onMounted(() => {
  // Guard: if no email in pendingAuth or query, redirect back to login
  if (!email.value) {
    router.replace('/login')
    return
  }

  startResendTimer()
  nextTick(() => {
    inputRefs.value[0]?.focus()
  })
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <AuthFormCard
    eyebrow="Security Verification"
    title="Enter verification code"
    description="To protect your account, please enter the 6-digit code sent to your email."
  >
    <!-- User Email Badge -->
    <div class="otp-recipient-badge">
      <div class="badge-icon">
        <v-icon icon="mdi-email-check-outline" size="18" />
      </div>
      <div class="badge-info">
        <span class="badge-email" :title="email">{{ maskedEmail }}</span>
      </div>
      <RouterLink to="/login" class="badge-change" title="Sign in with another email">
        Change
      </RouterLink>
    </div>

    <!-- Alert Messages -->
    <AppAlert v-if="errorMessage" tone="error" class="mb-3">
      {{ errorMessage }}
    </AppAlert>

    <AppAlert v-if="successMessage" tone="success" class="mb-3">
      {{ successMessage }}
    </AppAlert>

    <!-- OTP Form -->
    <form class="auth-form" novalidate @submit.prevent="submitOtp">
      <div class="otp-inputs-wrapper" @paste="handlePaste">
        <div
          v-for="(_, index) in otpDigits"
          :key="index"
          class="otp-digit-box"
          :class="{
            'is-filled': Boolean(otpDigits[index]),
            'is-error': Boolean(errorMessage),
          }"
        >
          <input
            :ref="(el) => setInputRef(el, index)"
            v-model="otpDigits[index]"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="1"
            autocomplete="one-time-code"
            class="otp-digit-input"
            :disabled="loading"
            :aria-label="`Digit ${index + 1}`"
            @input="handleInput($event, index)"
            @keydown="handleKeydown($event, index)"
          />
        </div>
      </div>

      <!-- Submit Verification Button -->
      <AppButton
        type="submit"
        block
        size="lg"
        :loading="loading"
        :disabled="!isComplete || loading"
      >
        Verify & Sign In
      </AppButton>
    </form>

    <!-- Resend Code Section -->
    <div class="otp-resend-section">
      <p v-if="resendTimer > 0" class="otp-timer-text">
        <v-icon icon="mdi-timer-sand" size="14" class="timer-icon" />
        Resend code in <strong>{{ timerFormatted }}</strong>
      </p>
      <div v-else class="otp-resend-action">
        <span class="resend-prompt">Didn’t receive a code?</span>
        <button
          type="button"
          class="resend-btn"
          :disabled="resending"
          @click="onResendCode"
        >
          <span v-if="resending">Sending...</span>
          <span v-else>Resend Code</span>
        </button>
      </div>
    </div>

    <template #footer>
      <p class="auth-switch">
        Want to use a different account?
        <RouterLink to="/login">Back to Sign In</RouterLink>
      </p>
    </template>
  </AuthFormCard>
</template>

<style scoped>
.otp-recipient-badge {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.65rem 0.9rem;
  background: color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface));
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 28%, var(--color-border));
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-2);
}

.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-primary);
}

.badge-info {
  flex: 1;
  min-width: 0;
}

.badge-email {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.badge-change {
  font-size: 0.75rem;
  font-weight: 650;
  color: var(--color-brand-primary);
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
  transition: all 0.2s ease;
}

.badge-change:hover {
  text-decoration: underline;
  background: color-mix(in srgb, var(--color-brand-primary) 20%, transparent);
}

/* 6-Digit OTP Box Grid */
.otp-inputs-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(0.35rem, 1.8vw, 0.75rem);
  margin: var(--space-3) 0 var(--space-2);
}

.otp-digit-box {
  position: relative;
  aspect-ratio: 1 / 1.15;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: var(--shadow-xs);
}

.otp-digit-box:focus-within {
  border-color: var(--color-brand-primary);
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--color-brand-primary) 28%, transparent),
    0 4px 12px color-mix(in srgb, var(--color-brand-primary) 15%, transparent);
  transform: translateY(-1px);
}

.otp-digit-box.is-filled {
  border-color: color-mix(in srgb, var(--color-brand-primary) 45%, var(--color-border));
}

.otp-digit-box.is-error {
  border-color: var(--color-tone-danger, #ef4444);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.otp-digit-input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: clamp(1.35rem, 3.2vw, 1.75rem);
  font-weight: 750;
  color: var(--color-text);
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  caret-color: var(--color-brand-primary);
}

/* Resend Section */
.otp-resend-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-2);
  text-align: center;
  min-height: 2rem;
}

.otp-timer-text {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.timer-icon {
  color: var(--color-brand-primary);
}

.otp-resend-action {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
}

.resend-prompt {
  color: var(--color-text-secondary);
}

.resend-btn {
  background: none;
  border: none;
  padding: 0;
  color: var(--color-brand-primary);
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.resend-btn:hover:not(:disabled) {
  text-decoration: underline;
}

.resend-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
