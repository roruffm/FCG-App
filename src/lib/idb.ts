/**
 * Kleiner Zugriff auf IndexedDB fuer Team-Dokumente.
 *
 * Dateien gehoeren nicht in den localStorage: Der fasst nur wenige Megabyte
 * und nur Text. IndexedDB nimmt die Datei selbst auf, samt Typ und Groesse.
 *
 * Alles liegt im Browser des jeweiligen Geraets. Fuer echten Austausch im
 * Team braucht die App einen Server - die Schnittstelle hier ist bewusst so
 * schmal, dass sich dann nur diese Datei aendert.
 */

const DB_NAME = 'fcg-app'
const STORE = 'team-dokumente'

export type StoredDoc = {
  id: string
  teamId: string
  name: string
  type: string
  size: number
  addedAt: string
  addedBy: string
  blob: Blob
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' })
        store.createIndex('teamId', 'teamId')
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB nicht verfügbar'))
  })
}

function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode)
        const request = action(tx.objectStore(STORE))
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error ?? new Error('Zugriff fehlgeschlagen'))
        tx.oncomplete = () => db.close()
      })
  )
}

export function putDoc(doc: StoredDoc): Promise<unknown> {
  return run('readwrite', (store) => store.put(doc))
}

export function deleteDoc(id: string): Promise<unknown> {
  return run('readwrite', (store) => store.delete(id))
}

export function listDocs(teamId: string): Promise<StoredDoc[]> {
  return run<StoredDoc[]>('readonly', (store) => store.index('teamId').getAll(teamId)).then((docs) =>
    docs.sort((a, b) => b.addedAt.localeCompare(a.addedAt))
  )
}

export function getDoc(id: string): Promise<StoredDoc | undefined> {
  return run<StoredDoc | undefined>('readonly', (store) => store.get(id))
}

/** Wie viel Platz der Browser dieser Seite zugesteht und was schon belegt ist. */
export async function storageInfo(): Promise<{ used: number; quota: number } | null> {
  if (!navigator.storage?.estimate) return null
  const { usage = 0, quota = 0 } = await navigator.storage.estimate()
  return { used: usage, quota }
}
