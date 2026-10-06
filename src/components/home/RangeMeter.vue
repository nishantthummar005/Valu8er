<script setup lang="ts">
withDefaults(
  defineProps<{
    low: string
    mid: string
    high: string
    position?: number
    dark?: boolean
  }>(),
  {
    position: 0.58,
    dark: false,
  },
)
</script>

<template>
  <div class="range-meter" :class="{ 'is-dark': dark }" role="img" :aria-label="`Range ${low} to ${high}, estimate ${mid}`">
    <div class="range-meter__scale">
      <span class="text-caption">{{ low }}</span>
      <span class="range-meter__mid text-label">{{ mid }}</span>
      <span class="text-caption">{{ high }}</span>
    </div>
    <div class="range-meter__track">
      <span class="range-meter__fill" />
      <span class="range-meter__marker" :style="{ left: `${Math.min(Math.max(position, 0.08), 0.92) * 100}%` }" />
    </div>
  </div>
</template>

<style scoped>
.range-meter {
  display: grid;
  gap: var(--space-2);
}

.range-meter__scale {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
}

.range-meter__scale .text-caption:last-child {
  text-align: right;
}

.range-meter__mid {
  color: var(--color-brand-primary);
}

.range-meter__track {
  position: relative;
  height: 0.35rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 14%, var(--color-border));
}

.range-meter__fill {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--color-brand-primary) 30%, transparent), var(--color-brand-bright));
}

.range-meter__marker {
  position: absolute;
  top: 50%;
  width: 0.85rem;
  height: 0.85rem;
  border: 2px solid #fff;
  border-radius: 50%;
  background: var(--color-brand-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-brand-primary) 18%, transparent);
  transform: translate(-50%, -50%);
}

.is-dark .range-meter__marker {
  border-color: #0b1220;
}

.is-dark .text-caption {
  color: #94a3b8;
}
</style>
