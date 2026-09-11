import { Link, Navigate, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { ExternalLink } from '../components/ExternalLink'
import { formatStand } from './Wiki'
import { artikelNachSlug, lesezeit, wikiStand } from '../data/wiki'
import type { Block, WikiArtikel } from '../data/wiki'
import { rollen } from '../data/links'

/**
 * Eine Wiki-Seite.
 *
 * Unbekannter slug fuehrt zurueck zur Uebersicht statt auf eine Fehlerseite -
 * ein totes Ende ist in einem Nachschlagewerk besonders aergerlich.
 */
export function WikiArtikelSeite() {
  const { slug } = useParams()
  const artikel = slug ? artikelNachSlug(slug) : undefined

  if (!artikel) return <Navigate to="/wiki" replace />

  const sichten = artikel.rollen
    .map((r) => rollen.find((x) => x.id === r)?.label)
    .filter(Boolean)
    .join(' und ')

  const verwandt = (artikel.siehe ?? [])
    .map((s) => artikelNachSlug(s))
    .filter((a): a is WikiArtikel => Boolean(a))

  return (
    <>
      <TopBar title={artikel.kategorie} subtitle="Wiki" back />
      <div className="page">
        <header>
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>{artikel.titel}</h1>
          <p className="small muted" style={{ margin: '0 0 10px' }}>{artikel.teaser}</p>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            <span className={`badge ${artikel.status === 'geprueft' ? 'badge--accent' : ''}`}>
              {artikel.status === 'geprueft' ? 'Geprüft' : 'Entwurf'}
            </span>
            <span className="tiny muted">
              {lesezeit(artikel)} Min. · für {sichten} · Stand {formatStand(wikiStand)}
            </span>
          </div>
        </header>

        {artikel.abschnitte.map((abschnitt, i) => (
          <section key={abschnitt.titel ?? i} className="section">
            {abschnitt.titel && <h2>{abschnitt.titel}</h2>}
            <div className="stack">
              {abschnitt.bloecke.map((block, j) => (
                <BlockFeld key={j} block={block} />
              ))}
            </div>
          </section>
        ))}

        {artikel.links && artikel.links.length > 0 && (
          <section className="section">
            <h2>Direkt dorthin</h2>
            <div className="card">
              {artikel.links.map((link) =>
                link.extern ? (
                  <ExternalLink key={link.ziel} href={link.ziel}>
                    <b className="small">{link.label}</b>
                  </ExternalLink>
                ) : (
                  <Link key={link.ziel} to={link.ziel} className="list-item">
                    <b className="small">{link.label}</b>
                    <span className="tiny muted">öffnen</span>
                  </Link>
                )
              )}
            </div>
          </section>
        )}

        {verwandt.length > 0 && (
          <section className="section">
            <h2>Passt dazu</h2>
            <div className="card">
              {verwandt.map((a) => (
                <Link key={a.slug} to={`/wiki/${a.slug}`} className="list-item">
                  <div style={{ minWidth: 0 }}>
                    <b className="small">{a.titel}</b>
                    <div className="tiny muted">{a.kategorie}</div>
                  </div>
                  <span className="tiny muted">›</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <Link to="/wiki" className="btn btn--ghost btn--block">
            Zurück zur Wiki-Übersicht
          </Link>
        </section>
      </div>
    </>
  )
}

function BlockFeld({ block }: { block: Block }) {
  switch (block.art) {
    case 'text':
      return <p className="small" style={{ margin: 0, lineHeight: 1.62 }}>{block.text}</p>

    case 'liste':
      return (
        <ul className="wiki-liste">
          {block.punkte.map((p) => (
            <li key={p} className="small">{p}</li>
          ))}
        </ul>
      )

    case 'schritte':
      return (
        <ol className="wiki-schritte">
          {block.punkte.map((p) => (
            <li key={p} className="small">{p}</li>
          ))}
        </ol>
      )

    case 'hinweis':
      return <div className="notice">{block.text}</div>

    case 'warnung':
      return <div className="notice notice--warn">{block.text}</div>

    case 'begriffe':
      return (
        <dl className="wiki-begriffe">
          {block.eintraege.map((e) => (
            <div key={e.wort} className="card card--flat">
              <dt>{e.wort}</dt>
              <dd className="small muted">{e.bedeutung}</dd>
            </div>
          ))}
        </dl>
      )
  }
}
