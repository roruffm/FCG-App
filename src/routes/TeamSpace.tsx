import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { teams, shifts } from '../data/teams'
import { mailTo } from '../data/church'
import { formatDate, formatTime, relativeDay } from '../lib/format'
import { formatBytes, useTeamChat, useTeamDocs } from '../lib/teamspace'
import { useApp } from '../state'
import { IconNote, IconShield, IconUsers } from '../components/Icons'

type Tab = 'chat' | 'dokumente' | 'info'

export function TeamSpace() {
  const { id } = useParams()
  const team = teams.find((t) => t.id === id)
  const { profile, myTeams, onboardingDone } = useApp()
  const [tab, setTab] = useState<Tab>('chat')
  const [entwurf, setEntwurf] = useState('')
  const dateiFeld = useRef<HTMLInputElement>(null)

  const author = profile.name || 'Ich'
  /**
   * Schluessel des Teams in der jeweiligen Quelle: auf dem Geraet die eigene
   * Kennung, in ChurchTools die Gruppen-Id.
   */
  const team0 = teams.find((t) => t.id === id)
  const quellSchluessel = import.meta.env.VITE_TEAM_API
    ? team0?.ctGroupId
      ? String(team0.ctGroupId)
      : ''
    : (id ?? '')
  const { messages, send, remove, error: chatError } = useTeamChat(quellSchluessel, author)
  const { docs, error, add, remove: removeDoc, load, source, quelle } = useTeamDocs(quellSchluessel, author)

  if (!team) {
    return (
      <>
        <TopBar title="Team" back />
        <div className="page">
          <div className="empty">
            <p>Dieses Team gibt es nicht.</p>
            <Link to="/teams" className="btn btn--ghost">Zu den Teams</Link>
          </div>
        </div>
      </>
    )
  }

  const istMitglied = myTeams.has(team.id)
  const naechsteDienste = shifts
    .filter((s) => s.teamId === team.id)
    .sort((a, b) => a.date.localeCompare(b.date))

  async function oeffnen(docId: string) {
    const { blob, name } = await load(docId)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 10_000)
  }

  async function teilen(docId: string) {
    const { blob, name } = await load(docId)
    const datei = new File([blob], name, { type: blob.type })
    if (navigator.canShare?.({ files: [datei] })) {
      await navigator.share({ files: [datei], title: name }).catch(() => {})
    } else {
      void oeffnen(docId)
    }
  }

  return (
    <>
      <TopBar title={team.name} subtitle={team.area} back />
      <div className="page">
        {source === 'churchtools' && !team.ctGroupId && (
          <div className="notice notice--warn small">
            <b>Diesem Team ist noch keine ChurchTools-Gruppe zugeordnet.</b>
            <p style={{ margin: '6px 0 0' }}>
              Die Gruppen-Id gehört in <code>src/data/teams.ts</code> (Feld <code>ctGroupId</code>).
              Welche Id passt, zeigt <code>server/check-churchtools.mjs</code>.
            </p>
          </div>
        )}

        {!istMitglied && (
          <div className="notice small">
            <b>Du bist nicht in diesem Team.</b>
            <p style={{ margin: '6px 0 10px' }}>
              Der Bereich steht allen offen, solange die App niemanden anmeldet. Mit Server sähen ihn
              nur die Menschen, die wirklich im Team sind.
            </p>
            <button className="btn btn--sm btn--primary" onClick={() => myTeams.add(team.id)}>
              Zum Team gehören
            </button>
          </div>
        )}

        <div className="chips" role="tablist" aria-label="Bereich">
          <button className="chip" role="tab" aria-pressed={tab === 'chat'} onClick={() => setTab('chat')}>
            Chat {messages.length > 0 ? `(${messages.length})` : ''}
          </button>
          <button
            className="chip"
            role="tab"
            aria-pressed={tab === 'dokumente'}
            onClick={() => setTab('dokumente')}
          >
            Dokumente {docs.length > 0 ? `(${docs.length})` : ''}
          </button>
          <button className="chip" role="tab" aria-pressed={tab === 'info'} onClick={() => setTab('info')}>
            Team-Info
          </button>
        </div>

        {source === 'geraet' ? (
          <div className="notice small">
            Chat und Dateien liegen <b>nur auf diesem Gerät</b>. Andere im Team sehen sie noch nicht -
            dafür braucht die App einen Server.
          </div>
        ) : (
          <div className="notice small">
            Quelle: <b>{quelle}</b>. Chat und Dateien liegen in der Gemeindeverwaltung; es gelten die
            dortigen Rechte.
          </div>
        )}
        {chatError && (
          <div className="notice notice--warn small">
            Nachrichten konnten nicht geladen werden: {chatError}
          </div>
        )}

        {tab === 'chat' && (
          <>
            <section className="stack">
              {messages.length === 0 && (
                <div className="empty">
                  <p>Noch keine Nachricht.</p>
                  <p className="small">
                    Hier stünden Absprachen zum nächsten Dienst, kurze Rückfragen und Änderungen.
                  </p>
                </div>
              )}
              {messages.map((m) => {
                const eigene = m.author === author
                return (
                  <div
                    key={m.id}
                    className="card"
                    style={{
                      marginLeft: eigene ? 32 : 0,
                      marginRight: eigene ? 0 : 32,
                      background: eigene ? 'var(--accent-soft)' : undefined,
                    }}
                  >
                    <div className="spread">
                      <b className="tiny">{m.author}</b>
                      <span className="tiny muted">
                        {relativeDay(m.at)}, {formatTime(m.at)}
                      </span>
                    </div>
                    <p className="small" style={{ margin: '6px 0 0' }}>{m.text}</p>
                    {eigene && (
                      <button
                        className="btn btn--ghost btn--sm"
                        style={{ marginTop: 8 }}
                        onClick={() => remove(m.id)}
                      >
                        Löschen
                      </button>
                    )}
                  </div>
                )
              })}
            </section>

            <form
              className="row"
              style={{ flexWrap: 'nowrap', gap: 8 }}
              onSubmit={(e) => {
                e.preventDefault()
                send(entwurf)
                setEntwurf('')
              }}
            >
              <input
                className="input"
                placeholder={`Nachricht an ${team.name} …`}
                value={entwurf}
                onChange={(e) => setEntwurf(e.target.value)}
                aria-label="Nachricht schreiben"
              />
              <button className="btn btn--primary" type="submit" disabled={!entwurf.trim()}>
                Senden
              </button>
            </form>
            <p className="tiny muted">
              Schreibst du als: {author}. Der Name lässt sich im Bereich „Ich" ändern.
            </p>
          </>
        )}

        {tab === 'dokumente' && (
          <>
            <div className="card">
              <div className="row" style={{ gap: 8 }}>
                <IconNote />
                <b>Dateien des Teams</b>
              </div>
              <p className="small muted" style={{ margin: '8px 0 12px' }}>
                Ablaufpläne, Checklisten, Noten, Fotos - was das Team zur Hand haben muss.
              </p>
              <input
                ref={dateiFeld}
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files) void add(e.target.files)
                  e.target.value = ''
                }}
              />
              <button className="btn btn--primary btn--block" onClick={() => dateiFeld.current?.click()}>
                Datei hinzufügen
              </button>
              {error && (
                <p className="tiny" style={{ color: '#d05353', margin: '10px 0 0' }}>
                  Speichern nicht möglich: {error}
                </p>
              )}
            </div>

            <div className="stack">
              {docs.length === 0 && (
                <div className="empty">
                  <p>Noch keine Datei abgelegt.</p>
                </div>
              )}
              {docs.map((doc) => (
                <div key={doc.id} className="card">
                  <div className="spread">
                    <div style={{ minWidth: 0 }}>
                      <b className="small">{doc.name}</b>
                      <div className="tiny muted">
                        {formatBytes(doc.size)} · {doc.addedBy} · {formatDate(doc.addedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ gap: 8, marginTop: 10 }}>
                    <button className="btn btn--ghost btn--sm" onClick={() => void oeffnen(doc.id)}>
                      Speichern
                    </button>
                    <button className="btn btn--ghost btn--sm" onClick={() => void teilen(doc.id)}>
                      Teilen
                    </button>
                    <button className="btn btn--ghost btn--sm" onClick={() => removeDoc(doc.id)}>
                      Entfernen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="tiny muted">
              {source === 'geraet'
                ? 'Dateien liegen im Speicher dieses Browsers. Löschst du die Websitedaten, sind sie weg - sie ersetzen keine Ablage der Gemeinde.'
                : 'Dateien liegen in der Gemeindeverwaltung. Löschen wirkt dort für alle.'}
            </p>
          </>
        )}

        {tab === 'info' && (
          <>
            <section className="card">
              <div className="row" style={{ gap: 8 }}>
                <IconUsers />
                <b>{team.short}</b>
              </div>
              <p className="small" style={{ margin: '10px 0' }}>{team.description}</p>
              <div className="chips">
                {team.needs.map((n) => (
                  <span key={n} className="badge badge--accent">gesucht: {n}</span>
                ))}
              </div>
              <div className="tiny muted" style={{ marginTop: 10 }}>Rhythmus: {team.rhythm}</div>
              {team.protection && (
                <div className="notice small" style={{ marginTop: 12 }}>
                  <div className="row" style={{ gap: 6, flexWrap: 'nowrap' }}>
                    <IconShield />
                    <span>
                      Arbeit mit Kindern und Jugendlichen: erweitertes Führungszeugnis, Schutzkonzept und
                      Schulung sind Voraussetzung - ohne Ausnahme.
                    </span>
                  </div>
                </div>
              )}
            </section>

            {naechsteDienste.length > 0 && (
              <section className="section">
                <h2>Nächste Dienste</h2>
                <div className="card">
                  {naechsteDienste.map((s) => (
                    <div key={s.id} className="list-item" style={{ cursor: 'default' }}>
                      <div style={{ minWidth: 0 }}>
                        <b className="small">{s.role}</b>
                        <div className="tiny muted">
                          {relativeDay(s.date)} · {formatTime(s.date)} Uhr
                          {s.note ? ` · ${s.note}` : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="card">
              <h2 style={{ marginBottom: 8 }}>Einarbeitung</h2>
              {team.onboarding.map((step, i) => {
                const key = `${team.id}:${i}`
                const done = onboardingDone.has(key)
                return (
                  <label key={key} className="row small" style={{ gap: 8, padding: '6px 0' }}>
                    <input type="checkbox" checked={done} onChange={() => onboardingDone.toggle(key)} />
                    <span style={{ textDecoration: done ? 'line-through' : undefined }}>{step}</span>
                  </label>
                )
              })}
            </section>

            <a
              className="btn btn--ghost btn--block"
              href={mailTo(`${team.name}: Frage`, `Hallo ${team.name},\n\n`, team.contact)}
            >
              Teamleitung schreiben
            </a>
          </>
        )}
      </div>
    </>
  )
}
