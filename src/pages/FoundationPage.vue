<script setup lang="ts">
import { ref } from 'vue'
import { customIconNames } from '@/assets/icons/customIcons'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppAutocomplete from '@/components/ui/AppAutocomplete.vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppDialog from '@/components/ui/AppDialog.vue'
import AppDivider from '@/components/ui/AppDivider.vue'
import AppEmptyState from '@/components/ui/AppEmptyState.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppPageHeader from '@/components/ui/AppPageHeader.vue'
import AppRadio from '@/components/ui/AppRadio.vue'
import AppSearch from '@/components/ui/AppSearch.vue'
import AppSection from '@/components/ui/AppSection.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import AppStatCard from '@/components/ui/AppStatCard.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import AppTabs from '@/components/ui/AppTabs.vue'
import AppTextarea from '@/components/ui/AppTextarea.vue'
import AppTooltip from '@/components/ui/AppTooltip.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { brand, darkSurfaces, lightSurfaces, semantic } from '@/themes/tokens'

const { name: breakpoint } = useBreakpoints()

const textValue = ref('')
const passwordValue = ref('')
const selectValue = ref<string | number | null>(null)
const autoValue = ref<string | number | null>(null)
const areaValue = ref('')
const searchValue = ref('')
const checkValue = ref(true)
const radioValue = ref<string | number | null>('range')
const switchValue = ref(true)
const tabValue = ref('controls')
const dialogOpen = ref(false)
const loadingDemo = ref(false)

const colorSwatches = [
  { name: 'Deep turquoise', value: brand.deep },
  { name: 'Primary turquoise', value: brand.primary },
  { name: 'Bright turquoise', value: brand.bright },
  { name: 'Highlight', value: brand.highlight },
  { name: 'Success', value: semantic.success.light },
  { name: 'Warning', value: semantic.warning.light },
  { name: 'Error', value: semantic.error.light },
  { name: 'Info', value: semantic.info.light },
]

const surfaceSwatches = [
  { name: 'Light background', value: lightSurfaces.background },
  { name: 'Light surface', value: lightSurfaces.surface },
  { name: 'Dark navy', value: darkSurfaces.background },
  { name: 'Dark surface', value: darkSurfaces.surface },
  { name: 'Elevated dark', value: darkSurfaces.surfaceElevated },
  { name: 'Muted slate', value: lightSurfaces.textSecondary },
]

const typeScale = [
  { name: 'Display', className: 'text-display' },
  { name: 'H1', className: 'text-h1' },
  { name: 'H2', className: 'text-h2' },
  { name: 'H3', className: 'text-h3' },
  { name: 'H4', className: 'text-h4' },
  { name: 'Body Large', className: 'text-body-lg' },
  { name: 'Body', className: 'text-body' },
  { name: 'Body Small', className: 'text-body-sm' },
  { name: 'Caption', className: 'text-caption' },
  { name: 'Label', className: 'text-label' },
  { name: 'Button', className: 'text-button' },
]

function simulateLoad() {
  loadingDemo.value = true
  window.setTimeout(() => {
    loadingDemo.value = false
  }, 1200)
}
</script>

<template>
  <div class="foundation-page">
    <AppContainer>
      <AppSection tight>
        <AppPageHeader
          eyebrow="Foundation"
          title="Design system"
          description="Tokenized theme, typography, controls, and motion for the product UI. Product pages will be built on this layer later."
        >
          <template #actions>
            <AppBadge tone="brand">Viewport {{ breakpoint }}</AppBadge>
          </template>
        </AppPageHeader>
      </AppSection>

      <AppDivider accent />

      <AppSection tight>
        <div class="app-stack">
          <h2 class="text-h2">Color system</h2>
          <div class="app-grid app-grid--4">
            <AppCard v-for="swatch in colorSwatches" :key="swatch.name" padding="sm">
              <div class="swatch" :style="{ background: swatch.value }" />
              <p class="text-label">{{ swatch.name }}</p>
              <p class="text-caption">{{ swatch.value }}</p>
            </AppCard>
          </div>
          <div class="app-grid app-grid--3">
            <AppCard v-for="swatch in surfaceSwatches" :key="swatch.name" padding="sm">
              <div class="swatch swatch--bordered" :style="{ background: swatch.value }" />
              <p class="text-label">{{ swatch.name }}</p>
              <p class="text-caption">{{ swatch.value }}</p>
            </AppCard>
          </div>
        </div>
      </AppSection>

      <AppSection tight>
        <div class="app-stack">
          <h2 class="text-h2">Typography</h2>
          <AppCard>
            <div class="type-list">
              <div v-for="item in typeScale" :key="item.name" class="type-row">
                <span class="text-caption">{{ item.name }}</span>
                <p :class="item.className">Valuation intelligence</p>
              </div>
            </div>
          </AppCard>
        </div>
      </AppSection>

      <AppSection tight>
        <div class="app-stack">
          <h2 class="text-h2">Buttons</h2>
          <AppCard>
            <div class="chip-row">
              <AppButton>Primary</AppButton>
              <AppButton variant="secondary">Secondary</AppButton>
              <AppButton variant="outline">Outline</AppButton>
              <AppButton variant="ghost">Ghost</AppButton>
              <AppButton variant="text">Text</AppButton>
              <AppButton variant="success">Success</AppButton>
              <AppButton variant="danger">Danger</AppButton>
              <AppTooltip text="Icon-only control">
                <AppButton variant="icon" icon="settings" label="Settings" />
              </AppTooltip>
              <AppButton :loading="loadingDemo" @click="simulateLoad">
                Loading
              </AppButton>
              <AppButton disabled>Disabled</AppButton>
            </div>
          </AppCard>
        </div>
      </AppSection>

      <AppSection tight>
        <div class="app-stack">
          <h2 class="text-h2">Form controls</h2>
          <AppCard>
            <div class="app-grid app-grid--2">
              <AppInput v-model="textValue" label="Company name" placeholder="Acme Holdings" hint="Visible helper text" />
              <AppInput v-model="passwordValue" type="password" label="Secure field" placeholder="Enter passphrase" />
              <AppSelect
                v-model="selectValue"
                label="Method"
                :items="['Income', 'Market', 'Asset']"
                placeholder="Choose a method"
              />
              <AppAutocomplete
                v-model="autoValue"
                label="Sector"
                :items="['Software', 'Healthcare', 'Industrial', 'Financials']"
                placeholder="Start typing"
              />
              <AppSearch v-model="searchValue" label="Search" placeholder="Find a company" />
              <AppInput label="Error state" error="This field needs a value" />
              <AppTextarea v-model="areaValue" label="Notes" placeholder="Add context" />
              <div class="app-stack app-stack--sm">
                <AppCheckbox v-model="checkValue" label="Include adjustments" />
                <v-radio-group v-model="radioValue" hide-details>
                  <AppRadio label="Point estimate" value="point" />
                  <AppRadio label="Range" value="range" />
                </v-radio-group>
                <AppSwitch v-model="switchValue" label="Persist theme" />
                <AppInput label="Disabled" disabled placeholder="Unavailable" />
              </div>
            </div>
          </AppCard>
        </div>
      </AppSection>

      <AppSection tight>
        <div class="app-stack">
          <h2 class="text-h2">Cards</h2>
          <div class="app-grid app-grid--3">
            <AppCard variant="standard">
              <h3 class="text-h4">Standard</h3>
              <p class="text-body-sm">Quiet surface for grouped content.</p>
            </AppCard>
            <AppCard variant="outlined">
              <h3 class="text-h4">Outlined</h3>
              <p class="text-body-sm">Border-first, no fill emphasis.</p>
            </AppCard>
            <AppCard variant="elevated">
              <h3 class="text-h4">Elevated</h3>
              <p class="text-body-sm">Soft shadow for raised content.</p>
            </AppCard>
            <AppCard variant="feature">
              <h3 class="text-h4">Feature</h3>
              <p class="text-body-sm">Accent edge for highlighted modules.</p>
            </AppCard>
            <AppCard variant="interactive">
              <h3 class="text-h4">Interactive</h3>
              <p class="text-body-sm">Hover lift for selectable blocks.</p>
            </AppCard>
            <AppCard variant="glass">
              <h3 class="text-h4">Glass</h3>
              <p class="text-body-sm">Used sparingly over glow backgrounds.</p>
            </AppCard>
          </div>
          <div class="app-grid app-grid--3">
            <AppStatCard label="Coverage" value="128" delta="+6 this week" icon="company" />
            <AppStatCard label="Reports" value="42" delta="Ready" icon="reports" />
            <AppStatCard label="Confidence" value="92%" delta="Stable" icon="insights" />
          </div>
        </div>
      </AppSection>

      <AppSection tight>
        <div class="app-stack">
          <h2 class="text-h2">Icons</h2>
          <AppCard>
            <div class="icon-grid">
              <div v-for="icon in customIconNames" :key="icon" class="icon-cell">
                <AppIcon :name="icon" :size="22" />
                <span class="text-caption">{{ icon }}</span>
              </div>
            </div>
          </AppCard>
        </div>
      </AppSection>

      <AppSection tight>
        <div class="app-stack">
          <h2 class="text-h2">Feedback</h2>
          <AppTabs
            v-model="tabValue"
            :items="[
              { value: 'controls', label: 'Controls' },
              { value: 'states', label: 'States' },
            ]"
          />
          <div class="app-grid app-grid--2">
            <AppAlert tone="info" title="Information">Theme tokens are centralized and reusable.</AppAlert>
            <AppAlert tone="success" title="Success">Foundation components compiled correctly.</AppAlert>
            <AppAlert tone="warning" title="Warning">Use glass and glow treatments sparingly.</AppAlert>
            <AppAlert tone="error" title="Error">Do not hardcode colors in page components.</AppAlert>
          </div>
          <div class="chip-row">
            <AppBadge>Neutral</AppBadge>
            <AppBadge tone="brand">Brand</AppBadge>
            <AppBadge tone="success">Success</AppBadge>
            <AppBadge tone="warning">Warning</AppBadge>
            <AppBadge tone="error">Error</AppBadge>
            <AppBadge tone="info">Info</AppBadge>
            <AppButton variant="outline" @click="dialogOpen = true">Open dialog</AppButton>
            <AppLoader />
          </div>
          <AppCard>
            <div class="app-stack app-stack--sm">
              <AppSkeleton height="1.25rem" width="40%" />
              <AppSkeleton height="0.9rem" />
              <AppSkeleton height="0.9rem" width="72%" />
            </div>
          </AppCard>
          <AppCard variant="outlined">
            <AppEmptyState
              icon="documents"
              title="No artifacts yet"
              description="Empty states stay quiet and structured."
            >
              <AppButton variant="outline" size="sm">Continue</AppButton>
            </AppEmptyState>
          </AppCard>
        </div>
      </AppSection>
    </AppContainer>

    <AppDialog v-model="dialogOpen" title="Foundation dialog">
      <p class="text-body">
        Dialogs use the card system, visible focus, and theme-aware surfaces.
      </p>
      <template #actions>
        <AppButton variant="ghost" @click="dialogOpen = false">Close</AppButton>
        <AppButton @click="dialogOpen = false">Confirm</AppButton>
      </template>
    </AppDialog>
  </div>
</template>

<style scoped>
.foundation-page {
  padding-bottom: var(--space-16);
}

.swatch {
  height: 3.5rem;
  margin-bottom: var(--space-3);
  border-radius: var(--radius-sm);
}

.swatch--bordered {
  border: 1px solid var(--color-border);
}

.type-list,
.chip-row,
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.type-list {
  display: grid;
  gap: var(--space-4);
}

.type-row {
  display: grid;
  gap: var(--space-1);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.icon-cell {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text);
}

@media (min-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
