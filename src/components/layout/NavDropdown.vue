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
      <AppIcon name="mdi-chevron-down" :size="16" />
    </button>
    <div
      v-if="open"
      :id="`nav-panel-${item.label.toLowerCase()}`"
      ref="panel"
      class="nav-dropdown__panel"
      role="menu"
    >
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
        <span>
          <span class="text-label">{{ child.label }}</span>
          <span v-if="child.description" class="text-caption">{{ child.description }}</span>
        </span>
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
  gap: 0.2rem;
  min-height: 2.75rem;
  padding: 0 var(--space-2);
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 550;
  letter-spacing: -0.01em;
  cursor: pointer;
}

.nav-dropdown__trigger:hover,
.nav-dropdown__trigger.is-open,
.nav-dropdown__trigger.is-active {
  color: var(--color-text);
}

.nav-dropdown__trigger.is-active {
  color: var(--color-brand-primary);
  box-shadow: inset 0 -2px 0 var(--color-brand-primary);
}

.nav-dropdown__trigger :deep(.app-icon) {
  transition: transform var(--duration-fast) var(--ease-out);
}

.nav-dropdown__trigger.is-open :deep(.app-icon) {
  transform: rotate(180deg);
}

.nav-dropdown__panel {
  position: absolute;
  top: calc(100% - 0.25rem);
  left: 0;
  z-index: 30;
  display: grid;
  gap: 0.15rem;
  min-width: 17.5rem;
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.nav-dropdown__item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  color: inherit;
  text-decoration: none;
}

.nav-dropdown__item:hover,
.nav-dropdown__item:focus-visible,
.nav-dropdown__item.is-active {
  background: color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface));
}

.nav-dropdown__item.is-active .text-label {
  color: var(--color-brand-primary);
}

.nav-dropdown__item span {
  display: grid;
  gap: 0.15rem;
}

.nav-dropdown__icon {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface));
}

@media (prefers-reduced-motion: reduce) {
  .nav-dropdown__trigger :deep(.app-icon) {
    transition: none;
  }
}
</style>
