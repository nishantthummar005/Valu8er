<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { isNavActive, type NavItem } from '@/config/navigation'

const props = defineProps<{
  item: NavItem
}>()

const route = useRoute()
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)
let closeTimer = 0

const openMenu = () => {
  window.clearTimeout(closeTimer)
  open.value = true
}

const closeMenu = () => {
  open.value = false
}

const scheduleClose = () => {
  window.clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    open.value = false
  }, 140)
}

const toggleMenu = () => {
  open.value = !open.value
}

const onDocumentPointer = (event: MouseEvent) => {
  if (!root.value?.contains(event.target as Node)) {
    closeMenu()
  }
}

const onKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    closeMenu()
    root.value?.querySelector<HTMLElement>('.nav-dropdown__trigger')?.focus()
    return
  }

  if (event.key === 'ArrowDown' && event.target === event.currentTarget) {
    event.preventDefault()
    openMenu()
    await nextTick()
    panel.value?.querySelector<HTMLElement>('a')?.focus()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentPointer)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentPointer)
  window.clearTimeout(closeTimer)
})
</script>

<template>
  <div
    ref="root"
    class="nav-dropdown"
    @mouseenter="openMenu"
    @mouseleave="scheduleClose"
  >
    <button
      class="nav-dropdown__trigger"
      :class="{
        'is-active': isNavActive(route.path, item.to),
        'is-open': open,
      }"
      :aria-expanded="open"
      :aria-controls="`nav-panel-${item.label.toLowerCase()}`"
      aria-haspopup="true"
      @click="toggleMenu"
      @keydown="onKeydown"
    >
      <span>{{ item.label }}</span>
      <AppIcon name="mdi-chevron-down" :size="15" />
    </button>
    <div
      v-if="open"
      :id="`nav-panel-${item.label.toLowerCase()}`"
      ref="panel"
      class="nav-dropdown__panel"
      role="menu"
    >
      <div class="nav-dropdown__panel-glow" aria-hidden="true" />
      <RouterLink
        v-for="child in item.children"
        :key="child.to"
        :to="child.to"
        class="nav-dropdown__item"
        role="menuitem"
        :class="{ 'is-active': isNavActive(route.path, child.to) }"
        @click="closeMenu"
      >
        <span v-if="child.icon" class="nav-dropdown__icon">
          <AppIcon :name="child.icon" :size="18" />
        </span>
        <span class="nav-dropdown__copy">
          <span class="nav-dropdown__label">{{ child.label }}</span>
          <span v-if="child.description" class="nav-dropdown__desc">{{ child.description }}</span>
        </span>
        <span class="nav-dropdown__arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nav-dropdown {
  position: relative;
}

.nav-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  min-height: 2.2rem;
  padding: 0 0.65rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.nav-dropdown__trigger:hover,
.nav-dropdown__trigger.is-open {
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-surface) 80%, transparent);
}

.nav-dropdown__trigger.is-active {
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-brand-primary) 22%, transparent);
}

.nav-dropdown__trigger :deep(.app-icon) {
  transition: transform var(--duration-fast) var(--ease-out);
}

.nav-dropdown__trigger.is-open :deep(.app-icon) {
  transform: rotate(180deg);
}

.nav-dropdown__panel {
  position: absolute;
  top: calc(100% + 0.65rem);
  left: 50%;
  z-index: 30;
  display: grid;
  gap: 0.2rem;
  min-width: 19rem;
  padding: var(--space-2);
  border: 1px solid color-mix(in srgb, var(--color-border) 90%, var(--color-brand-primary));
  border-radius: var(--radius-xl);
  background: color-mix(in srgb, var(--color-surface) 94%, transparent);
  box-shadow:
    0 18px 40px color-mix(in srgb, #020617 18%, transparent),
    0 0 0 1px color-mix(in srgb, var(--color-brand-primary) 8%, transparent);
  backdrop-filter: blur(16px);
  transform: translateX(-50%);
  animation: panel-in var(--duration-fast) var(--ease-out);
  overflow: hidden;
}

.nav-dropdown__panel-glow {
  position: absolute;
  inset: 0 auto auto 0;
  width: 8rem;
  height: 8rem;
  background: radial-gradient(circle, color-mix(in srgb, var(--color-brand-primary) 18%, transparent), transparent 70%);
  pointer-events: none;
}

.nav-dropdown__item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-3);
  padding: 0.7rem 0.75rem;
  border-radius: var(--radius-lg);
  color: inherit;
  text-decoration: none;
  transition: background var(--duration-fast) var(--ease-out);
}

.nav-dropdown__item:hover,
.nav-dropdown__item:focus-visible,
.nav-dropdown__item.is-active {
  background: color-mix(in srgb, var(--color-brand-primary) 9%, var(--color-surface));
}

.nav-dropdown__icon {
  display: inline-flex;
  width: 2.15rem;
  height: 2.15rem;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 20%, var(--color-border));
  border-radius: var(--radius-md);
  color: var(--color-brand-primary);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-brand-primary) 14%, transparent),
      color-mix(in srgb, var(--color-surface) 80%, transparent)
    );
}

.nav-dropdown__copy {
  display: grid;
  gap: 0.12rem;
  min-width: 0;
}

.nav-dropdown__label {
  font-size: 0.875rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.nav-dropdown__item.is-active .nav-dropdown__label {
  color: var(--color-brand-primary);
}

.nav-dropdown__desc {
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  line-height: 1.35;
}

.nav-dropdown__arrow {
  color: var(--color-brand-primary);
  font-size: 0.85rem;
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.nav-dropdown__item:hover .nav-dropdown__arrow,
.nav-dropdown__item:focus-visible .nav-dropdown__arrow {
  opacity: 1;
  transform: translateX(0);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 1180px) {
  .nav-dropdown__trigger {
    padding: 0 0.55rem;
    font-size: 0.8125rem;
  }
}

@media (min-width: 1360px) {
  .nav-dropdown__trigger {
    padding: 0 0.8rem;
    font-size: 0.875rem;
    min-height: 2.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-dropdown__trigger :deep(.app-icon),
  .nav-dropdown__arrow {
    transition: none;
  }

  .nav-dropdown__panel {
    animation: none;
  }
}
</style>
