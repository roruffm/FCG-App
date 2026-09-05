import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { MAP_VIEWS, PLACES, findPlace } from '../data/places'
import type { MapPlace, MapView } from '../data/places'
import { JOURNEYS } from '../data/journeys'
import type { Journey } from '../data/journeys'
import { loadRegions } from '../lib/mapData'
import type { MapRegions } from '../lib/mapData'
import { layoutLabels } from '../lib/mapLabels'
import { biblePath, bookMeta } from '../lib/bible'
import { useBibleIndex } from '../lib/useBible'

const WIDTH = 1000

/** Reihenfolge der Beschriftung: kleiner Wert wird zuerst gesetzt. */
function weight(place: MapPlace): number {
  if (place.kind === 'region') return 3
  return place.rank ?? 2
}

/**
 * Karte der biblischen Welt.
 *
 * Kartengrundlage, Orte und Reisewege stammen aus dem Schwesterprojekt
 * "Entgegen"; die Darstellung ist hier neu und auf das Telefon zugeschnitten:
 * ein Ausschnitt zur Zeit, Beschriftung nur, wo Platz ist, und jeder Ort
 * fuehrt zu den Stellen, an denen er vorkommt.
 */
export default function MapPage() {
  const index = useBibleIndex()
  const [regions, setRegions] = useState<MapRegions | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [viewId, setViewId] = useState('israel')
  const [journeyId, setJourneyId] = useState<string | null>(null)
  const [selected, setSelected] = useState<MapPlace | null>(null)
  const [expanded, setExpanded] = useState(false)
  /** Zoomstufe und Verschiebung des Ausschnitts. */
  const [nav, setNav] = useState({ scale: 1, dx: 0, dy: 0 })
  const drag = useRef<{ x: number; y: number; dx: number; dy: number } | null>(null)

  useEffect(() => {
    loadRegions()
      .then(setRegions)
      .catch((e: Error) => setError(e.message))
  }, [])

  const journey: Journey | undefined = journeyId ? JOURNEYS.find((j) => j.id === journeyId) : undefined
  const view: MapView = MAP_VIEWS.find((v) => v.id === viewId) ?? MAP_VIEWS[0]

  const geometry = useMemo(() => {
    if (!regions) return null
    const { box } = regions
    const height = (WIDTH * (box.north - box.south)) / (box.east - box.west)
    const project = ([lon, lat]: [number, number]): [number, number] => [
      ((lon - box.west) / (box.east - box.west)) * WIDTH,
      ((box.north - lat) / (box.north - box.south)) * height,
    ]
    const toPath = (rings: [number, number][][]) =>
      rings
        .map((ring) => 'M' + ring.map((p) => project(p).map((n) => n.toFixed(1)).join(',')).join('L') + 'Z')
        .join(' ')

    return { project, height, land: toPath(regions.land), seen: toPath(regions.seen) }
  }, [regions])

  /** Ausschnitt: bei ausgewählter Reise der Rahmen um die Route. */
  const box = useMemo(() => {
    if (!geometry) return null
    if (journey) {
      const points = journey.stops.map((s) => geometry.project(s.coords))
      const xs = points.map((p) => p[0])
      const ys = points.map((p) => p[1])
      const pad = 40
      return {
        x: Math.min(...xs) - pad,
        y: Math.min(...ys) - pad,
        w: Math.max(...xs) - Math.min(...xs) + pad * 2,
        h: Math.max(...ys) - Math.min(...ys) + pad * 2,
      }
    }
    const [west, south, east, north] = view.bounds
    const [x1, y1] = geometry.project([west, north])
    const [x2, y2] = geometry.project([east, south])
    return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 }
  }, [geometry, view, journey])

  /** Sichtbares Rechteck nach Zoom und Verschiebung. */
  const frame = useMemo(() => {
    if (!box) return null
    const w = box.w / nav.scale
    const h = box.h / nav.scale
    return {
      x: box.x + (box.w - w) / 2 + nav.dx,
      y: box.y + (box.h - h) / 2 + nav.dy,
      w,
      h,
    }
  }, [box, nav])

  /** Wie viele Längengrade sichtbar sind - Maß für die Dichte. */
  const degrees = (journey ? 40 : view.bounds[2] - view.bounds[0]) / nav.scale

  useEffect(() => {
    setNav({ scale: 1, dx: 0, dy: 0 })
  }, [viewId, journeyId])

  const shown = useMemo(() => {
    if (!geometry || !frame || journey) return []
    return PLACES.filter((place) => {
      const [x, y] = geometry.project(place.coords)
      if (x < frame.x || x > frame.x + frame.w || y < frame.y || y > frame.y + frame.h) return false
      // Landschaften erst zeigen, wenn der Ausschnitt sie fassen kann.
      if (place.span && degrees > place.span * 4) return false
      // Auf weiten Ausschnitten nur die Orte, die überall stehen müssen.
      if ((place.rank ?? 2) === 2 && degrees > 3) return false
      return true
    })
  }, [geometry, frame, journey, degrees])

  /** Ein Bildschirmpixel in Zeichenkoordinaten (Karte ist ca. 360 px breit). */
  const unit = frame ? frame.w / 360 : 1

  const labels = useMemo(() => {
    if (!geometry || !frame) return []

    const ranks: number[] = []
    const items = journey
      ? journey.stops.map((s) => {
          const [x, y] = geometry.project(s.coords)
          ranks.push(1)
          return { x, y, text: s.name }
        })
      : // Reihenfolge entscheidet: Wer zuerst kommt, bekommt seinen Namen.
        // Erst die Orte, die auf jeder Karte stehen muessen, dann die
        // uebrigen, zuletzt die Landschaften - ein fehlendes "Jerusalem"
        // waere schlimmer als ein fehlendes "Judaea".
        [...shown]
          .sort((a, b) => weight(a) - weight(b))
          .map((p) => {
            const [x, y] = geometry.project(p.coords)
            ranks.push(weight(p))
            return { x, y, text: p.name }
          })
    // Beschriftungen ohne freien Platz weglassen - sie erscheinen, sobald der
    // Ausschnitt enger wird. Uebereinanderliegende Namen sind schlimmer als
    // ein Punkt ohne Namen.
    return layoutLabels(items, unit, {
      x1: frame.x,
      y1: frame.y,
      x2: frame.x + frame.w,
      y2: frame.y + frame.h,
      // Orte, die auf jede Karte gehoeren, werden auch dann beschriftet, wenn
      // es eng wird - ein fehlendes "Jerusalem" waere schlimmer als eine
      // Beschriftung, die einen Nachbarn streift.
    }).filter((label, i) => !label.crowded || ranks[i] === 1)
  }, [geometry, frame, shown, journey, unit])

  const route = useMemo(() => {
    if (!geometry || !journey) return ''
    return (
      'M' +
      journey.stops
        .map((s) => geometry.project(s.coords).map((n) => n.toFixed(1)).join(','))
        .join('L')
    )
  }, [geometry, journey])

  return (
    <>
      <TopBar title="Karte" subtitle={journey ? journey.title : view.label} back />
      <div className="page" style={{ paddingBottom: selected ? 240 : undefined }}>
        <div className="chips" role="group" aria-label="Ausschnitt">
          {MAP_VIEWS.map((v) => (
            <button
              key={v.id}
              className="chip"
              aria-pressed={!journey && viewId === v.id}
              onClick={() => {
                setJourneyId(null)
                setViewId(v.id)
                setSelected(null)
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="chips" role="group" aria-label="Reisewege">
          {JOURNEYS.map((j) => (
            <button
              key={j.id}
              className="chip"
              aria-pressed={journeyId === j.id}
              onClick={() => {
                setJourneyId(journeyId === j.id ? null : j.id)
                setSelected(null)
              }}
            >
              {j.title}
            </button>
          ))}
        </div>

        {error && <div className="card small muted">Karte nicht verfügbar: {error}</div>}
        {!geometry && !error && <div className="card small muted">Karte wird geladen …</div>}

        {geometry && frame && box && (
          <div className="card" style={{ padding: 8, overflow: 'hidden' }}>
            <svg
              viewBox={`${frame.x} ${frame.y} ${frame.w} ${frame.h}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 10,
                touchAction: 'none',
                cursor: nav.scale > 1 ? 'grab' : 'default',
              }}
              onPointerDown={(e) => {
                if (nav.scale <= 1) return
                drag.current = { x: e.clientX, y: e.clientY, dx: nav.dx, dy: nav.dy }
                e.currentTarget.setPointerCapture(e.pointerId)
              }}
              onPointerMove={(e) => {
                const start = drag.current
                if (!start) return
                const rect = e.currentTarget.getBoundingClientRect()
                const perPixel = frame.w / rect.width
                setNav((prev) => ({
                  ...prev,
                  dx: start.dx - (e.clientX - start.x) * perPixel,
                  dy: start.dy - (e.clientY - start.y) * perPixel,
                }))
              }}
              onPointerUp={() => {
                drag.current = null
              }}
              role="img"
              aria-label={journey ? `Karte: ${journey.title}` : `Karte: ${view.label}`}
            >
              <rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} fill="var(--water)" />
              <path d={geometry.land} fill="var(--surface)" stroke="var(--border)" strokeWidth={unit} />
              <path d={geometry.seen} fill="var(--water)" stroke="var(--border)" strokeWidth={unit} />

              {journey && (
                <path
                  d={route}
                  fill="none"
                  stroke={journey.color}
                  strokeWidth={2.5 * unit}
                  strokeLinejoin="round"
                  strokeDasharray={`${6 * unit} ${4 * unit}`}
                />
              )}

              {journey
                ? journey.stops.map((stop, i) => {
                    const [x, y] = geometry.project(stop.coords)
                    return (
                      <g key={`${stop.name}-${i}`}>
                        <circle cx={x} cy={y} r={6 * unit} fill={journey.color} />
                        <text
                          x={x}
                          y={y + 2.6 * unit}
                          textAnchor="middle"
                          fontSize={8 * unit}
                          fill="#fff"
                          fontWeight="700"
                        >
                          {i + 1}
                        </text>
                      </g>
                    )
                  })
                : shown.map((place) => {
                    const [x, y] = geometry.project(place.coords)
                    const isSelected = selected?.id === place.id
                    if (place.kind === 'region') return null
                    return (
                      <circle
                        key={place.id}
                        cx={x}
                        cy={y}
                        r={isSelected ? 5.5 * unit : 3.4 * unit}
                        fill={isSelected ? 'var(--accent-mid)' : 'var(--primary)'}
                        stroke="var(--surface)"
                        strokeWidth={1.2 * unit}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelected(place)
                          setExpanded(false)
                        }}
                      />
                    )
                  })}

              {labels.map((label) => (
                <text
                  key={`${label.text}-${label.labelX}`}
                  x={label.labelX}
                  y={label.labelY}
                  textAnchor={label.anchor}
                  fontSize={12 * unit}
                  fill="var(--text)"
                  stroke="var(--surface)"
                  strokeWidth={2.4 * unit}
                  paintOrder="stroke"
                  style={{ pointerEvents: 'none' }}
                >
                  {label.text}
                </text>
              ))}
            </svg>
          </div>
        )}

        {journey && (
          <section className="card">
            <span className="badge">{journey.period}</span>
            <h2 style={{ margin: '10px 0 6px' }}>{journey.title}</h2>
            <p className="small">{journey.summary}</p>
            <Link className="btn btn--ghost btn--sm" to={biblePath(journey.ref.book, journey.ref.chapter)}>
              {index ? bookMeta(index, journey.ref.book)?.name ?? journey.ref.book : journey.ref.book}{' '}
              {journey.ref.chapter} lesen
            </Link>
            <ol className="small" style={{ margin: '12px 0 0', paddingLeft: 18 }}>
              {journey.stops.map((s, i) => (
                <li key={`${s.name}-${i}`} style={{ marginBottom: 4 }}>
                  <b>{s.name}</b>
                  {s.note ? ` - ${s.note}` : ''}
                </li>
              ))}
            </ol>
          </section>
        )}

        {geometry && frame && (
          <div className="spread">
            <div className="row" style={{ gap: 8 }}>
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => setNav((n) => ({ ...n, scale: Math.min(8, n.scale * 1.6) }))}
                aria-label="Näher heranholen"
              >
                +
              </button>
              <button
                className="btn btn--ghost btn--sm"
                onClick={() =>
                  setNav((n) => (n.scale <= 1.05 ? { scale: 1, dx: 0, dy: 0 } : { ...n, scale: n.scale / 1.6 }))
                }
                aria-label="Weiter herauszoomen"
              >
                −
              </button>
              {nav.scale > 1 && (
                <button className="btn btn--ghost btn--sm" onClick={() => setNav({ scale: 1, dx: 0, dy: 0 })}>
                  Zurücksetzen
                </button>
              )}
            </div>
            <span className="tiny muted">
              {nav.scale > 1 ? `${nav.scale.toFixed(1)}× · zum Verschieben ziehen` : 'Ausschnitt'}
            </span>
          </div>
        )}

        {!journey && (
          <p className="tiny muted">
            {shown.length} Orte in diesem Ausschnitt, {labels.length} davon beschriftet - beim
            Heranholen kommen die übrigen Namen dazu. Auf einen Punkt tippen zeigt, warum der Ort in
            der Bibel vorkommt. Kartengrundlage: Natural Earth (gemeinfrei).
          </p>
        )}
      </div>

      {selected && (
        <div className="verse-sheet">
          <div className="spread">
            <div style={{ minWidth: 0 }}>
              <b className="small">{selected.name}</b>
              {selected.today && <div className="tiny muted">heute: {selected.today}</div>}
            </div>
            <button className="btn btn--ghost btn--sm" onClick={() => setSelected(null)}>
              Schließen
            </button>
          </div>

          {selected.fact && (
            <span className="badge badge--accent" style={{ marginTop: 8 }}>{selected.fact}</span>
          )}
          <p className="small" style={{ margin: '8px 0' }}>
            {expanded && selected.long ? selected.long : selected.short}
          </p>

          <div className="row" style={{ gap: 8 }}>
            {selected.long && (
              <button className="btn btn--ghost btn--sm" onClick={() => setExpanded((v) => !v)}>
                {expanded ? 'Weniger' : 'Mehr erfahren'}
              </button>
            )}
            {selected.lexicon && findPlace(selected.id) && (
              <Link className="btn btn--ghost btn--sm" to={`/bibel/lexikon?id=${selected.lexicon}`}>
                Im Lexikon
              </Link>
            )}
          </div>

          {selected.refs.length > 0 && (
            <div className="chips" style={{ marginTop: 10 }}>
              {selected.refs.slice(0, 6).map((ref, i) => (
                <Link
                  key={`${ref.book}${ref.chapter}${ref.verse}-${i}`}
                  className="chip"
                  to={biblePath(ref.book, ref.chapter, ref.verse)}
                >
                  {index ? bookMeta(index, ref.book)?.abbr ?? ref.book : ref.book} {ref.chapter},{ref.verse}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
