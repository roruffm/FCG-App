import { createContext, useCallback, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { usePersistentState, useToggleSet } from './lib/storage'
import { seedPrayers } from './data/prayers'
import { applyBrand, defaultBrand } from './lib/branding'
import type { Brand } from './lib/branding'
import type { PrayerRequest } from './data/types'


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
  myTeams: ReturnType<typeof useToggleSet>
  onboardingDone: ReturnType<typeof useToggleSet>
  prayedFor: ReturnType<typeof useToggleSet>
  notes: Record<string, string>
  setNote: (sermonId: string, text: string) => void
  progress: Record<string, number>
  setProgress: (sermonId: string, seconds: number) => void
  profile: Profile
  updateProfile: (patch: Partial<Profile>) => void
  prayers: PrayerRequest[]
  addPrayer: (p: Omit<PrayerRequest, 'id' | 'createdAt' | 'prayerCount'>) => void
  prayFor: (id: string) => void
  brand: Brand
  setBrand: (b: Brand) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const favorites = useToggleSet('favorites')
  const listenLater = useToggleSet('listen-later')
  const registrations = useToggleSet('registrations')
  const prayedFor = useToggleSet('prayed-for')
  const myTeams = useToggleSet('my-teams')
  const onboardingDone = useToggleSet('onboarding-done')

  const [notes, setNotes] = usePersistentState<Record<string, string>>('notes', {})
  const [progress, setProgressMap] = usePersistentState<Record<string, number>>('progress', {})
  const [profile, setProfile] = usePersistentState<Profile>('profile', defaultProfile)
  const [prayers, setPrayers] = usePersistentState<PrayerRequest[]>('prayers', seedPrayers)
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

  const value: AppState = {
    favorites,
    listenLater,
    registrations,
    myTeams,
    onboardingDone,
    prayedFor,
    notes,
    setNote,
    progress,
    setProgress,
    profile,
    updateProfile,
    prayers,
    addPrayer,
    prayFor,
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
