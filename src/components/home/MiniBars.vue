<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  values: number[]
  label: string
}>()

const bars = computed(() => {
  const max = Math.max(...props.values)
  return props.values.map((value) => (value / max) * 100)
})
</script>

<template>
  <div class="mini-bars" role="img" :aria-label="label">
    <span v-for="(bar, index) in bars" :key="index" class="mini-bars__item">
      <span class="mini-bars__fill" :style="{ height: `${bar}%`, animationDelay: `${index * 60}ms` }" />
    </span>
  </div>
</template>

<style scoped>
.mini-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.35rem;
  height: 3.5rem;
}

.mini-bars__item {
  display: flex;
  align-items: flex-end;
  flex: 1;
  height: 100%;
  border-radius: var(--radius-xs);
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
  overflow: hidden;
}

.mini-bars__fill {
  width: 100%;
  border-radius: inherit;
  background: linear-gradient(180deg, var(--color-brand-bright), var(--color-brand-primary));
  transform-origin: bottom;
  animation: rise var(--duration-slow) var(--ease-out) both;
}

@keyframes rise {
  from {
    transform: scaleY(0.2);
    opacity: 0.4;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mini-bars__fill {
    animation: none;
  }
}
</style>
