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

/** Hauptliste je Rolle - der Weg, den diese Rolle am haeufigsten geht. */
export const jetzt: Record<Rolle, Gruppe> = {
  gast: {
    titel: 'Der erste Schritt',
    zeilen: [
      { kuerzel: 'NH', label: 'Neu hier?', hinweis: 'Ablauf, Kinder, Anfahrt', ziel: '/neu-hier' },
      { kuerzel: 'PR', label: 'Predigt hören', hinweis: 'Archiv und Fragen stellen', ziel: '/predigten' },
      { kuerzel: 'CG', label: 'Connectgruppe finden', hinweis: 'Nach Stadtteil und Lebensphase', ziel: '/gruppen' },
      { kuerzel: 'KT', label: 'Zeiten und Anfahrt', hinweis: church.address.street, ziel: '/kontakt' },
      { kuerzel: 'WI', label: 'Wiki', hinweis: 'Ablauf, Kirchendeutsch, häufige Fragen', ziel: '/wiki' },
    ],
  },
  mitglied: {
    titel: 'Dein Bereich',
    zeilen: [
      { kuerzel: 'TM', label: 'Meine Teams', hinweis: 'Chat, Dokumente, Dienste', ziel: '/teams' },
      { kuerzel: 'ICH', label: 'Mein Bereich', hinweis: 'Favoriten, Anmeldungen, Notizen', ziel: '/profil' },
      { kuerzel: 'MM', label: 'Mitmachen', ziel: '/mitmachen' },
      { kuerzel: 'WI', label: 'Wiki', hinweis: 'Mitgliedschaft, Taufe, Seelsorge, Mitarbeit', ziel: '/wiki' },
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
      { kuerzel: 'WI', label: 'Wiki', hinweis: 'Schutzkonzept, Datenschutz, Abläufe', ziel: '/wiki' },
    ],
  },
}

export const mehr: Record<Rolle, Gruppe[]> = {
  gast: [
    {
      titel: 'Täglich',
      zeilen: [
            { label: 'Gebetsanliegen teilen', ziel: '/gebet' },
      ],
    },
    {
      titel: 'Kennenlernen',
      zeilen: [
        { label: 'Kurse und Seminare', ziel: church.web.kurse, extern: true },
        { label: 'Taufe', ziel: church.web.taufe, extern: true },
        { label: 'Alle Termine', ziel: '/events' },
        { label: 'Gebetsanliegen teilen', ziel: '/gebet' },
      ],
    },
    {
      titel: 'Folgen und unterstützen',
      zeilen: [
        { label: 'Newsletter abonnieren', ziel: church.web.newsletter, extern: true },
        { label: 'Spenden', ziel: church.web.spende, extern: true },
          { label: 'Facebook', ziel: church.social.facebook, extern: true },
      ],
    },
  ],
  mitglied: [
    {
      titel: 'Täglich',
      zeilen: [
            { label: 'Gebetsanliegen teilen', ziel: '/gebet' },
      ],
    },
    {
      titel: 'Gemeinde',
      zeilen: [
        { label: 'Meine Connectgruppe', ziel: '/gruppen' },
        { label: 'Gebetsanliegen teilen', ziel: '/gebet' },
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
          ],
    },
  ],
}
