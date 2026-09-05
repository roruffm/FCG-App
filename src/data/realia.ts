/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
import type { LexiconEntry } from './lexicon';

/**
 * Sachwissen zur Lebenswelt der Bibel: Maße, Geld, Ämter, Bräuche, Pflanzen
 * und Stoffe.
 *
 * Anders als Personen und Orte kommen diese Begriffe **hunderte Male** vor.
 * Damit reichert diese Ebene sehr viele Verse gleichzeitig mit handfesten
 * Angaben an – wie schwer ein Zentner war, was ein Groschen wert war, wer ein
 * Landpfleger war.
 *
 * Die Stichworte richten sich nach dem Wortlaut der Lutherbibel 1912; sie
 * weicht bei Sachbegriffen oft von heutigen Übersetzungen ab („Ostern“ für
 * das Passafest, „Schule“ für die Synagoge, „Zentner“ für das Talent).
 *
 * Antike Maße schwankten nach Ort und Zeit. Alle Angaben sind deshalb
 * Näherungen und als solche formuliert.
 */

export const REALIA: LexiconEntry[] = [
  /* --------------------------------------------- Maße, Gewichte, Geld */
  {
    id: 'elle',
    term: 'Elle',
    kind: 'mass',
    aliases: ['Ellen'],
    fact: 'etwa 45 cm',
    short:
      'Das Grundmaß für Längen: der Abstand von Ellenbogen bis Fingerspitze, rund 45 cm. Für Tempelbauten wurde teils eine „lange Elle“ von etwa 52 cm gerechnet.',
    long: 'Weil das Maß am Körper abgenommen wurde, schwankte es zwischen Ländern und Epochen. Umrechnungen bleiben deshalb Näherungen: Die Arche mit 300 Ellen wäre rund 135 m lang, Goliaths Größe von „sechs Ellen und eine Handbreit“ ergäbe etwa 2,90 m.',
    refs: [{ book: '1mo', chapter: 6, verse: 15, note: 'Die Maße der Arche' }],
  },
  {
    id: 'handbreit',
    term: 'Handbreit',
    kind: 'mass',
    fact: 'etwa 7,5 cm',
    short: 'Die Breite der vier Finger – ein Sechstel der Elle, rund 7,5 cm.',
  },
  {
    id: 'klafter',
    term: 'Klafter',
    kind: 'mass',
    fact: 'etwa 1,85 m',
    short:
      'Seemannsmaß für die Wassertiefe: die Spannweite der ausgebreiteten Arme, rund 1,85 m. Beim Schiffbruch des Paulus wird damit gelotet.',
    refs: [{ book: 'apg', chapter: 27, verse: 28 }],
  },
  {
    id: 'sabbatweg',
    term: 'Sabbatweg',
    kind: 'mass',
    fact: 'etwa 900 m',
    short:
      'Die Strecke, die man am Sabbat zurücklegen durfte: 2000 Ellen, also knapp einen Kilometer. Die Angabe zum Ölberg beschreibt damit die Nähe zu Jerusalem.',
    refs: [{ book: 'apg', chapter: 1, verse: 12 }],
  },
  {
    id: 'epha',
    term: 'Epha',
    kind: 'mass',
    fact: 'etwa 22 Liter',
    short:
      'Das übliche Trockenmaß für Getreide und Mehl, rund 22 Liter – ein Zehntel eines Homer.',
  },
  {
    id: 'gomer',
    term: 'Gomer',
    kind: 'mass',
    fact: 'etwa 2,2 Liter',
    short:
      'Ein Zehntel Epha, rund 2,2 Liter. So viel Manna sollte jeder pro Tag sammeln – die Tagesration eines Menschen.',
    refs: [{ book: '2mo', chapter: 16, verse: 16 }],
  },
  {
    id: 'homer',
    term: 'Homer',
    kind: 'mass',
    fact: 'etwa 220 Liter',
    short:
      'Das größte Trockenmaß, rund 220 Liter. Der Name hängt mit dem Wort für Esel zusammen: die Last, die ein Esel tragen konnte.',
  },
  {
    id: 'bath',
    term: 'Bath',
    kind: 'mass',
    fact: 'etwa 22 Liter',
    short:
      'Das Flüssigkeitsmaß, das dem Epha entspricht – rund 22 Liter. Die Krüge bei der Hochzeit zu Kana fassten je zwei bis drei Maß dieser Größenordnung.',
  },
  {
    id: 'hin',
    term: 'Hin',
    kind: 'mass',
    fact: 'etwa 3,6 Liter',
    short:
      'Ein Sechstel Bath, rund 3,6 Liter. Das Maß begegnet fast nur in Opfervorschriften für Öl und Wein.',
  },
  {
    id: 'scheffel',
    term: 'Scheffel',
    kind: 'mass',
    fact: 'etwa 9 Liter',
    short:
      'Ein Getreidegefäß von rund neun Litern. In der Bergpredigt geht es nicht um das Maß, sondern um das Gefäß: Niemand stülpt es über eine Lampe.',
    refs: [{ book: 'mt', chapter: 5, verse: 15 }],
  },
  {
    id: 'silberling',
    term: 'Silberling',
    kind: 'mass',
    aliases: ['Silberlinge'],
    fact: 'etwa 11 g Silber',
    short:
      'Im Alten Testament der Schekel, rund 11 Gramm Silber. Die dreißig Silberlinge des Judas entsprachen dem im Gesetz festgesetzten Ersatz für einen getöteten Sklaven.',
    refs: [
      { book: '2mo', chapter: 21, verse: 32, note: 'Der Preis für einen Sklaven' },
      { book: 'mt', chapter: 26, verse: 15 },
    ],
  },
  {
    id: 'groschen',
    term: 'Groschen',
    kind: 'mass',
    fact: 'ein Tageslohn',
    short:
      'Luthers Wort für den römischen Denar – der Tageslohn eines Landarbeiters. Damit wird im Gleichnis von den Arbeitern im Weinberg gerechnet.',
    long: 'Der Denar macht viele Zahlen im Neuen Testament greifbar: Die 200 Groschen, die für die Speisung der Fünftausend fehlen, entsprechen gut einem halben Jahreslohn. Das Öl, mit dem Jesus in Betanien gesalbt wird, ist 300 Groschen wert – fast ein Jahreseinkommen.',
    refs: [{ book: 'mt', chapter: 20, verse: 2 }],
  },
  {
    id: 'zentner',
    term: 'Zentner',
    kind: 'mass',
    fact: 'etwa 34 kg Silber',
    short:
      'Luthers Wort für das Talent, die größte Gewichts- und Geldeinheit: rund 34 Kilogramm Silber oder etwa 6000 Tageslöhne.',
    long: 'Im Gleichnis vom unbarmherzigen Gläubiger stehen 10 000 Zentner gegen 100 Groschen – eine Schuld von rund 60 Millionen Tageslöhnen gegen hundert. Die Erzählung arbeitet mit einem absichtlich grotesken Missverhältnis.',
    refs: [{ book: 'mt', chapter: 18, verse: 24 }],
  },
  {
    id: 'pfund-mass',
    term: 'Pfund',
    kind: 'mass',
    fact: 'Münze oder Gewicht',
    short:
      'Zwei verschiedene Dinge: im Gleichnis vom anvertrauten Geld die Mine, rund 100 Tageslöhne – bei der Salbung in Betanien dagegen das römische Pfund von etwa 327 Gramm.',
    refs: [
      { book: 'lk', chapter: 19, verse: 13, note: 'Die Mine als Geldstück' },
      { book: 'joh', chapter: 12, verse: 3, note: 'Ein Pfund Nardenöl' },
    ],
  },
  {
    id: 'scherflein',
    term: 'Scherflein',
    kind: 'mass',
    fact: 'kleinste Münze',
    short:
      'Das Lepton, die kleinste im Umlauf befindliche Kupfermünze – etwa ein Hundertachtundzwanzigstel eines Tageslohns. Die Witwe gibt zwei davon.',
    refs: [{ book: 'mk', chapter: 12, verse: 42 }],
  },
  {
    id: 'heller',
    term: 'Heller',
    kind: 'mass',
    fact: 'zwei Scherflein',
    short:
      'Der römische Quadrans, zwei Lepta wert. „Bis du den letzten Heller bezahlst“ meint also: bis zum kleinsten denkbaren Betrag.',
    refs: [{ book: 'mt', chapter: 5, verse: 26 }],
  },

  /* ------------------------------------------------- Ämter und Gruppen */
  {
    id: 'levit',
    term: 'Levit',
    kind: 'amt',
    aliases: ['Leviten'],
    short:
      'Angehöriger des Stammes Levi, zuständig für Aufbau, Transport, Musik und Ordnung am Heiligtum – aber ohne Priesteramt und ohne eigenes Stammesgebiet.',
    long: 'Weil die Leviten kein Land besaßen, lebten sie vom Zehnten. Das erklärt, warum sie in den Sozialgesetzen regelmäßig neben Fremden, Witwen und Waisen genannt werden. Im Gleichnis vom barmherzigen Samariter geht neben dem Priester auch ein Levit vorüber.',
    refs: [{ book: '4mo', chapter: 18, verse: 21 }],
  },
  {
    id: 'hoherpriester',
    term: 'Hoherpriester',
    kind: 'amt',
    aliases: ['Hohepriester', 'Hohenpriester', 'Hohenpriestern'],
    short:
      'Das höchste geistliche Amt: Nur er durfte einmal im Jahr, am Versöhnungstag, das Allerheiligste betreten. Zur Zeit Jesu wurde er von der römischen Macht ein- und abgesetzt.',
    refs: [{ book: '3mo', chapter: 16, verse: 2 }],
  },
  {
    id: 'schriftgelehrte',
    term: 'Schriftgelehrter',
    kind: 'amt',
    aliases: ['Schriftgelehrte', 'Schriftgelehrten'],
    short:
      'Fachleute für die Auslegung und Anwendung der Tora – kein Priesteramt, sondern ein erlernter Beruf. Viele von ihnen standen den Pharisäern nahe.',
  },
  {
    id: 'sadduzaeer',
    term: 'Sadduzäer',
    kind: 'amt',
    short:
      'Priesterliche Oberschicht um den Tempel, politisch mit Rom arrangiert. Sie erkannten nur die fünf Bücher Mose an und lehnten die Auferstehung der Toten ab – anders als die Pharisäer.',
    refs: [{ book: 'apg', chapter: 23, verse: 8 }],
  },
  {
    id: 'zoellner',
    term: 'Zöllner',
    kind: 'amt',
    short:
      'Pächter römischer Zoll- und Abgabenrechte. Sie zahlten die Summe im Voraus und holten sie mit Aufschlag ein – deshalb galten sie als Betrüger und Handlanger der Besatzung.',
    refs: [{ book: 'lk', chapter: 19, verse: 8 }],
  },
  {
    id: 'landpfleger',
    term: 'Landpfleger',
    kind: 'amt',
    short:
      'Luthers Wort für den römischen Statthalter einer Provinz. Pontius Pilatus, Felix und Festus hatten dieses Amt; ihnen allein stand das Recht über Leben und Tod zu.',
    refs: [{ book: 'joh', chapter: 18, verse: 31 }],
  },
  {
    id: 'hauptmann',
    term: 'Hauptmann',
    kind: 'amt',
    aliases: ['Hauptleute'],
    short:
      'Der römische Zenturio, Befehlshaber über rund 80 Mann. Auffällig oft erscheinen diese Offiziere in den Evangelien und der Apostelgeschichte in wohlwollendem Licht.',
    refs: [{ book: 'mk', chapter: 15, verse: 39 }],
  },
  {
    id: 'kaemmerer',
    term: 'Kämmerer',
    kind: 'amt',
    short:
      'Hoher Hofbeamter, häufig ein Eunuch, zuständig für die Schatzkammer. Der äthiopische Kämmerer verwaltet das Vermögen seiner Königin.',
    refs: [{ book: 'apg', chapter: 8, verse: 27 }],
  },
  {
    id: 'schule',
    term: 'Schule',
    kind: 'amt',
    aliases: ['Schulen'],
    short:
      'Luthers Wort für die Synagoge – kein Schulhaus, sondern der Versammlungsort einer jüdischen Gemeinde für Schriftlesung, Auslegung und Gebet.',
    long: 'Synagogen entstanden, als der Tempel fehlte oder zu weit entfernt war. Sie brauchten keine Priester: Vorlesen und Auslegen konnte jeder kundige Mann. Genau deshalb konnten Jesus und später Paulus dort auftreten.',
    refs: [{ book: 'lk', chapter: 4, verse: 16 }],
  },
  {
    id: 'kriegsknecht',
    term: 'Kriegsknecht',
    kind: 'amt',
    aliases: ['Kriegsknechte', 'Kriegsknechten'],
    short:
      'Der einfache römische Soldat. Sein Sold betrug im 1. Jahrhundert rund 900 Sesterzen im Jahr, wovon Verpflegung und Ausrüstung abgingen.',
  },

  /* ---------------------------------------------- Bräuche und Feste */
  {
    id: 'brandopfer',
    term: 'Brandopfer',
    kind: 'brauch',
    short:
      'Das Opfer, bei dem das Tier vollständig verbrannt wurde – nichts blieb für Priester oder Opfernde übrig. Es galt als Ausdruck vorbehaltloser Hingabe.',
    refs: [{ book: '3mo', chapter: 1, verse: 3 }],
  },
  {
    id: 'speisopfer',
    term: 'Speisopfer',
    kind: 'brauch',
    short:
      'Ein unblutiges Opfer aus Mehl, Öl und Weihrauch. Es machte den Opferdienst auch für Arme zugänglich.',
  },
  {
    id: 'suendopfer',
    term: 'Sündopfer',
    kind: 'brauch',
    short:
      'Vorgesehen für unbeabsichtigte Verfehlungen und für rituelle Verunreinigung – ausdrücklich nicht für vorsätzliches Unrecht.',
  },
  {
    id: 'zehnter',
    term: 'Zehnter',
    kind: 'brauch',
    aliases: ['Zehnten'],
    short:
      'Ein Zehntel des Ertrags. Er finanzierte die Leviten, die kein Land besaßen, und alle drei Jahre ausdrücklich auch Fremde, Witwen und Waisen.',
    refs: [{ book: '5mo', chapter: 14, verse: 28 }],
  },
  {
    id: 'beschneidung',
    term: 'Beschneidung',
    kind: 'brauch',
    short:
      'Am achten Tag nach der Geburt vollzogenes Zeichen der Zugehörigkeit zum Bund. Ob sie auch für Nichtjuden gelten sollte, war der größte Streit der frühen Kirche.',
    refs: [
      { book: '1mo', chapter: 17, verse: 12 },
      { book: 'apg', chapter: 15, verse: 5, note: 'Der Streitpunkt' },
    ],
  },
  {
    id: 'passah-fest',
    term: 'Passah',
    kind: 'brauch',
    aliases: ['Ostern', 'Passahlamm', 'Passahfest'],
    fact: 'Luther sagt „Ostern“',
    short:
      'Das Fest zur Erinnerung an den Auszug aus Ägypten. Die Lutherbibel 1912 nennt es im Neuen Testament durchgängig „Ostern“ – gemeint ist aber immer das jüdische Passafest.',
    refs: [{ book: '2mo', chapter: 12, verse: 14 }],
  },
  {
    id: 'laubhuetten',
    term: 'Laubhüttenfest',
    kind: 'brauch',
    aliases: ['Laubhütten'],
    short:
      'Sieben Tage wohnten die Familien in Hütten aus Zweigen – zur Erinnerung an die Zeit ohne festes Haus in der Wüste. Es war zugleich das Erntedankfest.',
    refs: [{ book: '3mo', chapter: 23, verse: 42 }],
  },
  {
    id: 'versoehnungstag',
    term: 'Versöhnungstag',
    kind: 'brauch',
    short:
      'Jom Kippur, der einzige Tag, an dem der Hohepriester das Allerheiligste betrat. Ein Bock wurde geopfert, ein zweiter mit den Verfehlungen des Volkes in die Wüste geschickt – der „Sündenbock“.',
    refs: [{ book: '3mo', chapter: 16, verse: 21 }],
  },
  {
    id: 'halljahr',
    term: 'Halljahr',
    kind: 'brauch',
    fact: 'alle 50 Jahre',
    short:
      'Alle fünfzig Jahre sollten Schulden erlassen, Schuldsklaven freigelassen und verkauftes Land an die Familien zurückgegeben werden. Ob es je durchgeführt wurde, ist ungewiss.',
    long: 'Der Gedanke dahinter ist wirtschaftlich radikal: Land konnte nach dieser Ordnung gar nicht endgültig verkauft werden, sondern nur bis zum nächsten Halljahr verpachtet. Damit sollte verhindert werden, dass Besitz sich dauerhaft bei wenigen sammelt.',
    refs: [{ book: '3mo', chapter: 25, verse: 10 }],
  },
  {
    id: 'neumond',
    term: 'Neumond',
    kind: 'brauch',
    short:
      'Der Beginn eines Monats im Mondkalender – ein Festtag mit eigenen Opfern, an dem auch die Arbeit ruhte.',
  },
  {
    id: 'erstgeburt',
    term: 'Erstgeburt',
    kind: 'brauch',
    short:
      'Der erstgeborene Sohn und die ersten Jungtiere galten als Gott gehörend. Menschliche Erstgeburt wurde durch eine Abgabe ausgelöst – ein Verzicht auf Menschenopfer, wie ihn die Umwelt kannte.',
    refs: [{ book: '2mo', chapter: 13, verse: 13 }],
  },
  {
    id: 'salbung',
    term: 'Salböl',
    kind: 'brauch',
    aliases: ['Salbe'],
    short:
      'Öl auf den Kopf zu gießen setzte in ein Amt ein – Könige und Priester wurden so bestellt. Vom Wort „gesalbt“ leitet sich „Messias“ und im Griechischen „Christus“ ab.',
    refs: [{ book: '1sam', chapter: 16, verse: 13 }],
  },
  {
    id: 'los',
    term: 'Los',
    kind: 'brauch',
    short:
      'Ein anerkanntes Entscheidungsverfahren, kein Glücksspiel: So wurde das Land verteilt, der Dienst der Priester geregelt und noch in Apostelgeschichte 1 ein Nachfolger für Judas bestimmt.',
    refs: [{ book: 'spr', chapter: 16, verse: 33 }],
  },
  {
    id: 'bann',
    term: 'Bann',
    kind: 'brauch',
    short:
      'Hebräisch cherem: Etwas wurde dem menschlichen Gebrauch vollständig entzogen. In Kriegserzählungen bedeutet das die Vernichtung der Beute – einer der schwierigsten Züge des Alten Testaments.',
    refs: [{ book: 'jos', chapter: 6, verse: 18 }],
  },
  {
    id: 'sauerteig',
    term: 'Sauerteig',
    kind: 'brauch',
    short:
      'Ein Rest gegorener Teig, der den neuen durchsäuert. Zum Passa musste er restlos aus dem Haus – daher das Bild für etwas, das unbemerkt alles durchdringt, im Guten wie im Schlechten.',
    refs: [{ book: 'mt', chapter: 13, verse: 33 }],
  },

  /* ----------------------------------------------- Natur und Stoffe */
  {
    id: 'purpur',
    term: 'Purpur',
    kind: 'natur',
    fact: 'teuerster Farbstoff der Antike',
    short:
      'Gewonnen aus dem Drüsensekret von Meeresschnecken – für ein Gramm Farbstoff brauchte es tausende Tiere. Purpur war deshalb Herrschern und sehr Reichen vorbehalten.',
    long: 'Der Spott der Soldaten, die Jesus einen Purpurmantel umlegen, zielt genau darauf: Sie kleiden ihn als König. Lydia in Philippi handelt mit diesem Stoff und gehört damit zur wohlhabenden Schicht – das erklärt, warum in ihrem Haus Platz für eine Gemeinde ist.',
    refs: [{ book: 'apg', chapter: 16, verse: 14 }],
  },
  {
    id: 'zeder',
    term: 'Zeder',
    kind: 'natur',
    aliases: ['Zedern'],
    short:
      'Das Bauholz des Libanon: harzreich, wohlriechend und kaum von Insekten befallen. Tempel und Palast Salomos wurden damit ausgekleidet – ein Import, der Reichtum voraussetzte.',
  },
  {
    id: 'weinberg',
    term: 'Weinberg',
    kind: 'natur',
    short:
      'Das häufigste Bild für Israel überhaupt: eingezäunt, gepflegt, mit Turm und Kelter – und der wiederkehrenden Frage, ob er Frucht bringt.',
    refs: [{ book: 'jes', chapter: 5, verse: 1 }],
  },
  {
    id: 'kelter',
    term: 'Kelter',
    kind: 'natur',
    short:
      'Ein in den Fels gehauener Trog, in dem die Trauben mit den Füßen getreten wurden. Weil dabei roter Saft spritzt, wurde das Bild zum Sinnbild des Gerichts.',
  },
  {
    id: 'feigenbaum',
    term: 'Feigenbaum',
    kind: 'natur',
    short:
      'Er trägt zweimal im Jahr und wirft schon vor den Blättern erste Früchte an – deshalb konnte ein belaubter Baum ohne Frucht als auffällig gelten. „Unter seinem Feigenbaum sitzen“ war die Kurzformel für Frieden.',
    refs: [{ book: 'mi', chapter: 4, verse: 4 }],
  },
  {
    id: 'oelbaum',
    term: 'Ölbaum',
    kind: 'natur',
    short:
      'Er wird mehrere hundert Jahre alt und treibt aus dem Wurzelstock neu aus. Sein Öl diente als Speise, Brennstoff, Medizin und Salböl zugleich.',
    refs: [{ book: 'roem', chapter: 11, verse: 17 }],
  },
  {
    id: 'tenne',
    term: 'Tenne',
    kind: 'natur',
    short:
      'Ein festgestampfter Platz, meist auf einer Anhöhe: Dort wurde das Korn ausgedroschen und anschließend geworfelt, damit der Wind die Spreu forttrug.',
    refs: [{ book: 'mt', chapter: 3, verse: 12 }],
  },
  {
    id: 'toepfer',
    term: 'Töpfer',
    kind: 'natur',
    short:
      'Ein alltäglicher Handwerksberuf – und ein häufiges Bild dafür, dass Gott formt und umformt, solange der Ton noch feucht ist.',
    refs: [{ book: 'jer', chapter: 18, verse: 6 }],
  },
  {
    id: 'weihrauch',
    term: 'Weihrauch',
    kind: 'natur',
    short:
      'Harz von Bäumen aus Südarabien und Ostafrika, über die Weihrauchstraße gehandelt. Sein Preis lag zeitweise beim Vielfachen des gleichen Gewichts an Silber.',
  },
  {
    id: 'myrrhe',
    term: 'Myrrhe',
    kind: 'natur',
    short:
      'Ein bitteres Harz, verwendet für Salben, zur Betäubung und bei Bestattungen. In der Passionserzählung wird sie Jesus mit Wein angeboten, er lehnt sie ab.',
    refs: [{ book: 'mk', chapter: 15, verse: 23 }],
  },
  {
    id: 'narde',
    term: 'Narde',
    kind: 'natur',
    fact: 'ein Pfund ≈ Jahreslohn',
    short:
      'Ein Duftöl aus einer Pflanze des Himalaya – über tausende Kilometer gehandelt und entsprechend kostbar. Das Pfund, mit dem Jesus gesalbt wird, war rund 300 Tageslöhne wert.',
    refs: [{ book: 'joh', chapter: 12, verse: 3 }],
  },
  {
    id: 'isop',
    term: 'Isop',
    kind: 'natur',
    short:
      'Ein kleiner Strauch mit haarigen Blättern, der Flüssigkeit gut aufnimmt – deshalb diente er zum Besprengen bei Reinigungsriten, erstmals beim Passa in Ägypten.',
    refs: [{ book: '2mo', chapter: 12, verse: 22 }],
  },
  {
    id: 'manna',
    term: 'Manna',
    kind: 'natur',
    short:
      'Die Wüstennahrung nach dem Auszug. Der Name geht auf die Frage „man hu“ zurück – „was ist das?“. Es ließ sich nicht auf Vorrat sammeln.',
    refs: [{ book: '2mo', chapter: 16, verse: 15 }],
  },
  {
    id: 'heuschrecke',
    term: 'Heuschrecke',
    kind: 'natur',
    aliases: ['Heuschrecken'],
    short:
      'Schwärme konnten in Stunden ganze Ernten vernichten – die Urkatastrophe der Landwirtschaft. Zugleich galten Heuschrecken als reine Speise, wovon Johannes der Täufer lebte.',
    refs: [{ book: 'joel', chapter: 1, verse: 4 }],
  },
  {
    id: 'kamel',
    term: 'Kamel',
    kind: 'natur',
    aliases: ['Kamele', 'Kamelen'],
    short:
      'Das Lasttier der Fernhandelswege: rund 250 Kilogramm Traglast und tagelang ohne Wasser. Als größtes bekanntes Tier der Region wurde es sprichwörtlich für das Unmögliche.',
    refs: [{ book: 'mk', chapter: 10, verse: 25 }],
  },
  {
    id: 'muehlstein',
    term: 'Mühlstein',
    kind: 'natur',
    short:
      'Die Handmühle betrieben Frauen täglich; der große Mühlstein wurde von einem Esel gedreht. Vom letzteren spricht Jesus – ein Gewicht, das niemand mehr heben kann.',
    refs: [{ book: 'mt', chapter: 18, verse: 6 }],
  },
  {
    id: 'joch',
    term: 'Joch',
    kind: 'natur',
    short:
      'Das Querholz, das zwei Zugtiere verbindet. Übertragen steht es für Fremdherrschaft – und bei Jesus überraschend für die Lehre, der man sich anschließt.',
    refs: [{ book: 'mt', chapter: 11, verse: 30 }],
  },
  {
    id: 'senfkorn',
    term: 'Senfkorn',
    kind: 'natur',
    short:
      'Sprichwörtlich das kleinste Saatkorn der Landwirtschaft. Botanisch trifft das nicht zu – Jesus greift eine geläufige Redensart auf, keine Pflanzenkunde.',
    refs: [{ book: 'mt', chapter: 13, verse: 31 }],
  },
];
