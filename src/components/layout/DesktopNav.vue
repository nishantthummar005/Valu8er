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
          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.desktop-nav {
  display: inline-flex;
  max-width: 100%;
  padding: 0.22rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  border-radius: 999px;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-surface) 72%, transparent),
      color-mix(in srgb, var(--color-surface-muted) 55%, transparent)
    );
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #fff 6%, transparent),
    0 1px 2px color-mix(in srgb, #000 4%, transparent);
  backdrop-filter: blur(8px);
  overflow-x: auto;
  scrollbar-width: none;
}

.desktop-nav::-webkit-scrollbar {
  display: none;
}

.desktop-nav__links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.desktop-nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 2.2rem;
  padding: 0 0.7rem;
  border-radius: 999px;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  white-space: nowrap;
  transition:
    color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.desktop-nav__link:hover,
.desktop-nav__link:focus-visible {
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-surface) 80%, transparent);
}

.desktop-nav__link.is-active {
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-brand-primary) 22%, transparent);
}

@media (min-width: 1360px) {
  .desktop-nav__link {
    padding: 0 0.85rem;
    font-size: 0.875rem;
    min-height: 2.35rem;
  }
}
</style>
