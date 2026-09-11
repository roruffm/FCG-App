import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppProvider, useApp } from './state'
import { BrandSheet } from './components/BrandSheet'
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


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
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

  return (
    <div className="app">
      <DemoBar onOpenBrand={() => setBrandOpen(true)} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
