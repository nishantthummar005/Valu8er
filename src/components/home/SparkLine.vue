<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    points: number[]
    width?: number
    height?: number
    label: string
  }>(),
  {
    width: 180,
    height: 56,
  },
)

const geometry = computed(() => {
  const values = props.points
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const coords = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * props.width
    const y = props.height - ((value - min) / range) * (props.height - 6) - 3
    return { x, y }
  })
  const line = coords.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `0,${props.height} ${line} ${props.width},${props.height}`
  return { line, area }
})
</script>

<template>
  <svg
    class="spark-line"
    :viewBox="`0 0 ${width} ${height}`"
    :style="{ height: `${height}px` }"
    role="img"
    :aria-label="label"
    preserveAspectRatio="none"
  >
    <polyline class="spark-line__area" :points="geometry.area" />
    <polyline class="spark-line__path" :points="geometry.line" />
  </svg>
</template>

<style scoped>
.spark-line {
  display: block;
  width: 100%;
  max-width: 100%;
}

.spark-line__area {
  fill: color-mix(in srgb, var(--color-brand-primary) 16%, transparent);
  stroke: none;
}

.spark-line__path {
  fill: none;
  stroke: var(--color-brand-bright);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  animation: draw var(--duration-slow) var(--ease-out) 0.2s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spark-line__path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
