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
mit Hash-Routen (`/#/bibel/roem/8`). Die Seite läuft dadurch unverändert unter
`/FCG-App/`, unter einer eigenen Domain und auch direkt vom Dateisystem.
Für eine eigene Domain genügt eine Datei `public/CNAME` mit der Domain darin.

Am besten in der Geräte-Ansicht der Browser-Entwicklerwerkzeuge (iPhone/Android)
öffnen - die Oberfläche ist mobil gedacht.

---

## Was drin ist

### Version 1 der Roadmap - vollständig
| Bereich | Umsetzung |
|---|---|
| **Predigtbibliothek** | Archiv mit Volltextsuche, Filter nach Thema, Prediger, Serie und Bibelbuch |
| **Player** | Kapitelmarken, 15s/30s-Sprünge, 1×/1,5×/2×, gespeicherter Hörfortschritt, „weiterhören“ auf der Startseite |
| **Kurzfassung** | Drei Kernaussagen je Predigt, sichtbar als KI-Entwurf gekennzeichnet |
| **Täglicher Bibelimpuls** | Vers des Tages, drei Tiefen (1 Minute / 5 Minuten / Vertiefung), Reflexionsfrage, Gebet, Streak-Zähler |
| **Themenpfade** | Identität, Gebet & Klage, Vertrauen im Sturm, Glaube im Alltag - mit Fortschritt |
| **Events** | Gemeindekalender nach Kategorie, Detailseite, Anmeldung mit Platzzähler |
| **New-here-Modus** | Ablauf, Parken, Kinderprogramm, Kollekte, FAQ, nächste Schritte |
| **Favoriten & später hören** | Persönlicher Bereich mit Anmeldungen, Notizen, gespeicherten Versen |
| **Push-Einstellungen** | Themenauswahl statt Gießkanne (Oberfläche; Versand braucht Backend) |

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
  Der Streak-Zähler zählt gelesene Impulse, nicht Frömmigkeit, und ist nur lokal sichtbar.
- **Keine verdeckte Profilbildung** - Personalisierung ist im Profil abschaltbar
  (`aiConsent`), alle persönlichen Daten liegen im Prototyp ausschließlich lokal und
  lassen sich mit einem Klick löschen.
- **Menschliche Eskalation** - sensible Wege führen zu Kontaktadressen, nicht zu Automatik.
- **KI-Kennzeichnung** - maschinell vorbereitete Inhalte tragen sichtbar das Label
  „KI-Entwurf, redaktionell geprüft“.

Die Seite `/datenschutz` erklärt das für Nutzer in verständlicher Sprache.

---

## Bibelteil - uebernommen aus `roruffm/bible-study`

Der komplette Bibelteil stammt aus dem Schwesterprojekt **„Entgegen - Bibel lesen
und verstehen"**. Uebernommen wurden Datensaetze und Logik, nicht die Oberflaeche:
Die Bedienung ist neu gebaut und folgt dem Design der FCG.

| Uebernommen | Woher | Wo in dieser App |
|---|---|---|
| Bibeltext, 66 Buecher | `public/bibel/luther1912/` | `public/bibel/luther1912/`, je Buch nachgeladen |
| Referenz-Parser („Roem 8,38-39") | `src/lib/reference.ts` | `src/lib/reference.ts`, unveraendert bis auf Importpfade |
| 723 Kontextartikel | `src/content/commentary.ts` (4,9 MB TypeScript) | nach Buch aufgeteilt in `public/kontext/*.json` |
| 50 kuratierte Tagesverse | `src/content/verseOfDay.ts` | `src/data/dailyVerses.ts` |
| 17 Lesepläne | `src/content/readingPlans.ts` | `src/data/readingPlans.ts` |

**Neu in dieser App:**

- **Tab „Bibel"** mit Buchuebersicht, Stellen-Eingabe und Volltextsuche
- **Leseansicht** mit anklickbaren Versen: speichern, teilen, Kontext oeffnen;
  ein Punkt am Vers zeigt an, wo ein Artikel beginnt
- **Kontext & Auslegung** je Kapitel - historische Einordnung, Deutungen mit
  Angabe der Tradition, Querverweise, Woerter des Urtextes
- **Lesepläne** mit Fortschritt pro Geraet
- **Bibelimpuls** zieht jetzt den echten Verstext; „5 Minuten" und „Vertiefung"
  blenden den Kontextartikel ein, wo einer vorliegt
- **Bibelstellen sind ueberall verlinkt** - Predigt-Kernvers, Themenpfade, Querverweise

**Textgrundlage:** Lutherbibel 1912, gemeinfrei (Rohdaten: wldeh/bible-api). Moderne
Uebersetzungen wie *Hoffnung fuer Alle* sind urheberrechtlich geschuetzt und
brauchen eine Lizenz von Biblica/Fontis oder eine Anbindung ueber API.Bible; der
Datensatz laesst sich dann unter `public/bibel/<id>/` ergaenzen, ohne die
Oberflaeche zu aendern. Elberfelder 1905 und KJV liegen im Schwesterprojekt
ebenfalls gemeinfrei vor und koennen als Vergleichstexte nachgezogen werden.

**Noch nicht uebernommen** (im Schwesterprojekt vorhanden): Lexikon mit
Personen und Orten, Karten, Zeitleiste, Evangelien-Synopse, Konkordanz,
Auswendiglern-Bereich und der Verse-Chat mit eigenem Server.

---

## Aufbau

```
src/
  data/          Demo-Inhalte (Predigten inkl. Transkript, Impulse, Events, Gruppen, Gebete)
                 sowie Tagesverse und Lesepläne aus dem Schwesterprojekt
  lib/bible.ts   Bibeltext laden, Kontextartikel, Volltextsuche
  lib/reference.ts  Stellenangaben erkennen ("Roem 8,38-39")
  lib/search.ts  "Frag die Predigten" - Ranking, Zitate, Krisen-Erkennung
  lib/storage.ts localStorage-Persistenz
  state.tsx      App-Zustand: Favoriten, Notizen, Fortschritt, Anmeldungen, Profil
  components/    Navigation, Predigtkarte, Player, Icons
  routes/        Start, Predigten, Frag, Impuls, Events, Gruppen, Neu hier, Gebet, Profil, Datenschutz
public/          Manifest, Icons, Service Worker
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
