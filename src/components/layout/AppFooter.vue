<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import {
  footerColumns,
  footerContact,
  footerTrust,
  legalLinks,
  socialPlaceholders,
} from '@/config/navigation'

const year = new Date().getFullYear()

const preventPlaceholder = (event: Event) => {
  event.preventDefault()
}
</script>

<template>
  <footer class="app-footer">
    <AppContainer size="xl" class="app-footer__inner">
      <div class="app-footer__main">
        <div class="app-footer__brand">
          <RouterLink to="/" class="app-footer__logo" aria-label="Valu8er home">
            <AppLogo variant="lockup" :size="52" on-dark />
          </RouterLink>
          <p>
            Financial intelligence for clearer valuation decisions. Built for owners, advisors, and
            finance teams who need a calmer view of value.
          </p>

          <div class="app-footer__contact">
            <a :href="`mailto:${footerContact.email}`" class="app-footer__contact-link">
              <AppIcon name="mdi-email-outline" :size="16" />
              <span>{{ footerContact.email }}</span>
            </a>
            <a :href="`tel:${footerContact.phone.replace(/-/g, '')}`" class="app-footer__contact-link">
              <AppIcon name="mdi-phone-outline" :size="16" />
              <span>{{ footerContact.phoneDisplay }}</span>
            </a>
          </div>

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
            <h2>{{ column.title }}</h2>
            <ul>
              <li v-for="link in column.links" :key="link.to">
                <RouterLink :to="link.to" class="app-footer__link">
                  <span>{{ link.label }}</span>
                  <span aria-hidden="true">↗</span>
                </RouterLink>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <ul class="app-footer__trust">
        <li v-for="item in footerTrust" :key="item.label">
          <AppIcon :name="item.icon" :size="16" />
          <span>{{ item.label }}</span>
        </li>
      </ul>

      <div class="app-footer__bottom">
        <p>© {{ year }} Valu8er. All rights reserved.</p>
        <nav aria-label="Legal">
          <RouterLink v-for="link in legalLinks" :key="link.to" :to="link.to">
            {{ link.label }}
          </RouterLink>
        </nav>
        <p class="app-footer__pulse">
          <span aria-hidden="true" />
          Systems online
        </p>
      </div>
    </AppContainer>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  margin-top: auto;
  border-top: 1px solid rgba(45, 212, 191, 0.14);
  background:
    linear-gradient(180deg, #121a28 0%, #0a1220 100%);
  color: #e2e8f0;
}

.app-footer__inner {
  display: grid;
  gap: var(--space-8);
  padding-block: var(--space-12) var(--space-8);
}

.app-footer__main {
  display: grid;
  gap: var(--space-10);
}

.app-footer__brand {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  max-width: 24rem;
}

.app-footer__logo {
  color: inherit;
  text-decoration: none;
  width: max-content;
}

.app-footer__brand > p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.55;
}

.app-footer__contact {
  display: grid;
  gap: var(--space-2);
}

.app-footer__contact-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  width: max-content;
  color: #cbd5e1;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.app-footer__contact-link:hover {
  color: #5eead4;
}

.app-footer__social {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.app-footer__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.55rem;
  height: 2.55rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: var(--radius-md);
  color: #cbd5e1;
  background: rgba(8, 18, 32, 0.65);
  transition:
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.app-footer__social-link:hover {
  color: #5eead4;
  border-color: rgba(94, 234, 212, 0.35);
  background: rgba(20, 184, 166, 0.1);
  transform: translateY(-2px);
}

.app-footer__columns {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
}

.app-footer__columns h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-footer__columns ul {
  display: grid;
  gap: 0.55rem;
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
}

.app-footer__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #94a3b8;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.app-footer__link span:last-child {
  opacity: 0;
  transform: translate(-2px, 2px);
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.app-footer__link:hover {
  color: #5eead4;
}

.app-footer__link:hover span:last-child {
  opacity: 1;
  transform: translate(0, 0);
}

.app-footer__trust {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin: 0;
  padding: var(--space-4) 0 0;
  list-style: none;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

.app-footer__trust li {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.45rem 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 999px;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(8, 18, 32, 0.5);
}

.app-footer__trust :deep(.app-icon) {
  color: #5eead4;
}

.app-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  color: #64748b;
  font-size: 0.8125rem;
}

.app-footer__bottom p {
  margin: 0;
}

.app-footer__bottom nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.app-footer__bottom a {
  color: #94a3b8;
  text-decoration: none;
}

.app-footer__bottom a:hover {
  color: #5eead4;
}

.app-footer__pulse {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #94a3b8;
}

.app-footer__pulse span {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #2dd4bf;
  box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.55);
  animation: pulse 2.2s var(--ease-out) infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.45);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(45, 212, 191, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(45, 212, 191, 0);
  }
}

@media (min-width: 768px) {
  .app-footer__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .app-footer__inner {
    padding-block: var(--space-16) var(--space-10);
  }

  .app-footer__main {
    grid-template-columns: minmax(16rem, 0.85fr) minmax(0, 1.35fr);
    align-items: start;
  }

  .app-footer__columns {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-footer__social-link,
  .app-footer__link span:last-child {
    transition: none;
  }

  .app-footer__social-link:hover {
    transform: none;
  }

  .app-footer__pulse span {
    animation: none;
  }
}
</style>
