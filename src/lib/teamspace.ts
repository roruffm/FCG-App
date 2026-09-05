import { useCallback, useEffect, useMemo, useState } from 'react'
import { teamRepo, type ChatMessage, type DocMeta, type TeamRepo } from './teamRepo'

/**
 * Teambereiche: Nachrichten und Dokumente je Team.
 *
 * Die Oberflaeche fragt hier, nicht am Speicher. Wo die Daten liegen,
 * entscheidet `teamRepo()` - heute das Geraet, mit hinterlegtem Dienst
 * ChurchTools.
 */

export type { ChatMessage, DocMeta }

export function useRepo(): TeamRepo {
  return useMemo(() => teamRepo(), [])
}

export function useTeamChat(teamId: string, author: string) {
  const repo = useRepo()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => {
    // Ohne Schluessel gibt es nichts zu holen - etwa wenn einem Team noch
    // keine ChurchTools-Gruppe zugeordnet ist.
    if (!teamId) {
      setMessages([])
      return
    }
    repo
      .listMessages(teamId)
      .then((list) => {
        setMessages(list)
        setError(null)
      })
      .catch((e: Error) => setError(e.message))
  }, [repo, teamId])

  useEffect(refresh, [refresh])

  const send = useCallback(
    (text: string) => {
      if (!text.trim()) return
      repo
        .sendMessage(teamId, text, author)
        .then(refresh)
        .catch((e: Error) => setError(e.message))
    },
    [author, refresh, repo, teamId]
  )

  const remove = useCallback(
    (id: string) => {
      repo
        .removeMessage(teamId, id)
        .then(refresh)
        .catch((e: Error) => setError(e.message))
    },
    [refresh, repo, teamId]
  )

  return { messages, send, remove, error, source: repo.source, quelle: repo.label }
}

export function useTeamDocs(teamId: string, author: string) {
  const repo = useRepo()
  const [docs, setDocs] = useState<DocMeta[]>([])
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => {
    if (!teamId) {
      setDocs([])
      return
    }
    repo
      .listDocs(teamId)
      .then((list) => {
        setDocs(list)
        setError(null)
      })
      .catch((e: Error) => setError(e.message))
  }, [repo, teamId])

  useEffect(refresh, [refresh])

  const add = useCallback(
    async (files: FileList | File[]) => {
      try {
        await repo.addDocs(teamId, Array.from(files), author)
        refresh()
      } catch (e) {
        setError((e as Error).message)
      }
    },
    [author, refresh, repo, teamId]
  )

  const remove = useCallback(
    (id: string) => {
      repo
        .removeDoc(teamId, id)
        .then(refresh)
        .catch((e: Error) => setError(e.message))
    },
    [refresh, repo, teamId]
  )

  const load = useCallback((id: string) => repo.loadDoc(teamId, id), [repo, teamId])

  return { docs, error, add, remove, load, refresh, source: repo.source, quelle: repo.label }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
