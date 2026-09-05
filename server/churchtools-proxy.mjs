/**
 * Kleiner Dienst zwischen App und ChurchTools.
 *
 * Warum es ihn braucht:
 *   - Zugangsdaten gehoeren nicht in den Browser. Hier liegt das Token in
 *     einer Umgebungsvariablen und verlaesst den Server nie.
 *   - ChurchTools beantwortet Anfragen fremder Adressen nicht ohne Weiteres;
 *     der Dienst spricht serverseitig und setzt selbst die noetigen Kopfzeilen.
 *   - Die App bekommt nur, was sie braucht: Teams, Beitraege, Dateien.
 *
 * Start:  CT_BASE=https://<instanz>.church.tools CT_TOKEN=... APP_ORIGIN=https://roruffm.github.io \
 *         node server/churchtools-proxy.mjs
 */
import { createServer } from 'node:http'
import { mapping } from './churchtools-mapping.mjs'

const CT_BASE = (process.env.CT_BASE ?? '').replace(/\/$/, '')
const CT_TOKEN = process.env.CT_TOKEN ?? ''
const APP_ORIGIN = process.env.APP_ORIGIN ?? 'https://roruffm.github.io'
const PORT = Number(process.env.PORT ?? 8787)
/** Schreibzugriff bleibt aus, bis er ausdruecklich erlaubt wird. */
const SCHREIBEN = process.env.CT_SCHREIBEN === 'ja'

if (!CT_BASE || !CT_TOKEN) {
  console.error('CT_BASE und CT_TOKEN muessen gesetzt sein. Siehe server/ANLEITUNG.md')
  process.exit(1)
}

async function ct(pfad, init = {}) {
  const res = await fetch(`${CT_BASE}${pfad}`, {
    ...init,
    headers: { Accept: 'application/json', ...mapping.auth.header(CT_TOKEN), ...(init.headers ?? {}) },
  })
  if (!res.ok) throw Object.assign(new Error(`ChurchTools: ${res.status} ${res.statusText}`), { status: res.status })
  return res
}

const json = (res, code, daten) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(daten))
}

function cors(res, origin) {
  // Nur die eigene App darf zugreifen - und sie darf Anmeldedaten mitschicken.
  if (origin === APP_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Datei-Name')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  }
}

/** Beitrag aus ChurchTools in die Form bringen, die die App erwartet. */
function alsNachricht(post) {
  return {
    id: String(post.id),
    author: post.author?.title ?? post.person?.domainAttributes?.firstName ?? 'Unbekannt',
    text: post.content ?? post.text ?? '',
    at: post.publicationDate ?? post.meta?.modifiedDate ?? new Date().toISOString(),
  }
}

function alsDatei(datei) {
  return {
    id: String(datei.id),
    name: datei.name ?? datei.filename ?? 'Datei',
    type: datei.fileType ?? datei.type ?? 'Datei',
    size: Number(datei.filesize ?? datei.size ?? 0),
    addedAt: datei.meta?.createdDate ?? new Date().toISOString(),
    addedBy: datei.meta?.createdPerson?.title ?? 'Gemeinde',
  }
}

const server = createServer(async (req, res) => {
  cors(res, req.headers.origin)
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  const url = new URL(req.url, 'http://x')
  const teile = url.pathname.split('/').filter(Boolean)

  try {
    // GET /teams
    if (req.method === 'GET' && teile[0] === 'teams' && teile.length === 1) {
      const daten = await (await ct(mapping.groups.list)).json()
      const gruppen = (daten.data ?? []).filter(
        (g) => !mapping.dienstteamGruppentyp || g.information?.groupTypeId === mapping.dienstteamGruppentyp
      )
      return json(res, 200, gruppen.map((g) => ({ id: String(g.id), name: g.name, area: g.information?.groupCategoryId ?? null })))
    }

    // GET /teams/:id/messages
    if (req.method === 'GET' && teile[0] === 'teams' && teile[2] === 'messages' && teile.length === 3) {
      const daten = await (await ct(mapping.posts.list(teile[1]))).json()
      return json(res, 200, (daten.data ?? []).map(alsNachricht))
    }

    // POST /teams/:id/messages
    if (req.method === 'POST' && teile[0] === 'teams' && teile[2] === 'messages') {
      if (!SCHREIBEN) return json(res, 403, { error: 'Schreibzugriff ist nicht freigegeben (CT_SCHREIBEN)' })
      const koerper = await new Promise((r) => {
        let d = ''
        req.on('data', (c) => (d += c))
        req.on('end', () => r(d))
      })
      const { text } = JSON.parse(koerper || '{}')
      await ct(mapping.posts.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: Number(teile[1]), content: text, visibility: 'group' }),
      })
      return json(res, 201, { ok: true })
    }

    // GET /teams/:id/files
    if (req.method === 'GET' && teile[0] === 'teams' && teile[2] === 'files' && teile.length === 3) {
      const daten = await (await ct(mapping.files.list(teile[1]))).json()
      return json(res, 200, (daten.data ?? []).map(alsDatei))
    }

    // GET /teams/:id/files/:fileId  -> Datei durchreichen
    if (req.method === 'GET' && teile[0] === 'teams' && teile[2] === 'files' && teile.length === 4) {
      const antwort = await ct(mapping.files.one(teile[3]))
      const name = antwort.headers.get('content-disposition')?.match(/filename="?([^"]+)"?/)?.[1] ?? 'datei'
      res.writeHead(200, {
        'Content-Type': antwort.headers.get('content-type') ?? 'application/octet-stream',
        'X-Datei-Name': encodeURIComponent(name),
      })
      const puffer = Buffer.from(await antwort.arrayBuffer())
      return res.end(puffer)
    }

    // POST /teams/:id/files  (roher Datenstrom, Name im Kopf)
    if (req.method === 'POST' && teile[0] === 'teams' && teile[2] === 'files') {
      if (!SCHREIBEN) return json(res, 403, { error: 'Schreibzugriff ist nicht freigegeben (CT_SCHREIBEN)' })
      const name = decodeURIComponent(req.headers['x-datei-name'] ?? 'datei')
      const stuecke = []
      for await (const stueck of req) stuecke.push(stueck)
      const inhalt = Buffer.concat(stuecke)

      // ChurchTools erwartet multipart/form-data - hier von Hand gebaut,
      // damit der Dienst ohne Zusatzpakete auskommt.
      const grenze = `----fcg${Date.now()}`
      const kopf = Buffer.from(
        `--${grenze}\r\nContent-Disposition: form-data; name="files[]"; filename="${name}"\r\n` +
          `Content-Type: ${req.headers['content-type'] ?? 'application/octet-stream'}\r\n\r\n`
      )
      const fuss = Buffer.from(`\r\n--${grenze}--\r\n`)
      await ct(mapping.files.upload(teile[1]), {
        method: 'POST',
        headers: { 'Content-Type': `multipart/form-data; boundary=${grenze}` },
        body: Buffer.concat([kopf, inhalt, fuss]),
      })
      return json(res, 201, { ok: true })
    }

    // DELETE /teams/:id/files/:fileId
    if (req.method === 'DELETE' && teile[0] === 'teams' && teile[2] === 'files' && teile.length === 4) {
      if (!SCHREIBEN) return json(res, 403, { error: 'Schreibzugriff ist nicht freigegeben (CT_SCHREIBEN)' })
      await ct(mapping.files.remove(teile[3]), { method: 'DELETE' })
      return json(res, 200, { ok: true })
    }

    json(res, 404, { error: 'Unbekannter Pfad' })
  } catch (fehler) {
    console.error(fehler)
    json(res, fehler.status ?? 502, { error: String(fehler.message ?? fehler) })
  }
})

server.listen(PORT, () => {
  console.log(`ChurchTools-Dienst laeuft auf Port ${PORT}`)
  console.log(`  Instanz:        ${CT_BASE}`)
  console.log(`  Erlaubte App:   ${APP_ORIGIN}`)
  console.log(`  Schreibzugriff: ${SCHREIBEN ? 'ja' : 'nein (nur lesen)'}`)
})
