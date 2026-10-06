<script setup lang="ts">
withDefaults(
  defineProps<{
    tight?: boolean
  }>(),
  {
    tight: false,
  },
)
</script>

<template>
  <section class="app-section" :class="{ 'app-section--tight': tight }">
    <slot />
  </section>
</template>
