<template>
  <button @click="openCalendly" class="calendly-btn" type="button">
    <v-icon icon="mdi-calendar-check" size="20" class="btn-icon" />
    <span>{{ label || 'Schedule a Meeting' }}</span>
  </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Schedule a Meeting',
  },
)

onMounted(() => {
  // 1. Load Calendly CSS (if not already loaded)
  if (!document.querySelector('link[href*="calendly"]')) {
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }

  // 2. Load Calendly Script (if not already loaded)
  if (!document.querySelector('script[src*="calendly"]')) {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
  }
})

const openCalendly = () => {
  // Make sure the script has finished loading before triggering
  if (window.Calendly) {
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/rim-valexp/valu8er-demo-1pm-est',
    })
  } else {
    // Fallback if the user clicks too fast before the script loads
    alert('Booking system is loading, please try again in a second.')
  }
}
</script>

<style scoped>
.calendly-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.85rem;
  background: linear-gradient(135deg, #0D9488 0%, #0284C7 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(13, 148, 136, 0.35);
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.calendly-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(13, 148, 136, 0.45);
  background: linear-gradient(135deg, #0F766E 0%, #0369A1 100%);
}

.calendly-btn:active {
  transform: translateY(0);
}

.btn-icon {
  flex-shrink: 0;
}
</style>
