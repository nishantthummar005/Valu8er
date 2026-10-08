<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { demoCompany } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="identity" :class="{ 'is-visible': visible }">
        <div class="identity__copy">
          <p class="section-kicker">Brand belief</p>
          <h2 class="text-h1 text-balance">
            Built with a simple idea
            <span class="heading-accent">in mind.</span>
          </h2>
          <p class="identity__statement">
            Financial intelligence should feel
            <em>clear</em>, <em>useful</em>, and <em>human</em>.
          </p>
          <p class="text-body">
            That belief shapes the product language, the workspace, and every report that leaves it —
            so teams spend less time translating numbers and more time deciding.
          </p>
        </div>

        <aside class="identity__visual" aria-hidden="true">
          <div class="identity__card">
            <div class="identity__card-top">
              <span>Illustrative</span>
              <span class="identity__pulse" />
            </div>
            <strong>{{ demoCompany.value }}</strong>
            <em>{{ demoCompany.name }}</em>
            <div class="identity__bars">
              <i style="--h: 42%" />
              <i style="--h: 58%" />
              <i style="--h: 50%" />
              <i style="--h: 72%" />
              <i style="--h: 64%" />
              <i style="--h: 80%" />
            </div>
            <p class="identity__note">Clarity attached to the file</p>
          </div>
        </aside>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.identity {
  display: grid;
  gap: var(--space-8);
  align-items: center;
}

.identity__copy {
  display: grid;
  gap: var(--space-5);
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

.identity__copy h2 {
  margin: 0;
}

.identity__statement {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 1.2rem + 1.1vw, 2rem);
  font-weight: 650;
  letter-spacing: -0.03em;
  line-height: 1.3;
}

.identity__statement em {
  font-style: normal;
  color: var(--color-brand-primary);
}

.identity__visual {
  width: 100%;
  min-width: 0;
  opacity: 0;
  transform: translateY(12px);
}

.identity.is-visible .identity__visual {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.identity__card {
  display: grid;
  gap: var(--space-3);
  width: 100%;
  max-width: none;
  padding: clamp(1.5rem, 3vw, 2rem);
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 30%, transparent);
  background:
    radial-gradient(ellipse 70% 50% at 20% 0%, color-mix(in srgb, var(--color-brand-primary) 24%, transparent), transparent 60%),
    #171f2f;
  color: #f8fafc;
  box-shadow: var(--shadow-md);
}

.identity__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.identity__card span {
  color: #5eead4;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.identity__pulse {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #2dd4bf;
  box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.45);
  animation: pulse 2.2s var(--ease-out) infinite;
}

.identity__card strong {
  font-size: clamp(2.15rem, 1.8rem + 1.2vw, 2.75rem);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.identity__card em {
  color: #94a3b8;
  font-size: 0.875rem;
  font-style: normal;
}

.identity__bars {
  display: flex;
  align-items: flex-end;
  gap: 0.45rem;
  height: 5rem;
  margin-top: var(--space-3);
}

.identity__bars i {
  display: block;
  flex: 1;
  height: var(--h);
  border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, #5eead4, color-mix(in srgb, #0d9488 70%, transparent));
  opacity: 0.85;
  transform-origin: bottom;
  animation: grow-bar 0.9s var(--ease-out) both;
}

.identity__bars i:nth-child(2) { animation-delay: 60ms; }
.identity__bars i:nth-child(3) { animation-delay: 120ms; }
.identity__bars i:nth-child(4) { animation-delay: 180ms; }
.identity__bars i:nth-child(5) { animation-delay: 240ms; }
.identity__bars i:nth-child(6) { animation-delay: 300ms; }

.identity__note {
  margin: var(--space-3) 0 0;
  padding-top: var(--space-3);
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  color: #94a3b8;
  font-size: 0.75rem;
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

@keyframes grow-bar {
  from {
    transform: scaleY(0.35);
    opacity: 0.4;
  }
  to {
    transform: scaleY(1);
    opacity: 0.85;
  }
}

@media (min-width: 900px) {
  .identity {
    grid-template-columns: minmax(0, 1.55fr) minmax(17rem, 0.9fr);
    gap: var(--space-10);
    align-items: stretch;
  }

  .identity__visual {
    justify-self: stretch;
    align-self: stretch;
  }

  .identity__card {
    height: 100%;
    align-content: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .identity.is-visible .identity__visual,
  .identity__pulse,
  .identity__bars i {
    animation: none;
  }

  .identity.is-visible .identity__visual {
    opacity: 1;
    transform: none;
  }
}
</style>
