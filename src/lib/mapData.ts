/**
 * Kartengrundlage: Kuestenlinien und Seen, zugeschnitten auf die Welt der
 * Bibel. Datensatz aus dem Schwesterprojekt (Quelle: Natural Earth, gemeinfrei).
 * Wird einmalig nachgeladen, nicht in den Hauptbundle gepackt.
 */

export interface MapRegions {
  box: { west: number; east: number; south: number; north: number }
  land: [number, number][][]
  seen: [number, number][][]
}

let regionsPromise: Promise<MapRegions> | null = null

export function loadRegions(): Promise<MapRegions> {
  if (!regionsPromise) {
    regionsPromise = fetch(`${import.meta.env.BASE_URL}karten/regionen.json`).then((r) => {
      if (!r.ok) throw new Error(`Kartendaten nicht gefunden (${r.status})`)
      return r.json() as Promise<MapRegions>
    })
    regionsPromise.catch(() => {
      regionsPromise = null
    })
  }
  return regionsPromise
}
