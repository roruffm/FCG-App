import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

/**
 * Faengt Abstuerze beim Rendern.
 *
 * Ohne das raeumt React bei einem Fehler den ganzen Baum ab - die Seite wird
 * weiss, ohne jeden Hinweis, und nur ein Neuladen hilft. Genau so sieht der
 * gemeldete Fehler aus. Hier bleibt stattdessen eine Meldung stehen, die sagt,
 * was passiert ist: Eine sichtbare Fehlermeldung ist reparierbar, eine weisse
 * Seite nicht.
 *
 * Der Wachhund in index.html deckt das nicht ab: Der prueft einmal beim Start,
 * ob etwas gerendert wurde. Ein Absturz beim Weiterklicken passiert lange
 * danach.
 */
type Props = { children: ReactNode }
type State = { fehler: Error | null; stelle: string }

export class Fehlerfang extends Component<Props, State> {
  state: State = { fehler: null, stelle: '' }

  static getDerivedStateFromError(fehler: Error): Partial<State> {
    return { fehler }
  }

  componentDidCatch(fehler: Error, info: ErrorInfo) {
    // In der Konsole bleibt der vollstaendige Stapel - fuer die Fehlersuche.
    console.error('Absturz beim Rendern:', fehler, info.componentStack)
    this.setState({ stelle: (info.componentStack ?? '').split('\n').slice(1, 4).join('\n').trim() })
  }

  render() {
    const { fehler, stelle } = this.state
    if (!fehler) return this.props.children

    return (
      <div className="page">
        <div className="notice notice--warn" style={{ marginTop: 24 }}>
          <b>Diese Seite konnte nicht angezeigt werden.</b>
          <p className="small" style={{ margin: '6px 0 0' }}>
            In der App ist beim Aufbauen dieser Seite ein Fehler aufgetreten. Der Rest der App
            funktioniert weiter.
          </p>
        </div>

        <div className="row" style={{ gap: 8, marginTop: 14 }}>
          <button
            className="btn btn--primary"
            style={{ flex: 1 }}
            onClick={() => this.setState({ fehler: null, stelle: '' })}
          >
            Nochmal versuchen
          </button>
          <button
            className="btn btn--ghost"
            style={{ flex: 1 }}
            onClick={() => {
              window.location.hash = '#/'
              this.setState({ fehler: null, stelle: '' })
            }}
          >
            Zur Startseite
          </button>
        </div>

        <details className="card" style={{ marginTop: 16 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Technische Angaben</summary>
          <p className="tiny" style={{ margin: '8px 0 0', wordBreak: 'break-word' }}>
            <b>{fehler.name}:</b> {fehler.message}
          </p>
          {stelle && (
            <pre className="tiny muted" style={{ margin: '8px 0 0', whiteSpace: 'pre-wrap' }}>{stelle}</pre>
          )}
          <p className="tiny muted" style={{ margin: '8px 0 0', wordBreak: 'break-all' }}>
            {window.location.href}
          </p>
        </details>
      </div>
    )
  }
}
