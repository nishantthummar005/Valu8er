<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
</script>

<template>
  <section class="final-cta">
    <div class="final-cta__glow" aria-hidden="true" />
    <AppContainer>
      <div class="final-cta__panel">
        <p class="section-kicker">Next step</p>
        <h2 class="text-h1">Turn financial complexity into clarity.</h2>
        <p class="text-body">
          Start with a structured workspace. Bring the company into view, form a range, and keep the
          reasoning attached to the file.
        </p>
        <div class="final-cta__actions">
          <AppButton size="lg" to="/get-started">Get Started</AppButton>
          <AppButton size="lg" variant="outline" to="/platform">Explore Platform</AppButton>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.final-cta {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-16);
  background: #0b1220;
}

.final-cta__glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 0%, rgba(20, 184, 166, 0.18), transparent 42%),
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: auto, 48px 48px, 48px 48px;
  pointer-events: none;
}

.final-cta__panel {
  position: relative;
  display: grid;
  gap: var(--space-5);
  max-width: 40rem;
  padding: var(--space-8);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: var(--radius-2xl);
  background: color-mix(in srgb, #121a2b 88%, transparent);
  color: #f8fafc;
}

.section-kicker {
  margin: 0;
  color: #5eead4;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

#app .final-cta .text-h1 {
  color: #f8fafc;
}

#app .final-cta .text-body {
  color: #94a3b8;
}

.final-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.final-cta :deep(.app-button--outline) {
  background: transparent;
  color: #f8fafc;
  border-color: rgba(148, 163, 184, 0.28);
}

@media (min-width: 768px) {
  .final-cta {
    padding-block: var(--space-20);
  }
}
</style>
