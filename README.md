# FCG Frankfurt App (Prototyp)

**Gemeinde verbinden. Glauben vertiefen. Alltag erreichen.**

Lauffähiger Prototyp der Gemeinde-App aus der Entscheidervorlage (September 2026).
Die App ist eine installierbare Progressive Web App (PWA): Sie läuft im Browser,
lässt sich auf iOS und Android zum Homescreen hinzufügen und funktioniert offline
für bereits besuchte Inhalte.

```bash
npm install
npm run dev      # Entwicklung, http://localhost:5173
npm run build    # Produktionsbuild nach dist/
npm run preview  # Build lokal ansehen
```

## Wo die App lebt

Die veröffentlichte Seite ist der maßgebliche Stand:

> **https://roruffm.github.io/FCG-App/**

Jede Änderung geht über den Standard-Branch dorthin. Geprüft wird vor dem Push
gegen denselben Produktionsbuild (`npm run build` + `npm run preview`), weil die
Seite aus genau dieser Ausgabe entsteht.

## Die App aufrufen

Bei jedem Push auf den Standard-Branch baut
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) die App und
stellt sie über **GitHub Pages** bereit:

> **https://roruffm.github.io/FCG-App/**

### Einmalig: Pages einschalten

GitHub Pages muss **einmal von Hand** aktiviert werden - das Token eines
Workflows darf eine Pages-Seite nicht selbst anlegen und scheitert sonst mit
`Resource not accessible by integration`:

> **Settings -> Pages -> Build and deployment -> Source: „GitHub Actions"**

Danach genügt ein beliebiger Push (oder *Actions -> Webseite veröffentlichen ->
Run workflow*), und die Seite ist nach ein bis zwei Minuten online.

Ist das Repository privat, braucht Pages einen bezahlten Tarif; andernfalls
das Repository auf öffentlich stellen.

### Ohne Basispfad-Gefummel

Vite baut mit `base: './'`, alle Verweise sind relativ, und der Router arbeitet
mit Hash-Routen (`/#/predigten/p-2026-08-30`). Die Seite läuft dadurch unverändert unter
`/FCG-App/`, unter einer eigenen Domain und auch direkt vom Dateisystem.
Für eine eigene Domain genügt eine Datei `public/CNAME` mit der Domain darin.

Die Schriften **Archivo** und **Karla** liegen unter `src/fonts/` im Projekt und
werden mitgeliefert, nicht geladen. Vorher holte die App sie zur Laufzeit von
`fonts.googleapis.com` - dabei geht die IP-Adresse jedes Besuchers an Google in
die USA, ohne Einwilligung und ohne technische Notwendigkeit. Genau dafuer hat
das LG Muenchen I 2022 Schadenersatz zugesprochen (Az. 3 O 17493/20). Beide
Schriften stehen unter der SIL Open Font License 1.1; die Lizenztexte liegen
neben den Dateien. Es sind variable Schriften, aufgeteilt nur nach Zeichensatz:
vier Dateien, rund 101 kB.

**Die App baut damit keine einzige Verbindung nach aussen auf**, solange niemand
einen Link anklickt.

Eine Ausnahme braucht doch eine Angabe: die 404-Seite. Sie muss wissen, wo die
App liegt, um einen tiefen Pfad in eine Hash-Route umzuschreiben - das ist eine
Eigenschaft der Veröffentlichung und nicht erratbar. Der Workflow setzt dafür
`APP_BASE: /FCG-App/`; ohne Angabe gilt `/`, was für eine eigene Domain stimmt.

Am besten in der Geräte-Ansicht der Browser-Entwicklerwerkzeuge (iPhone/Android)
öffnen - die Oberfläche ist mobil gedacht.

---

## Aufbau: Startseite nach Rollen

Umgesetzt aus dem Entwurf **"FCG Start 1b"** (Claude Design). Gast, Mitglied und
Leader suchen Verschiedenes - statt allen dieselbe Linkwand zu zeigen, waehlt
man oben auf dem petrolfarbenen Kopf die Rolle:

| | Gast | Mitglied | Leader |
|---|---|---|---|
| **Aufmacher** | Sonntag ist offen fuer dich | naechster Termin mit offener Anmeldung | Leitungsdashboard |
| **Liste** | Der erste Schritt | Dein Bereich | Arbeitswege |
| **Ziele** | NH PR CG KT WI | TM MM CG GB WI | CT IN PU TM WI |

Gleich bleiben fuer alle: Kopf mit Marke und Zeiten, die Zeile **Naechster
Termin**, die sechs **Kanaele** (Website, ChurchTools, YouTube, Instagram,
Spotify, Facebook), die Kacheln **Spenden** und **Newsletter** und der Fuss. Die
Rollenwahl bleibt auf dem Geraet gespeichert - und gilt auch im Wiki, das
dieselbe Dreiteilung benutzt.

Die frueheren Gruppen unter **"Mehr anzeigen"** sind entfallen: eine zweite,
ungeordnete Linkwand unter der ersten. Genau eine Liste je Rolle, fuenf Ziele.
Was dabei von der Startseite verschwindet, ist nicht verloren - Kurse, Taufe und
Gemeinschaften stehen auf der Kontakt- und der Gruppenseite, alle Termine hinter
dem Kalender-Knopf.

Zwei Angaben im Aufmacher rechnet die App aus den vorhandenen Daten aus, statt
sie fest einzutragen: der Termin fuer Mitglieder kommt aus `src/data/events.ts`
samt belegten Plaetzen, die Zahl der suchenden Teams aus `src/data/teams.ts`.

Gepflegt wird das in [`src/data/links.ts`](src/data/links.ts) (Rollen, Listen,
Gruppen, Kacheln) und [`src/data/church.ts`](src/data/church.ts) (Adressen).
Eine Kachel ohne Ziel gilt als geplant: Sie wird angezeigt, aber nicht
verlinkt - so steht das Wiki da, bis seine Adresse in `church.web.wiki` steht.

Es gibt **keine untere Navigation**. Die Startseite ist der einzige Einstieg;
alles Weitere fuehrt ueber sie und ueber die Zurueck-Taste der Kopfzeile.

### Leitungsdashboard

Das Reporting laeuft ausserhalb dieser App und ist passwortgeschuetzt. Ein
Versuch, es einzubetten, scheiterte - die Seite erlaubt das nicht. Deshalb
verlinkt die App sie direkt: *Mehr anzeigen -> Fuer Staff -> Leitungsdashboard*,
mit dem Hinweis, dass eine Anmeldung noetig ist. Die Adresse steht in
`church.web.leitungsdashboard`.

## Was drin ist

### Version 1 der Roadmap - vollständig
| Bereich | Umsetzung |
|---|---|
| **Predigtbibliothek** | Archiv mit Volltextsuche, Filter nach Thema, Prediger, Serie und Bibelbuch |
| **Player** | Kapitelmarken, 15s/30s-Sprünge, 1×/1,5×/2×, gespeicherter Hörfortschritt, „weiterhören“ auf der Startseite |
| **Kurzfassung** | Drei Kernaussagen je Predigt, sichtbar als KI-Entwurf gekennzeichnet |
| **Events** | Gemeindekalender nach Kategorie, Detailseite, Anmeldung mit Platzzähler |
| **New-here-Modus** | Ablauf, Parken, Kinderprogramm, Kollekte, FAQ, nächste Schritte |
| **Wiki** | 24 Artikel, getrennt nach Gast (7), Mitglied (8) und Staff (10), mit Suche, Querverweisen und Entwurfskennzeichnung |
| **Favoriten & später hören** | Persönlicher Bereich mit Anmeldungen, Notizen, gespeicherten Versen |
| **Push-Einstellungen** | Themenauswahl statt Gießkanne (Oberfläche; Versand braucht Backend) |

### Teambereiche (Version 2 der Roadmap)

Jedes Dienstteam hat unter `/teams/<id>` einen eigenen Bereich mit drei Reitern:

- **Chat** - Nachrichten mit Absender und Zeit, eigene loeschbar
- **Dokumente** - Dateien hinzufuegen, speichern, teilen (ueber die
  Teilen-Funktion des Geraets) und entfernen
- **Team-Info** - Aufgabe, gesuchte Verstaerkung, naechste Dienste,
  Einarbeitungs-Checkliste, Draht zur Teamleitung

**Wo die Daten liegen:** Nachrichten im `localStorage`, Dateien in `IndexedDB` -
beides ausschliesslich auf dem Geraet des Nutzers. **Andere im Team sehen davon
nichts.** Das steht auch in der App an jeder Stelle, an der es zaehlt.

Fuer echten Austausch braucht es einen Server. Was dann dazukommt:

| Baustein | Warum |
|---|---|
| Anmeldung und Rollen | ohne sie sieht jeder jeden Teambereich |
| Speicher fuer Dateien | Ablage mit Rechten, Versionen und Loeschfristen |
| Echtzeit-Nachrichten | Zustellung, Lesestand, Push |
| Moderation und Meldefunktion | Voraussetzung fuer Chat mit Jugendlichen |
| Aufbewahrung und Loeschkonzept | Chatverlaeufe sind personenbezogene Daten |

**Die Anbindung an ChurchTools ist vorbereitet** - siehe
[`server/ANLEITUNG.md`](server/ANLEITUNG.md):

- `src/lib/teamRepo.ts` haelt beide Umsetzungen hinter einer Schnittstelle:
  Geraet (heute) und ChurchTools. Die Oberflaeche kennt nur die Schnittstelle.
- `server/churchtools-proxy.mjs` ist ein kleiner Dienst ohne Zusatzpakete, der
  das Token haelt und der App nur Teams, Beitraege und Dateien weitergibt.
  Schreibzugriff ist standardmaessig aus.
- `server/check-churchtools.mjs` prueft die angenommenen API-Pfade gegen eure
  Instanz und nennt die Gruppen-Ids fuer `ctGroupId` in `src/data/teams.ts`.
- Umgestellt wird ueber `VITE_TEAM_API` beim Bauen. Ohne die Variable bleibt
  alles beim Geraet.

Geprueft ist die Kette App -> Dienst -> API gegen einen Nachbau der
ChurchTools-Antworten: Beitraege lesen, Nachricht senden, Dateien auflisten und
herunterladen. **Nicht geprueft** sind die echten ChurchTools-Pfade - dafuer
ist Schritt 2 der Anleitung da.

### Aus Version 2 bereits angelegt
- **Connectgruppen-Finder** mit Filter nach Lebensphase, Stadtteil, Wochentag, Sprache und freien Plätzen
- **Gebetswand** mit wählbarer Sichtbarkeit (Gemeinde / Gruppe / nur Gebetsteam), anonymem Posten und „Ich bete dafür“
- **Predigtnotizen** und **Gesprächsleitfaden** für Connectgruppen zum Teilen

### Aus Version 3 als funktionierender Demonstrator
- **„Frag die Predigten“** (`src/lib/search.ts`): Fragen in normaler Sprache, Antworten
  ausschließlich aus den freigegebenen Transkripten, **immer mit Quellenangabe** auf
  Predigt, Prediger und Bibelstelle. Findet die Suche nichts, sagt sie das - sie erfindet nichts.

  Die Demo rankt vollständig auf dem Gerät (gewichtete Begriffssuche mit einfacher
  Stammformbildung). Im Produktivbetrieb ersetzt ein Retrieval-Dienst (Embeddings +
  LLM mit Quellenzwang) dieses Ranking; Schnittstelle und Regeln bleiben identisch.

---

## Die roten Linien sind im Code, nicht im Konzeptpapier

Die Vorlage nennt vier rote Linien. Sie sind hier als Verhalten umgesetzt:

- **Keine KI-Seelsorge** - `CRISIS_PATTERNS` in `src/lib/search.ts` erkennt Fragen zu
  Suizid, Missbrauch, Gewalt, Selbstverletzung und Kindeswohl. Statt einer Antwort
  erscheint eine Weiterleitung an Telefonseelsorge, Notruf und das Seelsorgeteam.
- **Kein Glaubens-Scoring** - es existiert keine Datenstruktur, die Personen bewertet.
  Es gibt keine Datenstruktur, die Personen bewertet.
- **Keine verdeckte Profilbildung** - die App wertet nichts ueber Personen aus
  (`aiConsent`), alle persönlichen Daten liegen im Prototyp ausschließlich lokal und
  lassen sich mit einem Klick löschen.
- **Menschliche Eskalation** - sensible Wege führen zu Kontaktadressen, nicht zu Automatik.
- **KI-Kennzeichnung** - maschinell vorbereitete Inhalte tragen sichtbar das Label
  „KI-Entwurf, redaktionell geprüft“.

Die Seite `/datenschutz` erklärt das für Nutzer in verständlicher Sprache.

---

## Was nicht mehr drin ist

Der Bibelteil - Volltext der Lutherbibel 1912, 723 Kontextartikel, Karte,
Lexikon, Lesepläne - und der Vers des Tages wurden auf Wunsch wieder
**entfernt**. Mit ihnen sind rund 9 MB Daten aus `public/` verschwunden; der
Produktionsbuild ist von 9,1 MB auf 440 kB geschrumpft.

Wer das zurueckholen will: Alles liegt im Git-Verlauf (letzter Stand mit
Bibelteil: Commit `7524b33`). Der Bestand selbst kommt aus dem Schwesterprojekt
[roruffm/bible-study](https://github.com/roruffm/bible-study) und laesst sich
von dort jederzeit neu einlesen.

## Aufbau

```
src/
  data/          Inhalte: Predigten inkl. Transkript, Events, Gruppen, Teams,
                 Gebete, Stammdaten der Gemeinde, Linkstruktur der Startseite
  lib/search.ts  "Frag die Predigten" - Ranking, Zitate, Krisen-Erkennung
  lib/teamRepo.ts  Teamdaten: Geraet oder ChurchTools
  lib/idb.ts     Dateien der Teams in IndexedDB
  lib/storage.ts localStorage-Persistenz
  state.tsx      App-Zustand: Favoriten, Notizen, Anmeldungen, Teams, Anzeigename
  components/    Rollenwahl, Kalender, Kanalsymbole, Predigtkarte, Player, Icons
  data/wiki.ts   Wiki-Artikel je Rolle, mit Status geprueft/entwurf
  routes/        Start, Predigten, Frag, Events, Gruppen, Neu hier, Gebet,
                 Teams, Mitmachen, Kontakt, Datenschutz, Wiki
public/          Manifest, Logo, Service Worker
server/          ChurchTools-Anbindung (Dienst, Zuordnung, Pruefskript)
```

**Der Prototyp hat bewusst kein Backend.** Alle Inhalte stehen als typisierte
Demo-Daten in `src/data/`, alle Nutzerdaten bleiben im `localStorage` des Geräts.
Dadurch ist die App sofort testbar - und die Datenschutzfragen stellen sich erst
dort, wo sie wirklich anfallen.

---

## Was für den echten Betrieb dazukommen muss

| Thema | Aufwand | Hinweis |
|---|---|---|
| Backend & Redaktions-CMS | groß | Predigt-Upload, Transkription, Freigabe-Workflow, Medien-Hosting |
| Anmeldung & Rollen | mittel | Mitglied, Gruppenleitung, Team, Redaktion, Jugendschutz-Rollen |
| Anbindung Gemeindeverwaltung | mittel | z. B. ChurchTools oder ChurchDesk für Kalender, Gruppen und Dienstpläne |
| Push-Versand | klein | Web Push, für Store-Apps zusätzlich APNs/FCM |
| KI-Dienst | mittel | Transkription + Embeddings + Antwort mit Quellenzwang, DSGVO-konform gehostet |
| Chat | groß | Echtzeit, Moderation, Meldefunktion, Jugendschutz - der aufwendigste Baustein |
| Store-Veröffentlichung | klein | Diese PWA lässt sich mit Capacitor als iOS-/Android-App einreichen |
| Datenschutz-Dokumentation | mittel | Verzeichnis der Verarbeitungstätigkeiten, Einwilligungen, Löschkonzept, AVV |

**Empfehlung aus der Vorlage bleibt gültig:** nicht mit der Vollversion starten.
Dieser Prototyp löst die zwei Dinge, die den MVP ausmachen - Predigten zugänglich
machen und Menschen in den Gemeindealltag führen. Chat und Dienstpläne kommen
danach, wenn Nutzung und Feedback zeigen, was wirklich gebraucht wird.

---

## Demo-Inhalte und Kennzeichnung

Die App traegt durchgehend ein sichtbares Band **„PROTOTYP · Beispielinhalte, keine
offizielle App der FCG Frankfurt"**. Predigten, Prediger, Gebetsanliegen und die
meisten Termine sind erfunden.

An oeffentlich zugaenglichen Angaben der FCG Frankfurt orientiert sind: Gottesdienstzeiten
(sonntags 10:00 und 12:00 Uhr), Adresse (Eckenheimer Landstr. 180, 60318 Frankfurt),
Kinder- und Jugendangebote (Kinderkirche 3-11 mit Forscher/Abenteurer, Evidence 12-15,
Eltern-Kind-Raum mit Live-Uebertragung), Livestream und Uebersetzung, der Begriff
*Connectgruppen* sowie zwei Gruppentermine (Dienstag Sachsenhausen, Donnerstag Bad Vilbel).

## Corporate Design

Uebernommen aus dem Stylesheet von fcg-frankfurt.de (als MHTML-Archiv geliefert):

| Rolle | Wert | Verwendung in der App |
|---|---|---|
| Petrol | `#006269` | Hausfarbe: Hero, Buttons, aktive Rollenwahl |
| Dunkelpetrol | `#00444B` | Prototyp-Band, dunkle Flaechen, Verlaeufe |
| Mint | `#D8E3E4` | heller Begleitton (als `--accent-soft` aus der Hausfarbe gemischt) |
| Schwarz | `#000000` | Bildmarke und der Kasten-Stil der Website (`.tagbox`) |

Uebernommen sind ausserdem die **Bildmarke** (`public/fcg-logo.png`, zusaetzlich als
Data-URI in `src/data/logo.ts` fuer die Einzeldatei-Demo), die **Pillenform** der
Buttons und das Website-Element *weisse Versalschrift auf schwarzem Kasten*.

**Schrift:** Die Website nutzt `CMGSans` / `CMGSansBold`. Die Schriftdateien waren im
Archiv nicht enthalten (nur relative Verweise auf `./fonts/CMGSans-*.ttf`). Die App
stellt sie deshalb im Stack voran und faellt auf **Archivo** (Ueberschriften) und
**Karla** (Fliesstext) zurueck. Sobald die TTF-Dateien vorliegen, genuegt ein
`@font-face`-Block - die Stacks stimmen bereits.

Das Farbschema laesst sich weiterhin ueber den Button **Design** im Prototyp-Band
umstellen (FCG Frankfurt als Standard, dazu Varianten und freie Hex-Werte).

## Das Wiki

Nachschlagen statt nachfragen - und zwar getrennt nach den drei Sichten der
Startseite. Wer dort **Staff** gewaehlt hat, landet im Wiki nicht wieder bei den
Gastartikeln: beide Seiten teilen sich denselben Speicherschluessel.

| Sicht | Artikel | Kategorien |
|---|---|---|
| Gast | 7 | Erster Besuch, Verstehen |
| Mitglied | 8 | Dazugehoeren, Mitarbeiten, Hilfe, Praktisches |
| Leader | 10 | Verantwortung, Ablaeufe, Praktisches |

Ein Artikel kann zu mehreren Sichten gehoeren - "Raeume buchen" betrifft
Mitglieder wie Mitarbeitende. Sichtbar ist er trotzdem immer nur in der
gewaehlten Sicht, sonst waere der Nutzen der Trennung dahin. Die Suche haelt
sich daran und meldet Treffer in anderen Sichten nur als Zeile zum Anklicken.

### Geprueft und Entwurf

Was sich auf fcg-frankfurt.de nachlesen laesst - Zeiten, Adresse, Angebote,
Bankverbindung - ist **geprueft**. Alles, was interne Ablaeufe beschreibt, die
sich von aussen nicht nachpruefen lassen, ist als **Entwurf** gekennzeichnet:
im Artikel, in der Liste und als Zaehler ueber der Uebersicht.

Das ist kein Schoenheitsfehler, sondern Absicht. Ein Wiki, das erfundene
Dienstwege als Tatsachen ausgibt, richtet mehr Schaden an als eines, das seine
Luecken zeigt - und die Entwuerfe sind zugleich die Aufgabenliste fuer die
Leitung. Am dringendsten ist **Notfall im Gottesdienst**: Standort von
Erste-Hilfe-Material und AED, benannte Ersthelfer und der Sammelpunkt muessen
fuer das Gebaeude konkret eingetragen werden, sonst hilft der Artikel im
Ernstfall nicht.

## Passwort vor Mitglied und Leader

**Gast** ist offen. **Mitglied** und **Leader** fragen beim Umschalten nach einem
Passwort; erst danach wechselt die Sicht. Das gilt auf der Startseite und im
Wiki gleichermassen, weil beide denselben Umschalter benutzen. Einmal
freigeschaltet bleibt es auf dem Geraet gemerkt - darunter steht ein sichtbarer
Weg zurueck ("wieder sperren"), damit ein geliehenes Handy nicht offen bleibt.

Im Quelltext stehen nur die SHA-256-Werte, nicht die Passwoerter. Eine
gespeicherte Rolle ohne passende Freischaltung faellt auf Gast zurueck - wer den
`localStorage`-Eintrag von Hand setzt, kommt darueber nicht hinein.

### Was dieser Schutz nicht ist

Eine Tuer, kein Tresor. Die Pruefung laeuft im Browser, also auf dem Geraet
dessen, der sie ueberwinden will:

- Wer die Entwicklerwerkzeuge oeffnet, kann die Freischaltung selbst setzen.
- Die Hashes sind im Bundle sichtbar und lassen sich durchprobieren.
- Wer das Passwort einmal hat, gibt es weiter - eine Sperre ohne Konten kennt
  keinen Einzelentzug.

Sie haelt Neugierige von Seiten fern, die sie nichts angehen. Sie schuetzt keine
Daten. Alles wirklich Vertrauliche - Mitgliederlisten, Seelsorge, Personelles -
gehoert hinter eine Anmeldung mit Serverpruefung; in dieser Gemeinde am ehesten
ueber ChurchTools, wofuer unter `server/` bereits die Anbindung vorbereitet ist.

### Nebenbei behoben

`usePersistentState` hielt pro Aufrufstelle eigenen State: Schrieb eine
Komponente, sah die andere weiter ihren alten Wert, bis die Seite neu lud. Die
Freischaltung ist zuerst genau daran gescheitert - der Umschalter schaltete
frei, die Rollenpruefung sah es nicht und setzte sofort auf Gast zurueck. Jetzt
teilen sich alle Aufrufstellen desselben Schluessels einen Wert.

## Kein Bereich "Ich", keine untere Leiste

Der persoenliche Bereich ist entfallen, und damit die untere Navigationsleiste:
sie haette nur noch auf die Startseite gezeigt. Die Startseite ist jetzt der
einzige Einstieg. Alte Adressen wie `#/profil` landen ueber die Sammelroute
dort, statt ins Leere zu laufen.

Was der Bereich gezeigt hat, war groesstenteils eine Zusammenfassung: Favoriten,
spaeter hoeren, Anmeldungen und Notizen gibt es weiterhin, gesetzt werden sie
dort, wo sie entstehen - auf der Predigt- und der Terminseite.

Zwei Dinge gab es aber nur dort, und die sind mitgezogen statt weggefallen:

- **"Meine Daten auf diesem Geraet loeschen"** steht jetzt auf der
  Datenschutzseite (`#/datenschutz`), wo ohnehin erklaert wird, was lokal
  gespeichert wird. Die einzige Loeschmoeglichkeit der App verschwinden zu
  lassen waere ein Rueckschritt gewesen, den niemand bestellt hat.
- **Der Anzeigename** steht jetzt im Teambereich, direkt unter dem
  Nachrichtenfeld - an der einzigen Stelle, an der er fuer andere sichtbar
  wird. Vorher verwies der Text dort auf den Bereich "Ich"; dieser Verweis
  waere ins Leere gegangen.

Der uebrige Profilzustand - Interessen, Push-Themen, Einsteiger-Schalter,
KI-Einwilligung - ist entfallen. Ohne die Seite setzt ihn nichts mehr und liest
ihn nichts mehr; stehen zu lassen haette toten Zustand ergeben. Geblieben ist
der Name, weil Teamchat und Gebetsanliegen ihn als Autor verwenden.

Mit aufgeraeumt: die CSS-Variable fuer die Leistenhoehe samt der drei Stellen,
die Platz fuer sie freihielten, und `.verse-sheet` - ein Rest des laengst
entfernten Bibelteils.

## Behobener Fehler: leere Unterseite

Zwei Ursachen, beide fuehren zu einer weissen Seite.

### 1. Tiefe Adressen liefen ins Leere

GitHub Pages beantwortet jeden unbekannten Pfad mit `404.html`. Die war bisher
eine **Kopie von index.html** - und darin stehen die Skriptverweise relativ:

```html
<script src="./assets/index-abc123.js">
```

Unter `/FCG-App/wiki/kirchendeutsch` loest der Browser das zu
`/FCG-App/wiki/assets/index-abc123.js` auf. Die Datei gibt es dort nicht, das
Skript laedt nie, `<div id="root">` bleibt leer. Nachgestellt: ab der zweiten
Pfadebene drei 404er und eine leere Seite.

`404.html` ist jetzt keine Kopie mehr, sondern erzeugt (`scripts/build-404.mjs`)
und laedt gar keine eigenen Dateien. Sie schreibt den Pfad um:

```
/FCG-App/wiki/kirchendeutsch  ->  /FCG-App/#/wiki/kirchendeutsch
```

Damit sind tiefe Adressen nicht nur nicht mehr leer, sie landen auch am
richtigen Ort statt auf der Startseite. Der `cp`-Schritt im Workflow ist
entfallen - er haette die erzeugte Datei wieder ueberschrieben.

### 2. Seitenaufruf ohne Wartezeit

Der Service Worker holte Seitenaufrufe **immer zuerst aus dem Netz**, damit eine
neue Veroeffentlichung sofort wirkt - aber ohne Abbruch nach oben. Haengt die
Verbindung, schaut der Nutzer so lange auf Weiss, wie das Netz braucht. Ein
Aktualisieren trifft dann oft eine schnellere Verbindung und wirkt wie die
Loesung. Dazu kam: der Rueckfall suchte nur den Schluessel `index`, den es erst
nach einem geglueckten Seitenaufruf gibt - die vorgeladene Huelle wurde nie
benutzt.

Jetzt wartet ein Seitenaufruf **drei Sekunden** auf das Netz und liefert danach
die gespeicherte Huelle; die Antwort aus dem Netz laeuft weiter und frischt den
Stand fuer das naechste Mal auf. Der Rueckfall nimmt die vorgeladene Huelle,
wenn es noch keinen gespeicherten Seitenstand gibt.

Nachgestellt mit einem Server, der 15 Sekunden braucht: vorher 15 Sekunden
weiss, jetzt nach **3,1 Sekunden** sichtbar.

## Wenn die Seite doch leer bleibt

Eine weisse Seite sieht bei jeder Ursache gleich aus - veraltetes HTML, eine
fehlende Datei, ein abgebrochener Download, ein Absturz beim Rendern. Deshalb
gibt es jetzt drei Netze statt weiterer Vermutungen.

**Notstart** (`index.html`). Hat React nach fuenf Sekunden nichts gerendert -
oder scheitert schon das Laden der Programmdatei -, meldet die Seite den
Service Worker ab, leert die Caches und laedt einmal neu. Das ist genau der
Handgriff, den man sonst selbst macht. Ein zweiter Versuch pro Sitzung findet
nicht statt: Danach erscheint eine sichtbare Meldung mit Grund und Adresse
statt Weiss.

**Fehlerfang** (`components/Fehlerfang.tsx`). Stuerzt eine Seite beim Rendern
ab, raeumt React sonst den ganzen Baum ab - die App wird weiss, ohne Hinweis,
und nur ein Neuladen hilft. Jetzt bleibt eine Meldung stehen, mit dem
Fehlertext unter "Technische Angaben". Der Notstart deckt das nicht ab: Der
prueft einmal beim Start, ein Absturz beim Weiterklicken passiert lange danach.

**Protokoll**. Der Notstart zeichnet jeden Seitenwechsel und jeden Fehler in
`sessionStorage` auf. Das ueberlebt ein Aktualisieren im selben Tab - also
genau den Handgriff, mit dem man eine leere Seite loswird. Auf `#/diagnose`
steht danach lesbar, was auf der leeren Seite passiert ist.

**Diagnose** (`#/diagnose`, verlinkt im Fuss der Startseite). Zeigt Baustand,
Programmdatei, Service Worker, Cache-Inhalt, ob der Notstart gegriffen hat und
welche Werte gespeichert sind. Ein Bildschirmfoto genuegt, um eine weisse Seite
einzugrenzen; persoenliche Daten stehen nicht darin. Darunter ein Knopf, der
Service Worker und Caches abraeumt und neu startet.

Die wichtigste Frage beantwortet die erste Zeile: **Baustand**. Stimmt der nicht
mit der letzten Veroeffentlichung ueberein, laeuft auf dem Geraet ein alter
Stand - dann liegt es am Zwischenspeicher und nicht an der App.

### Kopfzeile ohne backdrop-filter

`.topbar` hatte `backdrop-filter: blur(12px)` auf einem `position: relative`
Element - dahinter scrollt nichts, die Weichzeichnung war also folgenlos
schoen. Erzwungen hat sie aber eine eigene Compositing-Ebene, und die ist auf
Android Chrome eine bekannte Quelle fuer Inhalte, die schlicht nicht gezeichnet
werden: Die Seite bleibt leer, bis irgendetwas ein Neuzeichnen ausloest.

Dazu passt die auffaelligste Beobachtung aus dem Fehlerbericht: Ausgerechnet
die **Startseite** funktioniert - sie ist die einzige Seite **ohne** Kopfzeile.
Die Kopfzeile ist jetzt undurchsichtig und ohne Filter; sichtbar aendert sich
nichts.

### Schriften sind kein Notfall

Der Notstart reagierte anfangs auf jede fehlgeschlagene Datei - auch auf das
Stylesheet von Google Fonts. Das ist absichtlich unkritisch eingebunden: faellt
es aus, greift der Ersatz-Stack. In einem langsamen Mobilnetz haette die App
sich deswegen grundlos neu geladen und damit genau den Fehler erzeugt, den sie
beheben soll. Jetzt loest nur die eigene Programmdatei den Notstart aus.

### Chrome und die Scrollposition

Der Fehlerbericht enthielt den entscheidenden Hinweis: **Chrome ja, Samsung
Internet nein.** Beide sind Chromium - der Unterschied liegt also in etwas, das
Chrome tut und Samsung Internet nicht. Zwei Mechanismen kommen dafuer in Frage,
und beide verschieben die Scrollposition:

1. **`history.scrollRestoration`** steht standardmaessig auf `auto`. Bei einem
   Hash-Router ist jeder Klick ein History-Eintrag, und Chrome stellt dafuer
   eine Scrollposition wieder her - auch wenn die neue Seite kuerzer ist als die
   alte. Man steht dann unterhalb des Inhalts und sieht nichts. Ein
   Aktualisieren setzt die Position zurueck, und "auf einmal" ist alles da.
   Jetzt auf `manual`.

2. **Scroll-Anchoring.** Chrome verschiebt die Position von sich aus, wenn sich
   Inhalt oberhalb des Bildausschnitts in der Groesse aendert - gedacht fuer
   nachladende Werbung. Beim Seitenwechsel wird hier aber der ganze Inhalt
   ersetzt, und dann arbeitet die Hilfe gegen uns. Jetzt `overflow-anchor: none`
   auf `.app`.

Dazu laeuft die Rueckstellung nach oben in `useLayoutEffect` statt `useEffect` -
also **vor** dem Zeichnen, nicht danach - mit einem zweiten Anlauf im naechsten
Bild, falls Chrome seine Wiederherstellung erst nach dem Layout durchsetzt.

Das Protokoll schreibt bei jedem Seitenwechsel `root`, `hoehe`, `scrollY` und
`fenster` mit. Damit ist die Frage, die von aussen nicht zu beantworten war,
eindeutig belegbar: Ist nichts gerendert (`root=0`), oder ist gerendert und man
sieht es nur nicht (`scrollY` gross, `hoehe` klein)?

## Zugang beschraenken

Der wichtigste Satz zuerst: **GitHub Pages laesst sich in den Tarifen Free und
Pro nicht privat schalten.** Auch bei einem privaten Repository bleibt die
veroeffentlichte Seite oeffentlich erreichbar - privates Pages gibt es nur in
GitHub Enterprise Cloud. Wer den Zugang wirklich beschraenken will, muss
entweder nicht veroeffentlichen oder woanders veroeffentlichen.

### Was nicht schuetzt

| Maßnahme | Warum sie nicht genuegt |
|---|---|
| Repository auf privat | Die Pages-Seite bleibt oeffentlich |
| Passwortsperre in der App | Prueft im Browser, also auf dem Geraet des Gegenuebers |
| `robots.txt` / `noindex` | Bittet Suchmaschinen um Zurueckhaltung, sperrt niemanden aus |
| Unbekannte Adresse | Hostnamen stehen in den oeffentlichen Zertifikatsprotokollen |

### Nur fuer mich, gar nicht oeffentlich

Der ehrlichste Weg, kostenlos und sofort:

1. Repository auf privat stellen: *Settings → General → Danger Zone → Change
   repository visibility*.
2. Pages abschalten: *Settings → Pages → Build and deployment → Source: None*.
3. Lokal entwickeln: `npm run dev`. Fuer das eigene Handy im selben WLAN
   `npm run dev -- --host`, dann die angezeigte Netzwerkadresse aufrufen.

### Eigene Adresse mit echter Anmeldung

Wenn die App erreichbar bleiben soll, aber nur fuer benannte Personen:
**Cloudflare Pages** mit **Cloudflare Access** (Zero Trust). Kostenlos bis 50
Nutzer, Anmeldung per E-Mail-Einmalcode oder Google-Konto. Entscheidend ist:
Die Pruefung passiert **vor** der Auslieferung, nicht in der App - wer nicht
freigegeben ist, bekommt die Seite nie zu sehen. Das ist echte Zugangskontrolle
im Sinne von Art. 32 DSGVO, im Unterschied zur Sperre in der App.

Der Build bleibt unveraendert: `npm run build`, Ausgabeordner `dist`.

### Nach dem Zurueckziehen

Was einmal oeffentlich war, bleibt es teilweise: Suchmaschinen-Zwischenspeicher,
Archivdienste und etwaige Forks. Nach dem Abschalten pruefen, was noch
auffindbar ist, und gegebenenfalls Entfernung beantragen.

Weil das Repository oeffentlich war, gelten ausserdem die beiden Rollen-
Passwoerter als verbrannt - ihre SHA-256-Werte stehen im Verlauf. Vor einem
echten Betrieb neu setzen.
