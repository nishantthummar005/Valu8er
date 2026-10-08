<script setup lang="ts">
withDefaults(
  defineProps<{
    tight?: boolean
    /** Section surface tone for alternating page rhythm */
    tone?: 'default' | 'muted' | 'surface' | 'soft'
  }>(),
  {
    tight: false,
    tone: 'default',
  },
)
</script>

<template>
  <section
    class="app-section"
    :class="[
      tight && 'app-section--tight',
      tone !== 'default' && `app-section--${tone}`,
    ]"
  >
    <slot />
  </section>
</template>

<style scoped>
.app-section {
  position: relative;
  isolation: isolate;
}

.app-section--muted,
.app-section--surface,
.app-section--soft {
  overflow: hidden;
}

/* Soft cool band — white cards sit on this */
.app-section--muted {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 55%, var(--color-surface-muted)) 0%, var(--color-surface-muted) 100%);
}

/* Clean white / elevated band */
.app-section--surface {
  background: var(--color-surface);
  border-block: 1px solid color-mix(in srgb, var(--color-border) 65%, transparent);
}

/* Atmospheric tinted band with grid + glow */
.app-section--soft {
  background:
    radial-gradient(circle at 50% -10%, var(--color-glow), transparent 42%),
    radial-gradient(circle at 90% 80%, color-mix(in srgb, var(--color-brand-primary) 8%, transparent), transparent 36%),
    linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface-muted) 100%);
}

.app-section--soft::before,
.app-section--muted::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.45;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(180deg, #000 10%, transparent 88%);
}

.app-section > :deep(*) {
  position: relative;
  z-index: 1;
}

[data-theme='dark'] .app-section--muted {
  background:
    linear-gradient(180deg, #151d2c 0%, #121a28 100%);
}

[data-theme='dark'] .app-section--surface {
  background: #171f2f;
  border-block-color: rgba(148, 163, 184, 0.1);
}

[data-theme='dark'] .app-section--soft {
  background:
    radial-gradient(circle at 50% -8%, rgba(45, 212, 191, 0.14), transparent 40%),
    radial-gradient(circle at 88% 70%, rgba(13, 148, 136, 0.08), transparent 34%),
    linear-gradient(180deg, #121a28 0%, #0f1624 100%);
}

[data-theme='dark'] .app-section--soft::before,
[data-theme='dark'] .app-section--muted::before {
  opacity: 0.28;
}
</style>
