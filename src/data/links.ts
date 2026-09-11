import { church } from './church'

/**
 * Startseite nach Rollen.
 *
 * Aus dem Entwurf "Start Redesign": Statt einer Linkwand fuer alle zeigt die
 * Startseite drei Sichten - Gast, Mitglied, Staff. Jede hat ihren eigenen
 * Aufmacher, ihre eigene Hauptliste und ihre eigenen Gruppen unter "Mehr".
 * Die Kanaele bleiben fuer alle gleich.
 */

export type Rolle = 'gast' | 'mitglied' | 'staff'

export const rollen: { id: Rolle; label: string; hinweis: string }[] = [
  { id: 'gast', label: 'Gast', hinweis: 'Zeigt zuerst, was am Sonntag zählt.' },
  { id: 'mitglied', label: 'Mitglied', hinweis: 'Zeigt zuerst Teams, Dienste und Anmeldungen.' },
  { id: 'staff', label: 'Staff', hinweis: 'Zeigt zuerst Leitungs- und Arbeitswege.' },
]

export type Zeile = {
  /** Zwei bis drei Buchstaben als Marke in der Liste. */
  kuerzel?: string
  label: string
  hinweis?: string
  ziel: string
  extern?: boolean
}

export type Gruppe = { titel: string; zeilen: Zeile[] }

export type Kachel = {
  kuerzel: string
  label: string
  status: string
  ziel?: string
}

/** Hauptliste je Rolle - der Weg, den diese Rolle am haeufigsten geht. */
export const jetzt: Record<Rolle, Gruppe> = {
  gast: {
    titel: 'Der erste Schritt',
    zeilen: [
      { kuerzel: 'NH', label: 'Neu hier?', hinweis: 'Ablauf, Kinder, Anfahrt', ziel: '/neu-hier' },
      { kuerzel: 'PR', label: 'Predigt hören', hinweis: 'Archiv und Fragen stellen', ziel: '/predigten' },
      { kuerzel: 'CG', label: 'Connectgruppe finden', hinweis: 'Nach Stadtteil und Lebensphase', ziel: '/gruppen' },
      { kuerzel: 'KT', label: 'Zeiten und Anfahrt', hinweis: church.address.street, ziel: '/kontakt' },
    ],
  },
  mitglied: {
    titel: 'Dein Bereich',
    zeilen: [
      { kuerzel: 'TM', label: 'Meine Teams', hinweis: 'Chat, Dokumente, Dienste', ziel: '/teams' },
      { kuerzel: 'ICH', label: 'Mein Bereich', hinweis: 'Favoriten, Anmeldungen, Notizen', ziel: '/profil' },
      { kuerzel: 'MM', label: 'Mitmachen', ziel: '/mitmachen' },
      { kuerzel: 'BI', label: 'Bibel lesen', hinweis: 'Text, Karte, Lexikon, Lesepläne', ziel: '/bibel' },
    ],
  },
  staff: {
    titel: 'Arbeitswege',
    zeilen: [
      {
        kuerzel: 'CT',
        label: 'Teambereich in ChurchTools',
        hinweis: 'Dienstpläne und Gruppen',
        ziel: church.web.churchtools,
        extern: true,
      },
      {
        kuerzel: 'IN',
        label: 'Interner Bereich der Website',
        hinweis: 'Unterlagen für Mitarbeitende',
        ziel: church.web.intern,
        extern: true,
      },
      {
        kuerzel: 'PU',
        label: 'PULS Leiterschaftsnetzwerk',
        hinweis: 'Termine und Material',
        ziel: church.web.puls,
        extern: true,
      },
      { kuerzel: 'TM', label: 'Meine Teams', hinweis: 'Chat, Dokumente, Dienste', ziel: '/teams' },
    ],
  },
}

export const kanaele: Kachel[] = [
  { kuerzel: 'WEB', label: 'Website', status: 'fcg-frankfurt.de', ziel: church.web.home },
  { kuerzel: 'CT', label: 'ChurchTools', status: 'Anmeldung', ziel: church.web.churchtools },
  { kuerzel: 'YT', label: 'YouTube', status: 'Livestream', ziel: church.social.youtube },
  { kuerzel: 'IG', label: 'Instagram', status: 'täglich', ziel: church.social.instagram },
  { kuerzel: 'SP', label: 'Spotify', status: 'Predigten', ziel: church.social.spotify },
  { kuerzel: 'WIKI', label: 'Wiki', status: 'in Vorbereitung', ziel: church.web.wiki || undefined },
]

export const mehr: Record<Rolle, Gruppe[]> = {
  gast: [
    {
      titel: 'Täglich',
      zeilen: [
        { label: 'Vers des Tages', hinweis: 'Ein Vers mit Einordnung', ziel: '/impuls' },
        { label: 'Bibel lesen', hinweis: 'Text, Karte, Lexikon', ziel: '/bibel' },
        { label: 'Gebetsanliegen teilen', ziel: '/gebet' },
      ],
    },
    {
      titel: 'Kennenlernen',
      zeilen: [
        { label: 'Kurse und Seminare', ziel: church.web.kurse, extern: true },
        { label: 'Taufe', ziel: church.web.taufe, extern: true },
        { label: 'Alle Termine', ziel: '/events' },
      ],
    },
    {
      titel: 'Folgen und unterstützen',
      zeilen: [
        { label: 'Newsletter abonnieren', ziel: church.web.newsletter, extern: true },
        { label: 'Spenden', ziel: church.web.spende, extern: true },
        { label: 'Apple Podcasts', ziel: church.social.applePodcasts, extern: true },
        { label: 'Facebook', ziel: church.social.facebook, extern: true },
      ],
    },
  ],
  mitglied: [
    {
      titel: 'Täglich',
      zeilen: [
        { label: 'Vers des Tages', hinweis: 'Ein Vers mit Einordnung', ziel: '/impuls' },
        { label: 'Lesepläne', ziel: '/bibel/plaene' },
        { label: 'Gebetsanliegen teilen', ziel: '/gebet' },
      ],
    },
    {
      titel: 'Gemeinde',
      zeilen: [
        { label: 'Meine Connectgruppe', ziel: '/gruppen' },
        { label: 'Unsere Gemeinschaften', ziel: church.web.gemeinschaften, extern: true },
        { label: 'Alle Termine und Anmeldungen', ziel: '/events' },
        { label: 'Kurse und Seminare', ziel: church.web.kurse, extern: true },
      ],
    },
    {
      titel: 'Folgen und unterstützen',
      zeilen: [
        { label: 'Newsletter abonnieren', ziel: church.web.newsletter, extern: true },
        { label: 'Spenden', ziel: church.web.spende, extern: true },
        { label: 'Apple Podcasts', ziel: church.social.applePodcasts, extern: true },
      ],
    },
  ],
  staff: [
    {
      titel: 'Leitung',
      zeilen: [
        {
          label: 'Leitungsdashboard',
          hinweis: 'Zahlen und Auswertungen · Anmeldung nötig',
          ziel: church.web.leitungsdashboard,
          extern: true,
        },
        { label: 'Dienstteams verwalten', ziel: church.web.churchtools, extern: true },
        { label: 'Mitmachen: offene Gesuche', ziel: '/mitmachen' },
      ],
    },
    {
      titel: 'Gemeinde',
      zeilen: [
        { label: 'Alle Termine und Anmeldungen', ziel: '/events' },
        { label: 'Connectgruppen', ziel: '/gruppen' },
        { label: 'Unsere Gemeinschaften', ziel: church.web.gemeinschaften, extern: true },
      ],
    },
    {
      titel: 'Für mich',
      zeilen: [
        { label: 'Mein Bereich', hinweis: 'Favoriten, Anmeldungen, Notizen', ziel: '/profil' },
        { label: 'Bibel lesen', ziel: '/bibel' },
        { label: 'Vers des Tages', ziel: '/impuls' },
      ],
    },
  ],
}
