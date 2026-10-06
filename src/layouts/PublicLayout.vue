<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'

const route = useRoute()

watch(
  () => route.meta.title,
  (title) => {
    document.title = title ? `${String(title)} — Valu8er` : 'Valu8er'
  },
  { immediate: true },
)
</script>

<template>
  <AppShell>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </AppShell>
</template>
