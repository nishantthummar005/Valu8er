<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
</script>

<template>
  <div class="default-layout">
    <AppContainer>
      <slot />
    </AppContainer>
  </div>
</template>

<style scoped>
.default-layout {
  min-height: 100vh;
  padding-block: var(--space-8);
}
</style>
