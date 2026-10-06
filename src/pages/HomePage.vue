<script setup lang="ts">
import AnalyticsShowcase from '@/components/home/AnalyticsShowcase.vue'
import AudienceSolutions from '@/components/home/AudienceSolutions.vue'
import CapabilityGrid from '@/components/home/CapabilityGrid.vue'
import FinalCta from '@/components/home/FinalCta.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import ProblemSolution from '@/components/home/ProblemSolution.vue'
import ProductShowcase from '@/components/home/ProductShowcase.vue'
import TrustStrip from '@/components/home/TrustStrip.vue'
import ValuationVisualization from '@/components/home/ValuationVisualization.vue'
import WorkflowSection from '@/components/home/WorkflowSection.vue'
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <TrustStrip />
    <ProblemSolution />
    <ProductShowcase />
    <CapabilityGrid />
    <ValuationVisualization />
    <WorkflowSection />
    <AnalyticsShowcase />
    <AudienceSolutions />
    <FinalCta />
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: clip;
}
</style>
