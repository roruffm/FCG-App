import { useEffect, useRef, useState } from 'react'
import { TopBar } from '../components/TopBar'
import { church } from '../data/church'

/**
 * Leitungsdashboard.
 *
 * Das Dashboard laeuft ausserhalb dieser App. Es wird eingebettet, damit man
 * die App nicht verlassen muss - viele Seiten verbieten das Einbetten aber.
 * Deshalb steht der Weg im neuen Tab immer sichtbar darueber, und bleibt der
 * Rahmen leer, sagt die Seite das auch.
 */
export function Leitung() {
  const [geladen, setGeladen] = useState(false)
  const [wartetLange, setWartetLange] = useState(false)
  const rahmen = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setWartetLange(true), 6000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <TopBar title="Leitungsdashboard" subtitle="Reporting der Gemeinde" back />
      <div className="page">
        <div className="card">
          <p className="small" style={{ marginTop: 0 }}>
            Zahlen und Auswertungen für die Gemeindeleitung - Gottesdienstbesuch, Gruppen, Mitarbeit
            und Entwicklung über die Zeit.
          </p>
          <a
            className="btn btn--primary btn--block"
            href={church.web.leitungsdashboard}
            target="_blank"
            rel="noreferrer noopener"
          >
            Dashboard in neuem Tab öffnen ↗
          </a>
          <p className="tiny muted" style={{ margin: '10px 0 0' }}>
            Wer darauf zugreifen darf, regelt das Dashboard selbst - diese App kennt keine Anmeldung.
          </p>
        </div>

        <section className="section">
          <div className="section__head">
            <h2>Vorschau</h2>
            {!geladen && wartetLange && <span className="tiny muted">lädt nicht</span>}
          </div>

          {!geladen && wartetLange && (
            <div className="notice small">
              Das Dashboard lässt sich hier offenbar nicht einbetten - das ist bei vielen Seiten so
              eingestellt. Nimm den Knopf oben, dann öffnet es sich direkt.
            </div>
          )}

          <div className="einbettung">
            <iframe
              ref={rahmen}
              src={church.web.leitungsdashboard}
              title="Leitungsdashboard der FCG Frankfurt"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onLoad={() => setGeladen(true)}
            />
          </div>
        </section>
      </div>
    </>
  )
}
