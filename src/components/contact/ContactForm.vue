<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppTextarea from '@/components/ui/AppTextarea.vue'
import { contactTopics, MESSAGE_MIN_LENGTH } from '@/data/contact'
import { submitContact, type ContactPayload } from '@/services/contact'
import { isValidEmail } from '@/utils/validation'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  topic: null as string | null,
  message: '',
  updates: false,
})

const attempted = ref(false)
const loading = ref(false)
const succeeded = ref(false)
const serverError = ref('')
const successMessage = ref('')

function emptyErrors() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  }
}

function validate() {
  const message = form.message.trim()
  const phone = form.phone.trim()

  return {
    firstName: form.firstName.trim() ? '' : 'Enter your first name',
    lastName: form.lastName.trim() ? '' : 'Enter your last name',
    email: !form.email.trim()
      ? 'Enter your work email'
      : isValidEmail(form.email)
        ? ''
        : 'Enter a valid email address',
    phone: !phone
      ? 'Enter your phone number'
      : phone.length < 7
        ? 'Enter a valid phone number'
        : '',
    company: form.company.trim() ? '' : 'Enter your company name',
    message: !message
      ? 'Enter a message'
      : message.length < MESSAGE_MIN_LENGTH
        ? `Add a bit more detail (at least ${MESSAGE_MIN_LENGTH} characters)`
        : '',
  }
}

const errors = computed(() => (attempted.value ? validate() : emptyErrors()))
const isValid = computed(() => Object.values(validate()).every((value) => !value))

async function onSubmit() {
  attempted.value = true
  serverError.value = ''

  if (!isValid.value || loading.value) return

  loading.value = true

  try {
    const selectedTopic = contactTopics.find(
      (t) => t.value === form.topic || t.title === form.topic,
    )
    const subject = selectedTopic ? selectedTopic.title : form.topic || 'General Inquiry'

    const payload: ContactPayload = {
      fname: form.firstName.trim(),
      lname: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      subject,
      message: form.message.trim(),
    }

    const res = await submitContact(payload)

    successMessage.value = res.message || 'Your message has been sent successfully.'
    succeeded.value = true
  } catch (err: any) {
    serverError.value =
      err?.message || 'Something went wrong while sending your message. Please try again.'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.company = ''
  form.topic = null
  form.message = ''
  form.updates = false
  attempted.value = false
  succeeded.value = false
  serverError.value = ''
  successMessage.value = ''
}
</script>

<template>
  <div class="contact-form" :class="{ 'is-success': succeeded }">
    <div
      v-if="succeeded"
      class="contact-form__success"
      role="status"
      aria-live="polite"
    >
      <span class="contact-form__success-icon" aria-hidden="true">
        <AppIcon name="mdi-check-circle-outline" :size="28" />
      </span>
      <p class="section-kicker">Message received</p>
      <h2 class="text-h2">Thanks for reaching out!</h2>
      <p class="text-body">
        {{ successMessage || 'Your message has been sent successfully. Our team will review your inquiry and get back to you shortly.' }}
      </p>
      <div class="contact-form__success-actions">
        <AppButton to="/platform">Back to Platform</AppButton>
        <AppButton variant="outline" @click="resetForm">Send Another Message</AppButton>
      </div>
    </div>

    <template v-else>
      <header>
        <h2 class="text-h2">Send us a message</h2>
        <p class="text-body">Tell us a little about what you're looking for.</p>
      </header>

      <form class="contact-form__fields" novalidate @submit.prevent="onSubmit">
        <AppAlert v-if="serverError" tone="error" class="mb-2">
          {{ serverError }}
        </AppAlert>

        <div class="contact-form__row">
          <AppInput
            id="contact-first-name"
            v-model="form.firstName"
            name="given-name"
            label="First name"
            autocomplete="given-name"
            :error="errors.firstName"
            :disabled="loading"
          />
          <AppInput
            id="contact-last-name"
            v-model="form.lastName"
            name="family-name"
            label="Last name"
            autocomplete="family-name"
            :error="errors.lastName"
            :disabled="loading"
          />
        </div>

        <div class="contact-form__row">
          <AppInput
            id="contact-email"
            v-model="form.email"
            name="email"
            type="email"
            label="Work email"
            autocomplete="email"
            :error="errors.email"
            :disabled="loading"
          />
          <AppInput
            id="contact-phone"
            v-model="form.phone"
            name="tel"
            type="tel"
            label="Phone number"
            autocomplete="tel"
            :error="errors.phone"
            :disabled="loading"
          />
        </div>

        <div class="contact-form__row">
          <AppInput
            id="contact-company"
            v-model="form.company"
            name="organization"
            label="Company"
            autocomplete="organization"
            :error="errors.company"
            :disabled="loading"
          />
          <AppSelect
            v-model="form.topic"
            label="What can we help with?"
            :items="contactTopics"
            :disabled="loading"
          />
        </div>

        <AppTextarea
          v-model="form.message"
          label="Message"
          placeholder="Tell us a little about your goals or what you'd like to understand."
          :rows="5"
          :error="errors.message"
          :disabled="loading"
        />

        <AppCheckbox v-model="form.updates" :disabled="loading">
          I'd like to receive product updates and insights.
        </AppCheckbox>

        <AppButton type="submit" size="lg" :loading="loading" :disabled="loading">
          Send Message
        </AppButton>
      </form>
    </template>
  </div>
</template>

<style scoped>
.contact-form {
  display: grid;
  gap: var(--space-5);
  padding: clamp(1.25rem, 2.5vw, 2rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.contact-form header {
  display: grid;
  gap: var(--space-2);
}

.contact-form header h2,
.contact-form__success h2 {
  margin: 0;
}

.contact-form header p,
.contact-form__success p.text-body {
  margin: 0;
  color: var(--color-text-secondary);
}

.contact-form__fields {
  display: grid;
  gap: var(--space-1);
}

.contact-form__row {
  display: grid;
  gap: var(--space-1);
}

.contact-form__fields :deep(.app-button) {
  margin-top: var(--space-3);
  justify-self: start;
  min-width: 10rem;
}

.contact-form__success {
  display: grid;
  gap: var(--space-4);
  justify-items: start;
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-form__success-icon {
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: var(--color-success);
  background: color-mix(in srgb, var(--color-success) 12%, var(--color-surface));
}

.contact-form__success-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

@media (min-width: 560px) {
  .contact-form__row {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
}

@media (max-width: 429px) {
  .contact-form__fields :deep(.app-button) {
    width: 100%;
  }
}

[data-theme='dark'] .contact-form {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .contact-form__success {
    animation: none;
  }
}
</style>
