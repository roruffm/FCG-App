import { Link } from 'react-router-dom'
import type { CommentaryEntry } from '../lib/bible'
import { biblePath } from '../lib/bible'

/**
 * Ein Artikel zu historischem Kontext und Auslegungen.
 *
 * Redaktionsprinzip aus dem Schwesterprojekt: Deutungen stehen beschreibend
 * nebeneinander, jeweils mit Angabe der Tradition. Die App entscheidet nicht,
 * welche Lesart die richtige ist.
 */
export function ContextArticle({ entry, deep = false }: { entry: CommentaryEntry; deep?: boolean }) {
  return (
    <article className="stack">
      <div>
        <span className="badge">
          Verse {entry.from}
          {entry.to !== entry.from ? `-${entry.to}` : ''}
        </span>
        <h3 style={{ margin: '8px 0 6px' }}>{entry.title}</h3>
        <p className="small" style={{ marginBottom: 0 }}>{entry.historicalShort}</p>
      </div>

      {deep && entry.historicalLong && (
        <div className="small">
          {entry.historicalLong.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {deep && entry.terms && entry.terms.length > 0 && (
        <div>
          <h4 className="small">Wörter des Urtextes</h4>
          {entry.terms.map((t) => (
            <p key={t.word} className="small muted" style={{ marginBottom: 6 }}>
              <b>{t.word}</b>
              {t.rendered ? ` (Luther: „${t.rendered}“)` : ''} - {t.note}
            </p>
          ))}
        </div>
      )}

      {entry.interpretations.length > 0 && (
        <div>
          <h4 className="small">Wie die Stelle gelesen wird</h4>
          {entry.interpretations.slice(0, deep ? undefined : 2).map((i) => (
            <div key={i.tradition} className="notice small" style={{ marginBottom: 8 }}>
              <b>{i.tradition}</b>
              <p style={{ margin: '4px 0 0' }}>{i.text}</p>
            </div>
          ))}
        </div>
      )}

      {deep && entry.reception && (
        <div>
          <h4 className="small">Wirkungsgeschichte</h4>
          <p className="small muted">{entry.reception}</p>
        </div>
      )}

      {entry.crossRefs && entry.crossRefs.length > 0 && (
        <div>
          <h4 className="small">Querverweise</h4>
          <div className="chips">
            {entry.crossRefs.slice(0, 8).map((c) => (
              <Link key={`${c.book}${c.chapter}${c.verse}`} className="chip" to={biblePath(c.book, c.chapter, c.verse)}>
                {c.book} {c.chapter},{c.verse}
              </Link>
            ))}
          </div>
        </div>
      )}

      {deep && entry.sources && entry.sources.length > 0 && (
        <p className="tiny muted" style={{ marginBottom: 0 }}>Grundlage: {entry.sources.join('; ')}</p>
      )}
    </article>
  )
}
