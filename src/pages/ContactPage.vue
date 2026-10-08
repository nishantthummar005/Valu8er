<script setup lang="ts">
import ContactFaq from '@/components/contact/ContactFaq.vue'
import ContactFinalCta from '@/components/contact/ContactFinalCta.vue'
import ContactFormSection from '@/components/contact/ContactFormSection.vue'
import ContactHero from '@/components/contact/ContactHero.vue'
import ContactOptions from '@/components/contact/ContactOptions.vue'
import ContactProcess from '@/components/contact/ContactProcess.vue'
import ContactResources from '@/components/contact/ContactResources.vue'
</script>

<template>
  <div class="contact-page">
    <ContactHero />
    <ContactOptions />
    <ContactFormSection />
    <ContactProcess />
    <ContactResources />
    <ContactFaq />
    <ContactFinalCta />
  </div>
</template>

<style scoped>
.contact-page {
  overflow-x: clip;
}
</style>
