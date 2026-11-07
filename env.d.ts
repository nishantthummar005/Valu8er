/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'vuetify/styles'

declare module '*.svg' {
  const src: string
  export default src
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
      initBadgeWidget?: (options: Record<string, any>) => void
      initInlineWidget?: (options: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

export {}

