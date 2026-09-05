/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
import { lexiconMatcher, type LexiconEntry } from '../data/lexicon';

/**
 * Zerlegt die Verse eines Kapitels in Abschnitte und markiert dabei die
 * Wörter, zu denen ein Lexikoneintrag vorliegt.
 *
 * Verlinkt wird bewusst nur das **erste Vorkommen je Kapitel**. Würde jedes
 * „Jesus“ und jedes „Jerusalem“ hervorgehoben, wäre der Text nicht mehr zu
 * lesen – der Hinweis soll auffallen, ohne den Lesefluss zu zerhacken.
 *
 * Die Funktion ist frei von Nebenwirkungen: Für dieselben Verse liefert sie
 * dasselbe Ergebnis, was sie für `useMemo` geeignet macht.
 */

export interface TextSegment {
  text: string;
  /** Gesetzt, wenn dieser Abschnitt ein Lexikonstichwort ist. */
  entryId?: string;
}

/**
 * Alle Lexikoneinträge, die in **diesem einen Vers** vorkommen.
 *
 * Anders als bei der Hervorhebung im Fließtext wird hier nichts ausgelassen:
 * Das Vers-Panel soll zu jedem Vers zeigen, was sich darin nachschlagen lässt
 * – auch dann, wenn der Begriff im Kapitel schon einmal markiert war.
 */
export function lexiconInVerse(text: string): LexiconEntry[] {
  const { pattern, byTerm } = lexiconMatcher();
  const found = new Map<string, LexiconEntry>();

  for (const match of text.matchAll(pattern)) {
    const entry = byTerm.get(match[0]);
    if (entry && !found.has(entry.id)) found.set(entry.id, entry);
  }
  return [...found.values()];
}

export function segmentChapter(verses: string[]): TextSegment[][] {
  const { pattern, byTerm } = lexiconMatcher();
  const linked = new Set<string>();

  return verses.map((text) => {
    const segments: TextSegment[] = [];
    let cursor = 0;

    for (const match of text.matchAll(pattern)) {
      const entry = byTerm.get(match[0]);
      if (!entry || linked.has(entry.id)) continue;

      const start = match.index ?? 0;
      if (start > cursor) segments.push({ text: text.slice(cursor, start) });
      segments.push({ text: match[0], entryId: entry.id });
      linked.add(entry.id);
      cursor = start + match[0].length;
    }

    if (cursor < text.length) segments.push({ text: text.slice(cursor) });
    return segments.length > 0 ? segments : [{ text }];
  });
}
