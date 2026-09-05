/**
 * Setzt Version und Dateiliste in den Service Worker ein.
 *
 * Die Version leitet sich aus den gebauten Dateinamen ab: Aendert sich der
 * Code, aendert sich der Hash im Dateinamen und damit die Version. Der
 * Browser sieht dann eine neue Fassung des Service Workers, raeumt alte
 * Caches ab und uebernimmt sofort.
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const assets = readdirSync(join(dist, 'assets')).sort()
const version = createHash('sha256').update(assets.join('|')).digest('hex').slice(0, 12)

// Vorgeladen wird nur die Huelle: Startseite und die Dateien des Hauptbundles.
// Bibeltext und Karten kommen erst, wenn sie gebraucht werden.
const entry = assets.filter((f) => /^index-.*\.(js|css)$/.test(f)).map((f) => `./assets/${f}`)
const precache = ['./', './manifest.webmanifest', './fcg-logo.png', ...entry]

const swPath = join(dist, 'sw.js')
const source = readFileSync(swPath, 'utf8')
  .replace('__SW_VERSION__', version)
  .replace('__PRECACHE__', JSON.stringify(precache, null, 2))

writeFileSync(swPath, source)
console.log(`Service Worker: Version ${version}, ${precache.length} Dateien vorgeladen`)
