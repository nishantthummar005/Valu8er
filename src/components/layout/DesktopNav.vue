<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { isNavActive, primaryNav } from '@/config/navigation'
import NavDropdown from './NavDropdown.vue'

const route = useRoute()
</script>

<template>
  <nav class="desktop-nav" aria-label="Primary">
    <ul class="desktop-nav__links">
      <li v-for="item in primaryNav" :key="item.to">
        <NavDropdown v-if="item.children?.length" :item="item" />
        <RouterLink
          v-else
          :to="item.to"
          class="desktop-nav__link"
          :class="{ 'is-active': isNavActive(route.path, item.to) }"
          :aria-current="isNavActive(route.path, item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.desktop-nav__links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.desktop-nav__link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0 var(--space-2);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 550;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.desktop-nav__link:hover,
.desktop-nav__link:focus-visible {
  color: var(--color-text);
}

.desktop-nav__link.is-active {
  color: var(--color-brand-primary);
  box-shadow: inset 0 -2px 0 var(--color-brand-primary);
}
</style>
