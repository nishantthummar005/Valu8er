<script setup lang="ts">
import ContactForm from '@/components/contact/ContactForm.vue'
import ContactProductPanel from '@/components/contact/ContactProductPanel.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
</script>

<template>
  <AppSection>
    <AppContainer size="xl">
      <div class="form-section">
        <ContactProductPanel />
        <ContactForm />
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.form-section {
  display: grid;
  gap: var(--space-5);
  align-items: start;
}

@media (min-width: 1024px) {
  .form-section {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: var(--space-6);
  }
}
</style>
