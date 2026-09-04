/**
 * Stammdaten der FCG Frankfurt.
 *
 * Diese Angaben sind echt und stammen von fcg-frankfurt.de - im Unterschied
 * zu den Demo-Inhalten (Predigten, Gruppen, Gebetsanliegen) in den anderen
 * Dateien unter `src/data/`. Sie sorgen dafuer, dass jeder Weg in der App
 * irgendwo ankommt: bei einem Menschen, einer Seite oder einem Kanal.
 */

export const church = {
  name: 'Freie Christengemeinde Frankfurt',
  short: 'FCG Frankfurt',
  claim: 'Kirche im Herzen der Stadt',
  about:
    'Wir sind eine evangelische Freikirche im Frankfurter Nordend, die Jesus liebt, Menschen im Fokus hat und weitergibt, was sie hat.',

  address: {
    street: 'Eckenheimer Landstraße 180',
    zip: '60318',
    city: 'Frankfurt am Main',
    mapsUrl:
      'https://www.google.com/maps/place/Freie+Christengemeinde+Frankfurt+e.V.+(FCG)/@50.1311878,8.6817976,17z',
  },

  contact: {
    email: 'kontakt@fcg-frankfurt.de',
    phone: '+49 (0)69 550 157',
    phoneHref: 'tel:+4969550157',
  },

  /** Sonntags, beide Gottesdienste mit eigenem Kinder- und Jugendangebot. */
  services: [
    { time: '10:00 Uhr', note: 'mit Kinderkirche (3-11 J.) und Evidence (12-15 J.)' },
    { time: '12:00 Uhr', note: 'mit Kinderbetreuung (3-11 J.), Livestream und Übersetzung' },
  ],

  giving: {
    iban: 'DE15 5009 2100 0001 4685 02',
    paypal: 'spende@fcg-frankfurt.de',
  },

  web: {
    home: 'https://fcg-frankfurt.de/',
    neuHier: 'https://fcg-frankfurt.de/neu-hier/',
    besucheUns: 'https://fcg-frankfurt.de/besuche-uns/',
    ueberUns: 'https://fcg-frankfurt.de/ueber-uns/',
    deineKirche: 'https://fcg-frankfurt.de/deine-kirche/',
    gemeinschaften: 'https://fcg-frankfurt.de/deine-kirche#unsere-gemeinschaften',
    connectgruppen: 'https://fcg-frankfurt.de/connectgruppen',
    dienstteams: 'https://fcg-frankfurt.de/dienstteams',
    events: 'https://fcg-frankfurt.de/events',
    kurse: 'https://fcg-frankfurt.de/kurse',
    taufe: 'https://fcg-frankfurt.de/taufe',
    spende: 'https://fcg-frankfurt.de/spende/',
    kontakt: 'https://fcg-frankfurt.de/kontakt/',
    predigten: 'https://fcg-frankfurt.de/predigten/',
    puls: 'https://puls.fcg-frankfurt.de/',
    newsletter:
      'https://fcg-frankfurt.us13.list-manage.com/subscribe?u=08a732f558ecf16e6855e51ba&id=affd51590b',
    english: 'https://fcg-frankfurt.de/en/',
    impressum: 'https://fcg-frankfurt.de/impressum',
    datenschutz: 'https://fcg-frankfurt.de/datenschutz',
    intern: 'https://fcg-frankfurt.de/intern',
  },

  social: {
    youtube: 'https://www.youtube.com/@FCGFrankfurt',
    instagram: 'https://www.instagram.com/fcg.frankfurt/',
    facebook: 'https://www.facebook.com/fcgfrankfurt/',
    spotify: 'https://open.spotify.com/show/0uN69RvnHYypk6CEiw3PlM',
    applePodcasts:
      'https://podcasts.apple.com/us/podcast/predigten-der-fcg-frankfurt/id1626994613',
  },
} as const

/** E-Mail mit vorbereitetem Betreff - ohne Backend der verlaesslichste Weg. */
export function mailTo(subject: string, body?: string, to: string = church.contact.email): string {
  const params = new URLSearchParams({ subject })
  if (body) params.set('body', body)
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}
