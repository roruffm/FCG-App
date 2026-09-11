import type { Rolle } from './links'

/**
 * Das Gemeinde-Wiki.
 *
 * Getrennt nach den drei Sichten der Startseite: Gast, Mitglied, Staff. Ein
 * Artikel kann zu mehreren Rollen gehoeren (das Schutzkonzept betrifft
 * Mitarbeitende wie Gruppenleitungen), aber jeder Leser sieht nur seine eigene
 * Sicht - sonst waere der Nutzen der Trennung dahin.
 *
 * Zum Status: Was sich auf fcg-frankfurt.de nachlesen laesst - Zeiten, Adresse,
 * Bankverbindung, Angebote - ist "geprueft". Alles, was interne Ablaeufe
 * beschreibt, die ich nicht nachpruefen kann, ist "entwurf". Ein Wiki, das
 * erfundene Dienstwege als Tatsachen ausgibt, richtet mehr Schaden an als
 * eines, das Luecken zeigt: Entwuerfe sind als solche gekennzeichnet und
 * zugleich die Aufgabenliste fuer die Leitung.
 */

export type WikiStatus = 'geprueft' | 'entwurf'

export type Block =
  | { art: 'text'; text: string }
  | { art: 'liste'; punkte: string[] }
  | { art: 'schritte'; punkte: string[] }
  | { art: 'hinweis'; text: string }
  | { art: 'warnung'; text: string }
  | { art: 'begriffe'; eintraege: { wort: string; bedeutung: string }[] }

export type Abschnitt = { titel?: string; bloecke: Block[] }

export type WikiLink = { label: string; ziel: string; extern?: boolean }

export type WikiArtikel = {
  slug: string
  titel: string
  teaser: string
  rollen: Rolle[]
  kategorie: string
  status: WikiStatus
  abschnitte: Abschnitt[]
  /** Verwandte Artikel, als slug. */
  siehe?: string[]
  links?: WikiLink[]
}

/**
 * Alle Artikel sind am selben Tag entstanden. Statt erfundene
 * Bearbeitungsdaten zu streuen, steht ueberall derselbe ehrliche Stand.
 */
export const wikiStand = '2026-09-11'

const gast: WikiArtikel[] = [
  {
    slug: 'gottesdienst-ablauf',
    titel: 'Wie ein Gottesdienst abläuft',
    teaser: 'Was in den rund 90 Minuten passiert, wann du kommen solltest und was von dir erwartet wird: wenig.',
    rollen: ['gast'],
    kategorie: 'Erster Besuch',
    status: 'geprueft',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Sonntags um 10:00 und um 12:00 Uhr, Eckenheimer Landstraße 180. Beide Gottesdienste haben denselben Aufbau, klingen aber unterschiedlich: Um 10:00 Uhr geht es familiärer zu, um 12:00 Uhr musikalisch kräftiger. Du kannst in beide gehen, ohne dich anzumelden.',
          },
        ],
      },
      {
        titel: 'Der Ablauf',
        bloecke: [
          {
            art: 'schritte',
            punkte: [
              'Ankommen. Am Eingang steht das Willkommensteam. Du bekommst keinen Zettel, musst dich nirgends eintragen und wirst nicht vorgestellt.',
              'Musik, etwa 20 bis 25 Minuten. Mitsingen ist eine Einladung, keine Pflicht. Sitzenbleiben fällt niemandem auf.',
              'Ansagen und Begrüßung. Hier hörst du, was in der Woche ansteht.',
              'Predigt, etwa 30 bis 40 Minuten. Ein Bibeltext wird ausgelegt und auf den Alltag bezogen.',
              'Gebet und Abschluss. Wer möchte, kann danach vorne mit jemandem beten - wer nicht, geht zum Kaffee.',
              'Kaffee im Foyer. Der eigentliche Ort, an dem man Leute kennenlernt.',
            ],
          },
        ],
      },
      {
        titel: 'Praktisches',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Zu spät kommen ist kein Problem. Setz dich einfach hinten hin.',
              'Anziehen, was du magst. Vom Kapuzenpulli bis zum Hemd ist alles da.',
              'Früher gehen geht auch. Niemand hält dich auf.',
              'Übersetzung gibt es im 12-Uhr-Gottesdienst. Sag am Eingang Bescheid, dann bekommst du Kopfhörer.',
              'Wenn du nicht kommen kannst oder erstmal aus der Ferne schauen willst: Der 12-Uhr-Gottesdienst läuft im Livestream.',
            ],
          },
        ],
      },
    ],
    siehe: ['kirchendeutsch', 'mit-kindern', 'anfahrt'],
  },

  {
    slug: 'kirchendeutsch',
    titel: 'Kirchendeutsch, übersetzt',
    teaser: 'Lobpreis, Abendmahl, Connectgruppe, Segen: die Wörter, die im Gottesdienst fallen, ohne dass sie jemand erklärt.',
    rollen: ['gast'],
    kategorie: 'Verstehen',
    status: 'geprueft',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Jede Gruppe hat ihre Sprache, und Kirche hat eine besonders alte. Die meisten Begriffe sind harmloser, als sie klingen. Hier stehen die, die am Sonntag am häufigsten fallen.',
          },
          {
            art: 'begriffe',
            eintraege: [
              { wort: 'Lobpreis / Worship', bedeutung: 'Der Musikteil am Anfang. Lieder, die sich an Gott richten statt übereinander zu reden.' },
              { wort: 'Predigt', bedeutung: 'Der Vortrag in der Mitte. Ein Bibeltext wird erklärt und auf heute bezogen.' },
              { wort: 'Abendmahl', bedeutung: 'Brot und Saft, in Erinnerung an Jesu letztes Essen mit seinen Freunden. Wer nicht teilnehmen möchte, lässt den Kelch weitergehen - das fällt nicht auf.' },
              { wort: 'Kollekte', bedeutung: 'Die Spendensammlung. Freiwillig, und niemand schaut, was du gibst oder ob du gibst.' },
              { wort: 'Connectgruppe', bedeutung: 'Eine kleine Gruppe, die sich unter der Woche trifft - meist bei jemandem zu Hause, oft mit Essen.' },
              { wort: 'Segen', bedeutung: 'Der Schlusssatz. Ein Zuspruch, kein Zauberspruch: gemeint ist "Gott möge dir gut tun".' },
              { wort: 'Amen', bedeutung: 'Hebräisch für "so ist es" oder "das lasse ich gelten". Zustimmung am Ende eines Gebets.' },
              { wort: 'Halleluja', bedeutung: 'Ebenfalls hebräisch: "Lobt Gott". Ein Ausruf, kein Befehl an dich.' },
              { wort: 'Gemeinde', bedeutung: 'Die Leute, nicht das Gebäude. "Die Gemeinde trifft sich" heißt: die Menschen kommen zusammen.' },
              { wort: 'Freikirche', bedeutung: 'Eine Kirche, die sich selbst finanziert und nicht über die Kirchensteuer. Mitgliedschaft ist eine bewusste Entscheidung, keine Folge der Taufe als Baby.' },
              { wort: 'Dienst / Dienstteam', bedeutung: 'Ehrenamtliche Mitarbeit. Das "Technikteam hat Dienst" heißt: sie sind diesen Sonntag dran.' },
              { wort: 'Zeugnis', bedeutung: 'Wenn jemand vorne erzählt, was er mit Gott erlebt hat. Keine Prüfung, kein Dokument.' },
              { wort: 'Seelsorge', bedeutung: 'Vertrauliches Gespräch bei Sorgen oder Krisen. Kostenlos, und die Schweigepflicht gilt.' },
              { wort: 'Taufe', bedeutung: 'Öffentliches Zeichen für die Entscheidung, als Christ zu leben. In Freikirchen als Erwachsener und mit Untertauchen.' },
              { wort: 'Älteste', bedeutung: 'Das Leitungsgremium der Gemeinde. Ein Amt, keine Altersangabe.' },
            ],
          },
        ],
      },
      {
        bloecke: [
          {
            art: 'hinweis',
            text: 'Ein Begriff gefallen, der hier fehlt? Frag beim Kaffee einfach nach. Die Frage ist völlig normal - die meisten hier haben sie selbst mal gestellt.',
          },
        ],
      },
    ],
    siehe: ['gottesdienst-ablauf', 'was-wir-glauben'],
  },

  {
    slug: 'mit-kindern',
    titel: 'Mit Kindern da',
    teaser: 'Welche Gruppe für welches Alter, wo du dein Kind abgibst und was ist, wenn es nicht bleiben will.',
    rollen: ['gast'],
    kategorie: 'Erster Besuch',
    status: 'geprueft',
    abschnitte: [
      {
        titel: 'Was wann läuft',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Um 10:00 Uhr: Kinderkirche für 3 bis 11 Jahre, aufgeteilt in Forscher (3-5) und Abenteurer (ab Schuleintritt). Parallel läuft Evidence für 12- bis 15-Jährige.',
              'Um 12:00 Uhr: Kinderbetreuung für 3 bis 11 Jahre.',
              'Für Eltern mit ganz kleinen Kindern gibt es einen Eltern-Kind-Raum mit Live-Übertragung. Dort darf gestillt, gewickelt und gekrabbelt werden, ohne dass jemand schaut.',
            ],
          },
        ],
      },
      {
        titel: 'Beim ersten Mal',
        bloecke: [
          {
            art: 'text',
            text: 'Komm ein paar Minuten früher. Die Kinder werden am Raum angemeldet, damit klar ist, wer da ist und wer das Kind abholen darf. Du bekommst eine Marke oder Nummer - ohne die gibt das Team dein Kind niemandem mit.',
          },
          {
            art: 'text',
            text: 'Wenn dein Kind nicht bleiben möchte, bleibt es bei dir. Das ist kein Problem und kommt oft vor. Viele Kinder gehen beim zweiten oder dritten Mal von allein mit.',
          },
          {
            art: 'hinweis',
            text: 'Allergien, Medikamente oder besondere Bedürfnisse: Sag es beim Anmelden direkt. Das Team richtet sich danach, muss es aber wissen.',
          },
        ],
      },
    ],
    siehe: ['gottesdienst-ablauf', 'schutzkonzept'],
  },

  {
    slug: 'was-wir-glauben',
    titel: 'Was wir glauben',
    teaser: 'Der Kern in wenigen Sätzen - ohne Fachsprache und ohne dass du zustimmen musst, um dazuzugehören.',
    rollen: ['gast'],
    kategorie: 'Verstehen',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Die FCG Frankfurt ist eine evangelische Freikirche im Frankfurter Nordend. Der eigene Satz dazu lautet: Wir lieben Jesus, haben Menschen im Fokus und geben weiter, was wir haben.',
          },
        ],
      },
      {
        titel: 'Vier Punkte, die den Alltag prägen',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Die Bibel ist die Grundlage. Sie wird ausgelegt und diskutiert, nicht nur zitiert.',
              'Glaube ist eine persönliche Entscheidung. Deshalb wird in Freikirchen erst getauft, wenn jemand sich selbst dafür entscheidet.',
              'Gemeinde ist eine Gemeinschaft, keine Veranstaltung. Das Eigentliche passiert in den kleinen Gruppen unter der Woche.',
              'Zweifel gehören dazu. Fragen sind hier keine Störung des Betriebs.',
            ],
          },
        ],
      },
      {
        bloecke: [
          {
            art: 'text',
            text: 'Du musst nichts davon glauben, um herzukommen. Niemand prüft das, und es gibt keine Liste, auf der steht, wer dazugehört und wer nicht.',
          },
          {
            art: 'warnung',
            text: 'Entwurf. Diese Zusammenfassung ist aus dem öffentlichen Selbstverständnis der Gemeinde formuliert und noch nicht von der Leitung bestätigt. Verbindlich ist die Glaubensgrundlage auf fcg-frankfurt.de.',
          },
        ],
      },
    ],
    siehe: ['kirchendeutsch', 'taufe'],
  },

  {
    slug: 'anfahrt',
    titel: 'Anfahrt, Parken und Barrierefreiheit',
    teaser: 'Wie du herkommst, wo sonntags ein Parkplatz frei ist und was du wissen solltest, wenn du nicht gut zu Fuß bist.',
    rollen: ['gast'],
    kategorie: 'Erster Besuch',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Eckenheimer Landstraße 180, 60318 Frankfurt am Main. Das Nordend ist mit Bus und U-Bahn gut erreichbar; die Eckenheimer Landstraße ist eine der Hauptachsen nach Norden.',
          },
          {
            art: 'liste',
            punkte: [
              'Mit dem Auto: Sonntags findet sich in den Seitenstraßen meist ein Platz. Unter der Woche ist es eng.',
              'Mit dem Rad: Abstellmöglichkeiten gibt es direkt am Gebäude.',
              'Zu Fuß vom ÖPNV: wenige Minuten von den Haltestellen an der Eckenheimer Landstraße.',
            ],
          },
        ],
      },
      {
        titel: 'Wenn Stufen ein Problem sind',
        bloecke: [
          {
            art: 'warnung',
            text: 'Entwurf. Zur Barrierefreiheit - Rampe, Aufzug, barrierefreies WC, Induktionsschleife für Hörgeräte - liegen mir keine gesicherten Angaben vor. Bis das jemand aus der Gemeinde bestätigt hat, gilt: kurz anrufen und fragen. Falsche Zusagen zur Barrierefreiheit sind schlimmer als gar keine.',
          },
        ],
      },
    ],
    siehe: ['gottesdienst-ablauf'],
  },

  {
    slug: 'kollekte-und-spenden',
    titel: 'Kollekte, Spenden und was der Besuch kostet',
    teaser: 'Nichts. Und warum trotzdem ein Korb herumgeht.',
    rollen: ['gast'],
    kategorie: 'Verstehen',
    status: 'geprueft',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Der Besuch kostet nichts. Es gibt keinen Eintritt, keinen Beitrag und keine Rechnung hinterher - auch nicht beim zehnten Mal.',
          },
          {
            art: 'text',
            text: 'Im Gottesdienst geht eine Kollekte herum. Als Freikirche finanziert sich die FCG vollständig über Spenden, nicht über die Kirchensteuer: Gehälter, Miete, Heizung, Kinderarbeit. Deshalb der Korb.',
          },
          {
            art: 'hinweis',
            text: 'Als Gast ist die Kollekte ausdrücklich nicht für dich gedacht. Lass den Korb weitergehen. Niemand schaut hin, und es gibt keine Liste, wer was gibt.',
          },
        ],
      },
      {
        titel: 'Wenn du doch spenden möchtest',
        bloecke: [
          {
            art: 'text',
            text: 'Überweisung und PayPal sind unter "Spenden" auf der Website hinterlegt. Für die Steuererklärung stellt die Gemeinde eine Zuwendungsbestätigung aus - dafür braucht sie deine Adresse.',
          },
        ],
      },
    ],
    siehe: ['gottesdienst-ablauf', 'wohin-das-geld-geht'],
  },

  {
    slug: 'deine-daten-als-gast',
    titel: 'Musst du dich anmelden? Und was passiert mit deinen Daten?',
    teaser: 'Kurz: nein, und wenig. Was die Gemeinde und diese App über dich speichern - und was nicht.',
    rollen: ['gast'],
    kategorie: 'Verstehen',
    status: 'geprueft',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Für den Gottesdienstbesuch meldest du dich nicht an. Es gibt keine Anwesenheitsliste, keinen Empfangszettel und keine Nachfass-Mail, weil du einmal da warst.',
          },
          {
            art: 'liste',
            punkte: [
              'Anmelden musst du dich nur für Veranstaltungen mit begrenzten Plätzen - zum Beispiel Kurse oder Freizeiten.',
              'Deine Kinder werden für die Kinderkirche erfasst, damit klar ist, wer sie abholen darf. Das ist Aufsichtspflicht, kein Marketing.',
              'Der Newsletter kommt nur, wenn du ihn selbst bestellst, und lässt sich in jeder Mail abbestellen.',
            ],
          },
        ],
      },
      {
        titel: 'Was diese App speichert',
        bloecke: [
          {
            art: 'text',
            text: 'Diese App speichert alles auf deinem Gerät: die gewählte Rolle, Favoriten, Notizen, Anmeldungen. Es gibt kein Konto und keinen Server, der mitliest. Löschst du die App-Daten im Browser, ist alles weg.',
          },
        ],
      },
    ],
    links: [{ label: 'Daten in dieser App', ziel: '/datenschutz' }],
    siehe: ['gottesdienst-ablauf'],
  },
]

const mitglied: WikiArtikel[] = [
  {
    slug: 'mitglied-werden',
    titel: 'Mitglied werden',
    teaser: 'Was Mitgliedschaft in einer Freikirche bedeutet, was sie nicht bedeutet und wie der Weg dahin aussieht.',
    rollen: ['mitglied'],
    kategorie: 'Dazugehören',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'In einer Freikirche ist Mitgliedschaft eine bewusste Entscheidung, keine Folge der Taufe als Baby und kein Eintrag beim Standesamt. Du entscheidest dich für diese konkrete Gemeinde: hier will ich dazugehören, hier trage ich mit.',
          },
        ],
      },
      {
        titel: 'Was sich ändert',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Du hast Stimmrecht in der Mitgliederversammlung und entscheidest über Haushalt und Leitung mit.',
              'Du übernimmst Verantwortung: für einen Dienst, für eine Gruppe, oder finanziell.',
              'Bestimmte Aufgaben - Leitung, Kinderarbeit, Seelsorge - setzen Mitgliedschaft voraus.',
            ],
          },
          {
            art: 'text',
            text: 'Was sich nicht ändert: Du darfst vorher schon alles besuchen, in jeder Connectgruppe dabei sein und in den meisten Teams mitarbeiten. Mitgliedschaft ist keine Eintrittskarte, sondern eine Zusage.',
          },
        ],
      },
      {
        titel: 'Der Weg dahin',
        bloecke: [
          {
            art: 'schritte',
            punkte: [
              'Gespräch mit jemandem aus der Leitung - unverbindlich, um Fragen zu klären.',
              'Ein Kurs oder eine Einführung, in der es um Selbstverständnis und Glaubensgrundlage geht.',
              'Aufnahme durch die Gemeindeleitung, meist mit einer kurzen Vorstellung im Gottesdienst.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Der genaue Ablauf - welcher Kurs, welches Gremium entscheidet, welche Fristen gelten - ist in der Satzung der FCG Frankfurt geregelt und hier nicht nachgeprüft. Vor einer Zusage im Gespräch bitte an der Satzung abgleichen.',
          },
        ],
      },
    ],
    siehe: ['taufe', 'wer-entscheidet-was'],
  },

  {
    slug: 'connectgruppe-finden',
    titel: 'Die passende Connectgruppe finden',
    teaser: 'Worin sich die Gruppen unterscheiden, wie ein Abend abläuft und was tun, wenn es nicht passt.',
    rollen: ['mitglied'],
    kategorie: 'Dazugehören',
    status: 'geprueft',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Connectgruppen sind kleine Gruppen, die sich unter der Woche treffen - meist bei jemandem zu Hause, fast immer mit Essen. Für die meisten ist das der Ort, an dem aus der Gemeinde Freundschaften werden. Der Gottesdienst allein schafft das selten.',
          },
        ],
      },
      {
        titel: 'Wonach du auswählst',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Lebensphase: Studierende, junge Familien, Berufstätige, Ruhestand. Die Gespräche drehen sich zwangsläufig um das, was gerade dran ist.',
              'Stadtteil: Eine Gruppe, für die du 40 Minuten fährst, besuchst du im Winter seltener, als du denkst.',
              'Wochentag: Der ehrlichste Filter. Nimm den Abend, an dem du wirklich regelmäßig kannst.',
              'Schwerpunkt: Manche Gruppen lesen Bücher der Bibel durch, andere reden über den Alltag, wieder andere sind eher zum gemeinsamen Beten da.',
            ],
          },
        ],
      },
      {
        titel: 'Wie ein Abend abläuft',
        bloecke: [
          {
            art: 'text',
            text: 'Meistens: ankommen und essen, eine Runde wie es allen geht, ein Bibeltext oder Thema, beten füreinander. Zwei bis drei Stunden. Du musst nichts vorbereiten und nichts mitbringen - beim ersten Mal reicht, dass du kommst.',
          },
          {
            art: 'hinweis',
            text: 'Besuch zwei- bis dreimal, bevor du entscheidest. Der erste Abend in einer fremden Wohnung fühlt sich fast immer komisch an, und das sagt wenig über die Gruppe aus.',
          },
        ],
      },
      {
        titel: 'Wenn es nicht passt',
        bloecke: [
          {
            art: 'text',
            text: 'Dann wechselst du. Das ist normal und niemand nimmt es persönlich. Sag der Leitung kurz Bescheid, statt still zu verschwinden - das erspart Rückfragen und Sorge.',
          },
        ],
      },
    ],
    links: [{ label: 'Alle Connectgruppen in der App', ziel: '/gruppen' }],
    siehe: ['erste-mitarbeit'],
  },

  {
    slug: 'taufe',
    titel: 'Taufe: Bedeutung und Ablauf',
    teaser: 'Warum in Freikirchen Erwachsene getauft werden, wie der Tag abläuft und was vorher passiert.',
    rollen: ['mitglied'],
    kategorie: 'Dazugehören',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Die Taufe ist ein öffentliches Zeichen für eine persönliche Entscheidung: Ich will als Christ leben. Weil das eine eigene Entscheidung ist, wird in Freikirchen getauft, wer sie selbst treffen kann - nicht als Säugling.',
          },
          {
            art: 'text',
            text: 'Getauft wird durch Untertauchen. Das Bild dahinter ist alt und deutlich: Das bisherige Leben geht unter, ein neues kommt herauf.',
          },
        ],
      },
      {
        titel: 'Häufige Fragen',
        bloecke: [
          {
            art: 'begriffe',
            eintraege: [
              { wort: 'Ich bin als Baby getauft. Nochmal?', bedeutung: 'Aus freikirchlicher Sicht ist es keine Wiederholung, sondern die eigene Entscheidung. Sprich das im Vorgespräch an - das ist eine der häufigsten Fragen und niemand drängt dich.' },
              { wort: 'Muss ich vorne etwas sagen?', bedeutung: 'Üblich ist ein kurzer Satz, warum du dich taufen lässt. Wenn Reden vor Menschen für dich nicht geht, lässt sich das anders lösen.' },
              { wort: 'Was ziehe ich an?', bedeutung: 'Etwas, das nass werden darf und nicht durchsichtig wird. Handtuch und Wechselsachen mitbringen.' },
              { wort: 'Muss ich danach Mitglied werden?', bedeutung: 'Nein. Taufe und Mitgliedschaft sind zwei verschiedene Schritte.' },
            ],
          },
        ],
      },
      {
        titel: 'Der Weg dahin',
        bloecke: [
          {
            art: 'schritte',
            punkte: [
              'Melde dich bei jemandem aus der Leitung oder in deiner Connectgruppe.',
              'Vorgespräch: Was bedeutet der Schritt für dich, welche Fragen sind offen.',
              'Taufunterricht oder Taufkurs - je nachdem, wie er gerade organisiert ist.',
              'Der Taufgottesdienst, meist mit mehreren Täuflingen und im Anschluss gefeiert.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Termine, Kursform und Ansprechpartner für Taufen stehen hier nicht, weil sie sich ändern. Verbindlich ist die Taufseite auf fcg-frankfurt.de.',
          },
        ],
      },
    ],
    siehe: ['mitglied-werden', 'was-wir-glauben'],
  },

  {
    slug: 'erste-mitarbeit',
    titel: 'Zum ersten Mal mitarbeiten',
    teaser: 'Wie du ein Team findest, wie viel Zeit realistisch draufgeht und wie du wieder aufhörst.',
    rollen: ['mitglied'],
    kategorie: 'Mitarbeiten',
    status: 'geprueft',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Fast alles, was sonntags läuft, machen Ehrenamtliche: Technik, Musik, Kinderkirche, Café, Begrüßung, Aufbau. Die meisten sind hineingerutscht, weil jemand sie gefragt hat - du musst nicht warten, bis das passiert.',
          },
        ],
      },
      {
        titel: 'So fängst du an',
        bloecke: [
          {
            art: 'schritte',
            punkte: [
              'Schau in der App unter "Mitmachen", welche Teams gerade Verstärkung suchen. Dort steht auch, was die Aufgabe wirklich verlangt.',
              'Verabrede ein Schnuppern: einmal danebenstehen, ohne Zusage. Jedes Team macht das.',
              'Wenn es passt, klärt ihr den Rhythmus - bei den meisten Teams ein bis zwei Sonntage im Monat.',
              'Einarbeitung. Vorkenntnisse braucht kaum ein Team; eingearbeitet wird Schritt für Schritt.',
            ],
          },
        ],
      },
      {
        titel: 'Ehrlich zum Zeitaufwand',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Technik und Musik: Der Dienst beginnt beim Soundcheck, meist ein bis zwei Stunden vor Beginn. Dazu Proben unter der Woche.',
              'Kinderkirche: Vorbereitung unter der Woche kommt zur Dienstzeit dazu.',
              'Café, Begrüßung, Aufbau: der Sonntag selbst, plus etwas Vor- und Nachlauf.',
            ],
          },
          {
            art: 'hinweis',
            text: 'Sag von Anfang an, was du realistisch schaffst. Ein Team plant lieber mit einem Sonntag im Monat, auf den Verlass ist, als mit vieren, die kurzfristig ausfallen.',
          },
        ],
      },
      {
        titel: 'Wieder aufhören',
        bloecke: [
          {
            art: 'text',
            text: 'Geht jederzeit, und zwar ohne Begründung. Sag es der Teamleitung mit etwas Vorlauf, damit der Dienstplan nachziehen kann. Ausbrennen hilft niemandem - am wenigsten dem Team.',
          },
        ],
      },
    ],
    links: [
      { label: 'Teams, die Verstärkung suchen', ziel: '/mitmachen' },
      { label: 'Meine Teams', ziel: '/teams' },
    ],
    siehe: ['schutzkonzept', 'datenschutz-im-dienst'],
  },

  {
    slug: 'seelsorge-und-krisen',
    titel: 'Seelsorge und Hilfe in Krisen',
    teaser: 'An wen du dich wendest, was vertraulich bleibt - und die Nummern, die rund um die Uhr erreichbar sind.',
    rollen: ['mitglied'],
    kategorie: 'Hilfe',
    status: 'geprueft',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'warnung',
            text: 'Wenn es akut ist und du oder jemand anderes in Gefahr ist, warte nicht auf einen Rückruf aus der Gemeinde. Notruf 112. Telefonseelsorge rund um die Uhr, kostenlos und anonym: 0800 111 0 111, 0800 111 0 222 oder 116 123. Für Kinder und Jugendliche: Nummer gegen Kummer 116 111.',
          },
        ],
      },
      {
        titel: 'Seelsorge in der Gemeinde',
        bloecke: [
          {
            art: 'text',
            text: 'Seelsorge ist ein vertrauliches Gespräch bei Sorgen, Entscheidungen oder Krisen. Es kostet nichts, und du musst keinen Anlass nachweisen, der schlimm genug wäre.',
          },
          {
            art: 'liste',
            punkte: [
              'Über die Leitung deiner Connectgruppe - der kürzeste Weg, wenn du dort schon jemanden kennst.',
              'Über das Gemeindebüro nach einem Seelsorgetermin fragen.',
              'Nach dem Gottesdienst vorne beten lassen - niedrigschwellig, aber kein Ersatz für ein richtiges Gespräch.',
            ],
          },
        ],
      },
      {
        titel: 'Was vertraulich bleibt',
        bloecke: [
          {
            art: 'text',
            text: 'Was du in der Seelsorge sagst, bleibt dort. Es landet nicht in der Leitungssitzung und nicht in deiner Akte.',
          },
          {
            art: 'text',
            text: 'Die Grenze: Wenn Leib und Leben in Gefahr sind - Suizidabsicht, Gewalt, Gefährdung eines Kindes - darf und muss Hilfe geholt werden. Ein guter Seelsorger sagt dir das vorher, statt es hinterher zu erklären.',
          },
          {
            art: 'hinweis',
            text: 'Seelsorge ersetzt keine Therapie. Bei Depression, Angststörung, Sucht oder Trauma gehört beides zusammen - und die gute Nachricht ist, dass niemand hier dich davon abhalten wird.',
          },
        ],
      },
    ],
    links: [{ label: 'Gebetsanliegen teilen', ziel: '/gebet' }],
    siehe: ['connectgruppe-finden'],
  },

  {
    slug: 'wer-entscheidet-was',
    titel: 'Wer entscheidet was',
    teaser: 'Pastoren, Älteste, Mitgliederversammlung, Teams: wer wofür zuständig ist und wo du mitredest.',
    rollen: ['mitglied'],
    kategorie: 'Dazugehören',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Eine Freikirche ist ein eingetragener Verein. Das klingt unromantisch, hat aber einen Vorteil: Die Zuständigkeiten stehen in der Satzung, und du kannst sie nachlesen.',
          },
          {
            art: 'begriffe',
            eintraege: [
              { wort: 'Mitgliederversammlung', bedeutung: 'Das höchste Gremium. Entscheidet über Haushalt, Satzung und die Wahl der Leitung. Hier hat jedes Mitglied eine Stimme.' },
              { wort: 'Älteste / Gemeindeleitung', bedeutung: 'Leitet die Gemeinde zwischen den Versammlungen: Ausrichtung, Personal, große Weichenstellungen.' },
              { wort: 'Pastoren', bedeutung: 'Angestellt für Verkündigung, Seelsorge und die geistliche Arbeit. Teil der Leitung, aber nicht allein entscheidend.' },
              { wort: 'Teamleitungen', bedeutung: 'Entscheiden im eigenen Bereich: Dienstplan, Abläufe, wer mitarbeitet. Der Ort, an dem die meisten Entscheidungen tatsächlich fallen.' },
            ],
          },
        ],
      },
      {
        titel: 'Wo du mitredest',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'In deinem Team - der wirksamste Hebel, und der am meisten unterschätzte.',
              'In der Mitgliederversammlung, mit Stimmrecht.',
              'Im direkten Gespräch. Eine Gemeinde dieser Größe ist klein genug, dass man die Leitung ansprechen kann.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Die Gremien und ihre Zuständigkeiten sind hier allgemein beschrieben, wie sie in Freikirchen üblich sind. Wie die FCG Frankfurt es konkret geregelt hat, steht in ihrer Satzung - dort abgleichen, bevor sich jemand darauf beruft.',
          },
        ],
      },
    ],
    siehe: ['mitglied-werden', 'wohin-das-geld-geht'],
  },

  {
    slug: 'wohin-das-geld-geht',
    titel: 'Wohin das Geld geht',
    teaser: 'Wie sich eine Freikirche finanziert, wofür die Spenden verwendet werden und wie du das nachprüfst.',
    rollen: ['mitglied'],
    kategorie: 'Dazugehören',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Die FCG bekommt keine Kirchensteuer. Alles, was läuft, läuft über Spenden: Gehälter, Gebäude, Kinderarbeit, Technik, Hilfsprojekte.',
          },
        ],
      },
      {
        titel: 'Grob gerechnet',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Personal - Pastoren, Büro, Teilzeitstellen - ist in Gemeinden dieser Größe der größte Posten.',
              'Gebäude: Miete oder Unterhalt, Energie, Instandhaltung.',
              'Arbeitsbereiche: Kinder und Jugend, Musik, Technik, Material.',
              'Weitergeben: Mission, Hilfsprojekte, Unterstützung in Notlagen.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Die genauen Anteile kenne ich nicht und schätze sie hier bewusst nicht. Der Haushalt wird der Mitgliederversammlung vorgelegt - das ist die belastbare Quelle. Wer Zahlen nennt, sollte sie von dort haben.',
          },
        ],
      },
      {
        titel: 'Praktisch',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Regelmäßig per Dauerauftrag zu geben hilft der Planung mehr als größere Einzelspenden.',
              'Für die Steuererklärung gibt es eine Zuwendungsbestätigung; dafür braucht die Gemeinde deine Adresse.',
              'Zweckgebundene Spenden sind möglich, binden die Gemeinde aber rechtlich. Sprich größere Beträge vorher ab.',
            ],
          },
        ],
      },
    ],
    siehe: ['kollekte-und-spenden', 'wer-entscheidet-was'],
  },

  {
    slug: 'raeume-buchen',
    titel: 'Räume buchen',
    teaser: 'Wie du einen Raum für Gruppe, Probe oder Feier reservierst - und was dabei zu beachten ist.',
    rollen: ['mitglied', 'staff'],
    kategorie: 'Praktisches',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Die Räume an der Eckenheimer Landstraße werden unter der Woche von Gruppen, Proben und Kursen genutzt. Damit sich niemand doppelt einträgt, läuft die Belegung über eine zentrale Buchung.',
          },
          {
            art: 'schritte',
            punkte: [
              'Prüfe die Belegung im Kalender, bevor du zusagst.',
              'Trage die Buchung mit Zweck, Zeitraum inklusive Auf- und Abbau und einer verantwortlichen Person ein.',
              'Warte auf die Bestätigung. Ein Eintrag allein ist noch keine Zusage.',
              'Nach der Nutzung: Stühle zurück, Müll raus, Fenster zu, Licht aus, abschließen.',
            ],
          },
        ],
      },
      {
        titel: 'Was regelmäßig schiefgeht',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Auf- und Abbauzeit nicht mitgebucht - die nächste Gruppe steht dann im Weg.',
              'Sonntags: Der Gottesdienstbetrieb hat Vorrang, auch bei einer bestätigten Buchung.',
              'Technik im Saal ist nicht automatisch Teil der Buchung. Wer Ton oder Beamer braucht, fragt beim Technikteam an.',
              'Schlüssel werden persönlich übergeben und nicht weitergereicht.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Welches System die Buchung führt, wer bestätigt und wie die Schlüsselordnung genau aussieht, ist hier nicht nachgeprüft. Vor dem ersten Mal im Gemeindebüro fragen.',
          },
        ],
      },
    ],
    siehe: ['auslagen-abrechnen'],
  },
]

const staff: WikiArtikel[] = [
  {
    slug: 'schutzkonzept',
    titel: 'Schutzkonzept: Umgang mit Kindern und Jugendlichen',
    teaser: 'Die Regeln, die für jeden gelten, der mit Minderjährigen arbeitet - und der Meldeweg bei einem Verdacht.',
    rollen: ['staff'],
    kategorie: 'Verantwortung',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'warnung',
            text: 'Entwurf. Dieser Artikel gibt wieder, was in der kirchlichen Kinder- und Jugendarbeit Standard ist. Er ersetzt NICHT das verbindliche Schutzkonzept der FCG Frankfurt. Solange dieses nicht hier hinterlegt ist, gilt das Papier der Gemeinde - und im Zweifel fragst du die Leitung, bevor du handelst.',
          },
        ],
      },
      {
        titel: 'Bevor du anfängst',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Erweitertes Führungszeugnis nach § 30a BZRG. Wer regelmäßig mit Minderjährigen arbeitet, legt es vor; die Gemeinde stellt die Bescheinigung für die kostenfreie Beantragung aus. Es wird eingesehen und dokumentiert, nicht kopiert und nicht archiviert.',
              'Selbstverpflichtungserklärung unterschreiben - der Verhaltenskodex in Kurzform.',
              'Schulung zu Nähe, Distanz und Grenzverletzungen. Einmalig vor dem Start, danach zur Auffrischung.',
            ],
          },
        ],
      },
      {
        titel: 'Regeln im Dienst',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Vier-Augen-Prinzip. Keine Situation, in der eine erwachsene Person mit einem Kind allein und unbeobachtet ist. Lässt sich ein Einzelgespräch nicht vermeiden, findet es bei offener Tür oder in Sichtweite statt - und du sagst vorher jemandem Bescheid.',
              'Körperkontakt nur, wenn das Kind ihn will und er der Situation angemessen ist. Ein Kind, das sich löst, wird losgelassen. Sofort.',
              'Keine Geheimnisse zwischen dir und einem Kind. Der Satz "das bleibt unter uns" ist selbst schon ein Warnzeichen.',
              'Kein privater Einzelkontakt über Messenger oder Social Media. Kommunikation läuft über die Gruppe oder über die Eltern.',
              'Fotos von Kindern nur mit Einwilligung der Erziehungsberechtigten und nie auf privaten Geräten sammeln.',
              'Beim Umziehen, Baden oder auf Freizeiten gelten getrennte Räume und klare Zuständigkeiten. Erwachsene duschen nicht mit Kindern.',
              'Keine Machtprobe, keine Bloßstellung, keine Bestrafung, die ein Kind vorführt.',
            ],
          },
        ],
      },
      {
        titel: 'Wenn dir etwas auffällt',
        bloecke: [
          {
            art: 'warnung',
            text: 'Du musst nicht sicher sein. Ein Verdacht reicht, um ihn weiterzugeben - das ist ausdrücklich deine Aufgabe und keine Anschuldigung.',
          },
          {
            art: 'schritte',
            punkte: [
              'Ruhe bewahren. Das Kind nicht ausfragen und nicht in ein Verhör nehmen - das kann eine spätere Aufklärung beschädigen.',
              'Zusagen, die du nicht halten kannst, macht niemand. Sag nicht "ich erzähle es keinem".',
              'Sofort notieren: was du beobachtet hast, wörtlich, mit Datum und Uhrzeit. Beobachtung und Deutung getrennt halten.',
              'Umgehend an die benannte Vertrauensperson oder die Gemeindeleitung melden. Nicht an die Person, um die es geht, und nicht ins Team tragen.',
              'Bei akuter Gefahr für das Kind: Jugendamt oder Polizei. Das ist kein Vertrauensbruch gegenüber der Gemeinde, sondern die Pflicht.',
            ],
          },
          {
            art: 'text',
            text: 'Externe Beratung, unabhängig von der Gemeinde und anonym möglich: Hilfetelefon Sexueller Missbrauch 0800 22 55 530, Nummer gegen Kummer für Kinder und Jugendliche 116 111. Im Notfall 110 oder 112.',
          },
          {
            art: 'hinweis',
            text: 'Umgekehrt gilt genauso: Wer zu Unrecht verdächtigt wird, hat ein Recht auf ein faires Verfahren. Genau deshalb läuft die Meldung über einen festen Weg und nicht über Flurgespräche.',
          },
        ],
      },
    ],
    siehe: ['mit-kindern', 'datenschutz-im-dienst', 'neue-ehrenamtliche'],
  },

  {
    slug: 'datenschutz-im-dienst',
    titel: 'Datenschutz im Dienst: Fotos, Listen, Messenger',
    teaser: 'Was du mit Teilnehmerlisten, Gruppenchats und Gottesdienstfotos darfst - und was regelmäßig schiefgeht.',
    rollen: ['staff'],
    kategorie: 'Verantwortung',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Gemeindedaten sind besonders heikel: Aus einer Teilnehmerliste lässt sich die Religionszugehörigkeit ablesen, und die zählt zu den besonderen Kategorien personenbezogener Daten nach Art. 9 DSGVO. Für den Alltag reichen aber ein paar Regeln.',
          },
        ],
      },
      {
        titel: 'Listen und Kontaktdaten',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Nur erheben, was du für den Zweck brauchst. Für eine Freizeitanmeldung: Notfallkontakt und Allergien ja, Beruf nein.',
              'Dort lassen, wo sie hingehören - im System der Gemeinde. Keine Kopien in privaten Tabellen, Notiz-Apps oder im privaten Mail-Postfach.',
              'Nach dem Zweck löschen. Die Liste der Freizeit von vorletztem Jahr hat auf keinem Laptop mehr etwas zu suchen.',
              'Rundmails an Verteiler immer über BCC. Ein offener Verteiler ist der häufigste Datenschutzvorfall in Gemeinden überhaupt.',
            ],
          },
        ],
      },
      {
        titel: 'Fotos und Video',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Erkennbare Einzelpersonen brauchen eine Einwilligung, bevor das Bild veröffentlicht wird.',
              'Bei Minderjährigen entscheiden die Erziehungsberechtigten - bei älteren Jugendlichen zusätzlich der Jugendliche selbst.',
              'Einwilligungen sind widerruflich. Wer sagt "nehmt das Bild runter", bekommt das ohne Diskussion.',
              'Im Livestream: Die Kamera bleibt auf Bühne und Redner. Kein Schwenk ins Publikum, der Einzelne herausgreift.',
              'Ein Hinweisschild am Eingang ersetzt keine Einwilligung für eine Nahaufnahme.',
            ],
          },
        ],
      },
      {
        titel: 'Messenger',
        bloecke: [
          {
            art: 'text',
            text: 'Gruppenchats sind praktisch und rechtlich unsauber: Wer eine WhatsApp-Gruppe anlegt, gibt Telefonnummern weiter. Für Dienstliches gehört die Kommunikation in den Teambereich, nicht in einen privaten Chat.',
          },
          {
            art: 'warnung',
            text: 'Nie in einen Gruppenchat: Gebetsanliegen mit Namen und Diagnose, seelsorgerliche Inhalte, Vermutungen über Personen. Das ist der Weg, auf dem Vertrauliches die Gemeinde verlässt.',
          },
        ],
      },
      {
        titel: 'Wenn doch etwas passiert',
        bloecke: [
          {
            art: 'text',
            text: 'Verteiler offen verschickt, Laptop verloren, Liste im falschen Chat gelandet: sofort der Leitung melden. Meldepflichtige Datenschutzverstöße müssen binnen 72 Stunden bei der Aufsichtsbehörde angezeigt werden - diese Frist läuft auch, solange jemand hofft, dass es niemand merkt.',
          },
          {
            art: 'warnung',
            text: 'Entwurf. Wer bei der FCG Frankfurt als Datenschutzbeauftragter benannt ist und welches Melde­formular gilt, ist hier nicht hinterlegt. Diese beiden Angaben gehören als Erstes ergänzt.',
          },
        ],
      },
    ],
    siehe: ['schutzkonzept', 'kommunikation-und-freigaben'],
  },

  {
    slug: 'dienstplan-churchtools',
    titel: 'Dienstplan in ChurchTools',
    teaser: 'Zusagen, absagen, tauschen - und warum eine späte Absage teurer ist als eine frühe.',
    rollen: ['staff'],
    kategorie: 'Abläufe',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'ChurchTools führt die Dienstpläne: Wer wann für welchen Dienst eingeteilt ist, wer zugesagt hat und wo noch jemand fehlt. Die Teamleitung plant darin vor, die Zusage kommt von dir.',
          },
          {
            art: 'schritte',
            punkte: [
              'Anfrage kommt per Mail oder Push. Zu- oder absagen, sobald du es weißt - nicht erst, wenn du Zeit hast.',
              'Zugesagt heißt verbindlich. Der Plan wird um dich herum gebaut.',
              'Kannst du doch nicht: erst selbst um Tausch kümmern, dann die Teamleitung informieren. In dieser Reihenfolge.',
              'Urlaub und Sperrzeiten trägst du vorher ein. Dann wirst du gar nicht erst angefragt.',
            ],
          },
        ],
      },
      {
        titel: 'Warum das Timing zählt',
        bloecke: [
          {
            art: 'text',
            text: 'Eine Absage drei Wochen vorher ist ein Klick. Dieselbe Absage am Samstagabend bedeutet, dass jemand telefoniert, bis er Ersatz hat - und wenn er keinen findet, steht ein Dienst unbesetzt. Der Unterschied liegt nicht im Grund, sondern im Zeitpunkt.',
          },
          {
            art: 'hinweis',
            text: 'Keine Zusage ist auch eine Antwort, nur die schlechteste. Ein "nein, diesmal nicht" ist völlig in Ordnung und für die Planung Gold wert.',
          },
        ],
      },
      {
        bloecke: [
          {
            art: 'warnung',
            text: 'Entwurf. Die App verweist auf das öffentliche ChurchTools-Verzeichnis, weil die Adresse der eigenen Instanz noch nicht hinterlegt ist. Sobald sie feststeht, gehört sie in die Stammdaten - dann führen die Links direkt in den Dienstplan.',
          },
        ],
      },
    ],
    siehe: ['sonntag-technik', 'neue-ehrenamtliche'],
  },

  {
    slug: 'neue-ehrenamtliche',
    titel: 'Neue Ehrenamtliche einarbeiten',
    teaser: 'Die ersten vier Wochen entscheiden, ob jemand bleibt. Eine Checkliste für Teamleitungen.',
    rollen: ['staff'],
    kategorie: 'Abläufe',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Die meisten Ehrenamtlichen hören nicht auf, weil die Aufgabe zu schwer war, sondern weil nie klar wurde, was von ihnen erwartet wird. Einarbeitung ist kein Wohlwollen, sondern die günstigste Personalarbeit, die es gibt.',
          },
        ],
      },
      {
        titel: 'Vor dem ersten Dienst',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Ein Gespräch: Was reizt dich daran, wie viel Zeit hast du wirklich, was soll auf keinen Fall passieren.',
              'Erwartungen konkret benennen - Rhythmus, Uhrzeit, Vorbereitung. "Ab und zu mal" ist keine Absprache.',
              'Bei Arbeit mit Minderjährigen: Führungszeugnis und Selbstverpflichtung sind Voraussetzung, nicht Formalie danach.',
              'Eine feste Ansprechperson benennen. Nicht "das Team", sondern ein Name mit Nummer.',
            ],
          },
        ],
      },
      {
        titel: 'Die ersten Wochen',
        bloecke: [
          {
            art: 'schritte',
            punkte: [
              'Erster Termin: nur zuschauen, ohne Verantwortung.',
              'Zweiter bis vierter: mitmachen mit jemandem an der Seite.',
              'Danach: eigener Dienst, aber mit jemandem erreichbar im Hintergrund.',
              'Nach etwa vier Wochen ein kurzes Gespräch: Passt es? Diese eine Frage rettet mehr Ehrenamtliche als jede Dankesveranstaltung.',
            ],
          },
        ],
      },
      {
        titel: 'Zugänge und Ausstieg',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Zugänge geben, was gebraucht wird - ChurchTools, Teambereich, Schlüssel - und dokumentieren, wer was hat.',
              'Beim Ausstieg dasselbe rückwärts: Zugänge entziehen, Schlüssel zurück, aus Verteilern nehmen. Das wird fast immer vergessen.',
              'Wer aufhört, bekommt ein Danke und keine Nachfrage, warum er nicht durchhält.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Wer die Führungszeugnisse einsieht, wer Zugänge vergibt und wo die Schlüsselliste geführt wird, ist hier nicht hinterlegt. Diese drei Zuständigkeiten sollte die Leitung eintragen.',
          },
        ],
      },
    ],
    siehe: ['schutzkonzept', 'erste-mitarbeit'],
  },

  {
    slug: 'sonntag-technik',
    titel: 'Der Sonntag aus Sicht der Technik',
    teaser: 'Zeitplan, Zuständigkeiten und die Pannen, die sich mit fünf Minuten Vorlauf vermeiden lassen.',
    rollen: ['staff'],
    kategorie: 'Abläufe',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Technik fällt nur auf, wenn sie nicht funktioniert. Der Zeitplan ist deshalb großzügiger, als er wirken mag - der Puffer ist die eigentliche Arbeit.',
          },
          {
            art: 'schritte',
            punkte: [
              'Rund 90 Minuten vorher: Anlage hochfahren, Mikrofone prüfen, Batterien tauschen. Batterien werden getauscht, nicht gemessen.',
              'Soundcheck mit der Band, vollständig besetzt. Ein Check ohne Schlagzeug ist kein Check.',
              'Präsentation: Liedtexte, Ansagen und Bibelstellen einpflegen und einmal komplett durchklicken.',
              'Livestream: Verbindung testen, Ton am Encoder prüfen, Aufnahme scharf schalten.',
              'Kurze Absprache mit der Moderation: Reihenfolge, Einspieler, wer wann ein Mikro braucht.',
              'Nach dem Gottesdienst: herunterfahren, Mikrofone laden, Aufnahme sichern und ablegen.',
            ],
          },
        ],
      },
      {
        titel: 'Die immer gleichen Pannen',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Leere Batterie im Headset. Vermeidbar durch Tausch statt Hoffnung.',
              'Ein Liedtext fehlt, weil die Setlist kurzfristig geändert wurde und niemand Bescheid gesagt hat.',
              'Rückkopplung, weil ein Mikro offen bleibt, das gerade niemand braucht.',
              'Der Stream läuft, aber ohne Ton - deshalb gehört ein Blick auf den echten Stream zum Check, nicht nur auf den Pegel.',
              'Gast am Mikro ohne Einweisung. Zwei Sätze vorher sparen zwei Minuten Gestammel.',
            ],
          },
          {
            art: 'hinweis',
            text: 'Wenn im Gottesdienst etwas ausfällt: nicht hetzen, nicht auf die Bühne rufen. Moderation und Technik haben ein vereinbartes Zeichen - dafür ist es da.',
          },
          {
            art: 'warnung',
            text: 'Entwurf. Gerätespezifische Abläufe - welches Pult, welcher Encoder, welche Presets - gehören ins Teamhandbuch des Technikteams und stehen bewusst nicht hier.',
          },
        ],
      },
    ],
    siehe: ['dienstplan-churchtools', 'notfall-im-gottesdienst'],
  },

  {
    slug: 'kommunikation-und-freigaben',
    titel: 'Was darf ich posten?',
    teaser: 'Welcher Kanal wofür da ist, wer freigibt und was ohne Rückfrage nie nach außen geht.',
    rollen: ['staff'],
    kategorie: 'Verantwortung',
    status: 'entwurf',
    abschnitte: [
      {
        titel: 'Die Kanäle und wofür sie da sind',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Website: verbindliche Informationen - Zeiten, Termine, Angebote. Was hier steht, gilt.',
              'Instagram: Eindrücke und Kurzfristiges. Hohe Reichweite, wenig Halbwertszeit.',
              'YouTube: Predigten und Livestream.',
              'Newsletter: das Wichtigste gebündelt, für Leute, die nicht auf Social Media sind.',
              'Teambereich und ChurchTools: alles Interne. Dienstpläne, Absprachen, Unterlagen.',
              'Abkündigungen im Gottesdienst: knapp und wenige. Jede zusätzliche Ansage entwertet die davor.',
            ],
          },
        ],
      },
      {
        titel: 'Vor dem Posten',
        bloecke: [
          {
            art: 'schritte',
            punkte: [
              'Stimmt es? Datum, Uhrzeit, Ort gegen die verbindliche Quelle prüfen, nicht aus dem Kopf.',
              'Sind Personen erkennbar? Dann Einwilligung - bei Minderjährigen von den Erziehungsberechtigten.',
              'Ist es intern? Dienstpläne, Anliegen und Interna gehören nicht auf einen öffentlichen Kanal.',
              'Im Zweifel freigeben lassen, bevor es online geht. Ein Post ist in zwei Minuten draußen und in zwei Tagen nicht wieder eingefangen.',
            ],
          },
        ],
      },
      {
        titel: 'Ohne Rückfrage nie',
        bloecke: [
          {
            art: 'warnung',
            text: 'Stellungnahmen im Namen der Gemeinde, alles zu Personalfragen, Konflikten, Krankheiten oder Todesfällen, jede Reaktion auf Presseanfragen, Bilder aus Seelsorge- oder Gebetssituationen. Das läuft über die Leitung, immer.',
          },
          {
            art: 'warnung',
            text: 'Entwurf. Wer die Kanäle betreut und wer freigibt, ist hier nicht benannt. Ohne diese Namen bleibt der Artikel eine Haltung statt eines Ablaufs - sie gehören ergänzt.',
          },
        ],
      },
    ],
    siehe: ['datenschutz-im-dienst', 'logo-und-design'],
  },

  {
    slug: 'notfall-im-gottesdienst',
    titel: 'Notfall im Gottesdienst',
    teaser: 'Medizinischer Notfall, Feueralarm, Räumung: wer was tut, während vorne noch jemand redet.',
    rollen: ['staff'],
    kategorie: 'Verantwortung',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'warnung',
            text: 'Im Ernstfall gilt: Menschen vor Ablauf. Der Gottesdienst wird unterbrochen, nicht zu Ende gebracht. Notruf 112.',
          },
        ],
      },
      {
        titel: 'Medizinischer Notfall',
        bloecke: [
          {
            art: 'schritte',
            punkte: [
              'Erste Person bleibt bei dem Betroffenen und verlässt ihn nicht.',
              'Zweite Person ruft 112 - laut und namentlich beauftragt, nicht in die Runde gerufen.',
              'Dritte Person holt Erste-Hilfe-Material und den AED, wenn einer im Haus ist, und weist den Rettungsdienst am Eingang ein.',
              'Umstehende wegschicken, nicht dazuholen. Platz und Ruhe helfen mehr als eine Traube.',
              'Moderation unterbricht und sagt ruhig an, was passiert. Schweigen erzeugt mehr Unruhe als eine klare Ansage.',
            ],
          },
        ],
      },
      {
        titel: 'Räumung',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Ansage über die Anlage - eine Stimme, kein Durcheinander. Die Technik schaltet Musik und Stream ab.',
              'Fluchtwege weisen, nicht nur benennen. Das Willkommensteam steht an den Türen.',
              'Kinderräume: Die Betreuung bringt ihre Gruppe eigenständig hinaus und nimmt die Anwesenheitsliste mit. Eltern laufen nicht gegen den Strom in die Kinderräume - das muss vorher kommuniziert sein.',
              'Sammelpunkt ansteuern und dort abgleichen, wer da ist. Die Liste ist der Grund, warum Kinder angemeldet werden.',
              'Niemand geht zurück ins Gebäude, bevor die Feuerwehr es freigibt.',
            ],
          },
        ],
      },
      {
        titel: 'Danach',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Vorfall dokumentieren: was, wann, wer beteiligt, was wurde getan.',
              'Der Leitung melden - auch wenn es glimpflich ausging.',
              'Beteiligte nicht allein nach Hause gehen lassen. Wer Erste Hilfe geleistet hat, steht danach oft neben sich.',
              'Nichts nach außen kommunizieren, bevor die Leitung entschieden hat, ob und was gesagt wird.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Standort von Erste-Hilfe-Material und AED, benannte Ersthelfer, Sammelpunkt und Räumungsordnung müssen für das Gebäude an der Eckenheimer Landstraße konkret eingetragen werden. Ein Notfallartikel ohne diese Angaben ist im Ernstfall wertlos - das ist der dringendste offene Punkt in diesem Wiki.',
          },
        ],
      },
    ],
    siehe: ['sonntag-technik', 'schutzkonzept'],
  },

  {
    slug: 'auslagen-abrechnen',
    titel: 'Auslagen abrechnen',
    teaser: 'Was erstattet wird, welcher Beleg zählt und warum du größere Beträge vorher absprichst.',
    rollen: ['staff'],
    kategorie: 'Praktisches',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Ehrenamt heißt, Zeit zu schenken - nicht Geld zuzuschießen. Was du für deinen Dienst auslegst, bekommst du zurück. Viele fragen aus Bescheidenheit nicht danach; das ist gut gemeint und auf Dauer ungesund fürs Team.',
          },
          {
            art: 'schritte',
            punkte: [
              'Vorher absprechen, sobald es über einen Kleinbetrag hinausgeht. Die Teamleitung kennt das Budget, du nicht.',
              'Beleg aufheben. Kassenbon oder Rechnung im Original, kein Kontoauszug - der zeigt den Betrag, aber nicht den Zweck.',
              'Abrechnungsformular ausfüllen: Datum, Zweck, Team, Betrag, IBAN.',
              'Zeitnah einreichen. Belege vom Vorjahr lassen sich buchhalterisch nicht mehr sauber zuordnen.',
            ],
          },
        ],
      },
      {
        titel: 'Gut zu wissen',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Du kannst auf die Erstattung verzichten und sie stattdessen als Spende bescheinigen lassen. Das setzt voraus, dass der Anspruch vorher bestanden hat - deshalb wird auch dann abgerechnet.',
              'Fahrtkosten zu Freizeiten oder Konferenzen werden meist erstattet, die Fahrt zum normalen Sonntagsdienst nicht.',
              'Anschaffungen, die der Gemeinde gehören - Technik, Werkzeug, Material - kauft nicht die Privatperson. Das klärt vorher die Leitung.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Formular, Einreichungsweg, Fristen und die Grenze, ab der vorher gefragt werden muss, sind hier nicht hinterlegt. Beim Gemeindebüro erfragen.',
          },
        ],
      },
    ],
    siehe: ['raeume-buchen'],
  },

  {
    slug: 'logo-und-design',
    titel: 'Logo und Design richtig verwenden',
    teaser: 'Farben, Schriften und die Regeln fürs Logo - damit ein Flyer nach FCG aussieht und nicht nach Word.',
    rollen: ['staff'],
    kategorie: 'Praktisches',
    status: 'entwurf',
    abschnitte: [
      {
        bloecke: [
          {
            art: 'text',
            text: 'Einheitliches Auftreten ist keine Eitelkeit: Wer einen Aushang im Vorbeigehen sieht, erkennt in einer halben Sekunde, ob er von der Gemeinde ist. Diese halbe Sekunde entsteht durch Farbe und Schrift, nicht durch den Text.',
          },
        ],
      },
      {
        titel: 'Farben',
        bloecke: [
          {
            art: 'begriffe',
            eintraege: [
              { wort: 'Petrol #006269', bedeutung: 'Die Hausfarbe. Flächen, Buttons, Überschriften.' },
              { wort: 'Dunkel #00444B', bedeutung: 'Für Kontrast und Tiefe, etwa bei Verläufen.' },
              { wort: 'Hell #0A848C', bedeutung: 'Aufhellung derselben Familie, für Akzente.' },
              { wort: 'Akzent #9FD4D8', bedeutung: 'Sparsam einsetzen - Hinweise, Markierungen, feine Flächen.' },
              { wort: 'Schwarz #000000', bedeutung: 'Fließtext. Grau nur für Nebensächliches.' },
            ],
          },
        ],
      },
      {
        titel: 'Schriften',
        bloecke: [
          {
            art: 'text',
            text: 'Überschriften in einer kräftigen Grotesk (in dieser App: Archivo), Fließtext in einer ruhigen Grotesk (Karla). Zwei Schriften reichen. Eine dritte macht jedes Layout unruhig.',
          },
        ],
      },
      {
        titel: 'Das Logo',
        bloecke: [
          {
            art: 'liste',
            punkte: [
              'Nicht verzerren. Beim Skalieren die Proportionen halten.',
              'Nicht umfärben, nicht mit Effekten versehen, nichts hineinschreiben.',
              'Schutzraum lassen: rundherum mindestens die Höhe des Signets frei.',
              'Auf unruhigem Foto nur mit ausreichendem Kontrast - sonst auf eine ruhige Fläche setzen.',
              'Immer die Originaldatei verwenden. Kein Screenshot von der Website, keine Version aus einer PowerPoint von 2019.',
            ],
          },
          {
            art: 'warnung',
            text: 'Entwurf. Die Farbwerte stammen aus dem Design dieser App und decken sich mit dem Auftritt der Website. Ein verbindliches Corporate-Design-Handbuch der FCG Frankfurt liegt mir nicht vor - falls es eines gibt, hat es Vorrang.',
          },
        ],
      },
    ],
    siehe: ['kommunikation-und-freigaben'],
  },
]

export const wikiArtikel: WikiArtikel[] = [...gast, ...mitglied, ...staff]

/** Artikel einer Rolle, nach Kategorie gebuendelt und in Reihenfolge des Bestands. */
export function artikelFuer(rolle: Rolle): WikiArtikel[] {
  return wikiArtikel.filter((a) => a.rollen.includes(rolle))
}

/**
 * Reihenfolge der Kategorien je Rolle - fest vorgegeben statt aus dem Bestand
 * abgeleitet. Sonst entscheidet der erste passende Artikel, was oben steht, und
 * ein Artikel, den sich zwei Rollen teilen, schiebt bei der einen Rolle die
 * falsche Kategorie nach vorn. Was hier fehlt, landet hinten.
 */
const kategorieFolge: Record<Rolle, string[]> = {
  gast: ['Erster Besuch', 'Verstehen'],
  mitglied: ['Dazugehören', 'Mitarbeiten', 'Hilfe', 'Praktisches'],
  staff: ['Verantwortung', 'Abläufe', 'Praktisches'],
}

export function kategorienFuer(rolle: Rolle): { name: string; artikel: WikiArtikel[] }[] {
  const gruppen: { name: string; artikel: WikiArtikel[] }[] = []
  for (const artikel of artikelFuer(rolle)) {
    const treffer = gruppen.find((g) => g.name === artikel.kategorie)
    if (treffer) treffer.artikel.push(artikel)
    else gruppen.push({ name: artikel.kategorie, artikel: [artikel] })
  }

  const folge = kategorieFolge[rolle]
  const rang = (name: string) => {
    const i = folge.indexOf(name)
    return i === -1 ? folge.length : i
  }
  return gruppen.sort((a, b) => rang(a.name) - rang(b.name))
}

export function artikelNachSlug(slug: string): WikiArtikel | undefined {
  return wikiArtikel.find((a) => a.slug === slug)
}

/** Gesamter Text eines Artikels - fuer Suche und Lesezeit. */
export function artikelText(artikel: WikiArtikel): string {
  const teile: string[] = [artikel.titel, artikel.teaser, artikel.kategorie]
  for (const abschnitt of artikel.abschnitte) {
    if (abschnitt.titel) teile.push(abschnitt.titel)
    for (const block of abschnitt.bloecke) {
      if (block.art === 'liste' || block.art === 'schritte') teile.push(block.punkte.join(' '))
      else if (block.art === 'begriffe') teile.push(block.eintraege.map((e) => `${e.wort} ${e.bedeutung}`).join(' '))
      else teile.push(block.text)
    }
  }
  return teile.join(' ')
}

/** Grobe Lesezeit in Minuten, mindestens eine. */
export function lesezeit(artikel: WikiArtikel): number {
  return Math.max(1, Math.round(artikelText(artikel).split(/\s+/).length / 200))
}
