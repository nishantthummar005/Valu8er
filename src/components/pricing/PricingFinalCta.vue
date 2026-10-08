<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
</script>

<template>
  <section class="pricing-cta">
    <div class="pricing-cta__glow" aria-hidden="true" />
    <AppContainer>
      <div class="pricing-cta__panel">
        <p class="section-kicker">Next step</p>
        <h2 class="text-h1 text-balance">
          Try the workspace on a real
          <span class="heading-accent">valuation story.</span>
        </h2>
        <p class="text-body">
          Explore the platform with illustrative demo data, then choose the plan that fits how your
          team works.
        </p>
        <div class="pricing-cta__actions">
          <AppButton size="lg" to="/get-started">Start free trial</AppButton>
          <AppButton size="lg" variant="outline" to="/contact">Book a demo</AppButton>
        </div>
        <ul>
          <li>14-day trial</li>
          <li>No credit card</li>
          <li>Full workspace preview</li>
          <li>Cancel anytime</li>
        </ul>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.pricing-cta {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-16);
  background:
    radial-gradient(circle at 50% 0%, var(--color-glow), transparent 42%),
    var(--color-surface-muted);
  border-block: 1px solid var(--color-border);
}

.pricing-cta__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, #000 20%, transparent 90%);
}

.pricing-cta__panel {
  position: relative;
  display: grid;
  gap: var(--space-5);
  width: 100%;
  padding: clamp(1.75rem, 4vw, 3rem);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 22%, var(--color-border));
  border-radius: var(--radius-2xl);
  background:
    radial-gradient(ellipse 55% 70% at 100% 0%, color-mix(in srgb, var(--color-brand-primary) 12%, transparent), transparent 55%),
    var(--color-surface);
  box-shadow: var(--shadow-sm);
  color: var(--color-text);
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pricing-cta .text-body {
  color: var(--color-text-secondary);
}

.pricing-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.pricing-cta ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
}

.pricing-cta li::before {
  content: '·';
  margin-right: 0.45rem;
  color: var(--color-brand-primary);
}

.pricing-cta li:first-child::before {
  content: none;
  margin: 0;
}

[data-theme='dark'] .pricing-cta {
  background:
    radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.12), transparent 42%),
    linear-gradient(180deg, #151d2c 0%, #121a28 100%);
  border-block-color: rgba(148, 163, 184, 0.1);
}

[data-theme='dark'] .pricing-cta__panel {
  background:
    radial-gradient(ellipse 55% 70% at 100% 0%, rgba(20, 184, 166, 0.12), transparent 55%),
    #1c2638;
  border-color: rgba(94, 234, 212, 0.16);
}

@media (max-width: 429px) {
  .pricing-cta__actions :deep(.app-button) {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .pricing-cta {
    padding-block: var(--space-20);
  }
}
</style>
