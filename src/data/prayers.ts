import type { PrayerRequest } from './types'

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3_600_000).toISOString()
}

/** Beispielinhalte der Gebetswand (Version 2 der Roadmap). */
export const seedPrayers: PrayerRequest[] = [
  {
    id: 'pr-1',
    text: 'Meine Mutter wird nächste Woche operiert. Bitte betet für ruhige Hände beim Team und für ihren Frieden.',
    author: 'Katharina',
    visibility: 'Gemeinde',
    createdAt: hoursAgo(5),
    prayerCount: 34,
  },
  {
    id: 'pr-2',
    text: 'Bewerbungsgespräch am Donnerstag. Ich bin seit sieben Monaten auf Jobsuche und ziemlich müde.',
    author: 'Daniel',
    visibility: 'Gemeinde',
    createdAt: hoursAgo(21),
    prayerCount: 52,
  },
  {
    id: 'pr-3',
    text: 'Danke für alle Gebete - unsere Tochter ist wieder zu Hause und es geht ihr deutlich besser.',
    author: 'Familie R.',
    visibility: 'Gemeinde',
    createdAt: hoursAgo(40),
    prayerCount: 89,
    answered: true,
  },
  {
    id: 'pr-4',
    text: 'Für unsere Connectgruppe: Wir suchen einen neuen Raum ab Oktober.',
    author: 'Miriam',
    visibility: 'Gruppe',
    createdAt: hoursAgo(60),
    prayerCount: 12,
  },
]
