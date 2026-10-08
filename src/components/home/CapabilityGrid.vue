<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const featured = {
  key: 'valuation',
  icon: 'valuation',
  n: '01',
  title: 'Valuation methods',
  copy: 'Asset, cash flow, earnings, and market approaches — with a working midpoint you can defend.',
  methods: ['Asset', 'Cash flow', 'Earnings', 'Market'],
}

const items = [
  {
    key: 'analysis',
    icon: 'analysis',
    n: '02',
    title: 'Financial analysis',
    copy: 'Read revenue, earnings, and quality of results without hopping between disconnected files.',
  },
  {
    key: 'benchmarking',
    icon: 'benchmarking',
    n: '03',
    title: 'Suggested multiples',
    copy: 'Independently informed EBITDA and sales multiples grounded in structured valuation pillars.',
  },
  {
    key: 'insights',
    icon: 'insights',
    n: '04',
    title: 'Diagnostics',
    copy: 'Warnings and checks surface material gaps before partners find them on delivery day.',
  },
  {
    key: 'reports',
    icon: 'reports',
    n: '05',
    title: 'Report generation',
    copy: 'Schedules, charts, and cross-references that assemble into billable-ready packages.',
  },
  {
    key: 'decision',
    icon: 'workflow',
    n: '06',
    title: 'Team workflow',
    copy: 'Allocate staff, attach documents, leave review notes, and roll files forward in one place.',
  },
]
</script>

<template>
  <AppSection>
    <AppContainer size="xl">
      <div ref="root" class="capabilities" :class="{ 'is-visible': visible }">
        <header class="capabilities__header">
          <div>
            <p class="section-kicker">Capabilities</p>
            <h2 class="text-h1">Everything a modern valuation practice needs — without the tool sprawl.</h2>
          </div>
          <p class="text-body capabilities__lede">
            One workspace for method, analysis, review, and delivery — so the conclusion stays
            attached to the file.
          </p>
        </header>

        <div class="capabilities__bento">
          <article class="capability capability--featured">
            <div class="capability__meta">
              <span class="capability__icon" aria-hidden="true">
                <AppIcon :name="featured.icon" :size="22" />
              </span>
              <span class="capability__n">{{ featured.n }}</span>
            </div>
            <div class="capability__body">
              <h3 class="text-h2">{{ featured.title }}</h3>
              <p class="text-body-sm">{{ featured.copy }}</p>
              <ul class="capability__methods" aria-label="Valuation approaches">
                <li v-for="method in featured.methods" :key="method">{{ method }}</li>
              </ul>
            </div>
            <div class="capability__orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </article>

          <article
            v-for="item in items"
            :key="item.key"
            :class="['capability', `capability--${item.key}`]"
          >
            <div class="capability__meta">
              <span class="capability__icon" aria-hidden="true">
                <AppIcon :name="item.icon" :size="20" />
              </span>
              <span class="capability__n">{{ item.n }}</span>
            </div>
            <h3 class="text-h3">{{ item.title }}</h3>
            <p class="text-body-sm">{{ item.copy }}</p>
          </article>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.capabilities {
  display: grid;
  gap: var(--space-10);
}

.capabilities__header {
  display: grid;
  gap: var(--space-4);
}

.capabilities__header > div {
  display: grid;
  gap: var(--space-3);
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.capabilities__lede {
  margin: 0;
  max-width: 34rem;
  color: var(--color-text-secondary);
}

.capabilities__bento {
  display: grid;
  gap: var(--space-4);
}

.capability {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-3);
  min-width: 0;
  padding: var(--space-6);
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  transition:
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out);
}

.capability::before {
  content: '';
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--color-brand-primary) 70%, transparent),
    transparent 70%
  );
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}

.capability:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-brand-primary) 28%, var(--color-border));
  box-shadow: var(--shadow-sm);
}

.capability:hover::before {
  opacity: 1;
}

.capability__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.capability__icon {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  color: var(--color-brand-primary);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-brand-primary) 16%, transparent),
      color-mix(in srgb, var(--color-brand-primary) 6%, var(--color-surface))
    );
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 18%, var(--color-border));
}

.capability__n {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.capability h3 {
  margin: 0;
  letter-spacing: -0.02em;
}

.capability p {
  margin: 0;
  color: var(--color-text-secondary);
}

.capability--featured {
  gap: var(--space-5);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  background:
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--color-brand-primary) 18%, transparent), transparent 42%),
    linear-gradient(160deg, #171f2f 0%, #121a2b 55%, #0e1624 100%);
  border-color: color-mix(in srgb, var(--color-brand-primary) 28%, transparent);
  color: #f8fafc;
}

.capability--featured::before {
  opacity: 1;
  background: linear-gradient(90deg, #5eead4, transparent 65%);
}

.capability--featured .capability__icon {
  color: #5eead4;
  background: rgba(94, 234, 212, 0.1);
  border-color: rgba(94, 234, 212, 0.22);
}

.capability--featured .capability__n {
  color: #64748b;
}

.capability--featured h3 {
  color: #f8fafc;
}

.capability--featured p {
  color: #94a3b8;
  max-width: 28rem;
}

.capability__body {
  display: grid;
  gap: var(--space-4);
  position: relative;
  z-index: 1;
}

.capability__methods {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.capability__methods li {
  padding: 0.4rem 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.45);
  color: #cbd5e1;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.capability__orbit {
  position: absolute;
  right: -2rem;
  bottom: -2rem;
  width: 12rem;
  height: 12rem;
  pointer-events: none;
  opacity: 0.55;
}

.capability__orbit span {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(94, 234, 212, 0.18);
  border-radius: 50%;
}

.capability__orbit span:nth-child(2) {
  inset: 1.4rem;
}

.capability__orbit span:nth-child(3) {
  inset: 2.8rem;
  background: radial-gradient(circle, rgba(94, 234, 212, 0.16), transparent 68%);
  border-color: transparent;
}

@media (min-width: 768px) {
  .capabilities__header {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: end;
    gap: var(--space-8);
    max-width: none;
  }

  .capabilities__bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .capability--featured {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .capabilities__bento {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: auto auto;
    gap: var(--space-5);
  }

  .capability--featured {
    grid-column: span 3;
    grid-row: span 2;
    min-height: 100%;
    align-content: space-between;
  }

  .capability--analysis,
  .capability--benchmarking {
    grid-column: span 3;
  }

  .capability--insights,
  .capability--reports,
  .capability--decision {
    grid-column: span 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capability:hover {
    transform: none;
  }
}
</style>
