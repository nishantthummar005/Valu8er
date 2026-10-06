import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { vuetifyThemes } from '@/themes/vuetify-themes'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: vuetifyThemes,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: {
      style: 'text-transform: none; letter-spacing: 0.01em;',
      rounded: 'md',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      color: 'primary',
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      color: 'primary',
    },
    VCheckbox: {
      color: 'primary',
      hideDetails: 'auto',
    },
    VRadio: {
      color: 'primary',
    },
    VSwitch: {
      color: 'primary',
      hideDetails: 'auto',
      inset: true,
    },
    VCard: {
      elevation: 0,
      rounded: 'lg',
    },
    VTooltip: {
      location: 'top',
    },
    VAlert: {
      variant: 'tonal',
      rounded: 'lg',
    },
    VDialog: {
      scrim: true,
    },
  },
})
