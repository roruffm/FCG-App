import { useEffect, useState } from 'react'
import { TopBar } from '../components/TopBar'

/**
 * Diagnoseseite.
 *
 * Eine weisse Seite sieht von aussen bei jeder Ursache gleich aus. Diese Seite
 * macht den Unterschied sichtbar: Welcher Stand laeuft, wer beantwortet die
 * Anfragen, was liegt im Cache, hat der Notstart gegriffen. Ohne diese Angaben
 * bleibt die Fehlersuche Raterei - mit ihnen genuegt ein Bildschirmfoto.
 */
type Zeile = { name: string; wert: string }
type Eintrag = { t: number; art: string; text: string }

export function Diagnose() {
  const [zeilen, setZeilen] = useState<Zeile[]>([])
  const [protokoll, setProtokoll] = useState<Eintrag[]>([])
  const [kopiert, setKopiert] = useState(false)

  useEffect(() => {
    let abgemeldet = false

    async function sammeln() {
      const z: Zeile[] = []

      z.push({ name: 'Baustand', wert: __BAUSTAND__ })
      z.push({ name: 'Adresse', wert: window.location.href })
      z.push({ name: 'Browser', wert: navigator.userAgent })
      z.push({
        name: 'Anzeigemodus',
        wert: window.matchMedia('(display-mode: standalone)').matches ? 'installiert' : 'im Browser',
      })
      z.push({ name: 'Online', wert: navigator.onLine ? 'ja' : 'nein' })

      // Welche Datei traegt die App gerade?
      const skripte = [...document.querySelectorAll('script[src]')]
        .map((s) => (s as HTMLScriptElement).src)
        .filter((s) => s.includes('/assets/'))
      z.push({ name: 'Programmdatei', wert: skripte.join(', ') || '(keine)' })

      // Service Worker
      if ('serviceWorker' in navigator) {
        const steuert = navigator.serviceWorker.controller
        z.push({ name: 'Service Worker steuert', wert: steuert ? 'ja' : 'nein' })
        if (steuert) z.push({ name: 'Dessen Datei', wert: steuert.scriptURL })
        try {
          const regs = await navigator.serviceWorker.getRegistrations()
          z.push({
            name: 'Registrierungen',
            wert:
              regs
                .map((r) => {
                  const teile = [
                    r.active ? 'aktiv' : '',
                    r.waiting ? 'wartend' : '',
                    r.installing ? 'wird installiert' : '',
                  ].filter(Boolean)
                  return `${r.scope} (${teile.join(', ') || 'unklar'})`
                })
                .join(' · ') || '(keine)',
          })
        } catch {
          z.push({ name: 'Registrierungen', wert: 'nicht abfragbar' })
        }
      } else {
        z.push({ name: 'Service Worker', wert: 'vom Browser nicht unterstützt' })
      }

      // Caches
      if ('caches' in window) {
        try {
          const namen = await caches.keys()
          for (const name of namen) {
            const schluessel = await (await caches.open(name)).keys()
            z.push({
              name: `Cache ${name}`,
              wert: `${schluessel.length} Einträge: ${schluessel
                .map((r) => r.url.split('/').pop() || r.url)
                .join(', ')}`,
            })
          }
          if (namen.length === 0) z.push({ name: 'Caches', wert: '(leer)' })
        } catch {
          z.push({ name: 'Caches', wert: 'nicht abfragbar' })
        }
      }

      // Hat der Notstart gegriffen?
      try {
        const marke = sessionStorage.getItem('fcg-app:notstart')
        z.push({ name: 'Notstart in dieser Sitzung', wert: marke ? `ja - ${marke}` : 'nein' })
      } catch {
        z.push({ name: 'Notstart', wert: 'sessionStorage nicht verfügbar' })
      }

      // Was die App gespeichert hat
      try {
        const schluessel = Object.keys(localStorage).filter((k) => k.startsWith('fcg-app:'))
        z.push({ name: 'Gespeicherte Werte', wert: schluessel.join(', ') || '(keine)' })
      } catch {
        z.push({ name: 'Gespeicherte Werte', wert: 'nicht abfragbar' })
      }

      // Protokoll der letzten Seitenwechsel und Fehler (siehe index.html).
      try {
        const roh = sessionStorage.getItem('fcg-app:protokoll')
        if (roh && !abgemeldet) setProtokoll(JSON.parse(roh) as Eintrag[])
      } catch {
        /* kein sessionStorage - dann eben ohne Protokoll */
      }

      if (!abgemeldet) setZeilen(z)
    }

    sammeln()
    return () => {
      abgemeldet = true
    }
  }, [])

  const alsText = [
    ...zeilen.map((z) => `${z.name}: ${z.wert}`),
    '',
    'Protokoll:',
    ...protokoll.map((e) => `  +${(e.t / 1000).toFixed(1)}s ${e.art}: ${e.text}`),
  ].join('\n')

  return (
    <>
      <TopBar title="Diagnose" subtitle="Für die Fehlersuche" back />
      <div className="page">
        <div className="notice small">
          Diese Angaben helfen, eine leere Seite einzugrenzen. Ein Bildschirmfoto dieser Seite
          genügt - persönliche Daten stehen hier nicht drin.
        </div>

        <section className="section">
          <div className="card">
            {zeilen.map((z) => (
              <div key={z.name} className="list-item" style={{ cursor: 'default', alignItems: 'flex-start' }}>
                <span className="small" style={{ flex: '0 0 40%' }}>{z.name}</span>
                <span className="tiny muted" style={{ textAlign: 'right', wordBreak: 'break-all' }}>
                  {z.wert}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Protokoll</h2>
          <div className="card">
            {protokoll.length === 0 ? (
              <p className="small muted" style={{ margin: 0 }}>
                Noch nichts aufgezeichnet. Ruf eine Unterseite auf, die leer bleibt, aktualisiere
                dann einmal und komm hierher zurück - der Verlauf bleibt im Tab erhalten.
              </p>
            ) : (
              <ol className="tiny" style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 4 }}>
                {protokoll.map((e, i) => (
                  <li key={i} style={{ wordBreak: 'break-word' }}>
                    <span className="muted">+{(e.t / 1000).toFixed(1)}s</span>{' '}
                    <b>{e.art}</b> {e.text}
                  </li>
                ))}
              </ol>
            )}
          </div>
          <button
            className="btn btn--ghost btn--block"
            onClick={() => {
              try {
                sessionStorage.removeItem('fcg-app:protokoll')
              } catch {
                /* egal */
              }
              setProtokoll([])
            }}
          >
            Protokoll leeren
          </button>
        </section>

        <section className="section">
          <button
            className="btn btn--ghost btn--block"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(alsText)
                setKopiert(true)
                setTimeout(() => setKopiert(false), 2000)
              } catch {
                setKopiert(false)
              }
            }}
          >
            {kopiert ? 'Kopiert' : 'Angaben kopieren'}
          </button>

          <button
            className="btn btn--ghost btn--block"
            style={{ marginTop: 8 }}
            onClick={async () => {
              if (!confirm('Service Worker abmelden, Caches leeren und neu laden?')) return
              try {
                if ('serviceWorker' in navigator) {
                  const regs = await navigator.serviceWorker.getRegistrations()
                  await Promise.all(regs.map((r) => r.unregister()))
                }
                if ('caches' in window) {
                  const namen = await caches.keys()
                  await Promise.all(namen.map((n) => caches.delete(n)))
                }
              } finally {
                window.location.reload()
              }
            }}
          >
            Zwischenspeicher leeren und neu starten
          </button>
        </section>
      </div>
    </>
  )
}
