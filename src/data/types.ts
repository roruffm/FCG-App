export type Sermon = {
  id: string
  title: string
  speaker: string
  series: string
  date: string // ISO
  durationMin: number
  topics: string[]
  bibleBooks: string[]
  keyVerse: string
  summary: string
  /** Kurzfassung in 3 Punkten - im Betrieb aus dem Transkript generiert und redaktionell geprueft. */
  takeaways: string[]
  /** Kapitelmarken fuer den Player. */
  chapters: { at: number; label: string }[]
  /** Auszug aus dem freigegebenen Transkript - Grundlage fuer "Frag die Predigten". */
  transcript: string
  /** Gespraechsfragen fuer Connectgruppen. */
  groupQuestions: string[]
  audioUrl?: string
  videoUrl?: string
}

export type Devotion = {
  id: string
  /** Tag im Jahr (1-basiert) oder Position im Themenpfad. */
  day: number
  reference: string
  verse: string
  theme: string
  short: string // 1 Minute
  deep: string // 5 Minuten
  question: string
  prayer: string
}

export type ThemePath = {
  id: string
  title: string
  claim: string
  days: number
  devotionIds: string[]
}

export type ChurchEvent = {
  id: string
  title: string
  category: 'Gottesdienst' | 'Kurs' | 'Jugend' | 'Gebet' | 'Freizeit' | 'Gemeinde'
  start: string // ISO
  end?: string
  location: string
  description: string
  registration: boolean
  seats?: number
  taken?: number
  contact: string
}

export type Group = {
  id: string
  name: string
  focus: string
  phase: 'Studierende' | 'Junge Erwachsene' | 'Familien' | 'Frauen' | 'Männer' | 'Best Ager' | 'Alle'
  rhythm: string
  weekday: string
  district: string
  language: 'Deutsch' | 'Deutsch/Englisch' | 'Englisch'
  hosts: string
  spotsFree: boolean
  description: string
}

export type PrayerRequest = {
  id: string
  text: string
  author: string
  visibility: 'Gemeinde' | 'Gruppe' | 'Nur Gebetsteam'
  createdAt: string
  prayerCount: number
  answered?: boolean
}
