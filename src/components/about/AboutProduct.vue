<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutProductAreas } from '@/data/about'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="soft">
    <AppContainer size="xl">
      <div ref="root" class="product" :class="{ 'is-visible': visible }">
        <header class="product__header">
          <p class="section-kicker">The product</p>
          <h2 class="text-h1 text-balance">
            One place to understand the
            <span class="heading-accent">financial picture.</span>
          </h2>
          <p class="text-body product__lede">
            Analysis, valuation, benchmarking, and reporting come together so the story stays attached
            to the file — not scattered across tools.
          </p>
        </header>

        <div class="product__bento" aria-label="Valuation intelligence product areas">
          <div class="product__hub">
            <strong class="product__hub-title">Valuation Intelligence</strong>
          </div>

          <ul class="product__areas">
            <li
              v-for="(area, index) in aboutProductAreas"
              :key="area.title"
              :style="{ '--delay': `${120 + index * 85}ms` }"
            >
              <h3 class="text-h3">{{ area.title }}</h3>
              <ul class="product__tags">
                <li v-for="item in area.items" :key="item">{{ item }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.product {
  display: grid;
  gap: var(--space-8);
}

.product__header {
  display: grid;
  gap: var(--space-3);
  width: 100%;
}

.product__header h2 {
  margin: 0;
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product__lede {
  margin: 0;
  color: var(--color-text-secondary);
}

.product__bento {
  display: grid;
  gap: var(--space-4);
}

.product__hub {
  display: grid;
  gap: var(--space-2);
  padding: clamp(1.35rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2.25rem);
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in srgb, #14b8a6 42%, transparent);
  background:
    radial-gradient(ellipse 70% 80% at 0% 0%, rgba(20, 184, 166, 0.22), transparent 55%),
    radial-gradient(ellipse 50% 60% at 100% 100%, rgba(13, 148, 136, 0.16), transparent 50%),
    linear-gradient(135deg, #152238 0%, #121a28 50%, #0f1624 100%);
  color: #f8fafc;
  box-shadow: 0 20px 48px -28px rgba(15, 23, 42, 0.5);
}

.product__hub-title {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.1rem + 1.2vw, 1.85rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.15;
  color: #5eead4;
  text-transform: uppercase;
  text-align: center;
}

.product__areas {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.product__areas > li {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-5) var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: color-mix(in srgb, var(--color-surface) 92%, var(--color-surface-muted));
  box-shadow: var(--shadow-xs);
  opacity: 0;
  transform: translateY(10px);
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.product.is-visible .product__areas > li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.product__areas > li:hover {
  border-color: color-mix(in srgb, #14b8a6 30%, var(--color-border));
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.product__areas h3 {
  margin: 0;
}

.product__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.product__tags li {
  padding: 0.32rem 0.65rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 18%, var(--color-border));
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
}

@media (min-width: 900px) {
  .product__areas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
  }
}

[data-theme='dark'] .product__areas > li {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .product__tags li {
  background: color-mix(in srgb, var(--color-surface) 80%, #0f1624);
  border-color: var(--color-border-strong);
}

@media (prefers-reduced-motion: reduce) {
  .product.is-visible .product__areas > li {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .product__areas > li:hover {
    transform: none;
  }
}
</style>
