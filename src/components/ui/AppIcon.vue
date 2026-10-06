<script setup lang="ts">
import { computed } from 'vue'
import { customIcons, isCustomIcon } from '@/assets/icons/customIcons'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    label?: string
  }>(),
  {
    size: 20,
  },
)

const dimension = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
const custom = computed(() => (isCustomIcon(props.name) ? customIcons[props.name] : null))
const decorative = computed(() => !props.label)
</script>

<template>
  <span
    class="app-icon"
    :style="{ width: dimension, height: dimension }"
    :role="decorative ? undefined : 'img'"
    :aria-label="label"
    :aria-hidden="decorative ? 'true' : undefined"
  >
    <svg
      v-if="custom"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <template v-for="(node, index) in custom" :key="index">
        <path
          v-if="node.type === 'path'"
          :d="node.d"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          v-else-if="node.type === 'circle'"
          :cx="node.cx"
          :cy="node.cy"
          :r="node.r"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <line
          v-else
          :x1="node.x1"
          :y1="node.y1"
          :x2="node.x2"
          :y2="node.y2"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </template>
    </svg>
    <v-icon v-else :icon="name" :size="size" />
  </span>
</template>

<style scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: inherit;
  line-height: 0;
}

.app-icon svg,
.app-icon :deep(.v-icon) {
  width: 100%;
  height: 100%;
}
</style>
