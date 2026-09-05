import { deleteDoc, getDoc, listDocs as listLocalDocs, putDoc } from './idb'
import { readStored, writeStored } from './storage'

/**
 * Woher Teamdaten kommen.
 *
 * Zwei Umsetzungen mit derselben Schnittstelle: das Geraet (heute) und
 * ChurchTools ueber einen kleinen eigenen Dienst (sobald er steht). Die
 * Oberflaeche kennt nur diese Schnittstelle - der Wechsel ist eine
 * Einstellung, keine Umbauaktion.
 */

export type TeamSource = 'geraet' | 'churchtools'

export type ChatMessage = {
  id: string
  author: string
  text: string
  at: string
}

export type DocMeta = {
  id: string
  name: string
  type: string
  size: number
  addedAt: string
  addedBy: string
}

export interface TeamRepo {
  readonly source: TeamSource
  /** Kurze Beschreibung fuer die Oberflaeche. */
  readonly label: string
  listMessages(teamId: string): Promise<ChatMessage[]>
  sendMessage(teamId: string, text: string, author: string): Promise<void>
  removeMessage(teamId: string, id: string): Promise<void>
  listDocs(teamId: string): Promise<DocMeta[]>
  addDocs(teamId: string, files: File[], author: string): Promise<void>
  removeDoc(teamId: string, id: string): Promise<void>
  loadDoc(teamId: string, id: string): Promise<{ blob: Blob; name: string }>
}

/* ------------------------------------------------------------ Auf dem Geraet */

const CHAT_KEY = 'team-chats'

export const localRepo: TeamRepo = {
  source: 'geraet',
  label: 'nur auf diesem Gerät',

  async listMessages(teamId) {
    return readStored<Record<string, ChatMessage[]>>(CHAT_KEY, {})[teamId] ?? []
  },

  async sendMessage(teamId, text, author) {
    const alle = readStored<Record<string, ChatMessage[]>>(CHAT_KEY, {})
    const message: ChatMessage = {
      id: `m-${Date.now()}`,
      author: author || 'Ich',
      text: text.trim(),
      at: new Date().toISOString(),
    }
    writeStored(CHAT_KEY, { ...alle, [teamId]: [...(alle[teamId] ?? []), message] })
  },

  async removeMessage(teamId, id) {
    const alle = readStored<Record<string, ChatMessage[]>>(CHAT_KEY, {})
    writeStored(CHAT_KEY, { ...alle, [teamId]: (alle[teamId] ?? []).filter((m) => m.id !== id) })
  },

  async listDocs(teamId) {
    const docs = await listLocalDocs(teamId)
    return docs.map(({ id, name, type, size, addedAt, addedBy }) => ({
      id,
      name,
      type,
      size,
      addedAt,
      addedBy,
    }))
  },

  async addDocs(teamId, files, author) {
    for (const file of files) {
      await putDoc({
        id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        teamId,
        name: file.name,
        type: file.type || 'Datei',
        size: file.size,
        addedAt: new Date().toISOString(),
        addedBy: author || 'Ich',
        blob: file,
      })
    }
  },

  async removeDoc(_teamId, id) {
    await deleteDoc(id)
  },

  async loadDoc(_teamId, id) {
    const doc = await getDoc(id)
    if (!doc) throw new Error('Datei nicht gefunden')
    return { blob: doc.blob, name: doc.name }
  },
}

/* -------------------------------------------------- Ueber den eigenen Dienst */

/**
 * Spricht **nicht** direkt mit ChurchTools, sondern mit dem kleinen Dienst
 * unter `server/churchtools-proxy.mjs`. Das ist Absicht: Zugangsdaten haben
 * im Browser nichts zu suchen, und ChurchTools erlaubt Anfragen von fremden
 * Adressen ohnehin nur eingeschraenkt.
 */
export function remoteRepo(baseUrl: string): TeamRepo {
  const base = baseUrl.replace(/\/$/, '')

  async function json<T>(pfad: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${base}${pfad}`, { credentials: 'include', ...init })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return (await res.json()) as T
  }

  return {
    source: 'churchtools',
    label: 'ChurchTools',

    listMessages: (teamId) => json<ChatMessage[]>(`/teams/${teamId}/messages`),

    sendMessage: async (teamId, text, author) => {
      await json(`/teams/${teamId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author }),
      })
    },

    removeMessage: async (teamId, id) => {
      await json(`/teams/${teamId}/messages/${id}`, { method: 'DELETE' })
    },

    listDocs: (teamId) => json<DocMeta[]>(`/teams/${teamId}/files`),

    addDocs: async (teamId, files) => {
      for (const file of files) {
        const res = await fetch(`${base}/teams/${teamId}/files`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': file.type || 'application/octet-stream',
            // Dateinamen koennen Umlaute enthalten - im Kopf nur ASCII.
            'X-Datei-Name': encodeURIComponent(file.name),
          },
          body: file,
        })
        if (!res.ok) throw new Error(`Hochladen fehlgeschlagen (${res.status})`)
      }
    },

    removeDoc: async (teamId, id) => {
      await json(`/teams/${teamId}/files/${id}`, { method: 'DELETE' })
    },

    loadDoc: async (teamId, id) => {
      const res = await fetch(`${base}/teams/${teamId}/files/${id}`, { credentials: 'include' })
      if (!res.ok) throw new Error(`Datei nicht abrufbar (${res.status})`)
      const name = decodeURIComponent(res.headers.get('X-Datei-Name') ?? 'datei')
      return { blob: await res.blob(), name }
    },
  }
}

/**
 * Ist eine Dienst-Adresse hinterlegt, laeuft alles darueber - sonst bleibt
 * es beim Geraet. Gesetzt wird sie beim Bauen ueber `VITE_TEAM_API`.
 */
export function teamRepo(): TeamRepo {
  const url = import.meta.env.VITE_TEAM_API
  return url ? remoteRepo(url) : localRepo
}
