import { church } from './church'

/**
 * Der Linktree in drei Ebenen - bewusst knapp gehalten:
 *
 *   kanaele      sechs Kacheln: die Anlaufstellen ausserhalb der App
 *   appBereiche  sechs Zeilen: was die App selbst bietet
 *   mehr         alles Weitere, eingeklappt hinter "Mehr"
 *
 * Alles, was jemand am Sonntag oder als Neuer sucht, steht damit ohne
 * Scrollen da; der lange Rest bleibt erreichbar, aber im Weg ist er nicht.
 */

export type IconName = 'globe' | 'video' | 'camera' | 'headphones' | 'users' | 'wiki'

export type Kachel = {
  label: string
  icon: IconName
  ziel?: string
  /** Ohne Ziel: angekuendigt, aber noch nicht verlinkt. */
  geplant?: boolean
}

/** Kleine runde Symbole - die Kanaele, die man an ihrem Zeichen erkennt. */
export type Symbolziel = {
  label: string
  icon: IconName
  ziel: string
}

export type Zeile = {
  label: string
  hinweis?: string
  ziel: string
  extern?: boolean
}

/** Die drei Portale, in denen man sich laenger aufhaelt. */
export const kanaele: Kachel[] = [
  { label: 'Website', icon: 'globe', ziel: church.web.home },
  { label: 'ChurchTools', icon: 'users', ziel: church.web.churchtools },
  { label: 'Wiki', icon: 'wiki', ziel: church.web.wiki || undefined, geplant: !church.web.wiki },
]

/** Kanaele zum Zuschauen und Hoeren - als Symbol erkennbar, spart Platz. */
export const symbole: Symbolziel[] = [
  { label: 'YouTube', icon: 'video', ziel: church.social.youtube },
  { label: 'Instagram', icon: 'camera', ziel: church.social.instagram },
  { label: 'Spotify', icon: 'headphones', ziel: church.social.spotify },
]

export const appBereiche: Zeile[] = [
  { label: 'Neu hier?', hinweis: 'Ablauf, Kinder, Anfahrt', ziel: '/neu-hier' },
  { label: 'Predigten', hinweis: 'Archiv und Fragen stellen', ziel: '/predigten' },
  { label: 'Mitmachen', hinweis: 'Wo Verstärkung gesucht wird', ziel: '/mitmachen' },
]

export const mehr: { titel: string; zeilen: Zeile[] }[] = [
  {
    titel: 'Täglich',
    zeilen: [
      { label: 'Vers des Tages', hinweis: 'Ein Vers mit Einordnung', ziel: '/impuls' },
      { label: 'Bibel lesen', hinweis: 'Text, Karte, Lexikon, Auslegungen', ziel: '/bibel' },
      { label: 'Lesepläne', ziel: '/bibel/plaene' },
      { label: 'Gebetsanliegen teilen', ziel: '/gebet' },
    ],
  },
  {
    titel: 'Für Gäste',
    zeilen: [
      { label: 'Zeiten, Adresse und Anfahrt', ziel: '/kontakt' },
      { label: 'Connectgruppe finden', ziel: '/gruppen' },
      { label: 'Kurse und Seminare', ziel: church.web.kurse, extern: true },
      { label: 'Taufe', ziel: church.web.taufe, extern: true },
    ],
  },
  {
    titel: 'Für Mitglieder',
    zeilen: [
      { label: 'Meine Teams', hinweis: 'Chat, Dokumente, Dienste', ziel: '/teams' },
      { label: 'Mein Bereich', hinweis: 'Favoriten, Anmeldungen, Notizen', ziel: '/profil' },
      { label: 'Meine Connectgruppe', ziel: '/gruppen' },
      { label: 'Unsere Gemeinschaften', ziel: church.web.gemeinschaften, extern: true },
      { label: 'Alle Termine und Anmeldungen', ziel: '/events' },
    ],
  },
  {
    titel: 'Für Staff',
    zeilen: [
      {
        label: 'Leitungsdashboard',
        hinweis: 'Zahlen und Auswertungen · Anmeldung nötig',
        ziel: church.web.leitungsdashboard,
        extern: true,
      },
      { label: 'Teambereich in ChurchTools', ziel: church.web.churchtools, extern: true },
      { label: 'Interner Bereich der Website', ziel: church.web.intern, extern: true },
      { label: 'PULS Leiterschaftsnetzwerk', ziel: church.web.puls, extern: true },
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
]
