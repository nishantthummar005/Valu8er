<script setup lang="ts">
import AboutApproach from '@/components/about/AboutApproach.vue'
import AboutAudience from '@/components/about/AboutAudience.vue'
import AboutDecisionModel from '@/components/about/AboutDecisionModel.vue'
import AboutFinalCta from '@/components/about/AboutFinalCta.vue'
import AboutHero from '@/components/about/AboutHero.vue'
import AboutIdea from '@/components/about/AboutIdea.vue'
import AboutIdentity from '@/components/about/AboutIdentity.vue'
import AboutPrinciples from '@/components/about/AboutPrinciples.vue'
import AboutProduct from '@/components/about/AboutProduct.vue'
import AboutStatement from '@/components/about/AboutStatement.vue'
import AboutVision from '@/components/about/AboutVision.vue'
import AboutWhy from '@/components/about/AboutWhy.vue'
</script>

<template>
  <div class="about-page">
    <AboutHero />
    <AboutIdea />
    <AboutWhy />
    <AboutApproach />
    <AboutProduct />
    <AboutPrinciples />
    <AboutAudience />
    <AboutDecisionModel />
    <AboutVision />
    <AboutIdentity />
    <AboutStatement />
    <AboutFinalCta />
  </div>
</template>

<style scoped>
.about-page {
  overflow-x: clip;
}
</style>
