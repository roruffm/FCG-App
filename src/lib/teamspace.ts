import { useCallback, useEffect, useState } from 'react'
import { usePersistentState } from './storage'
import { deleteDoc, listDocs, putDoc, type StoredDoc } from './idb'

/**
 * Teambereiche: Nachrichten und Dokumente je Team.
 *
 * Beides liegt auf dem Geraet - Nachrichten im localStorage, Dateien in
 * IndexedDB. Sobald ein Server dazukommt, tauschen die beiden Haken hier
 * ihre Quelle; die Oberflaeche bleibt, wie sie ist.
 */

export type ChatMessage = {
  id: string
  author: string
  text: string
  at: string
}

export function useTeamChat(teamId: string, author: string) {
  const [alle, setAlle] = usePersistentState<Record<string, ChatMessage[]>>('team-chats', {})
  const messages = alle[teamId] ?? []

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      const message: ChatMessage = {
        id: `m-${Date.now()}`,
        author: author || 'Ich',
        text: trimmed,
        at: new Date().toISOString(),
      }
      setAlle((prev) => ({ ...prev, [teamId]: [...(prev[teamId] ?? []), message] }))
    },
    [author, setAlle, teamId]
  )

  const remove = useCallback(
    (id: string) =>
      setAlle((prev) => ({ ...prev, [teamId]: (prev[teamId] ?? []).filter((m) => m.id !== id) })),
    [setAlle, teamId]
  )

  return { messages, send, remove }
}

export function useTeamDocs(teamId: string, author: string) {
  const [docs, setDocs] = useState<StoredDoc[]>([])
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => {
    listDocs(teamId)
      .then((list) => {
        setDocs(list)
        setError(null)
      })
      .catch((e: Error) => setError(e.message))
  }, [teamId])

  useEffect(refresh, [refresh])

  const add = useCallback(
    async (files: FileList | File[]) => {
      try {
        for (const file of Array.from(files)) {
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
        refresh()
      } catch (e) {
        setError((e as Error).message)
      }
    },
    [author, refresh, teamId]
  )

  const remove = useCallback(
    (id: string) => {
      void deleteDoc(id).then(refresh)
    },
    [refresh]
  )

  return { docs, error, add, remove, refresh }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
