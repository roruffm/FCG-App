import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { rollen } from '../data/links'
import type { Rolle } from '../data/links'
import {
  artikelFuer,
  artikelText,
  kategorienFuer,
  lesezeit,
  wikiStand,
} from '../data/wiki'
import type { WikiArtikel } from '../data/wiki'
import { usePersistentState } from '../lib/storage'

/**
 * Wiki-Uebersicht.
 *
 * Getrennt nach Gast, Mitglied und Staff - und zwar mit derselben Rollenwahl
 * wie die Startseite: Wer dort "Staff" gewaehlt hat, landet hier nicht wieder
 * bei den Gastartikeln. Deshalb teilen sich beide Seiten den Speicherschluessel
 * `start-rolle`.
 *
 * Die Suche bleibt bewusst in der gewaehlten Sicht. Trifft sie in einer anderen
 * Sicht etwas, sagt sie das in einer Zeile - verstecken waere schlechter als
 * trennen, aber einfach alles zu mischen wuerde die Trennung aufheben.
 */
export function Wiki() {
  const [rolle, setRolle] = usePersistentState<Rolle>('start-rolle', 'gast')
  const [suche, setSuche] = useState('')

  const begriff = suche.trim().toLowerCase()
  const kategorien = useMemo(() => kategorienFuer(rolle), [rolle])

  const treffer = useMemo(() => {
    if (begriff.length < 2) return null
    return artikelFuer(rolle).filter((a) => artikelText(a).toLowerCase().includes(begriff))
  }, [begriff, rolle])

  /** Treffer in den beiden anderen Sichten - nur als Hinweis, nicht als Liste. */
  const andereSichten = useMemo(() => {
    if (begriff.length < 2) return []
    return rollen
      .filter((r) => r.id !== rolle)
      .map((r) => ({
        rolle: r,
        anzahl: artikelFuer(r.id).filter((a) => artikelText(a).toLowerCase().includes(begriff))
          .length,
      }))
      .filter((x) => x.anzahl > 0)
  }, [begriff, rolle])

  const alle = artikelFuer(rolle)
  const entwuerfe = alle.filter((a) => a.status === 'entwurf').length

  return (
    <>
      <TopBar title="Wiki" subtitle="Nachschlagen statt nachfragen" back />
      <div className="page">
        <div>
          <div className="rollenwahl" role="group" aria-label="Sicht wählen">
            {rollen.map((r) => (
              <button
                key={r.id}
                className="rolle"
                aria-pressed={r.id === rolle}
                onClick={() => setRolle(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
          <p className="tiny muted start__rollenhinweis">
            {alle.length} Artikel für diese Sicht · Stand {formatStand(wikiStand)}
          </p>
        </div>

        <input
          className="input"
          type="search"
          value={suche}
          onChange={(e) => setSuche(e.target.value)}
          placeholder="Im Wiki suchen …"
          aria-label="Im Wiki suchen"
          style={{ marginTop: 14 }}
        />

        {treffer ? (
          <section className="section">
            <h2>
              {treffer.length === 0
                ? 'Kein Treffer'
                : `${treffer.length} ${treffer.length === 1 ? 'Treffer' : 'Treffer'}`}
            </h2>
            {treffer.length === 0 ? (
              <p className="empty">
                In der Sicht „{rollen.find((r) => r.id === rolle)?.label}“ steht dazu nichts.
              </p>
            ) : (
              <div className="stack">
                {treffer.map((a) => (
                  <ArtikelKarte key={a.slug} artikel={a} />
                ))}
              </div>
            )}

            {andereSichten.length > 0 && (
              <div className="notice" style={{ marginTop: 12 }}>
                Auch in{' '}
                {andereSichten.map((x, i) => (
                  <span key={x.rolle.id}>
                    {i > 0 && ' und '}
                    <button className="linkbtn" onClick={() => setRolle(x.rolle.id)}>
                      {x.rolle.label} ({x.anzahl})
                    </button>
                  </span>
                ))}{' '}
                gibt es dazu etwas.
              </div>
            )}
          </section>
        ) : (
          <>
            {entwuerfe > 0 && (
              <div className="notice notice--warn" style={{ marginTop: 14 }}>
                <b>{entwuerfe} von {alle.length} Artikeln sind Entwürfe.</b> Sie beschreiben, was
                üblich ist - nicht, was die FCG Frankfurt festgelegt hat. Wo das einen Unterschied
                macht, steht es im Artikel. Die Leitung muss sie bestätigen, bevor sich jemand
                darauf beruft.
              </div>
            )}

            {kategorien.map((gruppe) => (
              <section key={gruppe.name} className="section">
                <h2>{gruppe.name}</h2>
                <div className="stack">
                  {gruppe.artikel.map((a) => (
                    <ArtikelKarte key={a.slug} artikel={a} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export function ArtikelKarte({ artikel }: { artikel: WikiArtikel }) {
  return (
    <Link to={`/wiki/${artikel.slug}`} className="card card--tap">
      <div className="spread" style={{ alignItems: 'flex-start', gap: 10 }}>
        <b>{artikel.titel}</b>
        {artikel.status === 'entwurf' && <span className="badge">Entwurf</span>}
      </div>
      <p className="small muted" style={{ margin: '6px 0 0' }}>{artikel.teaser}</p>
      <p className="tiny muted" style={{ margin: '8px 0 0' }}>
        {artikel.kategorie} · {lesezeit(artikel)} Min. Lesezeit
      </p>
    </Link>
  )
}

/** "2026-09-11" -> "11.09.2026" */
export function formatStand(iso: string): string {
  const [jahr, monat, tag] = iso.split('-')
  return `${tag}.${monat}.${jahr}`
}
