import type { ChurchEvent } from './types'

/**
 * Termine relativ zum heutigen Tag, damit die Demo immer aktuell wirkt.
 * Gottesdienstzeiten, Ort und Kinderangebote entsprechen den oeffentlichen
 * Angaben der FCG Frankfurt; alle uebrigen Termine sind Beispiele.
 */
function nextSunday(hour: number, minute = 0, weeksAhead = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7) + weeksAhead * 7)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

function inDays(days: number, hour: number, minute = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

const HAUS = 'Eckenheimer Landstr. 180'

export const events: ChurchEvent[] = [
  {
    id: 'e-gd-10',
    title: 'Gottesdienst 10:00 Uhr',
    category: 'Gottesdienst',
    start: nextSunday(10),
    end: nextSunday(11, 30),
    location: HAUS,
    description:
      'Gottesdienst in familiärer Atmosphäre. Parallel Kinderkirche für 3-11 Jahre und Evidence für 12-15 Jahre. Eltern-Kind-Raum mit Live-Übertragung, Übersetzung und Livestream verfügbar.',
    registration: false,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-gd-12',
    title: 'Gottesdienst 12:00 Uhr',
    category: 'Gottesdienst',
    start: nextSunday(12),
    end: nextSunday(13, 30),
    location: HAUS,
    description:
      'Gottesdienst mit kraftvollem Lobpreis - gut geeignet, um Freunde mitzubringen. Kinderbetreuung für 3-11 Jahre parallel.',
    registration: false,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-connect-start',
    title: 'Startpunkt: Connectgruppen-Abend',
    category: 'Kurs',
    start: inDays(5, 19, 30),
    end: inDays(5, 21, 30),
    location: HAUS,
    description:
      'Beispieltermin: Abend für alle, die eine Connectgruppe suchen. Kurze Vorstellung der Gruppen, danach Gespräch mit den Leitungen - und im besten Fall gehst du mit einer Einladung nach Hause.',
    registration: true,
    seats: 40,
    taken: 23,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-evidence',
    title: 'Evidence - Jugendabend',
    category: 'Jugend',
    start: inDays(4, 19, 0),
    end: inDays(4, 21, 30),
    location: 'Jugendraum, ' + HAUS,
    description:
      'Beispieltermin: Jugendabend für 12-15 Jahre mit Musik, Impuls und Kleingruppen. Freunde ausdrücklich willkommen.',
    registration: false,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-gebet',
    title: 'Gebetsabend für die Stadt',
    category: 'Gebet',
    start: inDays(9, 19, 30),
    end: inDays(9, 21, 0),
    location: HAUS,
    description:
      'Beispieltermin: offene Gebetszeit in Stationen. Kommen und gehen jederzeit möglich - auch für Menschen geeignet, denen lautes Beten unangenehm ist.',
    registration: false,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-taufe',
    title: 'Taufgottesdienst',
    category: 'Gottesdienst',
    start: nextSunday(10, 0, 2),
    end: nextSunday(12, 30, 2),
    location: HAUS,
    description:
      'Beispieltermin: Taufgottesdienst mit anschließendem Gemeindeessen. Wer sich taufen lassen möchte, meldet sich vorher im Taufkurs an.',
    registration: true,
    seats: 250,
    taken: 118,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-koenigskinder',
    title: 'Königskinder - Familiennachmittag',
    category: 'Gemeinde',
    start: inDays(12, 15, 0),
    end: inDays(12, 18, 0),
    location: HAUS,
    description:
      'Beispieltermin: Nachmittag für Familien mit Kindern von 3-11 Jahren - Spiele, Basteln, biblische Geschichte und Kaffee für die Eltern.',
    registration: true,
    seats: 60,
    taken: 31,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-freizeit',
    title: 'Gemeindefreizeit Herbst',
    category: 'Freizeit',
    start: inDays(38, 16, 0),
    end: inDays(41, 14, 0),
    location: 'Freizeitheim (Beispiel)',
    description:
      'Beispieltermin: drei Tage Gemeinde pur mit Seminaren, Spielen und Kinderprogramm. Ermäßigungen auf Anfrage - niemand soll aus finanziellen Gründen fehlen.',
    registration: true,
    seats: 90,
    taken: 71,
    contact: 'kontakt@fcg-frankfurt.de',
  },
  {
    id: 'e-mitarbeiterdanke',
    title: 'Mitarbeiter-Dankeabend',
    category: 'Gemeinde',
    start: inDays(23, 18, 30),
    end: inDays(23, 21, 30),
    location: HAUS,
    description:
      'Beispieltermin: Abend für alle Ehrenamtlichen mit Essen, Rückblick und Ausblick auf das kommende Halbjahr.',
    registration: true,
    seats: 120,
    taken: 64,
    contact: 'kontakt@fcg-frankfurt.de',
  },
]
