/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
/**
 * Reiserouten für das Kartenmodul.
 *
 * Die Stationen tragen ihre Koordinaten selbst, damit auch Orte auftauchen
 * können, für die es keinen eigenen Lexikoneintrag gibt. Reihenfolge und
 * Datierung folgen der Apostelgeschichte; die Jahreszahlen sind Näherungen,
 * über die die Forschung nicht einig ist.
 */

export interface JourneyStop {
  name: string;
  /** [Längengrad, Breitengrad] */
  coords: [number, number];
  note?: string;
}

export interface Journey {
  id: string;
  title: string;
  period: string;
  summary: string;
  /** Farbe der Route auf der Karte. */
  color: string;
  ref: { book: string; chapter: number };
  stops: JourneyStop[];
}

export const JOURNEYS: Journey[] = [
  {
    id: 'abraham',
    title: 'Der Weg Abrahams',
    period: 'nicht datierbar',
    summary:
      'Von Ur den Euphrat hinauf nach Haran, dann nach Süden ins Land – rund 2000 Kilometer. Die Route folgt dem Fruchtbaren Halbmond; der direkte Weg durch die Wüste war für Herden nicht gangbar.',
    color: '#b7791f',
    ref: { book: '1mo', chapter: 12 },
    stops: [
      { name: 'Ur', coords: [45.97, 30.96], note: 'Aufbruch der Familie' },
      { name: 'Haran', coords: [39.03, 36.86], note: 'Zwischenstation, Tod des Terach' },
      { name: 'Sichem', coords: [35.28, 32.21], note: 'Erste Zusage im Land' },
      { name: 'Bethel', coords: [35.22, 31.93] },
      { name: 'Memphis', coords: [31.25, 29.85], note: 'Flucht vor der Hungersnot' },
      { name: 'Hebron', coords: [35.1, 31.53], note: 'Dauerhafter Aufenthalt und Grabstätte' },
    ],
  },
  {
    id: 'auszug',
    title: 'Der Auszug aus Ägypten',
    period: 'meist im 13. Jh. v. Chr. verortet',
    summary:
      'Die Route ist unsicher: Weder der Ort des Meeresdurchzugs noch die Lage des Sinai lassen sich bestimmen. Die Linie zeigt den überlieferten Verlauf, nicht einen nachgewiesenen Weg.',
    color: '#a04a52',
    ref: { book: '2mo', chapter: 12 },
    stops: [
      { name: 'Ramses', coords: [31.83, 30.8], note: 'Ausgangspunkt im Nildelta' },
      { name: 'Sinai', coords: [33.97, 28.54], note: 'Bundesschluss und Weisung' },
      { name: 'Kadesch-Barnea', coords: [34.5, 30.68], note: 'Der größte Teil der Wüstenzeit' },
      { name: 'Berg Nebo', coords: [35.73, 31.77], note: 'Mose sieht das Land und stirbt' },
      { name: 'Jericho', coords: [35.45, 31.87], note: 'Übergang über den Jordan' },
    ],
  },
  {
    id: 'exil',
    title: 'Der Weg ins Exil',
    period: '597 und 587 v. Chr.',
    summary:
      'Die Verschleppten zogen nicht durch die Wüste, sondern den Fruchtbaren Halbmond entlang – ein Umweg von rund 1500 Kilometern für eine Luftlinie von 900.',
    color: '#6b5ca5',
    ref: { book: '2koe', chapter: 25 },
    stops: [
      { name: 'Jerusalem', coords: [35.23, 31.78], note: 'Zerstörung von Stadt und Tempel' },
      { name: 'Damaskus', coords: [36.3, 33.51] },
      { name: 'Karkemisch', coords: [38.01, 36.83], note: 'Furt über den Euphrat' },
      { name: 'Babylon', coords: [44.42, 32.54], note: 'Ziel der Deportation' },
    ],
  },
  {
    id: 'jesus',
    title: 'Die Wege Jesu',
    period: 'um 28–30 n. Chr.',
    summary:
      'Der überlieferte Bewegungsraum ist klein: Von Nazareth bis Jerusalem sind es rund 150 Kilometer. Weiter als bis zur phönizischen Küste und nach Cäsarea Philippi führt kein Weg.',
    color: '#3f7d6f',
    ref: { book: 'mk', chapter: 1 },
    stops: [
      { name: 'Nazareth', coords: [35.3, 32.7], note: 'Aufgewachsen' },
      { name: 'Jordan', coords: [35.55, 32.3], note: 'Taufe durch Johannes' },
      { name: 'Kapernaum', coords: [35.57, 32.88], note: 'Ausgangspunkt in Galiläa' },
      { name: 'Tyrus', coords: [35.2, 33.27], note: 'Die syrophönizische Frau' },
      { name: 'Cäsarea Philippi', coords: [35.69, 33.25], note: 'Das Bekenntnis des Petrus' },
      { name: 'Jericho', coords: [35.45, 31.87] },
      { name: 'Betanien', coords: [35.26, 31.77] },
      { name: 'Jerusalem', coords: [35.23, 31.78], note: 'Letzte Woche, Kreuzigung' },
    ],
  },
  {
    id: 'sieben-gemeinden',
    title: 'Die sieben Gemeinden der Offenbarung',
    period: 'um 95 n. Chr.',
    summary:
      'Die Reihenfolge der Sendschreiben ist kein Zufall: Sie folgt der römischen Ringstraße, auf der ein Bote die Städte nacheinander erreichte.',
    color: '#2a6f8e',
    ref: { book: 'offb', chapter: 2 },
    stops: [
      { name: 'Ephesus', coords: [27.34, 37.95], note: 'Die erste Liebe verlassen' },
      { name: 'Smyrna', coords: [27.14, 38.42], note: 'Ohne Tadel' },
      { name: 'Pergamon', coords: [27.18, 39.13], note: '„Wo der Thron des Satans ist“' },
      { name: 'Thyatira', coords: [27.84, 38.92] },
      { name: 'Sardes', coords: [28.04, 38.49], note: 'Dem Namen nach lebendig' },
      { name: 'Philadelphia', coords: [28.52, 38.35], note: 'Eine offene Tür' },
      { name: 'Laodizea', coords: [29.11, 37.84], note: 'Weder kalt noch warm' },
    ],
  },
  {
    id: 'erste',
    title: 'Erste Missionsreise',
    period: 'etwa 46–48 n. Chr.',
    summary:
      'Mit Barnabas über Zypern nach Kleinasien. In Lystra wird Paulus gesteinigt und liegengelassen – und geht weiter.',
    color: '#b7791f',
    ref: { book: 'apg', chapter: 13 },
    stops: [
      { name: 'Antiochia in Syrien', coords: [36.16, 36.2], note: 'Ausgangspunkt' },
      { name: 'Seleukia', coords: [35.93, 36.12], note: 'Hafen' },
      { name: 'Salamis', coords: [33.9, 35.18], note: 'Zypern' },
      { name: 'Paphos', coords: [32.41, 34.76] },
      { name: 'Perge', coords: [30.85, 36.96] },
      { name: 'Antiochia in Pisidien', coords: [31.19, 38.3] },
      { name: 'Ikonion', coords: [32.49, 37.87] },
      { name: 'Lystra', coords: [32.45, 37.58], note: 'Steinigung des Paulus' },
      { name: 'Derbe', coords: [33.28, 37.35] },
      { name: 'Attalia', coords: [30.7, 36.88] },
      { name: 'Antiochia in Syrien', coords: [36.16, 36.2], note: 'Rückkehr' },
    ],
  },
  {
    id: 'zweite',
    title: 'Zweite Missionsreise',
    period: 'etwa 49–52 n. Chr.',
    summary:
      'Der Schritt nach Europa. In Philippi entsteht die erste Gemeinde auf dem Kontinent, in Athen hält Paulus seine Rede auf dem Areopag.',
    color: '#3f7d6f',
    ref: { book: 'apg', chapter: 15 },
    stops: [
      { name: 'Antiochia in Syrien', coords: [36.16, 36.2] },
      { name: 'Tarsus', coords: [34.9, 36.92] },
      { name: 'Derbe', coords: [33.28, 37.35] },
      { name: 'Lystra', coords: [32.45, 37.58], note: 'Timotheus schließt sich an' },
      { name: 'Troas', coords: [26.16, 39.75], note: 'Der Ruf nach Makedonien' },
      { name: 'Neapolis', coords: [24.41, 40.94] },
      { name: 'Philippi', coords: [24.29, 41.01], note: 'Lydia, dann Gefängnis' },
      { name: 'Thessalonich', coords: [22.94, 40.64] },
      { name: 'Beröa', coords: [22.2, 40.52] },
      { name: 'Athen', coords: [23.73, 37.98], note: 'Rede auf dem Areopag' },
      { name: 'Korinth', coords: [22.88, 37.94], note: 'Anderthalb Jahre' },
      { name: 'Ephesus', coords: [27.34, 37.95] },
      { name: 'Cäsarea', coords: [34.89, 32.5] },
      { name: 'Antiochia in Syrien', coords: [36.16, 36.2] },
    ],
  },
  {
    id: 'dritte',
    title: 'Dritte Missionsreise',
    period: 'etwa 53–57 n. Chr.',
    summary:
      'Über zwei Jahre in Ephesus, wo der Aufruhr der Silberschmiede ausbricht. Am Ende die Reise nach Jerusalem, die zur Verhaftung führt.',
    color: '#6b5ca5',
    ref: { book: 'apg', chapter: 18 },
    stops: [
      { name: 'Antiochia in Syrien', coords: [36.16, 36.2] },
      { name: 'Ikonion', coords: [32.49, 37.87] },
      { name: 'Ephesus', coords: [27.34, 37.95], note: 'Über zwei Jahre; Aufruhr der Silberschmiede' },
      { name: 'Philippi', coords: [24.29, 41.01] },
      { name: 'Korinth', coords: [22.88, 37.94], note: 'Hier entsteht der Römerbrief' },
      { name: 'Troas', coords: [26.16, 39.75] },
      { name: 'Milet', coords: [27.28, 37.53], note: 'Abschiedsrede an die Ältesten' },
      { name: 'Patara', coords: [29.32, 36.26] },
      { name: 'Tyrus', coords: [35.2, 33.27] },
      { name: 'Cäsarea', coords: [34.89, 32.5] },
      { name: 'Jerusalem', coords: [35.23, 31.78], note: 'Verhaftung im Tempel' },
    ],
  },
  {
    id: 'rom',
    title: 'Die Fahrt nach Rom',
    period: 'etwa 59–60 n. Chr.',
    summary:
      'Als Gefangener und mit Berufung auf sein römisches Bürgerrecht. Der Seesturm und der Schiffbruch vor Malta gehören zu den genauesten Seefahrtsberichten der Antike.',
    color: '#a04a52',
    ref: { book: 'apg', chapter: 27 },
    stops: [
      { name: 'Cäsarea', coords: [34.89, 32.5], note: 'Zwei Jahre Haft' },
      { name: 'Sidon', coords: [35.37, 33.56] },
      { name: 'Myra', coords: [29.98, 36.25], note: 'Umstieg auf ein Kornschiff' },
      { name: 'Guthafen auf Kreta', coords: [24.75, 34.9] },
      { name: 'Malta', coords: [14.38, 35.9], note: 'Schiffbruch, drei Monate' },
      { name: 'Syrakus', coords: [15.28, 37.07] },
      { name: 'Rhegium', coords: [15.65, 38.11] },
      { name: 'Puteoli', coords: [14.12, 40.82] },
      { name: 'Rom', coords: [12.48, 41.89], note: 'Hausarrest, weiter verkündigend' },
    ],
  },
];

export function findJourney(id: string): Journey | undefined {
  return JOURNEYS.find((j) => j.id === id);
}
