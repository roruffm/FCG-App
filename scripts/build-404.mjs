/**
 * Erzeugt dist/404.html.
 *
 * GitHub Pages beantwortet jeden unbekannten Pfad mit dieser Datei. Bisher war
 * sie eine Kopie von index.html - und genau das ging schief: index.html
 * verweist mit `./assets/...` relativ auf seine Skripte. Unter
 * /FCG-App/wiki/kirchendeutsch loest der Browser das zu
 * /FCG-App/wiki/assets/... auf, findet nichts und zeigt eine leere Seite.
 *
 * Statt einer Kopie steht hier eine winzige Seite ohne eigene Dateien, die den
 * Pfad in eine Hash-Route umschreibt:
 *
 *   /FCG-App/wiki/kirchendeutsch  ->  /FCG-App/#/wiki/kirchendeutsch
 *
 * Wo die App liegt, kann diese Seite nicht erraten - es ist eine Eigenschaft
 * der Veroeffentlichung. Deshalb kommt die Wurzel als APP_BASE aus dem Build;
 * ohne Angabe gilt '/', was fuer eine eigene Domain stimmt. Der Workflow setzt
 * '/FCG-App/'. Die App selbst bleibt davon unberuehrt: sie baut weiter mit
 * `base: './'` und laeuft an jedem Ort.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

let basis = process.env.APP_BASE || '/'
if (!basis.startsWith('/')) basis = '/' + basis
if (!basis.endsWith('/')) basis += '/'

const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FCG Frankfurt App</title>
    <script>
      (function () {
        var ort = window.location
        var wurzel = ${JSON.stringify(basis)}

        var pfad = ort.pathname
        var rest = pfad.indexOf(wurzel) === 0 ? pfad.slice(wurzel.length) : pfad.replace(/^\\//, '')

        // Abschliessender Schraegstrich raus, damit die Route eindeutig bleibt.
        rest = rest.replace(/\\/+$/, '')

        // Eine schon vorhandene Raute ist die genauere Angabe und hat Vorrang.
        var ziel = wurzel + ort.search + (ort.hash || '#/' + rest)

        // replace statt assign: der tote Pfad gehoert nicht in den Verlauf,
        // sonst fuehrt die Zurueck-Taste wieder auf die leere Seite.
        ort.replace(ziel)
      })()
    </script>
  </head>
  <body></body>
</html>
`

writeFileSync(join('dist', '404.html'), html)
console.log(`404.html: tiefe Pfade -> Hash-Route, Wurzel ${basis}`)
