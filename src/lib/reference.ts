/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
import type { BibleIndex, BookMeta, ParsedReference } from './bibleTypes';

/**
 * Erkennt Stellenangaben in freier Eingabe, z. B. „Joh 3,16“, „1. Mose 1“,
 * „Psalm 23,1-6“ oder „1kor 13“. Buchnamen dürfen abgekürzt, kleingeschrieben
 * und ohne Punkte geschrieben werden; auch die lateinischen Namen (Genesis,
 * Apokalypse …) werden verstanden.
 */

/** Zusätzliche gebräuchliche Namen je Buch-ID. */
const ALIASES: Record<string, string[]> = {
  '1mo': ['genesis', 'gen', '1buchmose', '1mos'],
  '2mo': ['exodus', 'ex', '2buchmose', '2mos'],
  '3mo': ['levitikus', 'leviticus', 'lev', '3buchmose', '3mos'],
  '4mo': ['numeri', 'num', '4buchmose', '4mos'],
  '5mo': ['deuteronomium', 'dtn', 'deut', '5buchmose', '5mos'],
  ri: ['richter', 'jdc'],
  rut: ['ruth'],
  '1sam': ['1samuel'],
  '2sam': ['2samuel'],
  '1koe': ['1koenige', '1kon', '1kge', '1kg'],
  '2koe': ['2koenige', '2kon', '2kge', '2kg'],
  '1chr': ['1chronik', '1chronika'],
  '2chr': ['2chronik', '2chronika'],
  est: ['ester', 'esther'],
  hi: ['hiob', 'ijob', 'job'],
  ps: ['psalm', 'psalmen', 'psalter'],
  spr: ['sprueche', 'sprichwoerter', 'prv'],
  pred: ['prediger', 'kohelet', 'ekklesiastes', 'koh'],
  hld: ['hoheslied', 'hohelied', 'hoheliedsalomos', 'canticum'],
  klgl: ['klagelieder', 'threni', 'klg'],
  hes: ['hesekiel', 'ezechiel', 'ez'],
  obd: ['obadja', 'abdias', 'ob'],
  zef: ['zefanja', 'zephanja', 'sophonias'],
  mt: ['matthaeus', 'matthaus', 'matth'],
  mk: ['markus', 'marc', 'mark'],
  lk: ['lukas', 'luc', 'luk'],
  joh: ['johannes', 'johannesevangelium'],
  apg: ['apostelgeschichte', 'act', 'acta', 'taten'],
  roem: ['roemer', 'romer', 'rom'],
  '1kor': ['1korinther'],
  '2kor': ['2korinther'],
  gal: ['galater'],
  eph: ['epheser'],
  phil: ['philipper', 'php'],
  kol: ['kolosser'],
  '1thess': ['1thessalonicher', '1thes', '1th'],
  '2thess': ['2thessalonicher', '2thes', '2th'],
  '1tim': ['1timotheus'],
  '2tim': ['2timotheus'],
  tit: ['titus'],
  phlm: ['philemon', 'phlmn'],
  hebr: ['hebraeer', 'hebraer', 'heb'],
  jak: ['jakobus'],
  '1petr': ['1petrus', '1pet', '1pt'],
  '2petr': ['2petrus', '2pet', '2pt'],
  '1joh': ['1johannes', '1jo'],
  '2joh': ['2johannes', '2jo'],
  '3joh': ['3johannes', '3jo'],
  jud: ['judas', 'jud'],
  offb: ['offenbarung', 'apokalypse', 'apk', 'off', 'offb'],
};

/** Kleinschreibung, Umlaute aufgelöst, Satz- und Leerzeichen entfernt. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '');
}

function keysFor(book: BookMeta): string[] {
  return [
    normalize(book.id),
    normalize(book.abbr),
    normalize(book.name),
    ...(ALIASES[book.id] ?? []).map(normalize),
  ];
}

function matchBook(index: BibleIndex, raw: string): BookMeta | undefined {
  const needle = normalize(raw);
  if (!needle) return undefined;

  // Erst exakte Treffer, damit „joh“ nicht zu „johannes“-Briefen führt.
  for (const book of index.books) {
    if (keysFor(book).includes(needle)) return book;
  }
  // Dann eindeutige Präfixe.
  const partial = index.books.filter((b) => keysFor(b).some((k) => k.startsWith(needle)));
  return partial.length > 0 ? partial[0] : undefined;
}

/**
 * Zerlegt eine Eingabe in Buch, Kapitel und optionalen Versbereich.
 * Gibt `null` zurück, wenn kein Buch erkannt wurde.
 */
export function parseReference(input: string, index: BibleIndex): ParsedReference | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const withNumbers = trimmed.match(
    /^(.*?)\s*(\d+)\s*(?:[,:.]\s*(\d+)\s*(?:\s*[-–bis]+\s*(\d+))?)?\s*$/i,
  );

  if (withNumbers) {
    const [, rawBook, rawChapter, rawFrom, rawTo] = withNumbers;
    const book = matchBook(index, rawBook);
    if (book) {
      const chapter = clamp(Number.parseInt(rawChapter, 10), 1, book.chapters);
      const verseCount = book.verses[chapter - 1] ?? 1;
      const verseFrom = rawFrom ? clamp(Number.parseInt(rawFrom, 10), 1, verseCount) : undefined;
      const verseTo = rawTo ? clamp(Number.parseInt(rawTo, 10), 1, verseCount) : undefined;
      return { book, chapter, verseFrom, verseTo };
    }
  }

  // Reine Buchangabe ohne Kapitel („Johannes“) → Kapitel 1.
  const bookOnly = matchBook(index, trimmed);
  if (bookOnly) return { book: bookOnly, chapter: 1 };

  return null;
}

/** Bücher, deren Name zur Eingabe passt – für Vorschläge im Schnellsprung. */
export function suggestBooks(input: string, index: BibleIndex, limit = 6): BookMeta[] {
  const needle = normalize(input.replace(/\d+\s*[,:.]?\s*\d*\s*$/, ''));
  if (!needle) return [];
  const starts: BookMeta[] = [];
  const contains: BookMeta[] = [];
  for (const book of index.books) {
    const keys = keysFor(book);
    if (keys.some((k) => k.startsWith(needle))) starts.push(book);
    else if (keys.some((k) => k.includes(needle))) contains.push(book);
  }
  return [...starts, ...contains].slice(0, limit);
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}
