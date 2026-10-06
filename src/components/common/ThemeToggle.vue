<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <AppButton
    variant="icon"
    :icon="theme.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    :label="theme.isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="theme.toggle()"
  />
</template>
