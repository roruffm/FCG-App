/**
 * Prueft die Annahmen aus `churchtools-mapping.mjs` gegen eine echte Instanz.
 *
 * Aufruf:
 *   CT_BASE=https://<instanz>.church.tools CT_TOKEN=... node server/check-churchtools.mjs
 *
 * Es wird ausschliesslich gelesen. Das Skript sagt fuer jeden Pfad, ob er
 * antwortet und welche Felder ankommen - damit laesst sich die Zuordnung in
 * wenigen Minuten bestaetigen oder korrigieren.
 */
import { mapping } from './churchtools-mapping.mjs'

const CT_BASE = (process.env.CT_BASE ?? '').replace(/\/$/, '')
const CT_TOKEN = process.env.CT_TOKEN ?? ''

if (!CT_BASE || !CT_TOKEN) {
  console.error('Bitte CT_BASE und CT_TOKEN setzen.')
  process.exit(1)
}

async function pruefe(name, pfad) {
  try {
    const res = await fetch(`${CT_BASE}${pfad}`, {
      headers: { Accept: 'application/json', ...mapping.auth.header(CT_TOKEN) },
    })
    if (!res.ok) {
      console.log(`✗ ${name.padEnd(22)} ${pfad}  ->  ${res.status} ${res.statusText}`)
      return null
    }
    const daten = await res.json()
    const erste = Array.isArray(daten.data) ? daten.data[0] : daten.data
    console.log(`✓ ${name.padEnd(22)} ${pfad}`)
    if (erste) console.log(`    Felder: ${Object.keys(erste).slice(0, 12).join(', ')}`)
    return daten
  } catch (fehler) {
    console.log(`✗ ${name.padEnd(22)} ${pfad}  ->  ${fehler.message}`)
    return null
  }
}

console.log(`Prüfe ${CT_BASE}\n`)
const wer = await pruefe('Anmeldung', mapping.auth.whoami)
if (!wer) {
  console.log('\nOhne gültige Anmeldung sind die übrigen Prüfungen sinnlos. Token prüfen.')
  process.exit(1)
}

const gruppen = await pruefe('Gruppen', mapping.groups.list)
const erste = gruppen?.data?.[0]
if (erste) {
  console.log(`\n  Beispielgruppe: ${erste.id} "${erste.name}" (groupTypeId ${erste.information?.groupTypeId})`)
  await pruefe('Mitglieder', mapping.groups.members(erste.id))
  await pruefe('Dateien', mapping.files.list(erste.id))
  await pruefe('Beiträge', mapping.posts.list(erste.id))

  const typen = new Map()
  for (const g of gruppen.data) {
    const t = g.information?.groupTypeId
    typen.set(t, (typen.get(t) ?? 0) + 1)
  }
  console.log('\n  Gruppentypen in dieser Instanz (Id: Anzahl):')
  for (const [typ, anzahl] of typen) console.log(`    ${typ}: ${anzahl}`)
  console.log(`  In der Zuordnung eingetragen: dienstteamGruppentyp = ${mapping.dienstteamGruppentyp}`)
}

console.log('\nAbweichungen bitte in server/churchtools-mapping.mjs korrigieren.')
