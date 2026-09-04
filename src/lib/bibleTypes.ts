/**
 * Typen des Bibeltextes.
 *
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study), damit Datensatz und Zugriff in beiden
 * Anwendungen identisch bleiben.
 */

export type Testament = 'AT' | 'NT';

export interface GroupMeta {
  id: string;
  label: string;
  testament: Testament;
}

export interface BookMeta {
  id: string;
  name: string;
  abbr: string;
  group: string;
  testament: Testament;
  /** Anzahl der Kapitel */
  chapters: number;
  /** Anzahl der Verse je Kapitel, Index 0 = Kapitel 1 */
  verses: number[];
}

export interface BibleIndex {
  translation: string;
  groups: GroupMeta[];
  books: BookMeta[];
}

export interface BookContent {
  id: string;
  name: string;
  abbr: string;
  /** chapters[k][v] = Text von Kapitel k+1, Vers v+1 */
  chapters: string[][];
  /**
   * Abweichende Zählung der gedruckten Lutherbibel, Schlüssel „kapitel.vers“.
   * Der Datenbestand folgt der englischen Zählung; wo beide auseinandergehen,
   * steht hier die Luther-Angabe, etwa „3,1“ für Joel 2,28.
   */
  alt?: Record<string, string>;
}

/** Verweis auf einen einzelnen Vers. */

export interface VerseRef {
  book: string;
  chapter: number;
  verse: number;
}

/** Ergebnis der Referenz-Eingabe: Kapitel, optional mit Versbereich. */

export interface ParsedReference {
  book: BookMeta;
  chapter: number;
  verseFrom?: number;
  verseTo?: number;
}
