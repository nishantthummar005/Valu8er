<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AuthHeader from '@/components/auth/AuthHeader.vue'
import AuthProductPreview from '@/components/auth/AuthProductPreview.vue'

const route = useRoute()

watch(
  () => route.meta.title,
  (title) => {
    document.title = title ? `${String(title)} — Valu8er` : 'Valu8er'
  },
  { immediate: true },
)
</script>

<template>
  <div class="auth-layout">
    <div class="auth-layout__backdrop" aria-hidden="true" />
    <AuthHeader />
    <div class="auth-layout__body">
      <aside class="auth-layout__stage">
        <div class="auth-layout__copy">
          <p>Valuation intelligence</p>
          <h2>Make better decisions with a clearer view of value.</h2>
          <p class="auth-layout__lede">
            Bring the company, the range, and the reasoning into one workspace — then keep the
            conclusion attached to the file.
          </p>
        </div>
        <AuthProductPreview class="auth-layout__preview" />
      </aside>
      <main id="main" class="auth-layout__panel">
        <router-view v-slot="{ Component }">
          <transition name="scale" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  position: relative;
  min-height: 100vh;
  overflow-x: clip;
  background: var(--color-bg);
}

.auth-layout__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 78% 12%, var(--color-glow), transparent 28%),
    radial-gradient(circle at 12% 88%, color-mix(in srgb, var(--color-brand-primary) 10%, transparent), transparent 30%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, auto, 56px 56px, 56px 56px;
  opacity: 0.42;
  pointer-events: none;
}

.auth-layout__body {
  position: relative;
  display: grid;
}

.auth-layout__stage {
  display: none;
}

.auth-layout__copy {
  display: grid;
  gap: var(--space-4);
  max-width: 28rem;
}

.auth-layout__copy p:first-child {
  margin: 0;
  color: #5eead4;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.auth-layout__copy h2 {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(1.75rem, 1.3rem + 1.1vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.auth-layout__lede {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.auth-layout__panel {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
  padding: var(--space-6) var(--space-4) var(--space-10);
}

.auth-layout :deep(.auth-form) {
  display: grid;
  gap: var(--space-4);
}

.auth-layout :deep(.app-field),
.auth-layout :deep(.auth-form-card),
.auth-layout :deep(.auth-success) {
  min-width: 0;
}

.auth-layout :deep(.auth-password-group) {
  display: grid;
  gap: var(--space-2);
}

.auth-layout :deep(.auth-form__row) {
  display: grid;
  gap: var(--space-4);
}

.auth-layout :deep(.auth-switch) {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-align: center;
}

.auth-layout :deep(.auth-switch a),
.auth-layout :deep(.auth-legal a) {
  color: var(--color-brand-primary);
  font-weight: 600;
  text-decoration: none;
}

.auth-layout :deep(.auth-switch a:hover),
.auth-layout :deep(.auth-legal a:hover) {
  text-decoration: underline;
}

.auth-layout :deep(.auth-legal) {
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  line-height: 1.45;
}

@media (min-width: 768px) {
  .auth-layout__panel {
    padding: var(--space-10) var(--space-8) var(--space-12);
  }

  .auth-layout :deep(.auth-form__row) {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .auth-layout__body {
    grid-template-columns: minmax(20rem, 0.45fr) minmax(24rem, 0.55fr);
    min-height: calc(100vh - 4rem);
  }

  .auth-layout__stage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-8);
    min-height: calc(100vh - 4rem);
    padding: var(--space-10) var(--space-8);
    background:
      radial-gradient(circle at 20% 0%, rgba(20, 184, 166, 0.16), transparent 36%),
      #0b1220;
    color: #f8fafc;
    animation: reveal-up var(--duration-slow) var(--ease-out) both;
  }

  .auth-layout__panel {
    align-items: center;
    padding-block: var(--space-10);
  }
}

@media (min-width: 1280px) {
  .auth-layout__stage {
    padding-inline: var(--space-12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .auth-layout__stage {
    animation: none;
  }
}
</style>
