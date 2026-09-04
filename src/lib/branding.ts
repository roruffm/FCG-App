/**
 * Markenfarben zur Laufzeit.
 *
 * Die Oberflaeche liest ihre Farben ausschliesslich aus CSS-Variablen. Dadurch
 * laesst sich das Corporate Design ohne neuen Build umstellen - praktisch fuer
 * die Abstimmung in der Gemeindeleitung. Sobald die verbindlichen Markenwerte
 * feststehen, werden sie hier als Standard eingetragen.
 */

export type Brand = { primary: string; accent: string }

export const brandPresets: { id: string; name: string; brand: Brand }[] = [
  { id: 'nacht', name: 'Nachtblau & Gold', brand: { primary: '#16233d', accent: '#c98a1e' } },
  { id: 'anthrazit', name: 'Anthrazit & Koralle', brand: { primary: '#1d2126', accent: '#e2683f' } },
  { id: 'petrol', name: 'Petrol & Sand', brand: { primary: '#12403f', accent: '#c98f52' } },
  { id: 'indigo', name: 'Indigo & Türkis', brand: { primary: '#252056', accent: '#1f9c94' } },
  { id: 'bordeaux', name: 'Bordeaux & Messing', brand: { primary: '#3a1524', accent: '#b8873c' } },
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
  root.setProperty('--primary-dark', shade(brand.primary, -0.35))
  root.setProperty('--primary-light', shade(brand.primary, 0.22))
  root.setProperty('--accent-strong', shade(brand.accent, -0.18))
  root.setProperty('--accent-mid', brand.accent)
  root.setProperty('--accent-light', shade(brand.accent, 0.35))

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', brand.primary)
}
