<script setup lang="ts">
import { computed } from 'vue'
import { passwordStrength, strengthScore, type PasswordStrength } from '@/utils/validation'

const props = defineProps<{
  password: string
}>()

const level = computed(() => passwordStrength(props.password))
const score = computed(() => strengthScore(level.value))

const copy: Record<Exclude<PasswordStrength, 'empty'>, string> = {
  weak: 'Weak — add length and mixed characters',
  fair: 'Fair — a longer mix will strengthen this',
  good: 'Good — this is a solid working password',
  strong: 'Strong — suitable for a professional workspace',
}

const message = computed(() => (level.value === 'empty' ? '' : copy[level.value]))
</script>

<template>
  <div
    v-if="level !== 'empty'"
    class="password-strength"
    :class="`is-${level}`"
    role="status"
    :aria-label="`Password strength: ${level}`"
  >
    <div class="password-strength__bars" aria-hidden="true">
      <span v-for="index in 4" :key="index" :class="{ 'is-on': index <= score }" />
    </div>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.password-strength {
  display: grid;
  gap: var(--space-2);
}

.password-strength__bars {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.35rem;
}

.password-strength__bars span {
  height: 0.28rem;
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
}

.password-strength p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.is-weak .password-strength__bars span.is-on {
  background: var(--color-error);
}

.is-fair .password-strength__bars span.is-on {
  background: var(--color-warning);
}

.is-good .password-strength__bars span.is-on {
  background: var(--color-brand-primary);
}

.is-strong .password-strength__bars span.is-on {
  background: var(--color-success);
}

.is-weak p {
  color: var(--color-error);
}

.is-fair p {
  color: var(--color-warning);
}

.is-good p {
  color: var(--color-brand-primary);
}

.is-strong p {
  color: var(--color-success);
}
</style>
