import { church } from './church'

/**
 * Startseite nach Rollen - umgesetzt aus dem Entwurf "FCG Start 1b".
 *
 * Gast, Mitglied und Leader suchen Verschiedenes. Oben waehlt man die Rolle,
 * darunter steht genau eine Liste: Aufmacher, fuenf Ziele, fertig. Die frueheren
 * Gruppen unter "Mehr anzeigen" sind entfallen - sie waren eine zweite,
 * ungeordnete Linkwand unter der ersten.
 *
 * Was dabei von der Startseite verschwindet, ist nicht verloren: Kurse, Taufe
 * und Gemeinschaften stehen auf der Kontakt- und der Gruppenseite, alle Termine
 * hinter dem Kalender-Knopf.
 */

export type Rolle = 'gast' | 'mitglied' | 'staff'

export const rollen: { id: Rolle; label: string; hinweis: string }[] = [
  { id: 'gast', label: 'Gast', hinweis: 'Zeigt zuerst, was am Sonntag zählt.' },
  { id: 'mitglied', label: 'Mitglied', hinweis: 'Zeigt zuerst Teams, Dienste und Anmeldungen.' },
  { id: 'staff', label: 'Leader', hinweis: 'Zeigt zuerst Leitungs- und Arbeitswege.' },
]

export type Zeile = {
  /** Zwei bis drei Buchstaben als Marke in der Liste. */
  kuerzel: string
  label: string
  hinweis: string
  ziel: string
  extern?: boolean
}

export type Gruppe = { titel: string; zeilen: Zeile[] }

/** Die eine Liste je Rolle - der Weg, den diese Rolle am haeufigsten geht. */
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
      { kuerzel: 'MM', label: 'Mitmachen', hinweis: 'Teams suchen Verstärkung', ziel: '/mitmachen' },
      { kuerzel: 'CG', label: 'Meine Connectgruppe', hinweis: 'Treffen und Kontakt', ziel: '/gruppen' },
      { kuerzel: 'GB', label: 'Gebetsanliegen teilen', hinweis: 'Vertraulich an das Gebetsteam', ziel: '/gebet' },
      { kuerzel: 'WI', label: 'Wiki', hinweis: 'Mitgliedschaft, Taufe, Seelsorge', ziel: '/wiki' },
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
