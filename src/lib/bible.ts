import type { BibleIndex, BookContent, BookMeta, VerseRef } from './bibleTypes'

/**
 * Zugriff auf den Bibeltext (Lutherbibel 1912, gemeinfrei).
 *
 * Der Datensatz stammt aus dem Schwesterprojekt "Entgegen - Bibel lesen und
 * verstehen" (github.com/roruffm/bible-study), Rohdaten von wldeh/bible-api.
 * Buecher werden einzeln und erst bei Bedarf geladen; die Einzeldatei-Demo
 * legt denselben Datensatz unter `window.__FCG_BIBEL__` bereit.
 */

export const TRANSLATION_LABEL = 'Lutherbibel 1912'

/**
 * Die Einzeldatei-Demo legt Index, Buecher und Kontextartikel als
 * <script type="application/json"> in die Seite. Sie werden erst beim
 * Zugriff ausgewertet - so bleibt der Start schnell, obwohl alles dabei ist.
 */
function embeddedJson<T>(id: string): T | null {
  if (typeof document === 'undefined') return null
  const el = document.getElementById(id)
  if (!el?.textContent) return null
  try {
    return JSON.parse(el.textContent) as T
  } catch {
    return null
  }
}

export type Interpretation = { tradition: string; text: string }
export type CrossReference = { book: string; chapter: number; verse: number; note?: string }
export type WorldNote = { aspect: string; text: string }
export type TermNote = { word: string; rendered?: string; note: string }

/** Artikel zu historischem Kontext und Auslegungen, aus demselben Schwesterprojekt. */
export type CommentaryEntry = {
  book: string
  chapter: number
  from: number
  to: number
  title: string
  historicalShort: string
  historicalLong?: string
  reception?: string
  world?: WorldNote[]
  terms?: TermNote[]
  interpretations: Interpretation[]
  crossRefs?: CrossReference[]
  sources?: string[]
  dating?: { label?: string; text?: string } & Record<string, unknown>
}

const BASE = `${import.meta.env.BASE_URL}bibel/luther1912`
const CONTEXT_BASE = `${import.meta.env.BASE_URL}kontext`

let indexPromise: Promise<BibleIndex> | null = null
const bookPromises = new Map<string, Promise<BookContent>>()
const contextPromises = new Map<string, Promise<CommentaryEntry[]>>()

export function loadIndex(): Promise<BibleIndex> {
  const local = embeddedJson<BibleIndex>('fcg-bibel-index')
  if (local) return Promise.resolve(local)

  if (!indexPromise) {
    indexPromise = fetch(`${BASE}/index.json`).then((r) => {
      if (!r.ok) throw new Error(`Bibel-Index nicht gefunden (${r.status})`)
      return r.json() as Promise<BibleIndex>
    })
    indexPromise.catch(() => {
      indexPromise = null
    })
  }
  return indexPromise
}

export function loadBook(bookId: string): Promise<BookContent> {
  const local = embeddedJson<BookContent>(`fcg-bibel-${bookId}`)
  if (local) return Promise.resolve(local)

  let promise = bookPromises.get(bookId)
  if (!promise) {
    promise = fetch(`${BASE}/${bookId}.json`).then((r) => {
      if (!r.ok) throw new Error(`Buch "${bookId}" nicht gefunden (${r.status})`)
      return r.json() as Promise<BookContent>
    })
    promise.catch(() => bookPromises.delete(bookId))
    bookPromises.set(bookId, promise)
  }
  return promise
}

/** Kontextartikel eines Buches; leer, wenn zu diesem Buch noch keine vorliegen. */
export function loadContext(bookId: string): Promise<CommentaryEntry[]> {
  const local = embeddedJson<CommentaryEntry[]>(`fcg-kontext-${bookId}`)
  if (local) return Promise.resolve(local)

  let promise = contextPromises.get(bookId)
  if (!promise) {
    promise = fetch(`${CONTEXT_BASE}/${bookId}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<CommentaryEntry[]>) : []))
      .catch(() => [])
    contextPromises.set(bookId, promise)
  }
  return promise
}

export function contextFor(entries: CommentaryEntry[], chapter: number, verse?: number): CommentaryEntry[] {
  return entries.filter(
    (e) => e.chapter === chapter && (verse === undefined || (verse >= e.from && verse <= e.to))
  )
}

export function bookMeta(index: BibleIndex, bookId: string): BookMeta | undefined {
  return index.books.find((b) => b.id === bookId)
}

/** Verse eines Kapitels, optional auf einen Bereich begrenzt (1-basiert, einschliesslich). */
export function passage(book: BookContent, chapter: number, from?: number, to?: number): string[] {
  const verses = book.chapters[chapter - 1] ?? []
  if (from === undefined) return verses
  return verses.slice(from - 1, (to ?? from))
}

export function verseText(book: BookContent, ref: VerseRef): string {
  return book.chapters[ref.chapter - 1]?.[ref.verse - 1] ?? ''
}

export function refLabel(abbr: string, chapter: number, from?: number, to?: number): string {
  if (from === undefined) return `${abbr} ${chapter}`
  return to && to !== from ? `${abbr} ${chapter},${from}-${to}` : `${abbr} ${chapter},${from}`
}

/** Pfad in der App zu einer Stelle. */
export function biblePath(bookId: string, chapter: number, verse?: number): string {
  return `/bibel/${bookId}/${chapter}${verse ? `?v=${verse}` : ''}`
}

let corpus: { ref: VerseRef; bookName: string; abbr: string; text: string }[] | null = null
let corpusPromise: Promise<void> | null = null

/** Laedt alle Buecher einmalig, damit die Volltextsuche ohne Server arbeitet. */
export function buildCorpus(onProgress?: (done: number, total: number) => void): Promise<void> {
  if (corpus) return Promise.resolve()
  if (corpusPromise) return corpusPromise

  corpusPromise = loadIndex().then(async (index) => {
    const rows: NonNullable<typeof corpus> = []
    let done = 0
    for (const meta of index.books) {
      const book = await loadBook(meta.id)
      book.chapters.forEach((verses, ci) =>
        verses.forEach((text, vi) =>
          rows.push({
            ref: { book: meta.id, chapter: ci + 1, verse: vi + 1 },
            bookName: meta.name,
            abbr: meta.abbr,
            text,
          })
        )
      )
      done += 1
      onProgress?.(done, index.books.length)
    }
    corpus = rows
  })
  corpusPromise.catch(() => {
    corpusPromise = null
  })
  return corpusPromise
}

export type BibleHit = { ref: VerseRef; bookName: string; abbr: string; text: string }

export function searchCorpus(query: string, limit = 60): BibleHit[] {
  if (!corpus) return []
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2)
  if (terms.length === 0) return []

  const hits: BibleHit[] = []
  for (const row of corpus) {
    const haystack = row.text.toLowerCase()
    if (terms.every((t) => haystack.includes(t))) {
      hits.push(row)
      if (hits.length >= limit) break
    }
  }
  return hits
}

export function corpusReady(): boolean {
  return corpus !== null
}
