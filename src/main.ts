import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'
import { applyCssVariables } from './themes/tokens'

import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/outfit'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.scss'

const stored = localStorage.getItem('valu8er-theme')
const initialTheme =
  stored === 'dark' || stored === 'light'
    ? stored
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
applyCssVariables(initialTheme)

const app = createApp(App)
registerPlugins(app)
app.mount('#app')
