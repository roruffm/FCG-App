import { applyBrand, brandPresets } from '../lib/branding'
import type { Brand } from '../lib/branding'

type Props = { brand: Brand; setBrand: (b: Brand) => void; onClose: () => void }

export function BrandSheet({ brand, setBrand, onClose }: Props) {
  function update(next: Brand) {
    setBrand(next)
    applyBrand(next)
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label="Corporate Design" onClick={onClose}>
      <div className="sheet__panel" onClick={(e) => e.stopPropagation()}>
        <div className="spread" style={{ marginBottom: 12 }}>
          <h2>Corporate Design</h2>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>Fertig</button>
        </div>

        <p className="small muted">
          Die App liest alle Farben aus Variablen. Stellt hier ein, was zum Erscheinungsbild der FCG
          passt - die Änderung wirkt sofort auf allen Seiten und bleibt auf diesem Gerät gespeichert.
        </p>

        <div className="swatches" style={{ margin: '14px 0' }}>
          {brandPresets.map((p) => (
            <button
              key={p.id}
              className="swatch"
              aria-pressed={brand.primary === p.brand.primary && brand.accent === p.brand.accent}
              onClick={() => update(p.brand)}
            >
              <div
                className="swatch__bar"
                style={{ background: `linear-gradient(135deg, ${p.brand.primary} 60%, ${p.brand.accent} 60%)` }}
              />
              <span className="tiny">{p.name}</span>
            </button>
          ))}
        </div>

        <hr className="divider" />

        <label className="label" style={{ marginTop: 12 }}>Eigene Farben</label>
        <div className="stack">
          <div className="color-row">
            <input
              type="color"
              value={brand.primary}
              onChange={(e) => update({ ...brand, primary: e.target.value })}
              aria-label="Primärfarbe"
            />
            <div>
              <b className="small">Primärfarbe</b>
              <div className="tiny muted">Kopfbereich, Buttons, Flächen · {brand.primary}</div>
            </div>
          </div>
          <div className="color-row">
            <input
              type="color"
              value={brand.accent}
              onChange={(e) => update({ ...brand, accent: e.target.value })}
              aria-label="Akzentfarbe"
            />
            <div>
              <b className="small">Akzentfarbe</b>
              <div className="tiny muted">Hervorhebungen, aktive Navigation · {brand.accent}</div>
            </div>
          </div>
        </div>

        <p className="tiny muted" style={{ marginTop: 14 }}>
          Für die endgültige Fassung braucht es die verbindlichen Markenwerte (Hex-Codes, Schrift, Logo
          als SVG). Dann werden sie hier als Standard hinterlegt.
        </p>
      </div>
    </div>
  )
}
