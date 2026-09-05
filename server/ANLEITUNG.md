# ChurchTools anbinden

Die App liest Chat und Dateien der Teams heute vom Gerät. Mit dieser Anleitung
kommen sie stattdessen aus ChurchTools - dort, wo Gruppen, Rechte und
Löschfristen ohnehin schon gepflegt werden.

**Wichtig vorab:** Die Zuordnung der API-Pfade in
[`churchtools-mapping.mjs`](churchtools-mapping.mjs) ist **nicht gegen eine
echte Instanz geprüft** - während der Entwicklung war churchtools.de nicht
erreichbar. Schritt 2 prüft sie in zwei Minuten.

---

## Warum ein eigener kleiner Dienst dazwischen?

Die App könnte theoretisch direkt mit ChurchTools sprechen. Sie tut es aus drei
Gründen nicht:

1. **Zugangsdaten gehören nicht in den Browser.** Eine öffentlich erreichbare
   Seite kann kein Geheimnis hüten - jedes Token wäre für alle lesbar.
2. **ChurchTools beantwortet Anfragen fremder Adressen nur eingeschränkt.**
   Der Dienst spricht serverseitig, für ihn gilt diese Einschränkung nicht.
3. **Die App bekommt nur, was sie braucht.** Der Dienst gibt Teams, Beiträge
   und Dateien weiter - nicht die gesamte Gemeindedatenbank.

```
App (GitHub Pages)  ->  eigener Dienst  ->  ChurchTools
   kein Token           Token in ENV        Rechte der Gemeinde
```

---

## Schritt 1: Technischen Zugang anlegen

In ChurchTools eine Person als technischen Zugang anlegen (kein persönliches
Konto einer Mitarbeiterin) und ihr **nur** die Rechte geben, die nötig sind:

- Gruppen sehen (die Dienstteams)
- Beiträge der Gruppe lesen, und nur wenn Schreiben gewünscht ist: schreiben
- Dateien der Gruppe lesen, und nur wenn gewünscht: hochladen und löschen

Dann für diese Person ein **Login-Token** erzeugen
(Person → Einstellungen → Berechtigungen → Login-Token).

## Schritt 2: Zuordnung prüfen

```bash
CT_BASE=https://<instanz>.church.tools CT_TOKEN=<token> node server/check-churchtools.mjs
```

Das Skript liest ausschließlich. Es sagt für jeden Pfad, ob er antwortet,
welche Felder ankommen und welche Gruppentypen es in eurer Instanz gibt.
Abweichungen **nur** in `churchtools-mapping.mjs` korrigieren.

Die Ausgabe nennt auch die Gruppen-Ids. Diese Ids gehören in
`src/data/teams.ts` in das Feld `ctGroupId` des jeweiligen Teams - erst dann
holt die App dessen Daten von ChurchTools.

## Schritt 3: Dienst starten

```bash
CT_BASE=https://<instanz>.church.tools \
CT_TOKEN=<token> \
APP_ORIGIN=https://roruffm.github.io \
CT_SCHREIBEN=nein \
node server/churchtools-proxy.mjs
```

| Variable | Bedeutung |
|---|---|
| `CT_BASE` | Adresse eurer Instanz |
| `CT_TOKEN` | Login-Token des technischen Zugangs |
| `APP_ORIGIN` | Adresse der App; nur von dort werden Anfragen beantwortet |
| `CT_SCHREIBEN` | `ja` erlaubt Senden, Hochladen und Löschen. Standard ist Lesen. |
| `PORT` | Standard 8787 |

Der Dienst braucht **keine zusätzlichen Pakete** - reines Node.

Für den Dauerbetrieb: hinter einem Reverse Proxy mit HTTPS betreiben, etwa auf
demselben Server wie die Gemeindeseite, oder als kleiner Dienst bei einem
Hoster eurer Wahl. Er hält keine Daten, ein Neustart ist folgenlos.

## Schritt 4: App darauf zeigen lassen

Beim Bauen die Adresse des Dienstes setzen:

```bash
VITE_TEAM_API=https://dienst.example.org npm run build
```

In GitHub Actions dafür ein Repository-Secret anlegen und im Workflow
übergeben. Ohne diese Variable bleibt alles beim Gerät - die App läuft
unverändert weiter.

---

## Was noch zu klären ist, bevor das produktiv geht

- **Anmeldung der Nutzer.** Heute sieht jeder jeden Teambereich, weil die App
  niemanden kennt. Mit ChurchTools als Quelle müssen Nutzer sich anmelden,
  sonst zeigt die App Daten, die nicht für sie bestimmt sind. Sinnvoll ist
  ChurchTools als Anmeldedienst - dann gelten dessen Gruppenrechte auch hier.
- **Chat.** ChurchTools' eigener Chat ist ein getrennter Dienst mit eigener
  Anmeldung. Der Weg hier nutzt **Gruppenbeiträge** - gut für Absprachen, kein
  Ersatz für einen Messenger. Ein echter Chat mit Jugendlichen braucht
  Moderation, Meldefunktion und ein Schutzkonzept.
- **Datenschutz.** Auftragsverarbeitung mit ChurchTools, Verzeichnis der
  Verarbeitungstätigkeiten, Löschkonzept für Beiträge und Dateien.
- **Was passiert, wenn der Dienst ausfällt.** Die App zeigt dann eine
  Fehlermeldung im Teambereich. Ein Rückfall auf das Gerät wäre irreführend
  und ist bewusst nicht eingebaut.
