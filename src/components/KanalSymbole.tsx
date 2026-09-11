import { church } from '../data/church'

/**
 * Die Kanäle als kleine farbige Symbole.
 *
 * Gezeichnet, nicht geladen: Die Marken sind als schlichte Formen in den
 * jeweiligen Hausfarben nachgebildet. Das spart Anfragen nach aussen, laeuft
 * offline und haelt die Zeile klein - Namen stehen als Beschriftung darunter,
 * damit auch erkennbar bleibt, was wohin fuehrt.
 */

type Kanal = {
  label: string
  farbe: string
  ziel?: string
  status?: string
  symbol: React.ReactNode
}

const weiss = '#fff'

export const kanaele: Kanal[] = [
  {
    label: 'Website',
    farbe: '#006269',
    ziel: church.web.home,
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke={weiss} strokeWidth="1.9" strokeLinecap="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2 2.3 3 5 3 8s-1 5.7-3 8c-2-2.3-3-5-3-8s1-5.7 3-8Z" />
      </svg>
    ),
  },
  {
    label: 'ChurchTools',
    farbe: '#00444b',
    ziel: church.web.churchtools,
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke={weiss} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8.5" r="2.8" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M16 6.2a2.8 2.8 0 0 1 0 5.2M17.5 14.4c1.9.7 3 2.3 3 4.6" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    farbe: '#ff0000',
    ziel: church.social.youtube,
    symbol: (
      <svg viewBox="0 0 24 24">
        <path
          d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8Z"
          fill={weiss}
        />
        <path d="M10.2 15V9l5.2 3-5.2 3Z" fill="#ff0000" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    farbe: '#c13584',
    ziel: church.social.instagram,
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke={weiss} strokeWidth="1.9">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.8" cy="7.2" r="1.1" fill={weiss} stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    farbe: '#1db954',
    ziel: church.social.spotify,
    symbol: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9.5" fill={weiss} />
        <g stroke="#1db954" strokeWidth="1.8" strokeLinecap="round" fill="none">
          <path d="M7.2 9.4c3.2-.9 6.6-.6 9.4 1" />
          <path d="M7.8 12.4c2.6-.7 5.4-.5 7.7.9" />
          <path d="M8.4 15.2c2.1-.5 4.3-.3 6.2.8" />
        </g>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    farbe: '#1877f2',
    ziel: church.social.facebook,
    symbol: (
      <svg viewBox="0 0 24 24">
        <path
          d="M13.5 21v-7.2h2.4l.4-2.9h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.1v2.9h2.4V21h3Z"
          fill={weiss}
        />
      </svg>
    ),
  },
  {
    label: 'Wiki',
    farbe: '#55686a',
    ziel: church.web.wiki || undefined,
    status: 'in Vorbereitung',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke={weiss} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4.5h9l5 5V19.5H5z" />
        <path d="M14 4.5v5h5M8.5 13h7M8.5 16.5h4.5" />
      </svg>
    ),
  },
]

export function KanalSymbole() {
  return (
    <div className="kanaele">
      {kanaele.map((kanal) => {
        const inhalt = (
          <>
            <span className="kanal__kreis" style={{ background: kanal.farbe }} aria-hidden>
              {kanal.symbol}
            </span>
            <span className="kanal__label">{kanal.label}</span>
            {kanal.status && <span className="kanal__status">{kanal.status}</span>}
          </>
        )

        if (!kanal.ziel) {
          return (
            <div key={kanal.label} className="kanal kanal--geplant">
              {inhalt}
            </div>
          )
        }
        return (
          <a
            key={kanal.label}
            className="kanal"
            href={kanal.ziel}
            target="_blank"
            rel="noreferrer noopener"
          >
            {inhalt}
          </a>
        )
      })}
    </div>
  )
}
