/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
/**
 * Personen-, Orts- und Begriffslexikon.
 *
 * Die Einträge werden im Bibeltext erkannt und anklickbar gemacht – pro
 * Kapitel jeweils beim ersten Vorkommen, damit die Seite lesbar bleibt.
 *
 * `aliases` enthält die Schreibweisen, die im Text der Lutherbibel 1912
 * tatsächlich auftauchen (z. B. „Kapernaum“ statt „Kafarnaum“).
 *
 * Koordinaten stehen bewusst nicht hier, sondern in `places.ts`: Das
 * Kartenmodul führt seine Orte selbst und verweist über `lexicon` auf den
 * ausführlichen Text. So gibt es für jede Angabe genau eine Quelle.
 */

import { REALIA } from './realia';

export type LexiconKind =
  | 'person'
  | 'ort'
  | 'begriff'
  /** Maße, Gewichte und Geld */
  | 'mass'
  /** Ämter, Berufe und Gruppen */
  | 'amt'
  /** Bräuche, Feste und Riten */
  | 'brauch'
  /** Pflanzen, Tiere, Stoffe und Handwerk */
  | 'natur';

export interface LexiconRef {
  book: string;
  chapter: number;
  verse: number;
  note?: string;
}

export interface LexiconEntry {
  id: string;
  term: string;
  kind: LexiconKind;
  /** Ein bis zwei Sätze für die Kurzansicht. */
  short: string;
  /** Ausführlichere Fassung, wo es sich lohnt. */
  long?: string;
  /**
   * Eine harte Angabe in wenigen Worten – „etwa 45 cm“, „ein Tageslohn“.
   * Sie wird hervorgehoben, weil sie beim Lesen sofort weiterhilft.
   */
  fact?: string;
  /** Weitere Schreibweisen, unter denen der Eintrag im Text erkannt wird. */
  aliases?: string[];
  /** Wichtige Stellen. */
  refs?: LexiconRef[];
  /** Nur bei Orten: heutige Lage, wenn der Name sich geändert hat. */
  today?: string;
}

/** Personen, Orte und theologische Begriffe. */
const NAMEN_UND_BEGRIFFE: LexiconEntry[] = [
  /* ------------------------------------------------------------ Personen */
  {
    id: 'abraham',
    term: 'Abraham',
    kind: 'person',
    aliases: ['Abram'],
    short:
      'Stammvater Israels, der auf eine Zusage hin seine Heimat in Mesopotamien verlässt. Juden, Christen und Muslime berufen sich auf ihn.',
    long: 'Die Erzählungen zeichnen ihn nicht als Helden: Er zweifelt, belügt fremde Herrscher über seine Frau und versucht die Zusage eigenmächtig zu erzwingen. Gerade darin liegt ihre Pointe – die Verheißung hängt nicht an seiner Tadellosigkeit. Die Bindung Isaaks (1. Mose 22) gehört zu den am heftigsten diskutierten Texten der Bibel.',
    refs: [
      { book: '1mo', chapter: 12, verse: 1, note: 'Die Berufung' },
      { book: '1mo', chapter: 22, verse: 1, note: 'Die Bindung Isaaks' },
      { book: 'roem', chapter: 4, verse: 3, note: 'Paulus über seinen Glauben' },
    ],
  },
  {
    id: 'isaak',
    term: 'Isaak',
    kind: 'person',
    short:
      'Sohn Abrahams und Saras, geboren, als beide längst zu alt dafür waren. Sein Name bedeutet „er lacht“ – Sara hatte über die Ankündigung gelacht.',
    refs: [{ book: '1mo', chapter: 21, verse: 1 }],
  },
  {
    id: 'jakob',
    term: 'Jakob',
    kind: 'person',
    // „Israel“ ist bewusst kein Alias: Das Wort steht an den allermeisten
    // Stellen für das Volk, nicht für den Erzvater. Dafür gibt es einen
    // eigenen Eintrag.
    short:
      'Enkel Abrahams, der seinen Bruder um das Erstgeburtsrecht betrügt und nach einem nächtlichen Ringkampf den Namen Israel erhält. Seine zwölf Söhne gelten als Stammväter der Stämme.',
    refs: [
      { book: '1mo', chapter: 28, verse: 10, note: 'Die Himmelsleiter' },
      { book: '1mo', chapter: 32, verse: 25, note: 'Der Kampf am Jabbok' },
    ],
  },
  {
    id: 'israel',
    term: 'Israel',
    kind: 'begriff',
    short:
      'Zuerst der Beiname Jakobs nach dem nächtlichen Kampf, dann der Name seiner Nachkommen – und später auch der des Nordreichs im Unterschied zu Juda.',
    long: 'Welche Bedeutung jeweils gemeint ist, entscheidet der Zusammenhang: In den Erzväter-Erzählungen steht „Israel“ oft für die Person Jakob, in den Königsbüchern meist für den Nordstaat, bei den Propheten und im Neuen Testament für das Gottesvolk insgesamt. Der Name bedeutet etwa „Gott streitet“ oder „der mit Gott streitet“.',
    refs: [
      { book: '1mo', chapter: 32, verse: 28, note: 'Die Namensgebung' },
      { book: 'roem', chapter: 9, verse: 6 },
    ],
  },
  {
    id: 'josef',
    term: 'Josef',
    kind: 'person',
    short:
      'Von seinen Brüdern nach Ägypten verkauft, steigt er dort zum zweithöchsten Mann auf. Seine Geschichte endet mit einer der frühesten Versöhnungsszenen der Weltliteratur.',
    refs: [{ book: '1mo', chapter: 50, verse: 20, note: '„Ihr gedachtet es böse …“' }],
  },
  {
    id: 'mose',
    term: 'Mose',
    kind: 'person',
    short:
      'Führt Israel aus der Sklaverei in Ägypten und empfängt am Sinai die Weisung. Er stirbt vor dem Einzug ins Land, das er nur von ferne sieht.',
    long: 'Die Bibel schildert ihn ungewöhnlich menschlich: Er wehrt sich gegen seine Berufung, verweist auf seine Sprachschwierigkeiten, verliert die Geduld mit dem Volk und einmal auch mit Gott. Ihm werden traditionell die fünf Bücher Mose zugeschrieben; die Forschung sieht darin gewachsene Überlieferungen mehrerer Jahrhunderte.',
    refs: [
      { book: '2mo', chapter: 3, verse: 1, note: 'Der brennende Dornbusch' },
      { book: '5mo', chapter: 34, verse: 1, note: 'Sein Tod' },
    ],
  },
  {
    id: 'josua',
    term: 'Josua',
    kind: 'person',
    short:
      'Nachfolger des Mose, unter dem Israel das Land in Besitz nimmt. Sein hebräischer Name ist die Langform von „Jesus“.',
    refs: [{ book: 'jos', chapter: 1, verse: 9 }],
  },
  {
    id: 'debora',
    term: 'Debora',
    kind: 'person',
    short:
      'Prophetin und Richterin, die als einzige Frau in dieser Doppelrolle erscheint. Das Lied in Richter 5 gilt als einer der ältesten Texte der Bibel.',
    refs: [{ book: 'ri', chapter: 4, verse: 4 }],
  },
  {
    id: 'samuel',
    term: 'Samuel',
    kind: 'person',
    short:
      'Letzter Richter und Prophet des Übergangs: Er salbt sowohl Saul als auch David zum König – und warnt zugleich vor dem Königtum.',
    refs: [{ book: '1sam', chapter: 8, verse: 10, note: 'Die Warnung vor dem König' }],
  },
  {
    id: 'david',
    term: 'David',
    kind: 'person',
    short:
      'Zweiter König Israels, Hirte, Musiker und Kriegsherr. Die Bibel erzählt seinen Aufstieg ebenso ausführlich wie seine Verbrechen.',
    long: 'Sein Königtum (um 1000 v. Chr.) wird zum Maßstab späterer Hoffnung: Der erwartete Messias wird „Sohn Davids“ genannt. Zugleich verschweigt der Text nichts – der Ehebruch mit Batseba und der angeordnete Tod Urias stehen ungeschönt da. Archäologisch ist die Ausdehnung seines Reiches umstritten; die Tel-Dan-Inschrift (9. Jh. v. Chr.) bezeugt immerhin ein „Haus David“.',
    refs: [
      { book: '1sam', chapter: 16, verse: 7, note: 'Gott sieht das Herz an' },
      { book: '2sam', chapter: 11, verse: 1, note: 'Batseba und Uria' },
    ],
  },
  {
    id: 'salomo',
    term: 'Salomo',
    kind: 'person',
    short:
      'Sohn Davids, sprichwörtlich für Weisheit und für den Bau des ersten Tempels. Unter seiner Prachtentfaltung wuchs die Last, die nach seinem Tod das Reich spaltete.',
    refs: [{ book: '1koe', chapter: 3, verse: 9, note: 'Die Bitte um ein hörendes Herz' }],
  },
  {
    id: 'elia',
    term: 'Elia',
    kind: 'person',
    short:
      'Prophet im Nordreich, der sich der Baalsverehrung entgegenstellt. Nach seinem Triumph auf dem Karmel bricht er zusammen und wünscht sich den Tod.',
    refs: [{ book: '1koe', chapter: 19, verse: 12, note: 'Das stille, sanfte Sausen' }],
  },
  {
    id: 'jesaja-person',
    term: 'Jesaja',
    kind: 'person',
    short:
      'Prophet in Jerusalem im 8. Jahrhundert v. Chr. Das nach ihm benannte Buch reicht weit über seine Lebenszeit hinaus und wurde von späteren Prophetenkreisen fortgeschrieben.',
    refs: [{ book: 'jes', chapter: 6, verse: 8, note: 'Die Berufung' }],
  },
  {
    id: 'jeremia-person',
    term: 'Jeremia',
    kind: 'person',
    short:
      'Prophet der letzten Jahrzehnte Judas, der den Untergang ansagen musste und dafür verfolgt wurde. Seine „Konfessionen“ enthalten die schärfsten Klagen der Bibel.',
    refs: [{ book: 'jer', chapter: 20, verse: 7 }],
  },
  {
    id: 'daniel-person',
    term: 'Daniel',
    kind: 'person',
    short:
      'Jüdischer Beamter am babylonischen und persischen Hof, der unter Druck an seinem Glauben festhält. Die Erzählungen ermutigten Menschen unter religiöser Verfolgung.',
    refs: [{ book: 'dan', chapter: 6, verse: 11 }],
  },
  {
    id: 'ester-person',
    term: 'Ester',
    kind: 'person',
    aliases: ['Esther'],
    short:
      'Jüdin am Perserhof, die ihr Volk vor der Vernichtung rettet. Ihr Satz „Komme ich um, so komme ich um“ steht für Mut im entscheidenden Moment.',
    refs: [{ book: 'est', chapter: 4, verse: 16 }],
  },
  {
    id: 'maria',
    term: 'Maria',
    kind: 'person',
    short:
      'Mutter Jesu aus Nazaret. Ihr Lied, das Magnificat, besingt einen Gott, der Mächtige stürzt und Hungernde sättigt.',
    refs: [{ book: 'lk', chapter: 1, verse: 46 }],
  },
  {
    id: 'johannes-taeufer',
    term: 'Johannes der Täufer',
    kind: 'person',
    aliases: ['Johannes der Täufer'],
    short:
      'Bußprediger am Jordan, der Jesus tauft und von Herodes Antipas hingerichtet wird. Auch der jüdische Historiker Josephus berichtet von ihm.',
    refs: [{ book: 'mk', chapter: 1, verse: 4 }],
  },
  {
    id: 'jesus',
    term: 'Jesus',
    kind: 'person',
    aliases: ['Jesu', 'Jesum'],
    short:
      'Wanderprediger aus Nazaret, um 30 n. Chr. in Jerusalem gekreuzigt. Für die christliche Verkündigung ist er der von Gott gesandte Messias, den Gott von den Toten auferweckt hat.',
    long: 'Dass er gelebt hat und gekreuzigt wurde, gilt in der Geschichtswissenschaft als gesichert; Tacitus und Josephus erwähnen ihn unabhängig von den Evangelien. Sein Name ist die griechische Form des hebräischen „Jeschua“ (Gott rettet), „Christus“ die Übersetzung von „Messias“ – ein Titel, kein Nachname.',
    refs: [
      { book: 'mk', chapter: 8, verse: 29, note: 'Die Frage: Wer bin ich?' },
      { book: 'joh', chapter: 1, verse: 14 },
    ],
  },
  {
    id: 'petrus',
    term: 'Petrus',
    kind: 'person',
    aliases: ['Simon Petrus', 'Kephas'],
    short:
      'Fischer vom See Genezareth, Wortführer der Jünger. Die Evangelien erzählen ebenso unverblümt von seinem Bekenntnis wie von seiner Verleugnung.',
    refs: [
      { book: 'mt', chapter: 16, verse: 16 },
      { book: 'apg', chapter: 10, verse: 34, note: 'Die Wende zu den Nichtjuden' },
    ],
  },
  {
    id: 'paulus',
    term: 'Paulus',
    kind: 'person',
    aliases: ['Saulus'],
    short:
      'Zunächst Verfolger der jungen Gemeinde, dann ihr wirkmächtigster Missionar. Von ihm stammen die ältesten Schriften des Neuen Testaments.',
    long: 'Er war Jude aus Tarsus, pharisäisch geschult und römischer Bürger – eine Kombination, die seine Reisen erst möglich machte. Sieben Briefe gelten als sicher von ihm verfasst (Römer, 1./2. Korinther, Galater, Philipper, 1. Thessalonicher, Philemon); die übrigen werden mehrheitlich seiner Schule zugeschrieben. Seine Kernfrage: Gehören Nichtjuden ohne Beschneidung dazu? Seine Antwort veränderte den Lauf des Christentums.',
    refs: [
      { book: 'apg', chapter: 9, verse: 3, note: 'Vor Damaskus' },
      { book: 'gal', chapter: 3, verse: 28 },
    ],
  },
  {
    id: 'maria-magdalena',
    term: 'Maria Magdalena',
    kind: 'person',
    short:
      'Nachfolgerin Jesu und erste Zeugin der Auferstehung. Die verbreitete Darstellung als Prostituierte hat im Text keine Grundlage – sie geht auf eine Predigt Gregors des Großen im 6. Jahrhundert zurück.',
    refs: [{ book: 'joh', chapter: 20, verse: 16 }],
  },
  {
    id: 'pilatus',
    term: 'Pilatus',
    kind: 'person',
    short:
      'Römischer Präfekt von Judäa (26–36 n. Chr.), unter dem Jesus hingerichtet wurde. Außerbiblische Quellen schildern ihn härter als die Evangelien.',
    refs: [{ book: 'joh', chapter: 18, verse: 38, note: '„Was ist Wahrheit?“' }],
  },
  {
    id: 'barnabas',
    term: 'Barnabas',
    kind: 'person',
    short:
      'Levit aus Zypern, der sich für den frisch bekehrten Paulus verbürgt, als niemand ihm traut. Sein Beiname bedeutet „Sohn des Trostes“.',
    refs: [{ book: 'apg', chapter: 9, verse: 27 }],
  },
  {
    id: 'lydia',
    term: 'Lydia',
    kind: 'person',
    short:
      'Purpurhändlerin in Philippi und erste namentlich genannte Christin Europas. In ihrem Haus entsteht die dortige Gemeinde.',
    refs: [{ book: 'apg', chapter: 16, verse: 14 }],
  },
  {
    id: 'stephanus',
    term: 'Stephanus',
    kind: 'person',
    short:
      'Erster Märtyrer der jungen Gemeinde. Bei seiner Steinigung ist ein junger Mann namens Saulus zugegen – der spätere Paulus.',
    refs: [{ book: 'apg', chapter: 7, verse: 59 }],
  },

  /* ---------------------------------------------------------------- Orte */
  {
    id: 'jerusalem',
    term: 'Jerusalem',
    kind: 'ort',
    aliases: ['Zion'],
    short:
      'Hauptstadt seit David, Ort des Tempels und Zentrum der Hoffnung Israels. Zweimal zerstört – 587 v. Chr. durch Babylon, 70 n. Chr. durch Rom.',
    long: 'Die Stadt liegt auf rund 750 Metern Höhe, abseits der großen Handelsstraßen – wirtschaftlich unbedeutend, religiös alles. „Hinaufgehen“ nach Jerusalem ist deshalb wörtlich gemeint. Für Juden, Christen und Muslime ist sie bis heute heilig.',
    refs: [{ book: 'ps', chapter: 122, verse: 1 }],
  },
  {
    id: 'bethlehem',
    term: 'Bethlehem',
    kind: 'ort',
    short:
      'Kleiner Ort südlich von Jerusalem, Heimat Davids und nach Matthäus und Lukas Geburtsort Jesu. Der Name bedeutet „Haus des Brotes“.',
    refs: [{ book: 'mi', chapter: 5, verse: 1 }],
  },
  {
    id: 'nazareth',
    term: 'Nazareth',
    kind: 'ort',
    aliases: ['Nazareth', 'Nazaret'],
    short:
      'Dorf in Galiläa, in dem Jesus aufwuchs. Es war so unbedeutend, dass es außerhalb der Bibel in keiner antiken Quelle vor dem 3. Jahrhundert auftaucht.',
    refs: [{ book: 'joh', chapter: 1, verse: 46, note: '„Was kann aus Nazareth Gutes kommen?“' }],
  },
  {
    id: 'kapernaum',
    term: 'Kapernaum',
    kind: 'ort',
    short:
      'Fischerort am See Genezareth, Ausgangspunkt von Jesu Wirken in Galiläa. Die Ausgrabungen legten eine Synagoge und ein früh verehrtes Wohnhaus frei.',
    refs: [{ book: 'mk', chapter: 1, verse: 21 }],
  },
  {
    id: 'jericho',
    term: 'Jericho',
    kind: 'ort',
    short:
      'Oasenstadt am Jordan, rund 250 Meter unter dem Meeresspiegel – eine der ältesten dauerhaft besiedelten Städte der Welt.',
    refs: [{ book: 'jos', chapter: 6, verse: 20 }],
  },
  {
    id: 'samaria',
    term: 'Samaria',
    kind: 'ort',
    short:
      'Hauptstadt des Nordreichs, 722 v. Chr. von Assyrien erobert. Aus der Region stammen die Samaritaner, mit denen Juden zur Zeit Jesu verfeindet waren.',
    refs: [{ book: 'joh', chapter: 4, verse: 9 }],
  },
  {
    id: 'genezareth',
    term: 'See Genezareth',
    kind: 'ort',
    aliases: ['galiläischen Meer', 'Meer Galiläas'],
    short:
      'Süßwassersee in Galiläa, 210 Meter unter dem Meeresspiegel. Fallwinde von den umliegenden Höhen erzeugen dort binnen Minuten hohen Wellengang.',
    refs: [{ book: 'mk', chapter: 4, verse: 39 }],
  },
  {
    id: 'jordan',
    term: 'Jordan',
    kind: 'ort',
    short:
      'Fluss vom Hermon bis zum Toten Meer. Sein Durchzug markiert den Einzug ins Land; an ihm tauft Johannes.',
    refs: [{ book: 'jos', chapter: 3, verse: 17 }],
  },
  {
    id: 'sinai',
    term: 'Sinai',
    kind: 'ort',
    aliases: ['Horeb'],
    short:
      'Berg, an dem Israel die Weisung empfängt. Welcher Gipfel gemeint ist, lässt sich nicht sicher bestimmen; die traditionelle Lage im Süden der Halbinsel ist erst seit dem 4. Jahrhundert bezeugt.',
    refs: [{ book: '2mo', chapter: 19, verse: 18 }],
  },
  {
    id: 'aegypten',
    term: 'Ägypten',
    kind: 'ort',
    short:
      'Großmacht am Nil, in der Bibel zugleich Zufluchtsort und Inbegriff der Unterdrückung. Der Auszug von dort ist Israels Gründungserzählung.',
    refs: [{ book: '2mo', chapter: 14, verse: 21 }],
  },
  {
    id: 'babylon',
    term: 'Babylon',
    kind: 'ort',
    today: 'Ruinenstätte im heutigen Irak, rund 85 km südlich von Bagdad',
    short:
      'Hauptstadt des neubabylonischen Reiches, das 587 v. Chr. Jerusalem zerstörte und die Oberschicht verschleppte. Im Neuen Testament wird der Name zum Deckwort für Rom.',
    refs: [
      { book: 'ps', chapter: 137, verse: 1 },
      { book: 'offb', chapter: 17, verse: 5 },
    ],
  },
  {
    id: 'ninive',
    term: 'Ninive',
    kind: 'ort',
    today: 'Bei Mossul im heutigen Irak',
    short:
      'Hauptstadt Assyriens, gefürchtet für ihre Kriegsführung, 612 v. Chr. zerstört. Im Buch Jona wird ausgerechnet ihr Gottes Erbarmen zugesprochen.',
    refs: [{ book: 'jona', chapter: 3, verse: 5 }],
  },
  {
    id: 'ur',
    term: 'Ur',
    kind: 'ort',
    today: 'Südirak',
    short:
      'Sumerische Stadt, aus der Abrahams Familie aufbricht. Ihre Zikkurat ist bis heute erhalten.',
    refs: [{ book: '1mo', chapter: 11, verse: 31 }],
  },
  {
    id: 'damaskus',
    term: 'Damaskus',
    kind: 'ort',
    short:
      'Uralte Handelsstadt in Syrien. Auf dem Weg dorthin erlebt Paulus die Wende, die aus dem Verfolger einen Verkündiger macht.',
    refs: [{ book: 'apg', chapter: 9, verse: 3 }],
  },
  {
    id: 'antiochia',
    term: 'Antiochia',
    kind: 'ort',
    today: 'Antakya in der Türkei',
    short:
      'Drittgrößte Stadt des Römischen Reiches und erste Gemeinde mit Juden und Nichtjuden. Hier wurden die Anhänger Jesu zuerst „Christen“ genannt.',
    refs: [{ book: 'apg', chapter: 11, verse: 26 }],
  },
  {
    id: 'caesarea',
    term: 'Cäsarea',
    kind: 'ort',
    short:
      'Von Herodes erbaute Hafenstadt und Sitz der römischen Statthalter. Paulus verbrachte hier zwei Jahre in Haft.',
    refs: [{ book: 'apg', chapter: 10, verse: 1 }],
  },
  {
    id: 'tarsus',
    term: 'Tarsus',
    kind: 'ort',
    today: 'Südtürkei',
    short: 'Geburtsstadt des Paulus in Kilikien, bekannt für ihre Philosophenschulen.',
    refs: [{ book: 'apg', chapter: 21, verse: 39 }],
  },
  {
    id: 'ephesus',
    term: 'Ephesus',
    kind: 'ort',
    today: 'Bei Selçuk in der Türkei',
    short:
      'Metropole in Kleinasien mit dem Artemistempel, einem der sieben Weltwunder. Paulus wirkte hier über zwei Jahre.',
    refs: [{ book: 'apg', chapter: 19, verse: 23 }],
  },
  {
    id: 'philippi',
    term: 'Philippi',
    kind: 'ort',
    today: 'Nordgriechenland',
    short:
      'Römische Kolonie in Makedonien und erste Gemeinde auf europäischem Boden. Der Philipperbrief richtet sich an sie.',
    refs: [{ book: 'apg', chapter: 16, verse: 12 }],
  },
  {
    id: 'thessalonich',
    term: 'Thessalonich',
    kind: 'ort',
    today: 'Thessaloniki, Griechenland',
    short:
      'Hafenstadt an der Via Egnatia. An die dortige Gemeinde geht vermutlich der älteste erhaltene Brief des Paulus.',
    refs: [{ book: '1thess', chapter: 1, verse: 1 }],
  },
  {
    id: 'athen',
    term: 'Athen',
    kind: 'ort',
    short:
      'Zentrum griechischer Philosophie. Die Rede des Paulus auf dem Areopag ist der Versuch, das Evangelium in der Sprache der Gebildeten zu sagen.',
    refs: [{ book: 'apg', chapter: 17, verse: 22 }],
  },
  {
    id: 'korinth',
    term: 'Korinth',
    kind: 'ort',
    short:
      'Reiche Hafenstadt mit zwei Häfen und dem Ruf besonderer Sittenlosigkeit. Die dortige Gemeinde war zerstritten – daher die ausführlichen Briefe.',
    refs: [{ book: '1kor', chapter: 1, verse: 11 }],
  },
  {
    id: 'rom',
    term: 'Rom',
    kind: 'ort',
    short:
      'Hauptstadt des Reiches und Ziel des Paulus. Die Apostelgeschichte endet damit, dass er dort unter Hausarrest weiter verkündigt.',
    refs: [{ book: 'apg', chapter: 28, verse: 30 }],
  },
  {
    id: 'patmos',
    term: 'Patmos',
    kind: 'ort',
    short:
      'Kleine Ägäisinsel, auf der Johannes die Offenbarung empfängt – nach eigener Angabe dort, weil er wegen seines Zeugnisses verbannt war.',
    refs: [{ book: 'offb', chapter: 1, verse: 9 }],
  },

  /* ------------------------------------------------------------ Begriffe */
  {
    id: 'bund',
    term: 'Bund',
    kind: 'begriff',
    short:
      'Eine verbindliche Zusage Gottes, die eine dauerhafte Beziehung stiftet – nach dem Vorbild altorientalischer Verträge, aber einseitig von Gott getragen.',
    refs: [
      { book: '1mo', chapter: 9, verse: 13, note: 'Der Bogen in den Wolken' },
      { book: 'jer', chapter: 31, verse: 31, note: 'Der neue Bund' },
    ],
  },
  {
    id: 'gnade',
    term: 'Gnade',
    kind: 'begriff',
    short:
      'Zuwendung, die nicht verdient wird und nicht verrechnet werden kann. Im Neuen Testament das Grundwort dafür, wie Gott zum Menschen steht.',
    refs: [{ book: 'eph', chapter: 2, verse: 8 }],
  },
  {
    id: 'suende',
    term: 'Sünde',
    kind: 'begriff',
    short:
      'Nicht in erster Linie eine einzelne Verfehlung, sondern eine gestörte Beziehung. Das griechische Wort stammt aus dem Bogenschießen und heißt wörtlich „das Ziel verfehlen“.',
    refs: [{ book: 'roem', chapter: 3, verse: 23 }],
  },
  {
    id: 'messias',
    term: 'Messias',
    kind: 'begriff',
    aliases: ['Christus', 'Christi', 'Christo'],
    short:
      '„Der Gesalbte“ – ursprünglich ein Titel für Könige und Priester, später Bezeichnung für den erwarteten Retter. „Christus“ ist die griechische Übersetzung.',
    long: 'Die Erwartungen gingen zur Zeit Jesu weit auseinander: ein politischer Befreier von Rom, ein priesterlicher Erneuerer, eine himmlische Gestalt. Dass ein Gekreuzigter der Messias sein sollte, sprengte alle diese Vorstellungen – Paulus nennt es „den Juden ein Ärgernis und den Griechen eine Torheit“.',
    refs: [{ book: '1kor', chapter: 1, verse: 23 }],
  },
  {
    id: 'reich-gottes',
    term: 'Reich Gottes',
    kind: 'begriff',
    aliases: ['Himmelreich'],
    short:
      'Kein Ort, sondern Gottes wirksame Herrschaft. In den Evangelien ist sie zugleich schon angebrochen und noch ausstehend.',
    refs: [{ book: 'lk', chapter: 17, verse: 21 }],
  },
  {
    id: 'tora',
    term: 'Tora',
    kind: 'begriff',
    aliases: ['Gesetz'],
    short:
      'Wörtlich „Weisung“, nicht „Gesetz“ im juristischen Sinn. Die Übersetzung mit „Gesetz“ hat die christliche Wahrnehmung des Judentums lange verzerrt.',
    refs: [{ book: 'ps', chapter: 119, verse: 105 }],
  },
  {
    id: 'prophet',
    term: 'Prophet',
    kind: 'begriff',
    short:
      'Kein Wahrsager, sondern jemand, der im Namen Gottes in die Gegenwart hineinredet. Die Zukunftsansagen sind fast immer an eine Umkehrmöglichkeit geknüpft.',
    refs: [{ book: 'am', chapter: 5, verse: 24 }],
  },
  {
    id: 'sabbat',
    term: 'Sabbat',
    kind: 'begriff',
    short:
      'Der siebte Tag als Ruhetag – ausdrücklich auch für Sklaven, Fremde und Tiere. In der Antike war ein arbeitsfreier Tag pro Woche eine Besonderheit.',
    refs: [{ book: '2mo', chapter: 20, verse: 8 }],
  },
  {
    id: 'passah',
    term: 'Passah',
    kind: 'begriff',
    aliases: ['Ostern', 'Passahlamm'],
    short:
      'Fest zur Erinnerung an den Auszug aus Ägypten. Jesu letztes Mahl fällt in diese Festzeit – daher die Verbindung von Abendmahl und Befreiung.',
    refs: [{ book: '2mo', chapter: 12, verse: 14 }],
  },
  {
    id: 'tempel',
    term: 'Tempel',
    kind: 'begriff',
    short:
      'Zentrales Heiligtum in Jerusalem, zweimal errichtet und zweimal zerstört. Nach 70 n. Chr. ordnete sich das Judentum um Schriftauslegung und Synagoge neu.',
    refs: [{ book: 'mk', chapter: 13, verse: 2 }],
  },
  {
    id: 'pharisaeer',
    term: 'Pharisäer',
    kind: 'begriff',
    short:
      'Laienbewegung, die die Weisung im Alltag ernst nahm. Das negative Bild geht auf innerjüdische Streitgespräche in den Evangelien zurück und wurde später unfair verallgemeinert.',
    long: 'Nach 70 n. Chr. wurde ihre Richtung prägend für das rabbinische Judentum. Paulus bezeichnet sich selbst als Pharisäer. Die pauschale Gleichsetzung mit „Heuchler“ hat eine lange und unrühmliche Wirkungsgeschichte.',
    refs: [{ book: 'apg', chapter: 23, verse: 6 }],
  },
  {
    id: 'apostel',
    term: 'Apostel',
    kind: 'begriff',
    short:
      'Wörtlich „Gesandter“. Der Kreis ist im Neuen Testament weiter als die Zwölf – auch Paulus, Barnabas und die in Römer 16 genannte Junia gehören dazu.',
    refs: [{ book: 'roem', chapter: 16, verse: 7 }],
  },
  {
    id: 'evangelium',
    term: 'Evangelium',
    kind: 'begriff',
    short:
      '„Gute Nachricht“ – im Römischen Reich der Begriff für Siegesmeldungen und Kaisernachrichten. Die Christen setzten ihm bewusst eine andere Botschaft entgegen.',
    refs: [{ book: 'mk', chapter: 1, verse: 1 }],
  },
  {
    id: 'exil',
    term: 'Exil',
    kind: 'begriff',
    aliases: ['Gefangenschaft'],
    short:
      'Die Verschleppung der judäischen Oberschicht nach Babylon (597 und 587 v. Chr.). Diese Katastrophe wurde zum Wendepunkt, an dem große Teile der Bibel ihre heutige Gestalt fanden.',
    refs: [{ book: 'jer', chapter: 29, verse: 4 }],
  },
  {
    id: 'auferstehung',
    term: 'Auferstehung',
    kind: 'begriff',
    short:
      'Die Hoffnung, dass Gott Tote zu neuem Leben erweckt. Im Judentum des 1. Jahrhunderts umstritten: Pharisäer bejahten sie, Sadduzäer lehnten sie ab.',
    refs: [{ book: '1kor', chapter: 15, verse: 14 }],
  },
];

/**
 * Das vollständige Lexikon: Namen und Begriffe zusammen mit dem Sachwissen
 * zur Lebenswelt der Bibel (Maße, Ämter, Bräuche, Naturkunde).
 */
export const LEXICON: LexiconEntry[] = [...NAMEN_UND_BEGRIFFE, ...REALIA];

/* ------------------------------------------------------------ Hilfsmittel */

export function findLexiconEntry(id: string): LexiconEntry | undefined {
  return LEXICON.find((e) => e.id === id);
}

export const LEXICON_KIND_LABEL: Record<LexiconKind, string> = {
  person: 'Person',
  ort: 'Ort',
  begriff: 'Begriff',
  mass: 'Maß & Geld',
  amt: 'Amt & Gruppe',
  brauch: 'Brauch & Fest',
  natur: 'Natur & Stoff',
};

/** Mehrzahlform für die Filterleiste. */
export const LEXICON_KIND_PLURAL: Record<LexiconKind, string> = {
  person: 'Personen',
  ort: 'Orte',
  begriff: 'Begriffe',
  mass: 'Maß & Geld',
  amt: 'Ämter & Gruppen',
  brauch: 'Bräuche & Feste',
  natur: 'Natur & Stoffe',
};

/**
 * Ein Muster über alle Schreibweisen, längste zuerst, damit
 * „Johannes der Täufer“ vor „Johannes“ greift. Die Zuordnung liefert zu
 * jedem gefundenen Wort den passenden Eintrag.
 */
let matcher: { pattern: RegExp; byTerm: Map<string, LexiconEntry> } | null = null;

export function lexiconMatcher() {
  if (matcher) return matcher;

  const byTerm = new Map<string, LexiconEntry>();
  for (const entry of LEXICON) {
    for (const term of [entry.term, ...(entry.aliases ?? [])]) {
      if (!byTerm.has(term)) byTerm.set(term, entry);
    }
  }

  const terms = [...byTerm.keys()].sort((a, b) => b.length - a.length);
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Wortgrenzen von Hand, weil \b bei Umlauten unzuverlässig ist.
  const pattern = new RegExp(`(?<![\\wÄÖÜäöüß])(${escaped.join('|')})(?![\\wÄÖÜäöüß])`, 'g');

  matcher = { pattern, byTerm };
  return matcher;
}
