<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
</script>

<template>
  <section class="about-cta">
    <div class="about-cta__glow" aria-hidden="true" />
    <AppContainer>
      <div class="about-cta__panel">
        <p class="section-kicker">Next step</p>
        <h2 class="text-h1 text-balance">
          See how we're turning that idea into a
          <span class="heading-accent">product.</span>
        </h2>
        <p class="text-body">
          Explore the valuation platform and see how financial analysis, valuation, benchmarking and
          reporting come together.
        </p>
        <div class="about-cta__actions">
          <AppButton size="lg" to="/platform">Explore Platform</AppButton>
          <AppButton size="lg" variant="outline" to="/get-started">Get Started</AppButton>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.about-cta {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-16);
  background:
    radial-gradient(circle at 50% 0%, var(--color-glow), transparent 42%),
    var(--color-surface-muted);
  border-block: 1px solid var(--color-border);
}

.about-cta__glow {
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

.about-cta__panel {
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

.about-cta .text-body {
  color: var(--color-text-secondary);
}

.about-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

[data-theme='dark'] .about-cta {
  background:
    radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.12), transparent 42%),
    linear-gradient(180deg, #151d2c 0%, #121a28 100%);
  border-block-color: rgba(148, 163, 184, 0.1);
}

[data-theme='dark'] .about-cta__panel {
  background:
    radial-gradient(ellipse 55% 70% at 100% 0%, rgba(20, 184, 166, 0.12), transparent 55%),
    #1c2638;
  border-color: rgba(94, 234, 212, 0.16);
}

@media (max-width: 429px) {
  .about-cta__actions :deep(.app-button) {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .about-cta {
    padding-block: var(--space-20);
  }
}
</style>
