<script setup lang="ts">
import AudienceSolutions from '@/components/home/AudienceSolutions.vue'
import ConnectedSystem from '@/components/home/ConnectedSystem.vue'
import FinalCta from '@/components/home/FinalCta.vue'
import GettingStarted from '@/components/home/GettingStarted.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import ImpactStats from '@/components/home/ImpactStats.vue'
import PillarShowcase from '@/components/home/PillarShowcase.vue'
import ProblemSolution from '@/components/home/ProblemSolution.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import TimeRecovery from '@/components/home/TimeRecovery.vue'
</script>

<template>
  <div class="home-page">
    <!-- 1. Hero -->
    <HomeHero />
    <!-- 2. Hidden cost / problem -->
    <ProblemSolution />
    <!-- 3. Where the hours go -->
    <TimeRecovery />
    <!-- 4. One connected system -->
    <ConnectedSystem />
    <!-- 5. Everything modern teams need -->
    <PillarShowcase />
    <!-- 6. Built for every practice shape -->
    <AudienceSolutions />
    <!-- 7. Getting started / migration -->
    <GettingStarted />
    <!-- 8. Testimonials -->
    <TestimonialsSection />
    <!-- 9. Impact stats -->
    <ImpactStats />
    <!-- 10. Final CTA -->
    <FinalCta />
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: clip;
}
</style>
