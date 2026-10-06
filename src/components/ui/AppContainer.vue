<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  }>(),
  {
    size: 'lg',
  },
)
</script>

<template>
  <div class="app-container" :class="size !== 'lg' ? `app-container--${size}` : undefined">
    <slot />
  </div>
</template>
