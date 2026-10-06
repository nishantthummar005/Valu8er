<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

onMounted(() => {
  theme.init()
})
</script>

<template>
  <v-app class="bg-glow">
    <a class="skip-link" href="#main">Skip to content</a>
    <router-view />
  </v-app>
</template>
