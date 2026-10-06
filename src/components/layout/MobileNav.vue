<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <div class="mobile-nav">
    <ThemeToggle />
    <AppButton
      variant="icon"
      :icon="open ? 'mdi-close' : 'mdi-menu'"
      :label="open ? 'Close navigation' : 'Open navigation'"
      :aria-expanded="open"
      aria-controls="mobile-nav-drawer"
      @click="emit('toggle')"
    />
  </div>
</template>

<style scoped>
.mobile-nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-left: auto;
}

</style>
