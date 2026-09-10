import { church } from './church'

/**
 * Der Linktree: alle Anlaufstellen der Gemeinde an einer Stelle.
 *
 * Drei Arten von Eintraegen:
 *   intern  - eine Seite dieser App
 *   extern  - eine fremde Adresse, oeffnet in einem neuen Tab
 *   geplant - angekuendigt, aber noch ohne Ziel. Sie wird angezeigt und
 *             nicht verlinkt; ein toter Link waere schlimmer als ein
 *             ehrlicher Hinweis.
 */

export type LinkArt = 'intern' | 'extern' | 'geplant'

export type LinkEintrag = {
  label: string
  hinweis: string
  art: LinkArt
  ziel?: string
  /** Hebt den Eintrag hervor - fuer das, was am Sonntag zaehlt. */
  gross?: boolean
}

export type LinkGruppe = {
  titel: string
  unterzeile?: string
  eintraege: LinkEintrag[]
}

export const linkGruppen: LinkGruppe[] = [
  {
    titel: 'Diesen Sonntag',
    unterzeile: `${church.services[0].time} und ${church.services[1].time}`,
    eintraege: [
      {
        label: 'Gottesdienst live ansehen',
        hinweis: 'YouTube-Kanal der FCG - der Stream läuft sonntags',
        art: 'extern',
        ziel: church.social.youtube,
        gross: true,
      },
      {
        label: 'Zeiten, Adresse und Anfahrt',
        hinweis: `${church.address.street}, ${church.address.zip} ${church.address.city}`,
        art: 'intern',
        ziel: '/kontakt',
      },
      {
        label: 'Neu hier? Das erwartet dich',
        hinweis: 'Ablauf, Kinderprogramm, Übersetzung, häufige Fragen',
        art: 'intern',
        ziel: '/neu-hier',
        gross: true,
      },
    ],
  },
  {
    titel: 'Predigten hören',
    eintraege: [
      {
        label: 'YouTube: Predigten und Gottesdienste',
        hinweis: 'Alle Aufzeichnungen im Video',
        art: 'extern',
        ziel: church.social.youtube,
      },
      {
        label: 'Spotify: Predigt-Podcast',
        hinweis: 'Unterwegs hören',
        art: 'extern',
        ziel: church.social.spotify,
      },
      {
        label: 'Apple Podcasts',
        hinweis: 'Derselbe Podcast für iPhone und iPad',
        art: 'extern',
        ziel: church.social.applePodcasts,
      },
      {
        label: 'Predigtarchiv in der App',
        hinweis: 'Suchen nach Thema, Prediger, Serie und Bibelstelle',
        art: 'intern',
        ziel: '/predigten',
      },
      {
        label: 'Frag die Predigten',
        hinweis: 'Frage stellen, Antwort mit Quellenangabe bekommen',
        art: 'intern',
        ziel: '/frag',
      },
    ],
  },
  {
    titel: 'Täglich',
    eintraege: [
      {
        label: 'Bibelimpuls des Tages',
        hinweis: 'Ein Vers, eine Einordnung - in einer oder fünf Minuten',
        art: 'intern',
        ziel: '/impuls',
      },
      {
        label: 'Bibel lesen',
        hinweis: 'Volltext, Suche, Karte, Lexikon und Auslegungen',
        art: 'intern',
        ziel: '/bibel',
      },
      {
        label: 'Lesepläne',
        hinweis: 'Themenpläne und Durchlese-Pläne mit Fortschritt',
        art: 'intern',
        ziel: '/bibel/plaene',
      },
    ],
  },
  {
    titel: 'Anschluss finden',
    unterzeile: 'Für alle, die mehr als den Sonntag suchen',
    eintraege: [
      {
        label: 'Connectgruppe finden',
        hinweis: 'Nach Lebensphase, Stadtteil, Wochentag und Sprache',
        art: 'intern',
        ziel: '/gruppen',
      },
      {
        label: 'Kurse und Seminare',
        hinweis: 'Alpha, Glaubensgrundlagen, Seminare der Gemeinde',
        art: 'extern',
        ziel: church.web.kurse,
      },
      {
        label: 'Taufe',
        hinweis: 'Wie es abläuft und wer sich taufen lassen kann',
        art: 'extern',
        ziel: church.web.taufe,
      },
      {
        label: 'Termine und Anmeldung',
        hinweis: 'Gottesdienste, Jugend, Gebet, Freizeiten',
        art: 'intern',
        ziel: '/events',
      },
      {
        label: 'Gebetsanliegen teilen',
        hinweis: 'Gebetswand der Gemeinde',
        art: 'intern',
        ziel: '/gebet',
      },
      {
        label: 'Unsere Gemeinschaften',
        hinweis: 'Frauen, Männer, Generationen, International',
        art: 'extern',
        ziel: church.web.gemeinschaften,
      },
    ],
  },
  {
    titel: 'Für Mitarbeitende',
    unterzeile: 'Organisation, Absprachen, Wissen',
    eintraege: [
      {
        label: 'Teambereich in ChurchTools',
        hinweis: 'Gruppen, Dienstpläne und Dateien - Anmeldung nötig',
        art: 'extern',
        ziel: church.web.churchtools,
        gross: true,
      },
      {
        label: 'Meine Teams in der App',
        hinweis: 'Chat, Dokumente und Dienste je Team',
        art: 'intern',
        ziel: '/teams',
      },
      {
        label: 'Mitmachen: Teams und Einarbeitung',
        hinweis: 'Wo Verstärkung gesucht wird und wie der Einstieg läuft',
        art: 'intern',
        ziel: '/mitmachen',
      },
      {
        label: 'Wiki der Gemeinde',
        hinweis: 'Abläufe, Checklisten, Wissen zum Nachschlagen - wird gerade aufgebaut',
        art: church.web.wiki ? 'extern' : 'geplant',
        ziel: church.web.wiki || undefined,
      },
      {
        label: 'Interner Bereich der Website',
        hinweis: 'Unterlagen für Mitarbeitende auf fcg-frankfurt.de',
        art: 'extern',
        ziel: church.web.intern,
      },
      {
        label: 'PULS Leiterschaftsnetzwerk',
        hinweis: 'Weiterbildung für Leitende',
        art: 'extern',
        ziel: church.web.puls,
      },
    ],
  },
  {
    titel: 'Folgen und unterstützen',
    eintraege: [
      {
        label: 'Instagram',
        hinweis: 'Was gerade in der Gemeinde läuft',
        art: 'extern',
        ziel: church.social.instagram,
      },
      {
        label: 'Facebook',
        hinweis: 'Termine und Rückblicke',
        art: 'extern',
        ziel: church.social.facebook,
      },
      {
        label: 'Newsletter abonnieren',
        hinweis: 'Infos zu Gottesdiensten, Aktionen und Neuigkeiten',
        art: 'extern',
        ziel: church.web.newsletter,
      },
      {
        label: 'Spenden',
        hinweis: 'Die Arbeit der Gemeinde unterstützen',
        art: 'extern',
        ziel: church.web.spende,
      },
      {
        label: 'Website fcg-frankfurt.de',
        hinweis: 'Alles über die Gemeinde',
        art: 'extern',
        ziel: church.web.home,
      },
    ],
  },
]
