<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppDivider from '@/components/ui/AppDivider.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import { footerColumns, legalLinks, socialPlaceholders } from '@/config/navigation'

const year = new Date().getFullYear()

const preventPlaceholder = (event: Event) => {
  event.preventDefault()
}
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__glow" aria-hidden="true" />
    <AppContainer size="xl" class="app-footer__inner">
      <div class="app-footer__top">
        <div class="app-footer__brand">
          <RouterLink to="/" class="app-footer__logo" aria-label="Valu8er home">
            <AppLogo variant="lockup" :size="32" />
          </RouterLink>
          <p class="text-body-sm">
            Financial intelligence for clearer valuation decisions. Built for owners, advisors, and
            finance teams who need a calmer view of value.
          </p>
          <div class="app-footer__social">
            <a
              v-for="item in socialPlaceholders"
              :key="item.label"
              href="#"
              class="app-footer__social-link"
              :aria-label="item.label"
              @click="preventPlaceholder"
            >
              <AppIcon :name="item.icon" :size="18" />
            </a>
          </div>
        </div>

        <div class="app-footer__columns">
          <section v-for="column in footerColumns" :key="column.title">
            <h2 class="text-label">{{ column.title }}</h2>
            <ul>
              <li v-for="link in column.links" :key="link.to">
                <RouterLink :to="link.to" class="app-footer__link">{{ link.label }}</RouterLink>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <AppDivider />

      <div class="app-footer__bottom">
        <p class="text-caption">© {{ year }} Valu8er. All rights reserved.</p>
        <nav aria-label="Legal">
          <RouterLink v-for="link in legalLinks" :key="link.to" :to="link.to" class="app-footer__link">
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </AppContainer>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  overflow: hidden;
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-muted);
}

[data-theme='dark'] .app-footer {
  background: var(--color-surface);
}

.app-footer__glow {
  position: absolute;
  inset: auto 0 0 0;
  height: 12rem;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 120%, var(--color-glow), transparent 42%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, 48px 48px, 48px 48px;
  opacity: 0.45;
  mask-image: linear-gradient(to top, #000, transparent 80%);
}

.app-footer__inner {
  position: relative;
  display: grid;
  gap: var(--space-8);
  padding-block: var(--space-12);
}

.app-footer__top {
  display: grid;
  gap: var(--space-10);
}

.app-footer__brand {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  max-width: 22rem;
}

.app-footer__logo {
  color: inherit;
  text-decoration: none;
  width: max-content;
}

.app-footer__social {
  display: flex;
  gap: var(--space-2);
}

.app-footer__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  background: var(--color-surface);
}

.app-footer__social-link:hover,
.app-footer__link:hover {
  color: var(--color-brand-primary);
}

.app-footer__columns {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
}

.app-footer__columns ul {
  display: grid;
  gap: var(--space-3);
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
}

.app-footer__link {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-decoration: none;
}

.app-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.app-footer__bottom nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .app-footer__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .app-footer__top {
    grid-template-columns: minmax(16rem, 0.8fr) minmax(0, 1.4fr);
    align-items: start;
  }

  .app-footer__columns {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
