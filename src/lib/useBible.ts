import { useEffect, useState } from 'react'
import type { BibleIndex, BookContent, VerseRef } from './bibleTypes'
import { loadBook, loadContext, loadIndex, verseText } from './bible'
import type { CommentaryEntry } from './bible'

/** Der Bibel-Index wird einmal geladen und danach von allen Seiten geteilt. */
export function useBibleIndex(): BibleIndex | null {
  const [index, setIndex] = useState<BibleIndex | null>(null)

  useEffect(() => {
    let alive = true
    loadIndex()
      .then((data) => alive && setIndex(data))
      .catch(() => alive && setIndex(null))
    return () => {
      alive = false
    }
  }, [])

  return index
}

export function useBook(bookId: string | undefined): { book: BookContent | null; error: string | null } {
  const [book, setBook] = useState<BookContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!bookId) return
    let alive = true
    setBook(null)
    setError(null)
    loadBook(bookId)
      .then((data) => alive && setBook(data))
      .catch((e: Error) => alive && setError(e.message))
    return () => {
      alive = false
    }
  }, [bookId])

  return { book, error }
}

export function useContext_(bookId: string | undefined): CommentaryEntry[] {
  const [entries, setEntries] = useState<CommentaryEntry[]>([])

  useEffect(() => {
    if (!bookId) return
    let alive = true
    setEntries([])
    loadContext(bookId).then((data) => alive && setEntries(data))
    return () => {
      alive = false
    }
  }, [bookId])

  return entries
}

export type ResolvedVerse = {
  text: string
  bookName: string
  abbr: string
  label: string
}

/** Text und Bezeichnung eines einzelnen Verses; null, solange geladen wird. */
export function useVerse(ref: VerseRef | null): ResolvedVerse | null {
  const { book } = useBook(ref?.book)

  if (!ref || !book) return null

  return {
    text: verseText(book, ref),
    bookName: book.name,
    abbr: book.abbr,
    label: `${book.name} ${ref.chapter},${ref.verse}`,
  }
}
