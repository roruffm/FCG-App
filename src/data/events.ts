import type { ChurchEvent } from './types'

/** Termine relativ zum heutigen Tag, damit die Demo immer aktuell wirkt. */
function inDays(days: number, hour: number, minute = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const events: ChurchEvent[] = [
  {
    id: 'e-gottesdienst',
    title: 'Gottesdienst',
    category: 'Gottesdienst',
    start: inDays(2, 10, 30),
    end: inDays(2, 12, 0),
    location: 'FCG Hauptsaal',
    description:
      'Gottesdienst mit Lobpreis, Predigt und Gebet. Kinderprogramm parallel ab 10:45 Uhr, Café ab 10:00 Uhr geöffnet.',
    registration: false,
    contact: 'buero@fcg-beispiel.de',
  },
  {
    id: 'e-alpha',
    title: 'Alpha-Kurs - Auftaktabend',
    category: 'Kurs',
    start: inDays(5, 19, 0),
    end: inDays(5, 21, 30),
    location: 'Gemeindezentrum, Raum 1',
    description:
      'Zehn Abende über die Grundfragen des Glaubens. Essen, Impuls, Gespräch in Kleingruppen. Keine Frage ist zu kritisch, keine Vorkenntnisse nötig. Kostenlos.',
    registration: true,
    seats: 40,
    taken: 27,
    contact: 'alpha@fcg-beispiel.de',
  },
  {
    id: 'e-real',
    title: 'REAL - Jugendabend',
    category: 'Jugend',
    start: inDays(4, 19, 30),
    end: inDays(4, 22, 0),
    location: 'Jugendkeller',
    description:
      'Jugendabend für alle ab 13 Jahren: Musik, Input, Kleingruppen und danach Kicker. Freunde ausdrücklich willkommen.',
    registration: false,
    contact: 'real@fcg-beispiel.de',
  },
  {
    id: 'e-gebetsnacht',
    title: 'Gebetsabend für die Stadt',
    category: 'Gebet',
    start: inDays(9, 19, 30),
    end: inDays(9, 21, 0),
    location: 'Kapelle',
    description:
      'Offene Gebetszeit in Stationen. Kommen und gehen jederzeit möglich. Auch für Menschen geeignet, die laut beten unangenehm finden.',
    registration: false,
    contact: 'gebet@fcg-beispiel.de',
  },
  {
    id: 'e-taufe',
    title: 'Taufgottesdienst',
    category: 'Gottesdienst',
    start: inDays(16, 10, 30),
    end: inDays(16, 12, 30),
    location: 'FCG Hauptsaal',
    description:
      'Taufgottesdienst mit anschließendem Gemeindeessen. Wer sich taufen lassen möchte, meldet sich bitte bis zwei Wochen vorher im Taufkurs an.',
    registration: true,
    seats: 250,
    taken: 118,
    contact: 'taufe@fcg-beispiel.de',
  },
  {
    id: 'e-nextsteps',
    title: 'Next Steps - Gemeinde kennenlernen',
    category: 'Kurs',
    start: inDays(12, 11, 0),
    end: inDays(12, 13, 30),
    location: 'Raum 3 + Brunch',
    description:
      'Zwei Stunden: Wer wir sind, was wir glauben, wie man mitmachen kann. Danach gemeinsamer Brunch und Möglichkeit, Ansprechpartner zu treffen.',
    registration: true,
    seats: 30,
    taken: 12,
    contact: 'nextsteps@fcg-beispiel.de',
  },
  {
    id: 'e-freizeit',
    title: 'Gemeindefreizeit Herbst',
    category: 'Freizeit',
    start: inDays(38, 16, 0),
    end: inDays(41, 14, 0),
    location: 'Freizeitheim Waldblick',
    description:
      'Drei Tage Gemeinde pur: Seminare, Spiele, Lagerfeuer, Kinderprogramm. Familienpreise und Ermäßigungen auf Anfrage - niemand soll aus finanziellen Gründen fehlen.',
    registration: true,
    seats: 90,
    taken: 71,
    contact: 'freizeit@fcg-beispiel.de',
  },
  {
    id: 'e-mitarbeiterdanke',
    title: 'Mitarbeiter-Dankeabend',
    category: 'Gemeinde',
    start: inDays(23, 18, 30),
    end: inDays(23, 21, 30),
    location: 'Foyer',
    description:
      'Abend für alle Ehrenamtlichen: Essen, Rückblick, Ausblick auf das kommende Halbjahr und Zeit zum Austausch zwischen den Teams.',
    registration: true,
    seats: 120,
    taken: 64,
    contact: 'teams@fcg-beispiel.de',
  },
]
