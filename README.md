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

Am besten in der Geräte-Ansicht der Browser-Entwicklerwerkzeuge (iPhone/Android)
öffnen - die Oberfläche ist mobil gedacht.

---

## Aufbau: Startseite nach Rollen

Umgesetzt aus dem Entwurf **"Start Redesign"** (Claude Design). Gast, Mitglied
und Staff suchen Verschiedenes - statt allen dieselbe Linkwand zu zeigen, waehlt
man oben die Rolle:

| | Gast | Mitglied | Staff |
|---|---|---|---|
| **Aufmacher** | Gottesdienstzeiten und Anfahrt | naechster Termin mit offener Anmeldung | Leitungsdashboard |
| **Hauptliste** | Der erste Schritt | Dein Bereich | Arbeitswege |
| **Unter "Mehr"** | Taeglich, Kennenlernen, Folgen | Taeglich, Gemeinde, Folgen | Leitung, Gemeinde, Fuer mich |

Gleich bleiben fuer alle: Kopf mit Zeiten, der **Kalender** des laufenden
Monats, die sieben **Kanaele** (Website, ChurchTools, YouTube, Instagram,
Spotify, Facebook, Wiki) und der Fuss. Die Rollenwahl bleibt auf dem Geraet
gespeichert - und gilt auch im Wiki, das dieselbe Dreiteilung benutzt.

Zwei Angaben im Aufmacher rechnet die App aus den vorhandenen Daten aus, statt
sie fest einzutragen: der Termin fuer Mitglieder kommt aus `src/data/events.ts`
samt belegten Plaetzen, die Zahl der suchenden Teams aus `src/data/teams.ts`.

Gepflegt wird das in [`src/data/links.ts`](src/data/links.ts) (Rollen, Listen,
Gruppen, Kacheln) und [`src/data/church.ts`](src/data/church.ts) (Adressen).
Eine Kachel ohne Ziel gilt als geplant: Sie wird angezeigt, aber nicht
verlinkt - so steht das Wiki da, bis seine Adresse in `church.web.wiki` steht.

Die untere Navigation ist auf zwei Punkte reduziert: **Start** und **Ich**.
Alles Weitere fuehrt ueber die Startseite.

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
- **Keine verdeckte Profilbildung** - Personalisierung ist im Profil abschaltbar
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
  state.tsx      App-Zustand: Favoriten, Notizen, Anmeldungen, Teams, Profil
  components/    Navigation, Kalender, Kanalsymbole, Predigtkarte, Player, Icons
  data/wiki.ts   Wiki-Artikel je Rolle, mit Status geprueft/entwurf
  routes/        Start, Predigten, Frag, Events, Gruppen, Neu hier, Gebet,
                 Teams, Mitmachen, Kontakt, Profil, Datenschutz, Wiki
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
| Petrol | `#006269` | Hausfarbe: Hero, Buttons, aktive Navigation |
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
| Staff | 10 | Verantwortung, Ablaeufe, Praktisches |

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
