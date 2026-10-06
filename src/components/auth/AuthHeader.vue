<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
</script>

<template>
  <header class="auth-header">
    <RouterLink to="/" class="auth-header__brand" aria-label="Valu8er home">
      <AppLogo variant="lockup" :size="28" />
    </RouterLink>
    <ThemeToggle />
  </header>
</template>

<style scoped>
.auth-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 4rem;
  padding: var(--space-3) var(--space-5);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  background: color-mix(in srgb, var(--color-bg) 78%, transparent);
  backdrop-filter: blur(16px);
}

.auth-header__brand {
  display: inline-flex;
  color: inherit;
  text-decoration: none;
}

@media (min-width: 1024px) {
  .auth-header {
    padding-inline: var(--space-8);
  }
}
</style>
