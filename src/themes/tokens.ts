export const brand = {
  deep: '#0B6E6A',
  primary: '#0D9488',
  bright: '#14B8A6',
  highlight: '#5EEAD4',
} as const

export const semantic = {
  success: { light: '#15803D', dark: '#34D399' },
  warning: { light: '#B45309', dark: '#FBBF24' },
  error: { light: '#B91C1C', dark: '#F87171' },
  info: { light: '#1D4ED8', dark: '#60A5FA' },
} as const

export const lightSurfaces = {
  background: '#F4F6F9',
  surface: '#FFFFFF',
  surfaceMuted: '#E8EDF3',
  surfaceElevated: '#FFFFFF',
  surfaceInverse: '#0B1220',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textInverse: '#F8FAFC',
  border: 'rgba(15, 23, 42, 0.08)',
  borderStrong: 'rgba(15, 23, 42, 0.14)',
  overlay: 'rgba(11, 18, 32, 0.48)',
  glow: 'rgba(13, 148, 136, 0.14)',
  ring: 'rgba(13, 148, 136, 0.28)',
} as const

export const darkSurfaces = {
  background: '#0B1220',
  surface: '#121A2B',
  surfaceMuted: '#0E1624',
  surfaceElevated: '#1A2438',
  surfaceInverse: '#F4F6F9',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#7B8A9E',
  textInverse: '#0F172A',
  border: 'rgba(148, 163, 184, 0.12)',
  borderStrong: 'rgba(148, 163, 184, 0.22)',
  overlay: 'rgba(2, 6, 23, 0.64)',
  glow: 'rgba(45, 212, 191, 0.10)',
  ring: 'rgba(45, 212, 191, 0.36)',
} as const

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const

export const radius = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const

export const breakpoints = {
  xs: 320,
  sm: 375,
  md: 430,
  tablet: 768,
  desktop: 1024,
  nav: 1200,
  lg: 1280,
  xl: 1440,
  xxl: 1600,
} as const

export const containers = {
  sm: '40rem',
  md: '60rem',
  lg: '70rem',
  xl: '80rem',
  xxl: '90rem',
} as const

export const shadows = {
  light: {
    none: 'none',
    xs: '0 1px 2px rgba(15, 23, 42, 0.04)',
    sm: '0 2px 8px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.04)',
    md: '0 8px 24px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)',
    lg: '0 16px 40px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)',
  },
  dark: {
    none: 'none',
    xs: '0 0 0 1px rgba(148, 163, 184, 0.08)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.22)',
    md: '0 8px 24px rgba(0, 0, 0, 0.28)',
    lg: '0 16px 40px rgba(0, 0, 0, 0.36)',
  },
} as const

export const motion = {
  easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeInOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
  durationFast: '140ms',
  durationBase: '220ms',
  durationSlow: '360ms',
} as const

export const typography = {
  family:
    '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", "Segoe UI", sans-serif',
  display: { size: '3rem', line: '1.15', weight: '700', tracking: '-0.03em' },
  h1: { size: '2.25rem', line: '1.2', weight: '700', tracking: '-0.025em' },
  h2: { size: '1.75rem', line: '1.25', weight: '650', tracking: '-0.02em' },
  h3: { size: '1.375rem', line: '1.3', weight: '600', tracking: '-0.015em' },
  h4: { size: '1.125rem', line: '1.4', weight: '600', tracking: '-0.01em' },
  bodyLarge: { size: '1.125rem', line: '1.6', weight: '400', tracking: '0' },
  body: { size: '0.9375rem', line: '1.6', weight: '400', tracking: '0' },
  bodySmall: { size: '0.8125rem', line: '1.55', weight: '400', tracking: '0' },
  caption: { size: '0.75rem', line: '1.4', weight: '500', tracking: '0.01em' },
  label: { size: '0.8125rem', line: '1.4', weight: '550', tracking: '0.01em' },
  button: { size: '0.875rem', line: '1.25', weight: '600', tracking: '0.01em' },
} as const

export type ThemeMode = 'light' | 'dark'

export function cssVariables(mode: ThemeMode): Record<string, string> {
  const surfaces = mode === 'dark' ? darkSurfaces : lightSurfaces
  const elevation = mode === 'dark' ? shadows.dark : shadows.light
  const success = mode === 'dark' ? semantic.success.dark : semantic.success.light
  const warning = mode === 'dark' ? semantic.warning.dark : semantic.warning.light
  const error = mode === 'dark' ? semantic.error.dark : semantic.error.light
  const info = mode === 'dark' ? semantic.info.dark : semantic.info.light

  return {
    '--color-brand-deep': brand.deep,
    '--color-brand-primary': brand.primary,
    '--color-brand-bright': brand.bright,
    '--color-brand-highlight': brand.highlight,
    '--color-bg': surfaces.background,
    '--color-surface': surfaces.surface,
    '--color-surface-muted': surfaces.surfaceMuted,
    '--color-surface-elevated': surfaces.surfaceElevated,
    '--color-surface-inverse': surfaces.surfaceInverse,
    '--color-text': surfaces.text,
    '--color-text-secondary': surfaces.textSecondary,
    '--color-text-muted': surfaces.textMuted,
    '--color-text-inverse': surfaces.textInverse,
    '--color-border': surfaces.border,
    '--color-border-strong': surfaces.borderStrong,
    '--color-overlay': surfaces.overlay,
    '--color-glow': surfaces.glow,
    '--color-ring': surfaces.ring,
    '--color-success': success,
    '--color-warning': warning,
    '--color-error': error,
    '--color-info': info,
    '--shadow-xs': elevation.xs,
    '--shadow-sm': elevation.sm,
    '--shadow-md': elevation.md,
    '--shadow-lg': elevation.lg,
    '--radius-xs': radius.xs,
    '--radius-sm': radius.sm,
    '--radius-md': radius.md,
    '--radius-lg': radius.lg,
    '--radius-xl': radius.xl,
    '--radius-2xl': radius['2xl'],
    '--radius-full': radius.full,
    '--space-1': spacing[1],
    '--space-2': spacing[2],
    '--space-3': spacing[3],
    '--space-4': spacing[4],
    '--space-5': spacing[5],
    '--space-6': spacing[6],
    '--space-8': spacing[8],
    '--space-10': spacing[10],
    '--space-12': spacing[12],
    '--space-16': spacing[16],
    '--space-20': spacing[20],
    '--space-24': spacing[24],
    '--container-sm': containers.sm,
    '--container-md': containers.md,
    '--container-lg': containers.lg,
    '--container-xl': containers.xl,
    '--container-xxl': containers.xxl,
    '--bp-nav': `${breakpoints.nav}px`,
    '--ease-out': motion.easeOut,
    '--ease-in-out': motion.easeInOut,
    '--duration-fast': motion.durationFast,
    '--duration-base': motion.durationBase,
    '--duration-slow': motion.durationSlow,
    '--font-sans': typography.family,
  }
}

export function applyCssVariables(mode: ThemeMode, root: HTMLElement = document.documentElement) {
  const vars = cssVariables(mode)
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  root.dataset.theme = mode
  root.style.colorScheme = mode
}
