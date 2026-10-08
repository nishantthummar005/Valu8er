<script setup lang="ts">
import { aboutHeroNodes } from '@/data/about'
</script>

<template>
  <div class="hero-visual" aria-hidden="true">
    <div class="hero-visual__glow" />
    <div class="hero-visual__ring hero-visual__ring--outer" />
    <div class="hero-visual__ring hero-visual__ring--inner" />

    <svg class="hero-visual__lines" viewBox="0 0 420 360" fill="none">
      <path
        class="hero-visual__pulse-path"
        d="M210 180 L95 70 M210 180 L210 48 M210 180 L325 70 M210 180 L70 200 M210 180 L350 200 M210 180 L210 310"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        opacity="0.4"
      />
      <circle cx="210" cy="180" r="5" fill="currentColor" />
      <circle cx="95" cy="70" r="3" fill="currentColor" opacity="0.75" />
      <circle cx="210" cy="48" r="3" fill="currentColor" opacity="0.75" />
      <circle cx="325" cy="70" r="3" fill="currentColor" opacity="0.75" />
      <circle cx="70" cy="200" r="3" fill="currentColor" opacity="0.75" />
      <circle cx="350" cy="200" r="3" fill="currentColor" opacity="0.75" />
      <circle cx="210" cy="310" r="3" fill="currentColor" opacity="0.75" />
    </svg>

    <div class="hero-visual__hub">
      <span>Business Value</span>
    </div>

    <ul>
      <li v-for="(node, index) in aboutHeroNodes" :key="node" :style="{ '--i': index }">
        {{ node }}
      </li>
    </ul>

    <div class="hero-visual__metrics">
      <span>$8.42M</span>
      <span>+18.4%</span>
      <span>7.6×</span>
    </div>
  </div>
</template>

<style scoped>
.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: clamp(19rem, 44vw, 24rem);
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 28%, transparent);
  background:
    radial-gradient(ellipse 70% 55% at 50% 38%, color-mix(in srgb, var(--color-brand-primary) 24%, transparent), transparent 65%),
    linear-gradient(160deg, #1a2438 0%, #121a28 55%, #0e1622 100%);
  color: #5eead4;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
  animation-delay: 120ms;
}

.hero-visual__glow {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.07) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(circle at 50% 42%, #000 18%, transparent 72%);
  pointer-events: none;
}

.hero-visual__ring {
  position: absolute;
  left: 50%;
  top: 46%;
  border-radius: 50%;
  border: 1px solid rgba(94, 234, 212, 0.16);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hero-visual__ring--outer {
  width: min(72%, 17rem);
  aspect-ratio: 1;
  animation: spin-slow 28s linear infinite;
}

.hero-visual__ring--inner {
  width: min(48%, 11.5rem);
  aspect-ratio: 1;
  border-style: dashed;
  opacity: 0.7;
  animation: spin-slow 18s linear infinite reverse;
}

.hero-visual__lines {
  position: absolute;
  inset: 8% 6%;
  width: auto;
  height: auto;
}

.hero-visual__hub {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: min(11rem, 46%);
  aspect-ratio: 1;
  border-radius: var(--radius-full);
  border: 1px solid color-mix(in srgb, #5eead4 45%, transparent);
  background: color-mix(in srgb, #0d9488 20%, #171f2f);
  box-shadow:
    0 0 0 8px rgba(20, 184, 166, 0.08),
    0 0 48px color-mix(in srgb, #14b8a6 22%, transparent);
}

.hero-visual__hub span {
  color: #f8fafc;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  padding: 0.5rem;
}

.hero-visual ul {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: none;
}

.hero-visual li {
  position: absolute;
  padding: 0.4rem 0.7rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: var(--radius-md);
  background: rgba(18, 26, 43, 0.9);
  color: #e2e8f0;
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  white-space: nowrap;
  backdrop-filter: blur(6px);
  animation: node-float 5.5s var(--ease-in-out) infinite;
  animation-delay: calc(var(--i) * 0.35s);
}

.hero-visual li:nth-child(1) { top: 12%; left: 7%; }
.hero-visual li:nth-child(2) { top: 5%; left: 50%; transform: translateX(-50%); }
.hero-visual li:nth-child(3) { top: 12%; right: 7%; }
.hero-visual li:nth-child(4) { top: 48%; left: 3%; }
.hero-visual li:nth-child(5) { top: 48%; right: 3%; }
.hero-visual li:nth-child(6) { bottom: 14%; left: 50%; transform: translateX(-50%); }

.hero-visual__metrics {
  position: absolute;
  bottom: 0.9rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.85rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(11, 18, 32, 0.72);
  color: #94a3b8;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  backdrop-filter: blur(8px);
}

@keyframes spin-slow {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes node-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -4px;
  }
}

@media (max-width: 429px) {
  .hero-visual li:nth-child(4),
  .hero-visual li:nth-child(5) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-visual,
  .hero-visual__ring,
  .hero-visual li {
    animation: none;
  }
}
</style>
