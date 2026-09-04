import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { askSermons, exampleQuestions } from '../lib/search'
import type { AskResult } from '../lib/search'
import { formatDate } from '../lib/format'
import { IconSparkle } from '../components/Icons'

export function Ask() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<AskResult | null>(null)
  const [thinking, setThinking] = useState(false)

  function ask(q: string) {
    setQuestion(q)
    setThinking(true)
    setResult(null)
    // Kurze Verzögerung, damit die Suche auch bei echter Backend-Anbindung gleich wirkt.
    window.setTimeout(() => {
      setResult(askSermons(q))
      setThinking(false)
    }, 420)
  }

  return (
    <>
      <TopBar title="Frag die Predigten" subtitle="Antworten nur aus FCG-Inhalten" />
      <div className="page">
        <form
          className="row"
          style={{ flexWrap: 'nowrap', gap: 8 }}
          onSubmit={(e) => {
            e.preventDefault()
            if (question.trim()) ask(question)
          }}
        >
          <input
            className="input"
            placeholder="Deine Frage in normaler Sprache …"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            aria-label="Frage an das Predigtarchiv"
          />
          <button className="btn btn--primary" type="submit" disabled={!question.trim()}>
            Fragen
          </button>
        </form>

        {!result && !thinking && (
          <section className="section">
            <h2 className="small muted">Beispiele</h2>
            <div className="stack">
              {exampleQuestions.map((q) => (
                <button key={q} className="card card--tap card--flat small" onClick={() => ask(q)}>
                  <div className="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
                    <IconSparkle />
                    <span>{q}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {thinking && <div className="card small muted">Durchsuche freigegebene Predigttranskripte …</div>}

        {result?.kind === 'escalation' && (
          <div className="card">
            <div className="notice notice--warn">
              <b>Dafür ist ein Mensch da.</b>
              <p style={{ margin: '6px 0 0' }}>
                Bei belastenden oder gefährlichen Situationen antwortet die App bewusst nicht automatisch.
                Bitte melde dich direkt - auch anonym.
              </p>
            </div>
            <div className="stack" style={{ marginTop: 12 }}>
              <a className="btn btn--primary btn--block" href="tel:+498001110111">
                Telefonseelsorge: 0800 111 0 111
              </a>
              <a className="btn btn--ghost btn--block" href="mailto:seelsorge@fcg-beispiel.de">
                Seelsorgeteam der FCG kontaktieren
              </a>
              <p className="tiny muted" style={{ margin: 0 }}>
                Bei akuter Gefahr: Notruf 112. Beim Verdacht auf Kindeswohlgefährdung wendet sich das
                Schutzteam der Gemeinde an die zuständigen Stellen.
              </p>
            </div>
          </div>
        )}

        {result?.kind === 'empty' && (
          <div className="card">
            <p className="small">
              Dazu findet sich im freigegebenen Archiv nichts Passendes. Das ist Absicht: Die App antwortet
              nur aus FCG-Predigten und erfindet nichts dazu.
            </p>
            <Link to="/predigten" className="btn btn--ghost btn--sm">Archiv durchstöbern</Link>
          </div>
        )}

        {result?.kind === 'answer' && (
          <section className="section">
            <div className="card">
              <span className="badge badge--ai">KI-gestützte Suche · immer mit Quelle</span>
              <p className="small" style={{ margin: '10px 0 0' }}>{result.intro}</p>
            </div>

            {result.citations.map(({ sermon, quote }) => (
              <Link key={sermon.id} to={`/predigten/${sermon.id}`} className="card card--tap">
                <div className="tiny muted">
                  {formatDate(sermon.date)} · {sermon.speaker} · {sermon.keyVerse}
                </div>
                <h3 style={{ margin: '4px 0 8px' }}>{sermon.title}</h3>
                <p className="quote small" style={{ marginBottom: 0 }}>„{quote}“</p>
              </Link>
            ))}

            <p className="tiny muted">
              Antworten stammen ausschließlich aus freigegebenen Predigttranskripten. Sie ersetzen keine
              Seelsorge und keine geistliche Begleitung.
            </p>
          </section>
        )}
      </div>
    </>
  )
}
