<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'

const proofs = [
  { value: '10–20×', label: 'Faster report completion' },
  { value: 'One file', label: 'Reasoning stays attached' },
  { value: 'AWS', label: 'Cloud security foundation' },
]
</script>

<template>
  <section class="final-cta">
    <div class="final-cta__glow" aria-hidden="true" />
    <AppContainer size="xl">
      <div class="final-cta__panel">
        <div class="final-cta__copy">
          <p class="section-kicker">Next step</p>
          <h2 class="text-h1 text-balance">
            Close more valuations without adding
            <span class="heading-accent">headcount.</span>
          </h2>
          <p class="text-body">
            See how Valu8er cuts report cycle time, keeps reasoning on the file, and gives teams back
            the hours spent on rework — not judgment.
          </p>
          <div class="final-cta__actions">
            <AppButton size="lg" to="/get-started">Start free trial</AppButton>
            <AppButton size="lg" variant="outline" to="/pricing">View pricing</AppButton>
          </div>
        </div>

        <ul class="final-cta__proof" aria-label="Why teams start with Valu8er">
          <li v-for="item in proofs" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.final-cta {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-16);
  background:
    radial-gradient(circle at 50% 0%, var(--color-glow), transparent 42%),
    var(--color-surface-muted);
  border-block: 1px solid var(--color-border);
}

.final-cta__glow {
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

.final-cta__panel {
  position: relative;
  display: grid;
  gap: var(--space-8);
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

.final-cta__copy {
  display: grid;
  gap: var(--space-5);
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.final-cta .text-body {
  color: var(--color-text-secondary);
}

.final-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.final-cta__proof {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: var(--space-5) 0 0;
  list-style: none;
  border-top: 1px solid var(--color-border);
}

.final-cta__proof li {
  display: grid;
  gap: 0.25rem;
}

.final-cta__proof strong {
  font-size: 1.35rem;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: var(--color-text);
}

.final-cta__proof span {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
}

[data-theme='dark'] .final-cta {
  background:
    radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.12), transparent 42%),
    linear-gradient(180deg, #151d2c 0%, #121a28 100%);
  border-block-color: rgba(148, 163, 184, 0.1);
}

[data-theme='dark'] .final-cta__panel {
  background:
    radial-gradient(ellipse 55% 70% at 100% 0%, rgba(20, 184, 166, 0.12), transparent 55%),
    #1c2638;
  border-color: rgba(94, 234, 212, 0.16);
}

@media (max-width: 429px) {
  .final-cta__actions :deep(.app-button) {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .final-cta {
    padding-block: var(--space-20);
  }

  .final-cta__proof {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-5);
  }
}

@media (min-width: 1024px) {
  .final-cta__panel {
    grid-template-columns: minmax(0, 1.35fr) minmax(14rem, 0.75fr);
    align-items: center;
    column-gap: var(--space-10);
    row-gap: 0;
  }

  .final-cta__proof {
    grid-template-columns: 1fr;
    gap: var(--space-5);
    padding: 0 0 0 var(--space-8);
    border-top: none;
    border-left: 1px solid var(--color-border);
  }
}
</style>
