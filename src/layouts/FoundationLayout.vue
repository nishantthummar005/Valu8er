<script setup lang="ts">
import AppLogo from '@/components/ui/AppLogo.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
</script>

<template>
  <div class="foundation-layout">
    <header class="foundation-layout__bar">
      <AppLogo variant="lockup" :size="32" />
      <ThemeToggle />
    </header>
    <main id="main" class="foundation-layout__main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.foundation-layout {
  min-height: 100vh;
}

.foundation-layout__bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 4rem;
  padding: var(--space-3) var(--space-6);
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 86%, transparent);
  backdrop-filter: blur(16px);
}

.foundation-layout__main {
  min-height: calc(100vh - 4rem);
}

@media (max-width: 429px) {
  .foundation-layout__bar {
    padding-inline: var(--space-4);
  }
}
</style>
