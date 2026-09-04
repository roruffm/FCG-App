/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
import type { VerseRef } from '../lib/bibleTypes';

/**
 * Kuratierte Verse für den täglichen Impuls. Die Auswahl ist bewusst breit:
 * Zuspruch und Anspruch, Klage und Lob, Altes und Neues Testament.
 */

export interface DailyVerse {
  ref: VerseRef;
  /** Ein Satz, der den Vers einordnet – kein Kommentar, sondern ein Anstoß. */
  impulse: string;
}

export const DAILY_VERSES: DailyVerse[] = [
  { ref: { book: 'ps', chapter: 23, verse: 1 }, impulse: 'Ein Königstitel wird hier zur persönlichen Zusage.' },
  { ref: { book: 'joh', chapter: 3, verse: 16 }, impulse: 'Gesagt in einem nächtlichen Gespräch mit einem, der sich nicht zeigen wollte.' },
  { ref: { book: 'mi', chapter: 6, verse: 8 }, impulse: 'Die kürzeste Antwort der Bibel auf die Frage, was Gott will.' },
  { ref: { book: 'jes', chapter: 43, verse: 1 }, impulse: 'Gesprochen zu Menschen, die im Exil ihre Identität verloren hatten.' },
  { ref: { book: 'klgl', chapter: 3, verse: 22 }, impulse: 'Dieser Trost steht mitten in einem Buch voller Trauer.' },
  { ref: { book: 'roem', chapter: 8, verse: 38 }, impulse: 'Paulus zählt auf, was trennen könnte – und streicht alles durch.' },
  { ref: { book: 'ps', chapter: 46, verse: 2 }, impulse: 'Ein Lied für Zeiten, in denen der Boden wankt.' },
  { ref: { book: 'mt', chapter: 5, verse: 9 }, impulse: 'Frieden stiften ist ein Tun, kein Gefühl.' },
  { ref: { book: 'spr', chapter: 3, verse: 5 }, impulse: 'Kein Verzicht auf Verstand, sondern auf Selbstüberschätzung.' },
  { ref: { book: 'phil', chapter: 4, verse: 6 }, impulse: 'Geschrieben von einem Gefangenen.' },
  { ref: { book: 'jos', chapter: 1, verse: 9 }, impulse: 'Mut wird hier nicht gefühlt, sondern zugesagt.' },
  { ref: { book: '1kor', chapter: 13, verse: 4 }, impulse: 'Gemeint ist zuerst das Miteinander in einer zerstrittenen Gemeinde.' },
  { ref: { book: 'ps', chapter: 139, verse: 14 }, impulse: 'Selbsterkenntnis als Staunen, nicht als Prüfung.' },
  { ref: { book: 'jer', chapter: 29, verse: 11 }, impulse: 'Eine Zusage an Menschen, deren Exil noch siebzig Jahre dauern sollte.' },
  { ref: { book: 'mt', chapter: 11, verse: 28 }, impulse: 'Eingeladen sind ausdrücklich die Erschöpften.' },
  { ref: { book: 'hebr', chapter: 11, verse: 1 }, impulse: 'Glaube als tragfähiger Boden, nicht als Vermutung.' },
  { ref: { book: 'gal', chapter: 5, verse: 22 }, impulse: 'Eine Frucht wächst – sie wird nicht erzwungen.' },
  { ref: { book: 'ps', chapter: 90, verse: 12 }, impulse: 'Ein Gebet um Realismus gegenüber der eigenen Lebenszeit.' },
  { ref: { book: 'jes', chapter: 40, verse: 31 }, impulse: 'Gesagt zu einer Generation, die am Ende ihrer Kraft war.' },
  { ref: { book: 'lk', chapter: 6, verse: 36 }, impulse: 'Der Maßstab ist nicht die eigene Leistung, sondern Gottes Umgang mit uns.' },
  { ref: { book: '1joh', chapter: 4, verse: 16 }, impulse: 'Kein Gefühl, sondern eine Aussage über Gottes Wesen.' },
  { ref: { book: 'ps', chapter: 121, verse: 1 }, impulse: 'Ein Wallfahrtslied für unterwegs – gesungen im Aufstieg nach Jerusalem.' },
  { ref: { book: 'pred', chapter: 3, verse: 1 }, impulse: 'Ein nüchterner Blick auf das, was sich nicht erzwingen lässt.' },
  { ref: { book: 'am', chapter: 5, verse: 24 }, impulse: 'Gottesdienst ohne Gerechtigkeit war den Propheten zuwider.' },
  { ref: { book: 'mt', chapter: 6, verse: 34 }, impulse: 'Keine Sorglosigkeit, sondern eine Begrenzung der Sorge auf heute.' },
  { ref: { book: 'roem', chapter: 12, verse: 2 }, impulse: 'Sich nicht anpassen – der Text meint konkrete Alltagsentscheidungen.' },
  { ref: { book: 'ps', chapter: 51, verse: 10 }, impulse: 'Ein Gebet nach schwerem Versagen – erbeten wird kein guter Vorsatz, sondern eine Neuschöpfung.' },
  { ref: { book: 'joh', chapter: 8, verse: 32 }, impulse: 'Wahrheit als etwas, das man tut, nicht nur weiß.' },
  { ref: { book: 'jak', chapter: 1, verse: 19 }, impulse: 'Drei Sätze, die Konflikte entschärfen.' },
  { ref: { book: '2kor', chapter: 12, verse: 9 }, impulse: 'Paulus schreibt über etwas, das ihn dauerhaft belastete.' },
  { ref: { book: 'ps', chapter: 34, verse: 19 }, impulse: 'Nähe wird gerade den Zerbrochenen zugesagt.' },
  { ref: { book: 'kol', chapter: 3, verse: 13 }, impulse: 'Vergebung wird hier als Übung beschrieben, nicht als Stimmung.' },
  { ref: { book: '5mo', chapter: 6, verse: 5 }, impulse: 'Das zentrale Bekenntnis des Judentums, zweimal täglich gesprochen.' },
  { ref: { book: 'offb', chapter: 21, verse: 4 }, impulse: 'Kein Jenseits fern der Erde – Gott zieht ein.' },
  { ref: { book: 'mk', chapter: 10, verse: 45 }, impulse: 'Der Maßstab für Führung wird hier umgedreht.' },
  { ref: { book: 'ps', chapter: 103, verse: 8 }, impulse: 'Eine Formel, die im Alten Testament immer wieder zitiert wird.' },
  { ref: { book: 'jes', chapter: 53, verse: 5 }, impulse: 'Der meistdiskutierte Text über stellvertretendes Leiden.' },
  { ref: { book: 'lk', chapter: 10, verse: 27 }, impulse: 'Zwei alte Gebote, die Jesus untrennbar zusammenbindet.' },
  { ref: { book: 'eph', chapter: 4, verse: 32 }, impulse: 'Gemeindealltag, nicht Gefühlslage.' },
  { ref: { book: 'ps', chapter: 27, verse: 1 }, impulse: 'Furchtlosigkeit wird hier begründet, nicht behauptet.' },
  { ref: { book: '1petr', chapter: 5, verse: 7 }, impulse: 'Sorgen abgeben – ein Bild aus der Lastenträgersprache.' },
  { ref: { book: 'hos', chapter: 11, verse: 8 }, impulse: 'Gott ringt hier sichtbar mit sich selbst.' },
  { ref: { book: 'mt', chapter: 28, verse: 20 }, impulse: 'Der letzte Satz des Evangeliums ist eine Zusage, kein Auftrag.' },
  { ref: { book: 'ps', chapter: 130, verse: 1 }, impulse: 'Aus der Tiefe zu rufen ist erlaubt – und biblisch bezeugt.' },
  { ref: { book: 'gal', chapter: 3, verse: 28 }, impulse: 'Eine frühe Taufformel, die drei Grenzen der Antike durchstreicht.' },
  { ref: { book: 'joh', chapter: 13, verse: 34 }, impulse: 'Neu ist nicht das Gebot, sondern sein Maßstab.' },
  { ref: { book: 'hi', chapter: 19, verse: 25 }, impulse: 'Ein Vertrauenssatz mitten in der Anklage gegen Gott.' },
  { ref: { book: 'zef', chapter: 3, verse: 17 }, impulse: 'Ein selten zitiertes Bild: Gott jubelt über Menschen.' },
  { ref: { book: '1mo', chapter: 1, verse: 27 }, impulse: 'Was im Alten Orient nur dem König galt, gilt hier jedem Menschen.' },
  { ref: { book: 'ps', chapter: 119, verse: 105 }, impulse: 'Eine Lampe leuchtet nur den nächsten Schritt aus.' },
];

/** Wählt den Vers des Tages – gleiches Datum ergibt immer denselben Vers. */
export function verseOfDay(date: Date = new Date()): DailyVerse {
  const day = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  return DAILY_VERSES[((day % DAILY_VERSES.length) + DAILY_VERSES.length) % DAILY_VERSES.length];
}

/**
 * Vers des Tages - fuer alle Nutzer derselbe, abgeleitet aus dem Datum.
 * Die Liste stammt aus dem Schwesterprojekt und ist bewusst breit angelegt.
 */
export function dailyVerse(date = new Date()): DailyVerse {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}
