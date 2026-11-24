<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const authStore = useAuthStore()

function syncAuthFromStorage() {
  const storedUser = localStorage.getItem('valu8er_auth_user')
  if (!storedUser && authStore.user) {
    authStore.clearSession()
  }
}

onMounted(() => {
  theme.init()
  window.addEventListener('storage', syncAuthFromStorage)
  window.addEventListener('focus', syncAuthFromStorage)
})

onUnmounted(() => {
  window.removeEventListener('storage', syncAuthFromStorage)
  window.removeEventListener('focus', syncAuthFromStorage)
})
</script>

<template>
  <v-app class="bg-glow">
    <a class="skip-link" href="#main">Skip to content</a>
    <router-view />
  </v-app>
</template>
