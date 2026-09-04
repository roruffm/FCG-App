/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
import type { BibleIndex } from '../lib/bibleTypes';

/**
 * Lesepläne. Zwei Arten:
 *
 * - **Durchlese-Pläne** werden aus dem Bibel-Index berechnet. Statt 365 Tage
 *   von Hand zu pflegen, verteilt `buildDays` die Kapitel gleichmäßig auf die
 *   Laufzeit. Das hält die Datei klein und bleibt automatisch korrekt.
 * - **Themenpläne** sind von Hand kuratiert: ausgewählte Abschnitte mit
 *   Überschrift und einem Satz, der den Tag einordnet.
 */

export interface Portion {
  book: string;
  /** Erstes Kapitel des Abschnitts. */
  from: number;
  /** Letztes Kapitel; gleich `from`, wenn es nur eines ist. */
  to: number;
  /** Versbereich – nur sinnvoll, wenn der Abschnitt in einem Kapitel liegt. */
  verseFrom?: number;
  verseTo?: number;
}

export interface PlanDay {
  portions: Portion[];
  /** Nur bei Themenplänen. */
  title?: string;
  note?: string;
}

export type PlanKind = 'durchlesen' | 'thema';

/** Sachgebiet, nach dem die Themenpläne gruppiert angezeigt werden. */
export type PlanTopic = 'einstieg' | 'lebensfragen' | 'glaube' | 'welt';

export const TOPIC_LABEL: Record<PlanTopic, string> = {
  einstieg: 'Zum Anfangen',
  lebensfragen: 'Lebensfragen',
  glaube: 'Glauben verstehen',
  welt: 'Leben in der Welt',
};

export const TOPIC_HINT: Record<PlanTopic, string> = {
  einstieg: 'Wenn du dich in der Bibel noch nicht auskennst',
  lebensfragen: 'Wenn dich gerade etwas umtreibt',
  glaube: 'Grundfragen, die immer wiederkehren',
  welt: 'Was der Glaube im Alltag bedeutet',
};

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  kind: PlanKind;
  /** Nur bei Themenplänen: Gruppierung im Studium-Bereich. */
  topic?: PlanTopic;
  /** Laufzeit in Tagen. */
  days: number;
  /** Für berechnete Pläne: welche Bücher in kanonischer Reihenfolge. */
  scope?: 'alle' | 'at' | 'nt' | string[];
  /** Für Themenpläne: die Tage selbst. */
  curated?: PlanDay[];
}

/* ------------------------------------------------------- Themenpläne */

const HOFFNUNG: PlanDay[] = [
  {
    title: 'Die Klage darf stehen bleiben',
    note: 'Der Text beschönigt nichts – und findet mitten darin einen Halt.',
    portions: [{ book: 'klgl', from: 3, to: 3, verseFrom: 17, verseTo: 26 }],
  },
  {
    title: 'Wie lange noch?',
    note: 'Ein Psalm, der viermal „wie lange“ fragt, bevor er singen kann.',
    portions: [{ book: 'ps', from: 13, to: 13 }],
  },
  {
    title: 'Sehnsucht ohne Antwort',
    note: 'Der Beter redet mit sich selbst, weil Gott gerade schweigt.',
    portions: [{ book: 'ps', from: 42, to: 42 }],
  },
  {
    title: 'Neue Kraft für Erschöpfte',
    note: 'Gesagt zu Menschen im Exil, die nicht mehr an eine Wende glaubten.',
    portions: [{ book: 'jes', from: 40, to: 40, verseFrom: 27, verseTo: 31 }],
  },
  {
    title: 'Seufzen – und doch getragen',
    note: 'Paulus redet das Leid nicht klein, sondern stellt es in einen größeren Rahmen.',
    portions: [{ book: 'roem', from: 8, to: 8, verseFrom: 18, verseTo: 30 }],
  },
  {
    title: 'Schätze in zerbrechlichen Gefäßen',
    note: 'Die Schwäche wird nicht überwunden, sondern zum Ort der Kraft.',
    portions: [{ book: '2kor', from: 4, to: 4, verseFrom: 7, verseTo: 18 }],
  },
  {
    title: 'Gott wischt die Tränen ab',
    note: 'Kein Jenseits fern der Erde – Gott zieht bei den Menschen ein.',
    portions: [{ book: 'offb', from: 21, to: 21, verseFrom: 1, verseTo: 7 }],
  },
];

const WER_IST_JESUS: PlanDay[] = [
  {
    title: 'Der Anfang',
    note: 'Markus beginnt ohne Kindheitsgeschichte – sofort mitten hinein.',
    portions: [{ book: 'mk', from: 1, to: 1, verseFrom: 1, verseTo: 20 }],
  },
  {
    title: 'Vollmacht, die aneckt',
    note: 'Schon im zweiten Kapitel beginnt der Konflikt mit den Frommen.',
    portions: [{ book: 'mk', from: 2, to: 2, verseFrom: 1, verseTo: 17 }],
  },
  {
    title: 'Warum in Gleichnissen?',
    note: 'Jesus erklärt weniger, als man erwarten würde.',
    portions: [{ book: 'mk', from: 4, to: 4, verseFrom: 1, verseTo: 20 }],
  },
  {
    title: 'Wer ist dieser?',
    note: 'Die Frage der Jünger nach dem Sturm trägt das ganze Evangelium.',
    portions: [{ book: 'mk', from: 4, to: 4, verseFrom: 35, verseTo: 41 }],
  },
  {
    title: 'Zwei Frauen, zwei Rettungen',
    note: 'Eine Erzählung wird von einer anderen unterbrochen – Markus erzählt gern so.',
    portions: [{ book: 'mk', from: 5, to: 5, verseFrom: 21, verseTo: 43 }],
  },
  {
    title: 'Genug für alle',
    note: 'Die Speisung greift bewusst Bilder aus der Wüstenzeit auf.',
    portions: [{ book: 'mk', from: 6, to: 6, verseFrom: 30, verseTo: 44 }],
  },
  {
    title: 'Das Bekenntnis – und der Widerspruch',
    note: 'Die Mitte des Evangeliums: Petrus hat recht und versteht doch nichts.',
    portions: [{ book: 'mk', from: 8, to: 8, verseFrom: 27, verseTo: 38 }],
  },
  {
    title: 'Der reiche Mann',
    note: 'Die einzige Stelle, an der es heißt, Jesus habe jemanden liebgehabt – bevor er ihn ziehen lässt.',
    portions: [{ book: 'mk', from: 10, to: 10, verseFrom: 17, verseTo: 31 }],
  },
  {
    title: 'Herrschen heißt dienen',
    note: 'Der Maßstab für Größe wird umgedreht.',
    portions: [{ book: 'mk', from: 10, to: 10, verseFrom: 32, verseTo: 45 }],
  },
  {
    title: 'Einzug auf einem Esel',
    note: 'Eine bewusst unköniglich inszenierte Königsankunft.',
    portions: [{ book: 'mk', from: 11, to: 11, verseFrom: 1, verseTo: 11 }],
  },
  {
    title: 'Gethsemane',
    note: 'Der ungeschönteste Text über Jesu Angst.',
    portions: [{ book: 'mk', from: 14, to: 14, verseFrom: 32, verseTo: 52 }],
  },
  {
    title: 'Das Kreuz',
    note: 'Ausgerechnet ein römischer Hauptmann spricht das Bekenntnis aus.',
    portions: [{ book: 'mk', from: 15, to: 15, verseFrom: 1, verseTo: 39 }],
  },
  {
    title: 'Das leere Grab',
    note: 'Der älteste Schluss endet mit Furcht und Schweigen – erstaunlich offen.',
    portions: [{ book: 'mk', from: 16, to: 16, verseFrom: 1, verseTo: 8 }],
  },
  {
    title: 'Von Anfang an',
    note: 'Johannes setzt noch einmal ganz anders an: vor aller Zeit.',
    portions: [{ book: 'joh', from: 1, to: 1, verseFrom: 1, verseTo: 18 }],
  },
];

const VERGEBUNG: PlanDay[] = [
  {
    title: 'Ein Gebet nach schwerem Versagen',
    note: 'Die Überschrift verbindet den Psalm mit Davids Verbrechen an Batseba und Uria.',
    portions: [{ book: 'ps', from: 51, to: 51, verseFrom: 1, verseTo: 14 }],
  },
  {
    title: 'So fern der Osten vom Westen',
    note: 'Ein Bild für eine Entfernung, die sich nicht messen lässt.',
    portions: [{ book: 'ps', from: 103, to: 103, verseFrom: 1, verseTo: 14 }],
  },
  {
    title: 'Wie wir vergeben',
    note: 'Die einzige Bitte des Vaterunsers, die Jesus anschließend eigens erklärt.',
    portions: [{ book: 'mt', from: 6, to: 6, verseFrom: 9, verseTo: 15 }],
  },
  {
    title: 'Der unbarmherzige Gläubiger',
    note: 'Die Schuldsummen im Gleichnis stehen in einem grotesken Missverhältnis.',
    portions: [{ book: 'mt', from: 18, to: 18, verseFrom: 21, verseTo: 35 }],
  },
  {
    title: 'Der Vater, der läuft',
    note: 'Achte auf den älteren Bruder – die Erzählung endet bei ihm, und zwar offen.',
    portions: [{ book: 'lk', from: 15, to: 15, verseFrom: 11, verseTo: 32 }],
  },
  {
    title: 'Vergebung am Kreuz',
    note: 'Gesprochen, während die Hinrichtung noch läuft.',
    portions: [{ book: 'lk', from: 23, to: 23, verseFrom: 32, verseTo: 43 }],
  },
  {
    title: 'Einander ertragen',
    note: 'Vergebung erscheint hier als Kleidungsstück, das man anzieht – täglich neu.',
    portions: [{ book: 'kol', from: 3, to: 3, verseFrom: 12, verseTo: 17 }],
  },
];

const EINSTIEG: PlanDay[] = [
  {
    title: 'Der Anfang',
    note: 'Kein naturkundlicher Bericht, sondern ein Bekenntnis in sieben Schritten.',
    portions: [{ book: '1mo', from: 1, to: 1 }],
  },
  {
    title: 'Der Bruch',
    note: 'Achte darauf, wie schnell aus Vertrauen gegenseitige Schuldzuweisung wird.',
    portions: [{ book: '1mo', from: 3, to: 3 }],
  },
  {
    title: 'Eine Familie wird berufen',
    note: 'Von hier an erzählt die Bibel nicht mehr von der Menschheit, sondern von einer Sippe.',
    portions: [{ book: '1mo', from: 12, to: 12, verseFrom: 1, verseTo: 9 }],
  },
  {
    title: 'Gott nennt seinen Namen',
    note: 'Die Antwort am Dornbusch ist bewusst offen – eine Zusage, keine Definition.',
    portions: [{ book: '2mo', from: 3, to: 3, verseFrom: 1, verseTo: 15 }],
  },
  {
    title: 'Die Zehn Gebote',
    note: 'Erst rettet Gott, dann ordnet er das Zusammenleben – die Reihenfolge ist entscheidend.',
    portions: [{ book: '2mo', from: 20, to: 20, verseFrom: 1, verseTo: 17 }],
  },
  {
    title: 'Beten lernen',
    note: 'Zwei Psalmen: einer über Geborgenheit, einer über das Durchschautwerden.',
    portions: [
      { book: 'ps', from: 23, to: 23 },
      { book: 'ps', from: 139, to: 139, verseFrom: 1, verseTo: 18 },
    ],
  },
  {
    title: 'Trost mitten im Zusammenbruch',
    note: 'Gesprochen zu Verschleppten, die ihre Stadt und ihren Tempel verloren hatten.',
    portions: [{ book: 'jes', from: 40, to: 40, verseFrom: 1, verseTo: 11 }],
  },
  {
    title: 'Was Gott will',
    note: 'Die kürzeste Zusammenfassung des Alten Testaments – drei Worte.',
    portions: [{ book: 'mi', from: 6, to: 6, verseFrom: 6, verseTo: 8 }],
  },
  {
    title: 'Die Geburt',
    note: 'Die Titel „Retter“ und „Friedensbringer“ trug damals der Kaiser.',
    portions: [{ book: 'lk', from: 2, to: 2, verseFrom: 1, verseTo: 20 }],
  },
  {
    title: 'Die Bergpredigt beginnt',
    note: 'Sie fängt nicht mit Forderungen an, sondern mit Zusagen an die ohne Status.',
    portions: [{ book: 'mt', from: 5, to: 5, verseFrom: 1, verseTo: 16 }],
  },
  {
    title: 'Der Vater, der läuft',
    note: 'Das bekannteste Gleichnis – und es endet mit einer offenen Frage an den älteren Bruder.',
    portions: [{ book: 'lk', from: 15, to: 15, verseFrom: 11, verseTo: 32 }],
  },
  {
    title: 'Das Kreuz',
    note: 'Ausgerechnet ein römischer Hauptmann spricht am Ende das Bekenntnis aus.',
    portions: [{ book: 'mk', from: 15, to: 15, verseFrom: 21, verseTo: 39 }],
  },
  {
    title: 'Zwei auf dem Weg',
    note: 'Die Emmausgeschichte erzählt, wie Verstehen entsteht: unterwegs, beim Reden, beim Essen.',
    portions: [{ book: 'lk', from: 24, to: 24, verseFrom: 13, verseTo: 35 }],
  },
  {
    title: 'Anfang und Ziel',
    note: 'Die Bewegung geht nach außen – und endet nicht im Himmel, sondern auf einer erneuerten Erde.',
    portions: [
      { book: 'apg', from: 2, to: 2, verseFrom: 1, verseTo: 24 },
      { book: 'offb', from: 21, to: 21, verseFrom: 1, verseTo: 5 },
    ],
  },
];

const ANGST: PlanDay[] = [
  {
    title: 'Vor wem sollte ich mich fürchten?',
    note: 'Die Furchtlosigkeit wird hier nicht behauptet, sondern begründet.',
    portions: [{ book: 'ps', from: 27, to: 27 }],
  },
  {
    title: 'Fürchte dich nicht',
    note: 'Der häufigste Zuspruch der Bibel – gesagt zu Menschen, die allen Grund zur Furcht hatten.',
    portions: [{ book: 'jes', from: 41, to: 41, verseFrom: 8, verseTo: 13 }],
  },
  {
    title: 'Sorgt euch nicht um den nächsten Tag',
    note: 'Keine Aufforderung zur Sorglosigkeit, sondern eine Begrenzung der Sorge auf heute.',
    portions: [{ book: 'mt', from: 6, to: 6, verseFrom: 25, verseTo: 34 }],
  },
  {
    title: 'Der Sturm auf dem See',
    note: 'Der Vorwurf der Jünger – „Fragst du nichts danach?“ – wird im Text nicht getadelt.',
    portions: [{ book: 'mk', from: 4, to: 4, verseFrom: 35, verseTo: 41 }],
  },
  {
    title: 'Wenn ich mich fürchte',
    note: 'Ein Psalm, der die Angst nicht wegredet, sondern sie Gott vorlegt.',
    portions: [{ book: 'ps', from: 56, to: 56 }],
  },
  {
    title: 'Der Friede, der höher ist',
    note: 'Geschrieben von einem Gefangenen, der nicht wusste, ob er freikommt.',
    portions: [{ book: 'phil', from: 4, to: 4, verseFrom: 4, verseTo: 9 }],
  },
  {
    title: 'Furcht ist nicht in der Liebe',
    note: 'Gemeint ist die Angst vor Strafe – sie soll nicht der Grund des Glaubens sein.',
    portions: [{ book: '1joh', from: 4, to: 4, verseFrom: 16, verseTo: 21 }],
  },
];

const BETEN: PlanDay[] = [
  {
    title: 'Das Vaterunser',
    note: 'Fast jede Bitte hat eine Entsprechung in jüdischen Gebeten der Zeit.',
    portions: [{ book: 'mt', from: 6, to: 6, verseFrom: 5, verseTo: 15 }],
  },
  {
    title: 'Klagen darf man',
    note: 'Viermal „wie lange“ – und erst danach wird gesungen.',
    portions: [{ book: 'ps', from: 13, to: 13 }],
  },
  {
    title: 'Danken',
    note: 'Der Psalm zählt auf, was leicht selbstverständlich wird.',
    portions: [{ book: 'ps', from: 103, to: 103 }],
  },
  {
    title: 'Um Vergebung bitten',
    note: 'Der Beter bietet keine Wiedergutmachung an, sondern bittet um Neuschöpfung.',
    portions: [{ book: 'ps', from: 51, to: 51, verseFrom: 1, verseTo: 14 }],
  },
  {
    title: 'Zwei Beter im Tempel',
    note: 'Nicht der Inhalt des Gebets entscheidet, sondern die Haltung dahinter.',
    portions: [{ book: 'lk', from: 18, to: 18, verseFrom: 9, verseTo: 14 }],
  },
  {
    title: 'Beharrlich bleiben',
    note: 'Das Bild vom aufdringlichen Nachbarn ist bewusst unfromm gewählt.',
    portions: [{ book: 'lk', from: 11, to: 11, verseFrom: 5, verseTo: 13 }],
  },
  {
    title: 'Wenn man am Ende ist',
    note: 'Elia bittet um den Tod – und bekommt zuerst Essen und Schlaf.',
    portions: [{ book: '1koe', from: 19, to: 19, verseFrom: 1, verseTo: 13 }],
  },
  {
    title: 'Beten gegen den eigenen Willen',
    note: 'Gethsemane zeigt ein Gebet, das nicht erhört wird, wie es erbeten war.',
    portions: [{ book: 'mk', from: 14, to: 14, verseFrom: 32, verseTo: 42 }],
  },
  {
    title: 'Für andere beten',
    note: 'Das längste überlieferte Gebet Jesu gilt nicht ihm selbst.',
    portions: [{ book: 'joh', from: 17, to: 17, verseFrom: 1, verseTo: 19 }],
  },
  {
    title: 'Wenn die Worte fehlen',
    note: 'Auch das Nicht-beten-Können ist im Neuen Testament vorgesehen.',
    portions: [{ book: 'roem', from: 8, to: 8, verseFrom: 26, verseTo: 30 }],
  },
];

const GERECHTIGKEIT: PlanDay[] = [
  {
    title: 'Fremde, Witwen und Waisen',
    note: 'Die Begründung ist die eigene Geschichte: „Ihr seid auch Fremdlinge gewesen.“',
    portions: [{ book: '2mo', from: 22, to: 22, verseFrom: 21, verseTo: 27 }],
  },
  {
    title: 'Die Ernte nicht ganz abernten',
    note: 'Armenfürsorge als Teil des Erntevorgangs, nicht als Almosen hinterher.',
    portions: [{ book: '3mo', from: 19, to: 19, verseFrom: 9, verseTo: 18 }],
  },
  {
    title: 'Die Hand auftun',
    note: 'Der Text rechnet nüchtern damit, dass es immer Arme geben wird – und fordert trotzdem.',
    portions: [{ book: '5mo', from: 15, to: 15, verseFrom: 7, verseTo: 11 }],
  },
  {
    title: 'Es ströme das Recht',
    note: 'Amos greift nicht den Gottesdienst an, sondern seine Verwendung als Ablenkung.',
    portions: [{ book: 'am', from: 5, to: 5, verseFrom: 10, verseTo: 24 }],
  },
  {
    title: 'Das Fasten, das Gott gefällt',
    note: 'Frömmigkeit wird hier daran gemessen, ob Ketten zerbrechen.',
    portions: [{ book: 'jes', from: 58, to: 58, verseFrom: 1, verseTo: 12 }],
  },
  {
    title: 'Die Antrittsrede in Nazareth',
    note: 'Jesus wählt seinen Predigttext selbst – und bricht das Zitat an einer auffälligen Stelle ab.',
    portions: [{ book: 'lk', from: 4, to: 4, verseFrom: 16, verseTo: 21 }],
  },
  {
    title: 'Das Weltgericht',
    note: 'Beide Gruppen sind überrascht: Keine wusste, wem sie begegnet war.',
    portions: [{ book: 'mt', from: 25, to: 25, verseFrom: 31, verseTo: 46 }],
  },
  {
    title: 'Kein Ansehen der Person',
    note: 'Der Text beschreibt eine ganz konkrete Szene: die Sitzordnung im Gottesdienst.',
    portions: [{ book: 'jak', from: 2, to: 2, verseFrom: 1, verseTo: 9 }],
  },
];

const GELD: PlanDay[] = [
  {
    title: 'Wer Geld liebt, wird nie satt',
    note: 'Eine nüchterne Beobachtung, keine Moralpredigt.',
    portions: [{ book: 'pred', from: 5, to: 5, verseFrom: 9, verseTo: 20 }],
  },
  {
    title: 'Weder Armut noch Reichtum',
    note: 'Eines der wenigen Gebete der Bibel um das Mittelmaß.',
    portions: [{ book: 'spr', from: 30, to: 30, verseFrom: 7, verseTo: 9 }],
  },
  {
    title: 'Zwei Herren',
    note: 'Jesus vermenschlicht das Geld – es wird zu einem Gegenüber, dem man dient.',
    portions: [{ book: 'mt', from: 6, to: 6, verseFrom: 19, verseTo: 24 }],
  },
  {
    title: 'Der reiche Kornbauer',
    note: 'Der Mann tut nichts Unrechtes. Genau das macht die Erzählung unbequem.',
    portions: [{ book: 'lk', from: 12, to: 12, verseFrom: 13, verseTo: 21 }],
  },
  {
    title: 'Der reiche Mann',
    note: 'Die einzige Stelle, an der es heißt, Jesus habe jemanden liebgehabt – bevor er ihn ziehen lässt.',
    portions: [{ book: 'mk', from: 10, to: 10, verseFrom: 17, verseTo: 31 }],
  },
  {
    title: 'Zachäus',
    note: 'Die Umkehr zeigt sich hier zuerst an einer Zahl.',
    portions: [{ book: 'lk', from: 19, to: 19, verseFrom: 1, verseTo: 10 }],
  },
  {
    title: 'Genügsamkeit ist ein großer Gewinn',
    note: 'Der oft verkürzt zitierte Satz lautet: die *Liebe* zum Geld ist eine Wurzel des Übels.',
    portions: [{ book: '1tim', from: 6, to: 6, verseFrom: 6, verseTo: 12 }],
  },
];

const ZWEIFEL: PlanDay[] = [
  {
    title: 'Der Kampf am Fluss',
    note: 'Jakob ringt die ganze Nacht – und geht als Hinkender, aber Gesegneter weiter.',
    portions: [{ book: '1mo', from: 32, to: 32, verseFrom: 22, verseTo: 32 }],
  },
  {
    title: 'Hiob verflucht seinen Tag',
    note: 'Der Text lässt die Anklage stehen, ohne sie zu beruhigen.',
    portions: [{ book: 'hi', from: 3, to: 3 }],
  },
  {
    title: 'Fast wäre ich gestrauchelt',
    note: 'Der Psalm gibt zu, dass der Erfolg der Skrupellosen am Glauben zehrt.',
    portions: [{ book: 'ps', from: 73, to: 73 }],
  },
  {
    title: 'Wie lange soll ich schreien?',
    note: 'Habakuk stellt Gott zur Rede – und bekommt keine Erklärung, sondern eine Zusage.',
    portions: [
      { book: 'hab', from: 1, to: 1 },
      { book: 'hab', from: 2, to: 2, verseFrom: 1, verseTo: 4 },
    ],
  },
  {
    title: 'Ich glaube, hilf meinem Unglauben',
    note: 'Der ehrlichste Satz über Glauben im Neuen Testament stammt von einem verzweifelten Vater.',
    portions: [{ book: 'mk', from: 9, to: 9, verseFrom: 14, verseTo: 29 }],
  },
  {
    title: 'Thomas',
    note: 'Er verlangt nichts anderes, als die übrigen Jünger schon erlebt hatten.',
    portions: [{ book: 'joh', from: 20, to: 20, verseFrom: 24, verseTo: 29 }],
  },
  {
    title: 'Gott antwortet anders als erwartet',
    note: 'Auf Hiobs Fragen folgen Gegenfragen – und Hiob gibt sich damit zufrieden.',
    portions: [
      { book: 'hi', from: 38, to: 38, verseFrom: 1, verseTo: 18 },
      { book: 'hi', from: 42, to: 42, verseFrom: 1, verseTo: 6 },
    ],
  },
];

const TRAUER: PlanDay[] = [
  {
    title: 'Lehre uns bedenken',
    note: 'Ein Gebet um Realismus gegenüber der eigenen Lebenszeit.',
    portions: [{ book: 'ps', from: 90, to: 90 }],
  },
  {
    title: 'Alles hat seine Zeit',
    note: 'Der Text tröstet nicht – er ordnet ein, und das kann entlasten.',
    portions: [{ book: 'pred', from: 3, to: 3, verseFrom: 1, verseTo: 14 }],
  },
  {
    title: 'Und doch jeden Morgen neu',
    note: 'Der Trost steht mitten in einem Buch, das ansonsten nur klagt.',
    portions: [{ book: 'klgl', from: 3, to: 3, verseFrom: 19, verseTo: 33 }],
  },
  {
    title: 'Jesus weint',
    note: 'Er weiß, was er tun wird – und weint trotzdem. Das ist die Pointe.',
    portions: [{ book: 'joh', from: 11, to: 11, verseFrom: 17, verseTo: 44 }],
  },
  {
    title: 'Stricke des Todes',
    note: 'Ein Psalm für die Zeit danach: Er erzählt vom Überstandenen.',
    portions: [{ book: 'ps', from: 116, to: 116 }],
  },
  {
    title: 'Nicht traurig wie die anderen',
    note: 'Der Satz verbietet die Trauer nicht, er nimmt ihr die Aussichtslosigkeit.',
    portions: [{ book: '1thess', from: 4, to: 4, verseFrom: 13, verseTo: 18 }],
  },
  {
    title: 'Gott wischt die Tränen ab',
    note: 'Nicht die Trauernden ziehen fort – Gott zieht bei ihnen ein.',
    portions: [{ book: 'offb', from: 21, to: 21, verseFrom: 1, verseTo: 7 }],
  },
];

const SCHOEPFUNG: PlanDay[] = [
  {
    title: 'Ebenbild – und was das heißt',
    note: 'Im Alten Orient galt nur der König als Bild der Gottheit. Hier gilt es jedem Menschen.',
    portions: [{ book: '1mo', from: 1, to: 1, verseFrom: 26, verseTo: 31 }],
  },
  {
    title: 'Bebauen und bewahren',
    note: 'Zwei Verben, die einander begrenzen – Nutzung und Schutz stehen nebeneinander.',
    portions: [{ book: '1mo', from: 2, to: 2, verseFrom: 4, verseTo: 15 }],
  },
  {
    title: 'Das große Schöpfungslied',
    note: 'Der Psalm besingt auch das, was dem Menschen nichts nützt.',
    portions: [{ book: 'ps', from: 104, to: 104 }],
  },
  {
    title: 'Ein Ruhejahr für das Land',
    note: 'Auch der Boden hat nach dieser Ordnung ein Anrecht auf Sabbat.',
    portions: [{ book: '3mo', from: 25, to: 25, verseFrom: 1, verseTo: 12 }],
  },
  {
    title: 'Wo warst du?',
    note: 'Gottes Rede an Hiob rückt den Menschen aus der Mitte – und tröstet gerade damit.',
    portions: [{ book: 'hi', from: 38, to: 38, verseFrom: 1, verseTo: 27 }],
  },
  {
    title: 'Seht die Vögel',
    note: 'Jesus argumentiert nicht mit der Schrift, sondern mit Beobachtung.',
    portions: [{ book: 'mt', from: 6, to: 6, verseFrom: 26, verseTo: 30 }],
  },
  {
    title: 'Die Schöpfung seufzt',
    note: 'Paulus nimmt die Welt als leidendes Gegenüber wahr, nicht als Kulisse.',
    portions: [{ book: 'roem', from: 8, to: 8, verseFrom: 18, verseTo: 25 }],
  },
];

const WEISHEIT: PlanDay[] = [
  {
    title: 'Wozu Weisheit?',
    note: 'Das Vorwort nennt die Zielgruppe: die Unerfahrenen und die Jungen.',
    portions: [{ book: 'spr', from: 1, to: 1, verseFrom: 1, verseTo: 7 }],
  },
  {
    title: 'Vertrauen und Maßhalten',
    note: 'Der Text stellt nicht Vernunft gegen Glauben, sondern warnt vor Selbstüberschätzung.',
    portions: [{ book: 'spr', from: 3, to: 3, verseFrom: 1, verseTo: 12 }],
  },
  {
    title: 'Behüte dein Herz',
    note: '„Herz“ meint hier den Ort der Entscheidungen, nicht das Gefühl.',
    portions: [{ book: 'spr', from: 4, to: 4, verseFrom: 10, verseTo: 27 }],
  },
  {
    title: 'Eine linde Antwort',
    note: 'Eine Sammlung von Sätzen darüber, wie Sprache Konflikte schafft oder löst.',
    portions: [{ book: 'spr', from: 15, to: 15, verseFrom: 1, verseTo: 18 }],
  },
  {
    title: 'Geh hin zur Ameise',
    note: 'Weisheit lernt man hier durch Hinsehen, nicht durch Belehrung.',
    portions: [{ book: 'spr', from: 6, to: 6, verseFrom: 6, verseTo: 11 }],
  },
  {
    title: 'Der Einwand des Predigers',
    note: 'Kohelet widerspricht der Spruchweisheit offen – beide stehen in derselben Bibel.',
    portions: [{ book: 'pred', from: 2, to: 2, verseFrom: 20, verseTo: 26 }],
  },
  {
    title: 'Wer auf den Wind achtet',
    note: 'Gegen die Lähmung durch Absicherung: Man kann nicht auf sichere Bedingungen warten.',
    portions: [{ book: 'pred', from: 11, to: 11 }],
  },
  {
    title: 'Hören und tun',
    note: 'Das Bild vom Spiegel: Man sieht sich, geht weg und hat es vergessen.',
    portions: [{ book: 'jak', from: 1, to: 1, verseFrom: 19, verseTo: 27 }],
  },
  {
    title: 'Die Zunge',
    note: 'Der schärfste Text der Bibel über das, was Reden anrichten kann.',
    portions: [{ book: 'jak', from: 3, to: 3, verseFrom: 1, verseTo: 12 }],
  },
  {
    title: 'Die Weisheit von oben',
    note: 'Sie wird nicht an Klugheit erkannt, sondern an Friedfertigkeit.',
    portions: [{ book: 'jak', from: 3, to: 3, verseFrom: 13, verseTo: 18 }],
  },
];

const GEIST: PlanDay[] = [
  {
    title: 'Totengebeine',
    note: 'Die Vision gilt einer Gemeinschaft, die sich selbst für erledigt hielt.',
    portions: [{ book: 'hes', from: 37, to: 37, verseFrom: 1, verseTo: 14 }],
  },
  {
    title: 'Über alle ausgegossen',
    note: 'Ausdrücklich genannt: Söhne und Töchter, Alte und Junge, Knechte und Mägde.',
    portions: [{ book: 'joel', from: 2, to: 2, verseFrom: 28, verseTo: 32 }],
  },
  {
    title: 'Der Geist des Herrn ist auf mir',
    note: 'Jesus beansprucht die Verheißung für sich – und wird dafür aus der Stadt gejagt.',
    portions: [{ book: 'lk', from: 4, to: 4, verseFrom: 14, verseTo: 21 }],
  },
  {
    title: 'Der Tröster',
    note: 'Das griechische Wort meint eher einen Beistand vor Gericht als einen Seelentröster.',
    portions: [{ book: 'joh', from: 14, to: 14, verseFrom: 15, verseTo: 27 }],
  },
  {
    title: 'Pfingsten',
    note: 'Die Gegenszene zu Babel: Nicht die Sprache wird verwirrt, sondern jeder versteht.',
    portions: [{ book: 'apg', from: 2, to: 2, verseFrom: 1, verseTo: 21 }],
  },
  {
    title: 'Leben im Geist',
    note: 'Paulus beschreibt keinen Ausnahmezustand, sondern eine Alltagsausrichtung.',
    portions: [{ book: 'roem', from: 8, to: 8, verseFrom: 1, verseTo: 17 }],
  },
  {
    title: 'Die Frucht des Geistes',
    note: 'Eine Frucht wächst – sie lässt sich nicht erzwingen und nicht abhaken.',
    portions: [{ book: 'gal', from: 5, to: 5, verseFrom: 16, verseTo: 26 }],
  },
];

/* ----------------------------------------------------------- Die Pläne */

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'bibel-jahr',
    title: 'Die ganze Bibel in einem Jahr',
    subtitle: 'Alle 1.189 Kapitel, gleichmäßig auf 365 Tage verteilt.',
    kind: 'durchlesen',
    days: 365,
    scope: 'alle',
  },
  {
    id: 'nt-90',
    title: 'Neues Testament in 90 Tagen',
    subtitle: 'Von Matthäus bis zur Offenbarung, rund drei Kapitel am Tag.',
    kind: 'durchlesen',
    days: 90,
    scope: 'nt',
  },
  {
    id: 'evangelien-30',
    title: 'Die vier Evangelien in 30 Tagen',
    subtitle: 'Ein Monat mit dem Leben Jesu – vier Blickwinkel nacheinander.',
    kind: 'durchlesen',
    days: 30,
    scope: ['mt', 'mk', 'lk', 'joh'],
  },
  {
    id: 'psalmen-60',
    title: 'Psalmen in 60 Tagen',
    subtitle: 'Das Gebetbuch Israels, zweieinhalb Psalmen am Tag.',
    kind: 'durchlesen',
    days: 60,
    scope: ['ps'],
  },
  {
    id: 'einstieg-14',
    title: 'Die Bibel kennenlernen',
    subtitle: 'Vierzehn Schlüsseltexte quer durch beide Testamente – der rote Faden in zwei Wochen.',
    kind: 'thema',
    topic: 'einstieg',
    days: 14,
    curated: EINSTIEG,
  },
  {
    id: 'hoffnung-7',
    title: 'Hoffnung, wenn es dunkel wird',
    subtitle: 'Sieben Tage durch Texte, die das Schwere nicht überspringen.',
    kind: 'thema',
    topic: 'lebensfragen',
    days: 7,
    curated: HOFFNUNG,
  },
  {
    id: 'angst-7',
    title: 'Angst und Vertrauen',
    subtitle: 'Was die Bibel Menschen sagt, die sich fürchten – ohne die Angst kleinzureden.',
    kind: 'thema',
    topic: 'lebensfragen',
    days: 7,
    curated: ANGST,
  },
  {
    id: 'zweifel-7',
    title: 'Zweifel und Ringen mit Gott',
    subtitle: 'Sieben Texte, in denen Menschen Gott zur Rede stellen – und dafür nicht getadelt werden.',
    kind: 'thema',
    topic: 'lebensfragen',
    days: 7,
    curated: ZWEIFEL,
  },
  {
    id: 'trauer-7',
    title: 'Abschied, Trauer und Trost',
    subtitle: 'Für Zeiten des Verlusts: Texte, die weder vertrösten noch verstummen.',
    kind: 'thema',
    topic: 'lebensfragen',
    days: 7,
    curated: TRAUER,
  },
  {
    id: 'vergebung-7',
    title: 'Vergebung',
    subtitle: 'Sieben Abschnitte über das, was am schwersten fällt.',
    kind: 'thema',
    topic: 'lebensfragen',
    days: 7,
    curated: VERGEBUNG,
  },
  {
    id: 'jesus-14',
    title: 'Wer ist Jesus?',
    subtitle: 'Vierzehn Tage durch das Markusevangelium – das älteste und knappste.',
    kind: 'thema',
    topic: 'glaube',
    days: 14,
    curated: WER_IST_JESUS,
  },
  {
    id: 'beten-10',
    title: 'Beten lernen',
    subtitle: 'Zehn Gebete der Bibel: klagen, danken, bitten – und schweigen, wenn Worte fehlen.',
    kind: 'thema',
    topic: 'glaube',
    days: 10,
    curated: BETEN,
  },
  {
    id: 'geist-7',
    title: 'Der Heilige Geist',
    subtitle: 'Von den Totengebeinen bei Hesekiel bis zur Frucht des Geistes bei Paulus.',
    kind: 'thema',
    topic: 'glaube',
    days: 7,
    curated: GEIST,
  },
  {
    id: 'gerechtigkeit-8',
    title: 'Gerechtigkeit: Gott und die Armen',
    subtitle: 'Acht Texte von der Tora bis Jakobus – eine der beharrlichsten Linien der Bibel.',
    kind: 'thema',
    topic: 'welt',
    days: 8,
    curated: GERECHTIGKEIT,
  },
  {
    id: 'geld-7',
    title: 'Geld, Besitz und Genug',
    subtitle: 'Sieben Texte über das Thema, zu dem Jesus auffallend oft etwas gesagt hat.',
    kind: 'thema',
    topic: 'welt',
    days: 7,
    curated: GELD,
  },
  {
    id: 'schoepfung-7',
    title: 'Schöpfung und Verantwortung',
    subtitle: 'Was „bebauen und bewahren“ heißt – und warum auch der Boden Ruhe bekommt.',
    kind: 'thema',
    topic: 'welt',
    days: 7,
    curated: SCHOEPFUNG,
  },
  {
    id: 'weisheit-10',
    title: 'Weisheit für den Alltag',
    subtitle: 'Zehn Tage mit Sprüche, Prediger und Jakobus – und ihren offenen Widersprüchen.',
    kind: 'thema',
    topic: 'welt',
    days: 10,
    curated: WEISHEIT,
  },
];

export function findPlan(planId: string): ReadingPlan | undefined {
  return READING_PLANS.find((p) => p.id === planId);
}

/* -------------------------------------------------------- Berechnung */

/** Alle Kapitel im Geltungsbereich eines Plans, in kanonischer Reihenfolge. */
function chaptersInScope(plan: ReadingPlan, index: BibleIndex): { book: string; chapter: number }[] {
  const books = index.books.filter((book) => {
    if (plan.scope === 'at') return book.testament === 'AT';
    if (plan.scope === 'nt') return book.testament === 'NT';
    if (Array.isArray(plan.scope)) return plan.scope.includes(book.id);
    return true;
  });

  // Bei ausdrücklicher Buchliste zählt deren Reihenfolge.
  const ordered = Array.isArray(plan.scope)
    ? plan.scope
        .map((id) => books.find((b) => b.id === id))
        .filter((b): b is NonNullable<typeof b> => Boolean(b))
    : books;

  return ordered.flatMap((book) =>
    Array.from({ length: book.chapters }, (_, i) => ({ book: book.id, chapter: i + 1 })),
  );
}

/** Fasst aufeinanderfolgende Kapitel desselben Buches zu Abschnitten zusammen. */
function toPortions(chapters: { book: string; chapter: number }[]): Portion[] {
  const portions: Portion[] = [];
  for (const item of chapters) {
    const last = portions[portions.length - 1];
    if (last && last.book === item.book && last.to === item.chapter - 1) last.to = item.chapter;
    else portions.push({ book: item.book, from: item.chapter, to: item.chapter });
  }
  return portions;
}

/**
 * Die Tage eines Plans. Bei Themenplänen sind sie hinterlegt, bei
 * Durchlese-Plänen werden die Kapitel gleichmäßig verteilt – die ersten Tage
 * bekommen ein Kapitel mehr, wenn die Rechnung nicht aufgeht.
 */
export function buildDays(plan: ReadingPlan, index: BibleIndex): PlanDay[] {
  if (plan.curated) return plan.curated;

  const chapters = chaptersInScope(plan, index);
  const perDay = Math.floor(chapters.length / plan.days);
  const remainder = chapters.length % plan.days;

  const days: PlanDay[] = [];
  let cursor = 0;
  for (let i = 0; i < plan.days; i++) {
    const size = perDay + (i < remainder ? 1 : 0);
    days.push({ portions: toPortions(chapters.slice(cursor, cursor + size)) });
    cursor += size;
  }
  return days;
}

/** Beschriftung eines Abschnitts, z. B. „Markus 4,35-41“ oder „1. Mose 1-3“. */
export function portionLabel(portion: Portion, bookName: string): string {
  if (portion.verseFrom) {
    const verses = portion.verseTo
      ? `${portion.verseFrom}-${portion.verseTo}`
      : `${portion.verseFrom}`;
    return `${bookName} ${portion.from},${verses}`;
  }
  return portion.from === portion.to
    ? `${bookName} ${portion.from}`
    : `${bookName} ${portion.from}-${portion.to}`;
}

/** Ziel-Adresse für den ersten Vers eines Abschnitts. */
export function portionLink(portion: Portion): string {
  const query = portion.verseFrom ? `?vers=${portion.verseFrom}` : '';
  return `/bibel/${portion.book}/${portion.from}${query}`;
}
