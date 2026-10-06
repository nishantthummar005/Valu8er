<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue'
import RangeMeter from '@/components/home/RangeMeter.vue'
import SparkLine from '@/components/home/SparkLine.vue'
import { demoCompany, revenueTrend } from '@/data/homeDemo'
</script>

<template>
  <aside class="auth-preview" aria-label="Demo valuation workspace">
    <header>
      <div>
        <p>Workspace</p>
        <h3>{{ demoCompany.name }}</h3>
      </div>
      <AppBadge tone="brand">Demo</AppBadge>
    </header>

    <div class="auth-preview__value">
      <span>Estimated value</span>
      <strong>{{ demoCompany.value }}</strong>
      <AppBadge tone="success">{{ demoCompany.confidence }} confidence</AppBadge>
    </div>

    <RangeMeter
      :low="demoCompany.low"
      :mid="demoCompany.value"
      :high="demoCompany.high"
      :position="demoCompany.position"
      dark
    />

    <div class="auth-preview__metrics">
      <div>
        <span>Revenue</span>
        <strong>{{ demoCompany.revenue }}</strong>
      </div>
      <div>
        <span>EBITDA</span>
        <strong>{{ demoCompany.ebitda }}</strong>
      </div>
      <div>
        <span>Growth</span>
        <strong class="is-up">{{ demoCompany.growth }}</strong>
      </div>
    </div>

    <SparkLine :points="revenueTrend" :width="220" :height="48" label="Demo revenue trend" />
  </aside>
</template>

<style scoped>
.auth-preview {
  display: grid;
  gap: var(--space-4);
  width: min(100%, 24rem);
  padding: var(--space-5);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: var(--radius-xl);
  background:
    linear-gradient(180deg, rgba(26, 36, 56, 0.96), #121a2b 42%),
    #0b1220;
  color: #f1f5f9;
  box-shadow: var(--shadow-lg);
}

.auth-preview header,
.auth-preview__metrics {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
}

.auth-preview header {
  align-items: flex-start;
}

.auth-preview h3,
.auth-preview p,
.auth-preview span {
  margin: 0;
}

.auth-preview p,
.auth-preview span {
  color: #94a3b8;
  font-size: 0.7rem;
  font-weight: 550;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.auth-preview h3 {
  margin-top: 0.2rem;
  font-size: 1rem;
  font-weight: 650;
}

.auth-preview__value {
  display: grid;
  gap: var(--space-2);
}

.auth-preview__value strong {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  letter-spacing: -0.04em;
  line-height: 1;
}

.auth-preview__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-top: var(--space-2);
  border-top: 1px solid rgba(148, 163, 184, 0.12);
}

.auth-preview__metrics strong {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.9375rem;
}

.is-up {
  color: #5eead4;
}
</style>
