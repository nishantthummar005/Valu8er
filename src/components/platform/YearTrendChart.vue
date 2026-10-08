<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  points: { year: string; value: number; display: string }[]
  label: string
}>()

const width = 320
const height = 132
const pad = { top: 14, right: 10, bottom: 28, left: 8 }

const geometry = computed(() => {
  const values = props.points.map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom

  const coords = props.points.map((point, index) => {
    const x = pad.left + (index / Math.max(props.points.length - 1, 1)) * innerW
    const y = pad.top + innerH - ((point.value - min) / range) * innerH
    return { ...point, x, y }
  })

  const line = coords.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${coords[0]?.x ?? 0},${height - pad.bottom} ${line} ${coords.at(-1)?.x ?? width},${height - pad.bottom}`

  return { coords, line, area }
})
</script>

<template>
  <svg
    class="year-trend"
    :viewBox="`0 0 ${width} ${height}`"
    role="img"
    :aria-label="label"
    preserveAspectRatio="none"
  >
    <polyline class="year-trend__area" :points="geometry.area" />
    <polyline class="year-trend__line" :points="geometry.line" />
    <g v-for="point in geometry.coords" :key="point.year">
      <circle :cx="point.x" :cy="point.y" r="3.2" class="year-trend__dot" />
      <text :x="point.x" :y="height - 8" class="year-trend__year">{{ point.year }}</text>
    </g>
  </svg>
</template>

<style scoped>
.year-trend {
  display: block;
  width: 100%;
  height: 8.25rem;
}

.year-trend__area {
  fill: color-mix(in srgb, var(--color-brand-primary) 16%, transparent);
  stroke: none;
}

.year-trend__line {
  fill: none;
  stroke: var(--color-brand-bright);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  animation: draw var(--duration-slow) var(--ease-out) 0.15s forwards;
}

.year-trend__dot {
  fill: #0b1220;
  stroke: var(--color-brand-bright);
  stroke-width: 1.6;
}

.year-trend__year {
  fill: #94a3b8;
  font-size: 10px;
  text-anchor: middle;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .year-trend__line {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
