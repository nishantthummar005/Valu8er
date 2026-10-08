<script setup lang="ts">
import { nextTick, ref, toRef, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import { isNavActive, primaryNav, type NavItem } from '@/config/navigation'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const route = useRoute()
const panel = ref<HTMLElement | null>(null)
const expanded = ref<string | null>(null)
const lastFocus = ref<HTMLElement | null>(null)

useBodyScrollLock(toRef(props, 'open'))

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      lastFocus.value = document.activeElement as HTMLElement
      const match = primaryNav.find((item) => item.children && isNavActive(route.path, item.to))
      expanded.value = match?.label ?? null
      await nextTick()
      panel.value?.querySelector<HTMLElement>('.mobile-drawer__close')?.focus()
      return
    }

    lastFocus.value?.focus()
  },
)

watch(
  () => route.fullPath,
  () => {
    if (props.open) emit('close')
  },
)

const toggleSection = (item: NavItem) => {
  expanded.value = expanded.value === item.label ? null : item.label
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }

  if (event.key !== 'Tab' || !panel.value) return

  const focusable = [
    ...panel.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ]

  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="mobile-drawer">
      <div class="mobile-drawer__overlay" @click="emit('close')" />
      <aside
        id="mobile-nav-drawer"
        ref="panel"
        class="mobile-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        @keydown="onKeydown"
      >
        <div class="mobile-drawer__glow" aria-hidden="true" />

        <header class="mobile-drawer__header">
          <RouterLink to="/" class="mobile-drawer__brand" @click="emit('close')">
            <AppLogo variant="lockup" :size="40" />
          </RouterLink>
          <AppButton
            class="mobile-drawer__close"
            variant="icon"
            icon="mdi-close"
            label="Close navigation"
            @click="emit('close')"
          />
        </header>

        <nav class="mobile-drawer__nav" aria-label="Mobile">
          <template v-for="item in primaryNav" :key="item.to">
            <div v-if="item.children?.length" class="mobile-drawer__group">
              <button
                class="mobile-drawer__item mobile-drawer__item--toggle"
                :class="{ 'is-active': isNavActive(route.path, item.to) }"
                :aria-expanded="expanded === item.label"
                @click="toggleSection(item)"
              >
                <span>{{ item.label }}</span>
                <AppIcon name="mdi-chevron-down" :size="18" />
              </button>
              <div v-show="expanded === item.label" class="mobile-drawer__children">
                <RouterLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="mobile-drawer__child"
                  :class="{ 'is-active': isNavActive(route.path, child.to) }"
                >
                  <span class="mobile-drawer__child-icon">
                    <AppIcon v-if="child.icon" :name="child.icon" :size="16" />
                  </span>
                  <span>
                    <strong>{{ child.label }}</strong>
                    <small v-if="child.description">{{ child.description }}</small>
                  </span>
                </RouterLink>
              </div>
            </div>
            <RouterLink
              v-else
              :to="item.to"
              class="mobile-drawer__item"
              :class="{ 'is-active': isNavActive(route.path, item.to) }"
              :aria-current="isNavActive(route.path, item.to) ? 'page' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </template>
        </nav>

        <footer class="mobile-drawer__actions">
          <AppButton variant="outline" block to="/login">Login</AppButton>
          <AppButton block to="/get-started">Get Started</AppButton>
        </footer>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.mobile-drawer {
  position: fixed;
  inset: 0;
  z-index: 80;
}

.mobile-drawer__overlay {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, #020617 55%, transparent);
  backdrop-filter: blur(4px);
}

.mobile-drawer__panel {
  position: absolute;
  inset: 0 0 0 auto;
  display: flex;
  flex-direction: column;
  width: min(22.5rem, 100%);
  height: 100dvh;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  animation: drawer-in var(--duration-slow) var(--ease-out);
  overflow: hidden;
}

.mobile-drawer__glow {
  position: absolute;
  inset: 0 auto auto 0;
  width: 14rem;
  height: 14rem;
  background: radial-gradient(circle, color-mix(in srgb, var(--color-brand-primary) 18%, transparent), transparent 70%);
  pointer-events: none;
}

.mobile-drawer__header,
.mobile-drawer__actions {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
}

.mobile-drawer__brand {
  color: inherit;
  text-decoration: none;
}

.mobile-drawer__nav {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.2rem;
  flex: 1;
  overflow: auto;
  padding: var(--space-2) var(--space-4) var(--space-6);
}

.mobile-drawer__item,
.mobile-drawer__child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 2.85rem;
  padding: 0.35rem 0.85rem;
  border: 0;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-weight: 600;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}

.mobile-drawer__item.is-active,
.mobile-drawer__child.is-active {
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-brand-primary) 18%, transparent);
}

.mobile-drawer__children {
  display: grid;
  gap: 0.2rem;
  padding: 0.15rem 0 var(--space-2) 0.35rem;
}

.mobile-drawer__child {
  justify-content: flex-start;
  color: var(--color-text-secondary);
}

.mobile-drawer__child-icon {
  display: inline-flex;
  width: 1.85rem;
  height: 1.85rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
}

.mobile-drawer__child span:last-child {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}

.mobile-drawer__child strong {
  font-size: 0.9rem;
  font-weight: 650;
}

.mobile-drawer__child small {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  line-height: 1.3;
}

.mobile-drawer__item--toggle :deep(.app-icon) {
  transition: transform var(--duration-fast) var(--ease-out);
}

.mobile-drawer__item--toggle[aria-expanded='true'] :deep(.app-icon) {
  transform: rotate(180deg);
}

.mobile-drawer__actions {
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface-muted) 65%, var(--color-surface));
}

@keyframes drawer-in {
  from {
    opacity: 0;
    transform: translateX(14px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-drawer__panel {
    animation: none;
  }

  .mobile-drawer__item--toggle :deep(.app-icon) {
    transition: none;
  }
}
</style>
