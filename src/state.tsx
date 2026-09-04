import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { usePersistentState, useToggleSet } from './lib/storage'
import { seedPrayers } from './data/prayers'
import { applyBrand, defaultBrand } from './lib/branding'
import type { Brand } from './lib/branding'
import type { PrayerRequest } from './data/types'

export type Depth = 'kurz' | 'mittel' | 'tief'

export type Profile = {
  name: string
  isNewHere: boolean
  interests: string[]
  pushTopics: string[]
  aiConsent: boolean
}

const defaultProfile: Profile = {
  name: '',
  isNewHere: false,
  interests: [],
  pushTopics: ['Gottesdienst', 'Jugend'],
  aiConsent: true,
}

type AppState = {
  favorites: ReturnType<typeof useToggleSet>
  listenLater: ReturnType<typeof useToggleSet>
  registrations: ReturnType<typeof useToggleSet>
  savedVerses: ReturnType<typeof useToggleSet>
  doneDevotions: ReturnType<typeof useToggleSet>
  prayedFor: ReturnType<typeof useToggleSet>
  notes: Record<string, string>
  setNote: (sermonId: string, text: string) => void
  progress: Record<string, number>
  setProgress: (sermonId: string, seconds: number) => void
  depth: Depth
  setDepth: (d: Depth) => void
  profile: Profile
  updateProfile: (patch: Partial<Profile>) => void
  prayers: PrayerRequest[]
  addPrayer: (p: Omit<PrayerRequest, 'id' | 'createdAt' | 'prayerCount'>) => void
  prayFor: (id: string) => void
  streak: number
  markDevotionDone: (id: string) => void
  brand: Brand
  setBrand: (b: Brand) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const favorites = useToggleSet('favorites')
  const listenLater = useToggleSet('listen-later')
  const registrations = useToggleSet('registrations')
  const savedVerses = useToggleSet('saved-verses')
  const doneDevotions = useToggleSet('done-devotions')
  const prayedFor = useToggleSet('prayed-for')

  const [notes, setNotes] = usePersistentState<Record<string, string>>('notes', {})
  const [progress, setProgressMap] = usePersistentState<Record<string, number>>('progress', {})
  const [depth, setDepth] = usePersistentState<Depth>('depth', 'kurz')
  const [profile, setProfile] = usePersistentState<Profile>('profile', defaultProfile)
  const [prayers, setPrayers] = usePersistentState<PrayerRequest[]>('prayers', seedPrayers)
  const [streakDays, setStreakDays] = usePersistentState<string[]>('streak-days', [])
  const [brand, setBrand] = usePersistentState<Brand>('brand', defaultBrand)

  useEffect(() => applyBrand(brand), [brand])

  const setNote = useCallback(
    (sermonId: string, text: string) => setNotes((prev) => ({ ...prev, [sermonId]: text })),
    [setNotes]
  )

  const setProgress = useCallback(
    (sermonId: string, seconds: number) => setProgressMap((prev) => ({ ...prev, [sermonId]: seconds })),
    [setProgressMap]
  )

  const updateProfile = useCallback(
    (patch: Partial<Profile>) => setProfile((prev) => ({ ...prev, ...patch })),
    [setProfile]
  )

  const addPrayer = useCallback<AppState['addPrayer']>(
    (p) =>
      setPrayers((prev) => [
        { ...p, id: `pr-${Date.now()}`, createdAt: new Date().toISOString(), prayerCount: 0 },
        ...prev,
      ]),
    [setPrayers]
  )

  const prayFor = useCallback(
    (id: string) => {
      if (prayedFor.has(id)) return
      prayedFor.add(id)
      setPrayers((prev) => prev.map((p) => (p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p)))
    },
    [prayedFor, setPrayers]
  )

  const markDevotionDone = useCallback(
    (id: string) => {
      doneDevotions.add(id)
      const today = new Date().toISOString().slice(0, 10)
      setStreakDays((prev) => (prev.includes(today) ? prev : [...prev, today].slice(-90)))
    },
    [doneDevotions, setStreakDays]
  )

  /** Aufeinanderfolgende Tage mit Bibelimpuls, vom heutigen Tag rückwärts gezählt. */
  const streak = useMemo(() => {
    const days = new Set(streakDays)
    let count = 0
    const cursor = new Date()
    if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1)
    while (days.has(cursor.toISOString().slice(0, 10))) {
      count += 1
      cursor.setDate(cursor.getDate() - 1)
    }
    return count
  }, [streakDays])

  const value: AppState = {
    favorites,
    listenLater,
    registrations,
    savedVerses,
    doneDevotions,
    prayedFor,
    notes,
    setNote,
    progress,
    setProgress,
    depth,
    setDepth,
    profile,
    updateProfile,
    prayers,
    addPrayer,
    prayFor,
    streak,
    markDevotionDone,
    brand,
    setBrand,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp muss innerhalb von <AppProvider> verwendet werden')
  return ctx
}
