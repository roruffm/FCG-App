import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { AppProvider, useApp } from './state'
import { BrandSheet } from './components/BrandSheet'
import { Fehlerfang } from './components/Fehlerfang'
import { Start } from './routes/Start'
import { Sermons } from './routes/Sermons'
import { SermonDetail } from './routes/SermonDetail'
import { Ask } from './routes/Ask'
import { Events } from './routes/Events'
import { EventDetail } from './routes/EventDetail'
import { Groups } from './routes/Groups'
import { NewHere } from './routes/NewHere'
import { Prayer } from './routes/Prayer'
import { Privacy } from './routes/Privacy'
import { Contact } from './routes/Contact'
import { Serve } from './routes/Serve'
import { Teams } from './routes/Teams'
import { TeamSpace } from './routes/TeamSpace'
import { Wiki } from './routes/Wiki'
import { WikiArtikelSeite } from './routes/WikiArtikelSeite'
import { Diagnose } from './routes/Diagnose'


/**
 * Nach oben, und zwar verlaesslich.
 *
 * Zwei Dinge, die zusammen der Grund fuer leere Unterseiten in Chrome auf
 * Android sein koennen:
 *
 * 1. `history.scrollRestoration` steht standardmaessig auf 'auto'. Bei einem
 *    Hash-Router ist jeder Klick ein History-Eintrag, und Chrome stellt dafuer
 *    die Scrollposition wieder her - auch wenn die neue Seite kuerzer ist als
 *    die alte. Dann steht man unterhalb des Inhalts und sieht nichts. Ein
 *    Aktualisieren setzt die Position zurueck, und "auf einmal" ist alles da.
 *    Samsung Internet macht das nicht, Chrome schon - das passt zum Bericht.
 *
 * 2. `useEffect` laeuft erst nach dem Zeichnen. Zwischen Zeichnen und Effekt
 *    liegt also ein Bild, in dem die neue Seite mit der alten Scrollposition
 *    steht. `useLayoutEffect` kommt davor.
 *
 * Der zweite Anlauf im naechsten Bild greift den Fall ab, dass Chrome seine
 * Wiederherstellung erst nach dem Layout durchsetzt.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    try {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    } catch {
      /* aelterer Browser - dann eben ohne */
    }

    window.scrollTo(0, 0)
    const nochmal = requestAnimationFrame(() => window.scrollTo(0, 0))
    return () => cancelAnimationFrame(nochmal)
  }, [pathname])

  return null
}

/**
 * Dauerhafte Kennzeichnung: Diese Demo ist kein offizielles Angebot der Gemeinde,
 * alle Inhalte sind Beispiele.
 */
function DemoBar({ onOpenBrand }: { onOpenBrand: () => void }) {
  return (
    <div className="demobar">
      <span>
        <b>PROTOTYP</b> · Beispielinhalte · keine offizielle App der FCG Frankfurt
      </span>
      <button onClick={onOpenBrand}>Design</button>
    </div>
  )
}

function Shell() {
  const { brand, setBrand } = useApp()
  const [brandOpen, setBrandOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="app">
      <DemoBar onOpenBrand={() => setBrandOpen(true)} />
      {/*
        Beim Seitenwechsel neu aufsetzen: Sonst bliebe die Fehlermeldung stehen,
        auch wenn man laengst woanders hinnavigiert hat.
      */}
      <Fehlerfang key={pathname}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/predigten" element={<Sermons />} />
          <Route path="/predigten/:id" element={<SermonDetail />} />
          <Route path="/frag" element={<Ask />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/gruppen" element={<Groups />} />
          <Route path="/neu-hier" element={<NewHere />} />
          <Route path="/gebet" element={<Prayer />} />
          <Route path="/datenschutz" element={<Privacy />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/mitmachen" element={<Serve />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamSpace />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:slug" element={<WikiArtikelSeite />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Fehlerfang>
      {brandOpen && <BrandSheet brand={brand} setBrand={setBrand} onClose={() => setBrandOpen(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Shell />
      </HashRouter>
    </AppProvider>
  )
}
