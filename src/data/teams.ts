/**
 * Dienstteams, Schichten und Onboarding.
 *
 * Beispielbestand: Die Teams sind typisch fuer eine Gemeinde dieser Groesse,
 * aber nicht der echte Bestand der FCG - der steht auf fcg-frankfurt.de/dienstteams.
 * Aufbau und Ablauf (Anfrage, Schicht, Checkliste) sind so gebaut, dass echte
 * Daten nur eingesetzt werden muessen.
 */

export type TeamArea = 'Sonntag' | 'Kinder & Jugend' | 'Musik & Technik' | 'Gastfreundschaft' | 'Organisation'

export type Team = {
  id: string
  name: string
  area: TeamArea
  short: string
  description: string
  /** Wo gerade Menschen fehlen. */
  needs: string[]
  rhythm: string
  contact: string
  /**
   * Gruppen-Id in ChurchTools. Erst wenn sie hier steht, holt die App Chat
   * und Dateien dieses Teams von dort - `server/check-churchtools.mjs`
   * listet die Ids der Instanz auf.
   */
  ctGroupId?: number
  /** Erweitertes Fuehrungszeugnis und Schutzkonzept-Schulung noetig. */
  protection?: boolean
  onboarding: string[]
}

export type Shift = {
  id: string
  teamId: string
  /** ISO-Datum des Einsatzes. */
  date: string
  role: string
  note?: string
}

export const teams: Team[] = [
  {
    id: 't-willkommen',
    name: 'Willkommensteam',
    area: 'Gastfreundschaft',
    short: 'Türen auf, Namen merken, Fragen beantworten',
    description:
      'Wer sonntags als Erstes gesehen wird, prägt den Eindruck vom ganzen Gottesdienst. Das Team begrüßt an der Tür, zeigt Gästen den Weg zu Kinderkirche, Café und Saal und ist ansprechbar für alle, die zum ersten Mal da sind.',
    needs: ['Begrüßung 10:00 Uhr', 'Ansprechpartner für Gäste'],
    rhythm: 'etwa einmal im Monat, ca. 90 Minuten vor Ort',
    contact: 'kontakt@fcg-frankfurt.de',
    onboarding: [
      'Einmal mitlaufen, ohne selbst zuständig zu sein',
      'Hausrundgang: Parken, Kinderkirche, Toiletten, Café, Stillraum',
      'Kurzeinführung: Wie spreche ich jemanden an, der neu ist?',
      'Ablaufplan und Kontaktliste im Team-Chat gespeichert',
    ],
  },
  {
    id: 't-technik',
    name: 'Technik & Ton',
    area: 'Musik & Technik',
    short: 'Ton, Licht, Beamer, Livestream',
    description:
      'Ohne dieses Team hört und sieht niemand etwas. Aufgaben verteilen sich auf Mischpult, Präsentation (Liedtexte und Bibelstellen), Kameraführung und Livestream. Vorkenntnisse sind nicht nötig - eingearbeitet wird Schritt für Schritt.',
    needs: ['Präsentation 12:00 Uhr', 'Kamera', 'Streamtechnik'],
    rhythm: 'zwei- bis dreimal im Quartal, Einsatz ab 60 Minuten vor Beginn',
    contact: 'kontakt@fcg-frankfurt.de',
    onboarding: [
      'Sicherheitseinweisung an der Technik',
      'Zweimal an der Seite eines erfahrenen Teammitglieds',
      'Presenter-Software: Liedtexte, Bibelstellen, Ankündigungen',
      'Checkliste vor dem Gottesdienst durchgehen',
      'Notfallablauf bei Ton- oder Streamausfall kennen',
    ],
  },
  {
    id: 't-lobpreis',
    name: 'Lobpreisteam',
    area: 'Musik & Technik',
    short: 'Musik im Gottesdienst',
    description:
      'Band und Gesang für beide Gottesdienste. Geprobt wird unter der Woche und am Sonntagmorgen. Neben Können zählt Verlässlichkeit: Wer zusagt, kommt zur Probe.',
    needs: ['Bass', 'Gesang (12:00 Uhr)'],
    rhythm: 'ein bis zwei Sonntage im Monat plus Probe',
    contact: 'kontakt@fcg-frankfurt.de',
    onboarding: [
      'Vorspielen in entspannter Runde',
      'Songliste und Tonarten im Team-Ordner',
      'Einmal bei einer Probe zuhören',
      'Ablauf am Sonntagmorgen: Soundcheck, Andacht, Start',
    ],
  },
  {
    id: 't-kinderkirche',
    name: 'Kinderkirche',
    area: 'Kinder & Jugend',
    short: 'Gottesdienst für 3 bis 11 Jahre',
    description:
      'Parallel zum Gottesdienst um 10:00 Uhr. Die Gruppen sind nach Alter geteilt, das Material wird gestellt. Gebraucht werden Menschen, die Kindern zuhören können - nicht Menschen mit pädagogischem Studium.',
    needs: ['Mitarbeit bei den Jüngeren', 'Springer für Krankheitsfälle'],
    rhythm: 'etwa jeden dritten Sonntag',
    contact: 'kontakt@fcg-frankfurt.de',
    protection: true,
    onboarding: [
      'Erweitertes Führungszeugnis vorlegen',
      'Schutzkonzept lesen und Selbstverpflichtung unterschreiben',
      'Schulung zu Nähe und Distanz besuchen',
      'Zweimal hospitieren, bevor eine Gruppe übernommen wird',
      'Notfallablauf und Abholregeln kennen',
    ],
  },
  {
    id: 't-evidence',
    name: 'Evidence - Jugendarbeit',
    area: 'Kinder & Jugend',
    short: 'Jugendliche von 12 bis 15',
    description:
      'Begleitung der Jugendlichen sonntags und beim Jugendabend unter der Woche. Es geht weniger um Programm als um verlässliche Erwachsene, die da sind und zuhören.',
    needs: ['Begleitung Jugendabend', 'Fahrdienst bei Aktionen'],
    rhythm: 'wöchentlich oder im Wechsel, nach Absprache',
    contact: 'kontakt@fcg-frankfurt.de',
    protection: true,
    onboarding: [
      'Erweitertes Führungszeugnis vorlegen',
      'Schutzkonzept lesen und Selbstverpflichtung unterschreiben',
      'Schulung zu Nähe und Distanz besuchen',
      'Regeln für Chats und Einzelgespräche kennen',
      'Erste Wochen gemeinsam mit einer erfahrenen Person',
    ],
  },
  {
    id: 't-cafe',
    name: 'Café & Küche',
    area: 'Gastfreundschaft',
    short: 'Kaffee, Kuchen, Gespräche danach',
    description:
      'Nach dem Gottesdienst entstehen die meisten Gespräche bei einer Tasse Kaffee. Das Team bereitet vor, schenkt aus und räumt auf - und ist damit näher am Gemeindeleben als viele denken.',
    needs: ['Ausschank nach dem 10-Uhr-Gottesdienst', 'Aufräumen'],
    rhythm: 'nach Plan, etwa einmal im Monat',
    contact: 'kontakt@fcg-frankfurt.de',
    onboarding: [
      'Hygieneunterweisung (kurz, einmalig)',
      'Küche kennenlernen: Geräte, Vorräte, Abrechnung',
      'Einmal im Team mitlaufen',
    ],
  },
  {
    id: 't-uebersetzung',
    name: 'Übersetzung',
    area: 'Sonntag',
    short: 'Simultan ins Englische',
    description:
      'Der 12-Uhr-Gottesdienst wird übersetzt. Gebraucht werden Menschen, die sicher zwischen Deutsch und Englisch wechseln - Erfahrung im Dolmetschen ist hilfreich, aber keine Bedingung.',
    needs: ['Deutsch/Englisch, 12:00 Uhr'],
    rhythm: 'im Wechsel, etwa zweimal im Quartal',
    contact: 'kontakt@fcg-frankfurt.de',
    onboarding: [
      'Technik der Übersetzungsanlage kennenlernen',
      'Eine Predigt zur Übung mitübersetzen, ohne Sendung',
      'Absprache mit dem Prediger über Manuskript und Bibelstellen',
    ],
  },
  {
    id: 't-aufbau',
    name: 'Aufbau & Ordnung',
    area: 'Organisation',
    short: 'Stühle, Räume, alles an seinen Platz',
    description:
      'Vor und nach dem Gottesdienst Räume herrichten, Stühle stellen, Material verräumen. Anspruchslos in der Sache, unverzichtbar im Ablauf - und ein guter Einstieg für alle, die erst einmal mitlaufen wollen.',
    needs: ['Aufbau sonntags früh', 'Abbau nach dem 12-Uhr-Gottesdienst'],
    rhythm: 'nach Plan, ca. 45 Minuten',
    contact: 'kontakt@fcg-frankfurt.de',
    onboarding: ['Einmal mitlaufen', 'Raumplan und Lager kennen'],
  },
]

function sundayIn(weeks: number, hour = 9, minute = 30): string {
  const d = new Date()
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7) + weeks * 7)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

/** Beispiel-Dienstplan der naechsten Wochen. */
export const shifts: Shift[] = [
  { id: 's1', teamId: 't-willkommen', date: sundayIn(0), role: 'Begrüßung Haupteingang', note: 'vor dem Gottesdienst um 10:00 Uhr' },
  { id: 's2', teamId: 't-technik', date: sundayIn(0, 8), role: 'Präsentation 10:00 Uhr' },
  { id: 's3', teamId: 't-cafe', date: sundayIn(1, 11), role: 'Ausschank nach dem Gottesdienst' },
  { id: 's4', teamId: 't-kinderkirche', date: sundayIn(1, 9, 45), role: 'Gruppe 6-8 Jahre', note: 'parallel zum 10-Uhr-Gottesdienst' },
  { id: 's5', teamId: 't-lobpreis', date: sundayIn(2, 8, 30), role: 'Gesang', note: 'Probe vor dem Gottesdienst' },
  { id: 's6', teamId: 't-uebersetzung', date: sundayIn(2, 11), role: 'Übersetzung 12:00 Uhr' },
  { id: 's7', teamId: 't-aufbau', date: sundayIn(3, 8), role: 'Aufbau Hauptsaal' },
  { id: 's8', teamId: 't-technik', date: sundayIn(3, 11), role: 'Streamtechnik 12:00 Uhr' },
]

export const teamAreas: TeamArea[] = [
  'Sonntag',
  'Kinder & Jugend',
  'Musik & Technik',
  'Gastfreundschaft',
  'Organisation',
]
