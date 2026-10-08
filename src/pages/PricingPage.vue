<script setup lang="ts">
import PricingComparison from '@/components/pricing/PricingComparison.vue'
import PricingFaq from '@/components/pricing/PricingFaq.vue'
import PricingFinalCta from '@/components/pricing/PricingFinalCta.vue'
import PricingHero from '@/components/pricing/PricingHero.vue'
import PricingPlans from '@/components/pricing/PricingPlans.vue'
</script>

<template>
  <div class="pricing-page">
    <PricingHero />
    <PricingPlans />
    <PricingComparison />
    <PricingFaq />
    <PricingFinalCta />
  </div>
</template>

<style scoped>
.pricing-page {
  overflow-x: clip;
}
</style>
