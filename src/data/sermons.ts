import type { Sermon } from './types'

/**
 * Demo-Inhalte. Im Betrieb kommen diese Daten aus dem Redaktionssystem
 * (Upload -> Transkript -> Kurzfassung/Tags -> menschliche Freigabe).
 */
export const sermons: Sermon[] = [
  {
    id: 'p-2026-08-30',
    title: 'Nichts kann uns trennen',
    speaker: 'Pastor Micha Berg',
    series: 'Römer 8 - Leben im Geist',
    date: '2026-08-30',
    durationMin: 38,
    topics: ['Identität', 'Zusage Gottes', 'Leid'],
    bibleBooks: ['Römer'],
    keyVerse: 'Römer 8,38-39',
    summary:
      'Paulus schreibt keinen Wohlfühlsatz, sondern eine Kampfansage: Es gibt keine Macht, die stärker ist als die Liebe Gottes in Christus. Wir schauen an, was das für Tage bedeutet, an denen sich das überhaupt nicht so anfühlt.',
    takeaways: [
      'Gottes Zusage hängt nicht an unserer Tagesform.',
      'Römer 8 ist im Kontext von Verfolgung geschrieben - nicht im Wellness-Modus.',
      'Sicherheit in Gott führt nicht zu Passivität, sondern macht mutig.',
    ],
    chapters: [
      { at: 0, label: 'Einstieg: Die Frage hinter der Angst' },
      { at: 480, label: 'Kontext: Wem Paulus schreibt' },
      { at: 1180, label: 'Vers 38-39 im Detail' },
      { at: 1920, label: 'Wenn Gefühle etwas anderes sagen' },
      { at: 2100, label: 'Anwendung und Gebet' },
    ],
    transcript:
      'Römer 8 endet mit einer Liste von Mächten: Tod, Leben, Engel, Gewalten, Gegenwärtiges, Zukünftiges. Paulus zählt auf, wovor Menschen tatsächlich Angst haben, und sagt: nichts davon kann uns trennen von der Liebe Gottes, die in Christus Jesus ist. Wichtig ist der Kontext. Dieser Brief geht an eine Gemeinde, die Druck kennt. Das ist kein Satz für gute Tage, sondern für die Tage, an denen der Glaube sich dünn anfühlt. Wer sich in Gott sicher weiß, muss sein Leben nicht mehr absichern - und wird dadurch frei für andere.',
    groupQuestions: [
      'Welche der von Paulus genannten Mächte beschäftigt dich gerade am meisten?',
      'Wo merkst du den Unterschied zwischen "Ich weiß es" und "Ich spüre es"?',
      'Was würdest du anders tun, wenn du dich zu 100 % sicher wüsstest?',
    ],
  },
  {
    id: 'p-2026-08-23',
    title: 'Beten, wenn nichts passiert',
    speaker: 'Pastorin Hanna Vogt',
    series: 'Gebet konkret',
    date: '2026-08-23',
    durationMin: 32,
    topics: ['Gebet', 'Zweifel', 'Geduld'],
    bibleBooks: ['Lukas', 'Psalmen'],
    keyVerse: 'Lukas 18,1-8',
    summary:
      'Jesus erzählt ein Gleichnis über eine Frau, die nicht aufhört zu fragen. Es geht nicht um fromme Technik, sondern um Beharrlichkeit - gerade dann, wenn Gebet sich nach Selbstgespräch anfühlt.',
    takeaways: [
      'Beharrliches Gebet ist kein Überreden Gottes, sondern Beziehungsarbeit.',
      'Klage ist eine biblische Gebetsform, keine Glaubensschwäche.',
      'Kleine, feste Gebetszeiten tragen weiter als seltene Höhepunkte.',
    ],
    chapters: [
      { at: 0, label: 'Wenn der Himmel schweigt' },
      { at: 420, label: 'Das Gleichnis vom Richter' },
      { at: 1080, label: 'Klagepsalmen als Sprachschule' },
      { at: 1620, label: 'Drei Schritte für diese Woche' },
    ],
    transcript:
      'Jesus erzählt das Gleichnis, damit sie allezeit beten und nicht nachlassen. Beten, wenn nichts passiert, ist die eigentliche Schule des Glaubens. Die Psalmen geben uns dafür Sprache: fast ein Drittel sind Klagepsalmen. Wer klagt, redet noch mit Gott. Schweigen ist der Abbruch, Klage ist die Fortsetzung. Praktisch hilft ein fester Ort, eine feste Zeit und eine kurze Liste - lieber fünf Minuten täglich als eine Stunde einmal im Monat.',
    groupQuestions: [
      'Wofür betest du schon lange ohne sichtbare Antwort?',
      'Wie klingt Klage in deinen eigenen Worten?',
      'Welche Gebetsgewohnheit willst du diese Woche ausprobieren?',
    ],
  },
  {
    id: 'p-2026-08-16',
    title: 'Wer bin ich, wenn niemand zuschaut?',
    speaker: 'Pastor Micha Berg',
    series: 'Identität',
    date: '2026-08-16',
    durationMin: 35,
    topics: ['Identität', 'Selbstwert', 'Nachfolge'],
    bibleBooks: ['Epheser', 'Matthäus'],
    keyVerse: 'Epheser 2,10',
    summary:
      'Zwischen Selbstoptimierung und Selbstzweifel liegt ein dritter Weg: Identität als Geschenk. Warum Leistung ein schlechter Anker ist und was sich ändert, wenn Zugehörigkeit vor Verhalten kommt.',
    takeaways: [
      'Identität wird empfangen, nicht erarbeitet.',
      'Zugehörigkeit kommt vor Verhalten - das ist die Reihenfolge des Evangeliums.',
      'Gesunde Identität macht kritikfähig statt kritikimmun.',
    ],
    chapters: [
      { at: 0, label: 'Die Bühne und das Backstage' },
      { at: 600, label: 'Epheser 2: Gottes Werk' },
      { at: 1320, label: 'Leistung als Anker - warum das bricht' },
      { at: 1800, label: 'Praktische Schritte' },
    ],
    transcript:
      'Wir sind sein Werk, geschaffen in Christus Jesus zu guten Werken. Die Reihenfolge ist entscheidend: erst Werk Gottes, dann gute Werke. Wenn Leistung der Anker der Identität ist, wird jede Kritik zur Existenzfrage. Wer aber weiß, dass Zugehörigkeit schon geklärt ist, kann Feedback hören, ohne zu zerbrechen. Identität im Verborgenen zeigt sich daran, wie wir handeln, wenn es niemand mitbekommt.',
    groupQuestions: [
      'Woran misst du an einem schlechten Tag deinen Wert?',
      'Wo lebst du "Verhalten vor Zugehörigkeit"?',
      'Wer darf dir ehrlich Feedback geben?',
    ],
  },
  {
    id: 'p-2026-08-09',
    title: 'Gastfreundschaft ist Mission',
    speaker: 'Gastprediger Samuel Okoro',
    series: 'Gemeinde für die Stadt',
    date: '2026-08-09',
    durationMin: 41,
    topics: ['Gemeinschaft', 'Mission', 'Nachbarschaft'],
    bibleBooks: ['Lukas', 'Römer'],
    keyVerse: 'Römer 12,13',
    summary:
      'Die frühe Gemeinde wuchs an Esstischen, nicht an Bühnen. Ein Blick darauf, wie normale Gastfreundschaft zur stärksten Einladung wird, die eine Gemeinde hat.',
    takeaways: [
      'Der Esstisch ist niedrigschwelliger als jeder Gottesdienst.',
      'Gastfreundschaft heißt Raum geben, nicht beeindrucken.',
      'Einladen ist eine Gewohnheit, kein Talent.',
    ],
    chapters: [
      { at: 0, label: 'Ein Tisch, zwei Stühle zu wenig' },
      { at: 540, label: 'Jesus und die Mahlzeiten' },
      { at: 1500, label: 'Ausreden und Antworten' },
      { at: 2160, label: 'Die 6-Wochen-Einladung' },
    ],
    transcript:
      'Bei Lukas isst Jesus ständig. Er isst mit Zöllnern, mit Pharisäern, mit Jüngern. Der Tisch ist der Ort, an dem Fremde zu Bekannten und Bekannte zu Freunden werden. Gastfreundschaft in Römer 12 ist ein Verb, kein Gefühl. Und sie ist niedrigschwellig: Suppe reicht. Wer sechs Wochen lang einmal pro Woche jemanden einlädt, verändert seine Nachbarschaft mehr als durch jede Aktion.',
    groupQuestions: [
      'Wen aus deiner Nachbarschaft kennst du beim Vornamen?',
      'Was hindert dich am Einladen - Zeit, Raum oder Angst vor Bewertung?',
      'Wen könntest du in den nächsten zwei Wochen einladen?',
    ],
  },
  {
    id: 'p-2026-08-02',
    title: 'Vergeben ohne zu vergessen',
    speaker: 'Pastorin Hanna Vogt',
    series: 'Beziehungen heilen',
    date: '2026-08-02',
    durationMin: 44,
    topics: ['Vergebung', 'Konflikt', 'Heilung'],
    bibleBooks: ['Matthäus', 'Kolosser'],
    keyVerse: 'Matthäus 18,21-35',
    summary:
      'Vergebung wird oft mit Verharmlosen verwechselt. Diese Predigt trennt beides sauber - und benennt, wo Vergebung Grenzen und professionelle Hilfe braucht.',
    takeaways: [
      'Vergebung ist Verzicht auf Vergeltung, nicht Verzicht auf Wahrheit.',
      'Vergebung ist ein Prozess, oft mit Wiederholungen.',
      'Vergebung erzwingt keine Wiederherstellung von Vertrauen.',
    ],
    chapters: [
      { at: 0, label: 'Was Vergebung nicht ist' },
      { at: 720, label: 'Matthäus 18 und die 77 Mal' },
      { at: 1560, label: 'Grenzen, Schutz und Hilfe' },
      { at: 2340, label: 'Ein erster Schritt' },
    ],
    transcript:
      'Petrus fragt nach der Obergrenze, Jesus nennt eine Zahl, die jede Buchhaltung sprengt. Vergebung heißt: Ich gebe die Schuldeintreibung ab. Das ist etwas anderes als Vertrauen. Vertrauen wird aufgebaut, Vergebung wird geschenkt. Wo Gewalt, Missbrauch oder Machtmissbrauch im Spiel sind, gehört Schutz an die erste Stelle, und es braucht qualifizierte Hilfe. Die Gemeinde begleitet - sie ersetzt keine Therapie und keine Strafverfolgung.',
    groupQuestions: [
      'Wo verwechselst du Vergeben und Verharmlosen?',
      'Was wäre ein realistischer erster Schritt?',
      'Wo brauchst du Begleitung statt Ratschläge?',
    ],
  },
  {
    id: 'p-2026-07-26',
    title: 'Genug - Vom Umgang mit Geld',
    speaker: 'Ältester Thomas Reuter',
    series: 'Alltag & Glaube',
    date: '2026-07-26',
    durationMin: 36,
    topics: ['Geld', 'Zufriedenheit', 'Großzügigkeit'],
    bibleBooks: ['1. Timotheus', 'Philipper'],
    keyVerse: '1. Timotheus 6,6-10',
    summary:
      'Nicht Geld ist das Problem, sondern die stille Behauptung, dass etwas mehr davon die Unruhe beendet. Über Zufriedenheit als erlernbare Haltung.',
    takeaways: [
      'Zufriedenheit ist trainierbar, nicht angeboren.',
      'Großzügigkeit ist das praktischste Gegenmittel gegen Geldangst.',
      'Transparenz über Finanzen entlastet - persönlich und in der Gemeinde.',
    ],
    chapters: [
      { at: 0, label: 'Die Zahl, die nie reicht' },
      { at: 660, label: '1. Timotheus 6 im Klartext' },
      { at: 1440, label: 'Großzügigkeit als Übung' },
    ],
    transcript:
      'Die Gottesfurcht mit Genügsamkeit ist ein großer Gewinn. Paulus stellt Zufriedenheit und Frömmigkeit nebeneinander. Er sagt nicht, Geld sei böse, sondern die Liebe zum Geld sei eine Wurzel. Wer großzügig gibt, unterbricht den Kreislauf des Vergleichens. Praktisch heißt das: einen Prozentsatz festlegen, automatisieren, und einmal im Jahr überprüfen.',
    groupQuestions: [
      'Was wäre für dich "genug"?',
      'Wann hast du zuletzt spontan großzügig gehandelt?',
      'Welche Zahl in deinem Leben macht dich unruhig?',
    ],
  },
  {
    id: 'p-2026-07-19',
    title: 'Der Geist als Beistand',
    speaker: 'Pastor Micha Berg',
    series: 'Römer 8 - Leben im Geist',
    date: '2026-07-19',
    durationMin: 39,
    topics: ['Heiliger Geist', 'Gebet', 'Führung'],
    bibleBooks: ['Römer', 'Johannes'],
    keyVerse: 'Römer 8,26-27',
    summary:
      'Was tun, wenn man nicht weiß, wie man beten soll? Römer 8 antwortet erstaunlich nüchtern: Der Geist tritt ein, wo unsere Worte enden.',
    takeaways: [
      'Nicht-beten-Können ist ein biblisch beschriebener Normalfall.',
      'Der Geist führt, er überrumpelt nicht.',
      'Führung erkennt man meist rückblickend deutlicher als im Moment.',
    ],
    chapters: [
      { at: 0, label: 'Sprachlos vor Gott' },
      { at: 600, label: 'Römer 8,26-27' },
      { at: 1500, label: 'Wie erkenne ich Führung?' },
    ],
    transcript:
      'Wir wissen nicht, was wir beten sollen, wie sichs gebührt - das steht so in Römer 8. Sprachlosigkeit ist kein Defizit, sondern der Ort, an dem der Geist eintritt. Führung im Neuen Testament ist selten spektakulär: Schrift, Gebet, Gemeinschaft, Umstände und geprüfte Eindrücke gehören zusammen. Wer nur auf ein Gefühl hört, verwechselt schnell die eigene Stimmung mit Gottes Stimme.',
    groupQuestions: [
      'Wann warst du zuletzt beim Beten sprachlos?',
      'Wie prüfst du Eindrücke?',
      'Wo siehst du rückblickend Führung?',
    ],
  },
  {
    id: 'p-2026-07-12',
    title: 'Sabbat für Erschöpfte',
    speaker: 'Pastorin Hanna Vogt',
    series: 'Alltag & Glaube',
    date: '2026-07-12',
    durationMin: 33,
    topics: ['Ruhe', 'Erschöpfung', 'Vertrauen'],
    bibleBooks: ['2. Mose', 'Markus'],
    keyVerse: 'Markus 2,27',
    summary:
      'Ruhe ist im biblischen Denken kein Belohnungssystem für Fleißige, sondern ein Vertrauensakt. Warum Pausen theologisch sind - und wie sie praktisch aussehen.',
    takeaways: [
      'Der Sabbat ist für den Menschen gemacht, nicht umgekehrt.',
      'Ruhe ist eine Vertrauensübung: Die Welt läuft ohne mich weiter.',
      'Erschöpfung ist ein Signal, kein Charakterfehler.',
    ],
    chapters: [
      { at: 0, label: 'Müde Gemeinde' },
      { at: 540, label: 'Sabbat im Alten Testament' },
      { at: 1260, label: 'Jesus und der Sabbat' },
      { at: 1740, label: 'Ein Ruhe-Rhythmus für deine Woche' },
    ],
    transcript:
      'Der Sabbat ist um des Menschen willen gemacht, nicht der Mensch um des Sabbats willen. Ruhe ist im Alten Testament eng mit Befreiung verbunden: Sklaven haben keine freien Tage. Wer ruht, sagt praktisch: Ich bin nicht das Fundament der Welt. Erschöpfung ist kein moralisches Versagen. Sie ist ein Signal, das man ernst nehmen darf - und manchmal braucht es ärztliche Hilfe, nicht mehr Disziplin.',
    groupQuestions: [
      'Wann hattest du zuletzt einen wirklich freien Tag?',
      'Was hält dich vom Ruhen ab?',
      'Wie könnte ein Ruhe-Rhythmus konkret aussehen?',
    ],
  },
  {
    id: 'p-2026-07-05',
    title: 'Taufe: Öffentlich Ja sagen',
    speaker: 'Pastor Micha Berg',
    series: 'Nächste Schritte',
    date: '2026-07-05',
    durationMin: 28,
    topics: ['Taufe', 'Nachfolge', 'Neuanfang'],
    bibleBooks: ['Apostelgeschichte', 'Römer'],
    keyVerse: 'Römer 6,3-4',
    summary:
      'Was bei der Taufe eigentlich passiert, wer sich taufen lassen kann und warum diese Entscheidung öffentlich ist.',
    takeaways: [
      'Taufe ist Antwort auf Gottes Zusage, keine Vorleistung.',
      'Sie ist bewusst öffentlich - Glaube ist kein Privathobby.',
      'Der nächste Schritt danach ist Gemeinschaft, nicht Perfektion.',
    ],
    chapters: [
      { at: 0, label: 'Warum überhaupt Taufe?' },
      { at: 480, label: 'Römer 6: Mit Christus begraben' },
      { at: 1080, label: 'Häufige Fragen' },
    ],
    transcript:
      'Wir sind mit ihm begraben durch die Taufe in den Tod. Taufe ist ein Bild: Das alte Leben geht unter, ein neues beginnt. In der Apostelgeschichte folgt die Taufe unmittelbar auf den Glauben. Sie ist öffentlich, weil Nachfolge Zeugen hat. Und sie ist keine Ziellinie, sondern eine Startlinie - danach beginnt der gemeinsame Weg in einer Gruppe.',
    groupQuestions: [
      'Was hält dich zurück, wenn du über Taufe nachdenkst?',
      'Wem würdest du davon erzählen?',
      'Welchen nächsten Schritt willst du gehen?',
    ],
  },
  {
    id: 'p-2026-06-28',
    title: 'Wenn Zweifel bleiben',
    speaker: 'Gastprediger Samuel Okoro',
    series: 'Identität',
    date: '2026-06-28',
    durationMin: 37,
    topics: ['Zweifel', 'Glaube', 'Ehrlichkeit'],
    bibleBooks: ['Markus', 'Psalmen'],
    keyVerse: 'Markus 9,24',
    summary:
      'Ein Vater sagt zu Jesus: Ich glaube, hilf meinem Unglauben. Über einen Glauben, der Zweifel aushält, statt ihn zu verstecken.',
    takeaways: [
      'Zweifel ist kein Gegenteil von Glaube, sondern oft seine Begleitung.',
      'Ausgesprochener Zweifel verliert an Macht.',
      'Gemeinde muss ein Ort sein, an dem Fragen erlaubt sind.',
    ],
    chapters: [
      { at: 0, label: 'Der ehrlichste Satz der Bibel' },
      { at: 720, label: 'Markus 9 im Kontext' },
      { at: 1620, label: 'Zweifel in Gemeinschaft' },
    ],
    transcript:
      'Ich glaube, hilf meinem Unglauben - dieser Satz steht so in der Bibel, ungefiltert. Jesus weist den Vater nicht ab. Zweifel, der ausgesprochen wird, ist der Anfang von Gespräch. Zweifel, der versteckt wird, wird zu Distanz. Eine Gemeinde, in der man nur Antworten sagen darf, produziert Menschen, die irgendwann leise gehen.',
    groupQuestions: [
      'Welche Frage traust du dich in Gemeinde selten zu stellen?',
      'Wem kannst du deine Zweifel erzählen?',
      'Was hilft dir, dranzubleiben?',
    ],
  },
]

export const speakers = [...new Set(sermons.map((s) => s.speaker))].sort()
export const series = [...new Set(sermons.map((s) => s.series))].sort()
export const topics = [...new Set(sermons.flatMap((s) => s.topics))].sort()
export const bibleBooks = [...new Set(sermons.flatMap((s) => s.bibleBooks))].sort()
