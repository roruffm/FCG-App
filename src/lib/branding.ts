/**
 * Markenfarben zur Laufzeit.
 *
 * Standard ist das Corporate Design der FCG Frankfurt: Petrol #006269 als
 * Hausfarbe, Dunkelpetrol #00444B fuer Flaechen, Mint #D8E3E4 als heller
 * Begleiter (Werte aus dem Stylesheet von fcg-frankfurt.de). Die Oberflaeche
 * liest alle Farben aus CSS-Variablen, deshalb laesst sich das Schema ohne
 * neuen Build umstellen - hilfreich, solange Varianten abgestimmt werden.
 */

export type Brand = {
  primary: string
  accent: string
  /** Optionale Festwerte; ohne Angabe werden Ab- und Aufhellungen berechnet. */
  primaryDark?: string
  primaryLight?: string
  accentLight?: string
}

export const brandPresets: { id: string; name: string; brand: Brand }[] = [
  {
    id: 'fcg',
    name: 'FCG Frankfurt',
    brand: {
      primary: '#006269',
      accent: '#006269',
      primaryDark: '#00444b',
      primaryLight: '#0a848c',
      accentLight: '#9fd4d8',
    },
  },
  { id: 'petrol-mint', name: 'Petrol & Mint', brand: { primary: '#00444b', accent: '#0a9aa3', accentLight: '#d8e3e4' } },
  { id: 'nacht', name: 'Nachtblau & Gold', brand: { primary: '#16233d', accent: '#c98a1e' } },
  { id: 'anthrazit', name: 'Anthrazit & Koralle', brand: { primary: '#1d2126', accent: '#e2683f' } },
  { id: 'indigo', name: 'Indigo & Türkis', brand: { primary: '#252056', accent: '#1f9c94' } },
]

export const defaultBrand: Brand = brandPresets[0].brand

function clamp(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function parse(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [
    parseInt(full.slice(0, 2), 16) || 0,
    parseInt(full.slice(2, 4), 16) || 0,
    parseInt(full.slice(4, 6), 16) || 0,
  ]
}

function toHex(rgb: [number, number, number]): string {
  return '#' + rgb.map((v) => clamp(v).toString(16).padStart(2, '0')).join('')
}

/** amount > 0 hellt auf, amount < 0 dunkelt ab (jeweils Richtung Weiss/Schwarz). */
export function shade(hex: string, amount: number): string {
  const [r, g, b] = parse(hex)
  const target = amount > 0 ? 255 : 0
  const t = Math.abs(amount)
  return toHex([r + (target - r) * t, g + (target - g) * t, b + (target - b) * t])
}

export function applyBrand(brand: Brand): void {
  const root = document.documentElement.style
  root.setProperty('--primary', brand.primary)
  root.setProperty('--primary-dark', brand.primaryDark ?? shade(brand.primary, -0.35))
  root.setProperty('--primary-light', brand.primaryLight ?? shade(brand.primary, 0.22))
  root.setProperty('--accent-strong', shade(brand.accent, -0.12))
  root.setProperty('--accent-mid', brand.accent)
  root.setProperty('--accent-light', brand.accentLight ?? shade(brand.accent, 0.35))

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', brand.primary)
}
