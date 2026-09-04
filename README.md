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

## Aufbau

```
src/
  data/          Demo-Inhalte (Predigten inkl. Transkript, Impulse, Events, Gruppen, Gebete)
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

Die Oberflaeche liest alle Farben aus CSS-Variablen (`--primary`, `--accent-*`).
Ueber den Button **Design** im Prototyp-Band laesst sich das Farbschema live
umstellen - fuenf Vorlagen oder frei gewaehlte Hex-Werte, gespeichert pro Geraet.

Die verbindlichen Markenwerte der FCG Frankfurt konnten in dieser Umgebung nicht
ausgelesen werden: `fcg-frankfurt.de` ist durch den Netzwerk-Filter gesperrt
(`EGRESS_BLOCKED`). Sobald Hex-Codes, Hausschrift und Logo (am besten als SVG)
vorliegen, werden sie in `src/lib/branding.ts` als Standard hinterlegt und das
Logo ersetzt das Platzhalter-Icon in `public/`.
