import { sermons } from '../data/sermons'
import type { Sermon } from '../data/types'

/**
 * "Frag die Predigten" - Demo-Implementierung.
 *
 * Diese Version läuft vollständig auf dem Gerät: Sie durchsucht die freigegebenen
 * Transkripte mit einem gewichteten Begriffs-Ranking und zitiert immer die Quelle.
 * Im Produktivbetrieb ersetzt ein Retrieval-Dienst (Embeddings + LLM mit
 * Quellenzwang) das Ranking - die Schnittstelle und die Regeln bleiben gleich:
 *   1. Antworten nur aus freigegebenen FCG-Inhalten.
 *   2. Immer mit Quellenangabe.
 *   3. Sensible Themen werden nicht beantwortet, sondern an Menschen übergeben.
 */

const STOPWORDS = new Set([
  'der','die','das','des','dem','den','ein','eine','einer','eines','einem','einen','und','oder','aber','wenn','dann',
  'ich','du','er','sie','es','wir','ihr','mein','dein','sein','ihre','was','wer','wie','wo','warum','wieso','welche',
  'welcher','welches','ist','sind','war','waren','wird','werden','wurde','hat','habe','haben','kann','können','soll',
  'sollen','muss','müssen','über','unter','mit','ohne','für','von','vom','zum','zur','zu','im','in','am','an','auf',
  'bei','nach','aus','als','auch','nicht','nur','noch','schon','man','sich','wurde','gepredigt','predigt','predigten',
  'sagt','sagte','thema','bibel','gott',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zäöüß0-9\s,-]/g, ' ')
    .split(/[\s,-]+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
}

/** Sehr einfache Stammform, damit "beten"/"gebet"/"betet" zusammenfinden. */
function stem(token: string): string {
  return token.replace(/(en|ern|est|et|te|ten|st|es|er|em|e|s|n)$/u, '')
}

/**
 * Themen, bei denen die App bewusst nicht antwortet, sondern an Menschen uebergibt.
 * Die Muster sind absichtlich weit gefasst: Ein Fehlalarm kostet einen Hinweis auf
 * das Seelsorgeteam, ein uebersehener Fall kostet deutlich mehr.
 */
const CRISIS_PATTERNS = [
  /suizid|selbstmord|freitod/i,
  /um(zu)?bringen|umgebracht/i,
  /(nicht|nie) mehr leben|nicht mehr weiterleben|lebensm(ü|ue)de|sterben (will|möchte|moechte)/i,
  /(mein|das) leben (be)?enden|schluss machen mit dem leben/i,
  /selbstverletz|selbst verletz|ritz(e|en|t)\b/i,
  /missbrauch|vergewaltig|bel(ä|ae)stig|übergriff|uebergriff/i,
  /(schl(ä|ae)gt|schlagen) (mich|uns|mein kind)|gewalt (in der familie|zu hause|gegen)|misshandl/i,
  /kindeswohl|meinem kind (passiert|tut jemand)|kind (wird|ist) (geschlagen|missbraucht)/i,
  /magersucht|essst(ö|oe)rung|bulimie/i,
  /(will|möchte|moechte) mir (etwas|was) antun/i,
]

export type Citation = {
  sermon: Sermon
  quote: string
  score: number
}

export type AskResult =
  | { kind: 'escalation' }
  | { kind: 'empty' }
  | { kind: 'answer'; intro: string; citations: Citation[] }

function bestSentence(sermon: Sermon, stems: string[]): string {
  const sentences = `${sermon.summary} ${sermon.transcript}`
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 40)

  let best = sentences[0] ?? sermon.summary
  let bestScore = -1

  for (const sentence of sentences) {
    const hay = tokenize(sentence).map(stem)
    const score = stems.reduce((acc, s) => acc + (hay.some((h) => h.startsWith(s)) ? 1 : 0), 0)
    if (score > bestScore) {
      bestScore = score
      best = sentence
    }
  }
  return best.trim()
}

export function askSermons(question: string): AskResult {
  if (CRISIS_PATTERNS.some((p) => p.test(question))) return { kind: 'escalation' }

  const stems = [...new Set(tokenize(question).map(stem))].filter(Boolean)
  if (stems.length === 0) return { kind: 'empty' }

  const scored = sermons
    .map((sermon) => {
      const fields: [string, number][] = [
        [sermon.title, 6],
        [sermon.topics.join(' '), 5],
        [sermon.bibleBooks.join(' ') + ' ' + sermon.keyVerse, 5],
        [sermon.series, 3],
        [sermon.speaker, 3],
        [sermon.summary, 2],
        [sermon.takeaways.join(' '), 2],
        [sermon.transcript, 1],
      ]

      let score = 0
      for (const [text, weight] of fields) {
        const haystack = tokenize(text).map(stem)
        for (const s of stems) {
          const hits = haystack.filter((h) => h.startsWith(s) || s.startsWith(h)).length
          if (hits > 0) score += weight * Math.min(hits, 3)
        }
      }
      return { sermon, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (scored.length === 0) return { kind: 'empty' }

  const citations: Citation[] = scored.map(({ sermon, score }) => ({
    sermon,
    score,
    quote: bestSentence(sermon, stems),
  }))

  const topicList = [...new Set(citations.flatMap((c) => c.sermon.topics))].slice(0, 3).join(', ')
  const intro =
    citations.length === 1
      ? `Zu deiner Frage passt eine Predigt aus dem Archiv (Thema: ${topicList}).`
      : `Dazu haben wir ${citations.length} Predigten im Archiv gefunden - Schwerpunkte: ${topicList}.`

  return { kind: 'answer', intro, citations }
}

export const exampleQuestions = [
  'Was wurde über Römer 8 gepredigt?',
  'Wie gehe ich mit Zweifeln um?',
  'Gibt es etwas zum Thema Vergebung?',
  'Was sagt die FCG zum Umgang mit Geld?',
  'Ich bin erschöpft - gibt es dazu eine Predigt?',
]
