<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import {
  testimonialRowOne,
  testimonialRowTwo,
  type HomeTestimonial,
} from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

function loop(items: HomeTestimonial[]) {
  return [...items, ...items]
}
</script>

<template>
  <AppSection tone="soft">
    <div ref="root" class="testimonials" :class="{ 'is-visible': visible }">
      <AppContainer>
        <header class="testimonials__header">
          <p class="section-kicker">Proof from the field</p>
          <h2 class="text-h1 text-balance">
            What valuation teams say about
            <span class="heading-accent">Valu8er</span>
          </h2>
          <p class="text-body">
            Illustrative feedback from CPAs, CFOs, advisors, and owners modernizing how valuation
            engagements get done.
          </p>
        </header>
      </AppContainer>

      <div class="testimonials__marquee" aria-label="Customer testimonials">
        <div class="marquee marquee--rtl">
          <div class="marquee__track">
            <article
              v-for="(item, index) in loop(testimonialRowOne)"
              :key="`${item.id}-a-${index}`"
              class="card"
              :aria-hidden="index >= testimonialRowOne.length ? true : undefined"
            >
              <div class="card__top">
                <div class="card__stars" aria-label="5 out of 5 stars">
                  <span v-for="n in 5" :key="n" aria-hidden="true">★</span>
                </div>
                <span class="card__badge">{{ item.badge }}</span>
              </div>
              <p class="card__quote">
                <template v-for="(part, partIndex) in item.quote" :key="partIndex">
                  <strong v-if="part.bold">{{ part.text }}</strong>
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
              <footer class="card__author">
                <span class="card__avatar" aria-hidden="true">{{ item.initials }}</span>
                <span>
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.role }}</span>
                </span>
              </footer>
            </article>
          </div>
        </div>

        <div class="marquee marquee--ltr">
          <div class="marquee__track">
            <article
              v-for="(item, index) in loop(testimonialRowTwo)"
              :key="`${item.id}-b-${index}`"
              class="card"
              :aria-hidden="index >= testimonialRowTwo.length ? true : undefined"
            >
              <div class="card__top">
                <div class="card__stars" aria-label="5 out of 5 stars">
                  <span v-for="n in 5" :key="n" aria-hidden="true">★</span>
                </div>
                <span class="card__badge">{{ item.badge }}</span>
              </div>
              <p class="card__quote">
                <template v-for="(part, partIndex) in item.quote" :key="partIndex">
                  <strong v-if="part.bold">{{ part.text }}</strong>
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
              <footer class="card__author">
                <span class="card__avatar" aria-hidden="true">{{ item.initials }}</span>
                <span>
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.role }}</span>
                </span>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style scoped>
.testimonials {
  display: grid;
  gap: var(--space-10);
}

.testimonials__header {
  display: grid;
  gap: var(--space-3);
  margin-inline: auto;
  text-align: center;
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.testimonials__marquee {
  display: grid;
  gap: var(--space-5);
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.marquee {
  overflow: hidden;
}

.marquee__track {
  display: flex;
  width: max-content;
  gap: var(--space-4);
  will-change: transform;
}

.marquee--rtl .marquee__track {
  animation: marquee-rtl 55s linear infinite;
}

.marquee--ltr .marquee__track {
  animation: marquee-ltr 60s linear infinite;
}

.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track {
  animation-play-state: paused;
}

.card {
  display: grid;
  gap: var(--space-4);
  flex: 0 0 min(20.5rem, 78vw);
  width: min(20.5rem, 78vw);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-xs);
}

.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.card__stars {
  display: inline-flex;
  gap: 0.12rem;
  color: #d4a017;
  font-size: 0.85rem;
  line-height: 1;
  letter-spacing: 0.02em;
}

.card__badge {
  display: inline-flex;
  align-items: center;
  max-width: 11rem;
  min-height: 1.5rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
  color: var(--color-brand-deep);
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  line-height: 1.25;
  text-align: center;
}

[data-theme='dark'] .card__badge {
  color: var(--color-brand-highlight);
}

.card__quote {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.55;
}

.card__quote strong {
  color: var(--color-text);
  font-weight: 650;
}

.card__author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: auto;
}

.card__avatar {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(160deg, var(--color-brand-bright), var(--color-brand-deep));
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.card__author > span:last-child {
  display: grid;
  gap: 0.15rem;
  min-width: 0;
}

.card__author strong {
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 650;
}

.card__author > span:last-child > span {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  line-height: 1.35;
}

@keyframes marquee-rtl {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-ltr {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}

@media (min-width: 768px) {
  .card {
    flex-basis: 22rem;
    width: 22rem;
    padding: var(--space-6);
  }

  .testimonials__marquee {
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee--rtl .marquee__track,
  .marquee--ltr .marquee__track {
    animation: none;
    transform: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 72rem;
    margin-inline: auto;
    padding-inline: var(--space-4);
  }

  .testimonials__marquee {
    mask-image: none;
  }

  .card[aria-hidden='true'] {
    display: none;
  }
}
</style>
