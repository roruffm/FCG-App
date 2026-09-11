/*
 * Offline-Unterstuetzung der FCG App.
 *
 * Version und Dateiliste setzt `scripts/build-sw.mjs` beim Bauen ein - dadurch
 * aendert sich diese Datei bei jedem Build, der Browser erkennt die neue
 * Fassung und die alten Caches werden entfernt.
 *
 * Grundregel: Fuer eine Datei wird niemals etwas anderes ausgeliefert, als
 * angefragt wurde. Eine fehlgeschlagene Anfrage scheitert sichtbar, statt
 * heimlich die Startseite zurueckzugeben - sonst bekommt der Browser HTML,
 * wo er JavaScript oder JSON erwartet, und die Seite bleibt leer.
 */

const VERSION = '__SW_VERSION__'
const SHELL = `fcg-shell-${VERSION}`
const DATA = 'fcg-data-v1'
const PRECACHE = __PRECACHE__

/**
 * Wie lange ein Seitenaufruf auf das Netz wartet, bevor die gespeicherte
 * Huelle ausgeliefert wird. Kurz genug, dass niemand auf Weiss schaut; lang
 * genug, dass ein normales Mobilnetz noch die frische Fassung liefert.
 */
const NAV_TIMEOUT = 3000

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== SHELL && key !== DATA).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  )
})

/** Grosse, unveraenderliche Datenbestaende: Bibeltext, Kontextartikel, Karte. */
function isData(url) {
  return /\/(bibel|kontext|karten)\//.test(url.pathname)
}

/** Dateien mit Inhalts-Hash im Namen - aendern sich nie, nur ihr Name. */
function isAsset(url) {
  return url.pathname.includes('/assets/')
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== self.location.origin) return

  // Seitenaufrufe: zuerst das Netz, am Browser-Cache vorbei - nur so wirkt eine
  // neue Veroeffentlichung sofort. Aber nicht unbegrenzt lange: haengt die
  // Verbindung, bekommt der Nutzer sonst eine weisse Seite, bis das Netz
  // irgendwann antwortet. Nach kurzer Wartezeit liefern wir die gespeicherte
  // Huelle aus; die neue Fassung uebernimmt dann beim naechsten Aufruf.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(SHELL)

        const ausCache = async () => {
          // Erst die zuletzt gesehene Seite, sonst die beim Installieren
          // vorgeladene Huelle. Frueher wurde nur 'index' gesucht - das gibt
          // es aber erst nach einem geglueckten Seitenaufruf, und bis dahin
          // blieb die Seite leer.
          return (await cache.match('index')) ?? (await cache.match('./')) ?? (await cache.match(new URL('./', self.location).href))
        }

        let abbruch
        const netz = fetch(req, { cache: 'no-store', signal: (abbruch = new AbortController()).signal })

        const wartezeit = new Promise((loese) => setTimeout(() => loese('zulangsam'), NAV_TIMEOUT))

        try {
          const ergebnis = await Promise.race([netz, wartezeit])

          if (ergebnis === 'zulangsam') {
            const hit = await ausCache()
            if (hit) {
              // Das Netz weiterlaufen lassen und den Stand auffrischen -
              // abbrechen wuerde die naechste Seite wieder alt aussehen lassen.
              netz.then((res) => res.ok && cache.put('index', res.clone())).catch(() => {})
              return hit
            }
            return await netz
          }

          if (ergebnis.ok) cache.put('index', ergebnis.clone())
          return ergebnis
        } catch (fehler) {
          abbruch.abort()
          const hit = await ausCache()
          return hit ?? Response.error()
        }
      })()
    )
    return
  }

  // Gehashte Dateien: aus dem Cache, sonst laden und merken.
  if (isAsset(url)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ??
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone()
              caches.open(SHELL).then((c) => c.put(req, copy))
            }
            return res
          })
      )
    )
    return
  }

  // Datenbestaende: aus dem Cache antworten und im Hintergrund auffrischen.
  if (isData(url)) {
    event.respondWith(
      caches.open(DATA).then(async (cache) => {
        const hit = await cache.match(req)
        const network = fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone())
            return res
          })
          .catch((err) => {
            if (hit) return hit
            throw err
          })
        return hit ?? network
      })
    )
    return
  }

  // Alles Uebrige: Netz, notfalls der eigene zwischengespeicherte Stand.
  // Kein Ersatz durch die Startseite - eine fehlende Datei bleibt fehlend.
  event.respondWith(
    fetch(req).catch(() => caches.match(req).then((hit) => hit ?? Response.error()))
  )
})
