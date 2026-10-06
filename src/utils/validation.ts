export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export type PasswordStrength = 'empty' | 'weak' | 'fair' | 'good' | 'strong'

export function passwordStrength(value: string): PasswordStrength {
  if (!value) return 'empty'

  const length = value.length
  const variety = [
    /[a-z]/.test(value),
    /[A-Z]/.test(value),
    /\d/.test(value),
    /[^A-Za-z0-9]/.test(value),
  ].filter(Boolean).length

  if (length < 8 || variety < 2) return 'weak'
  if (length < 10 || variety < 3) return 'fair'
  if (length < 12 || variety < 4) return 'good'
  return 'strong'
}

export function strengthScore(level: PasswordStrength) {
  if (level === 'weak') return 1
  if (level === 'fair') return 2
  if (level === 'good') return 3
  if (level === 'strong') return 4
  return 0
}
