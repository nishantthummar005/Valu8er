<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppPageHeader from '@/components/ui/AppPageHeader.vue'
import AppSection from '@/components/ui/AppSection.vue'

const route = useRoute()

const title = computed(() => String(route.meta.title ?? 'Page'))
const eyebrow = computed(() => String(route.meta.eyebrow ?? 'Valu8er'))
</script>

<template>
  <div class="placeholder-page">
    <AppContainer>
      <AppSection>
        <AppPageHeader
          :eyebrow="eyebrow"
          :title="title"
          description="This is a navigation placeholder. Page content will be designed in a later step."
        />
      </AppSection>
    </AppContainer>
  </div>
</template>
