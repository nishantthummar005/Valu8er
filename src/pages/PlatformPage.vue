<script setup lang="ts">
import PlatformCapabilities from '@/components/platform/PlatformCapabilities.vue'
import PlatformDashboardHero from '@/components/platform/PlatformDashboardHero.vue'
import PlatformDataSources from '@/components/platform/PlatformDataSources.vue'
import PlatformEcosystem from '@/components/platform/PlatformEcosystem.vue'
import PlatformFinalCta from '@/components/platform/PlatformFinalCta.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import PlatformInsights from '@/components/platform/PlatformInsights.vue'
import PlatformProblemSolution from '@/components/platform/PlatformProblemSolution.vue'
import PlatformValuationReasoning from '@/components/platform/PlatformValuationReasoning.vue'
import PlatformWorkflowShowcase from '@/components/platform/PlatformWorkflowShowcase.vue'
</script>

<template>
  <div class="platform-page">
    <PlatformHero />
    <PlatformDashboardHero />
    <PlatformProblemSolution />
    <PlatformWorkflowShowcase />
    <PlatformCapabilities />
    <PlatformEcosystem />
    <PlatformValuationReasoning />
    <PlatformDataSources />
    <PlatformInsights />
    <PlatformFinalCta />
  </div>
</template>

<style scoped>
.platform-page {
  overflow-x: clip;
}
</style>
