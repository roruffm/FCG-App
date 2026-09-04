import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppProvider, useApp } from './state'
import { BrandSheet } from './components/BrandSheet'
import { BottomNav } from './components/BottomNav'
import { Home } from './routes/Home'
import { Sermons } from './routes/Sermons'
import { SermonDetail } from './routes/SermonDetail'
import { Ask } from './routes/Ask'
import { DevotionPage } from './routes/DevotionPage'
import { Bible } from './routes/Bible'
import { BibleReader } from './routes/BibleReader'
import { ReadingPlans } from './routes/ReadingPlans'
import { ReadingPlan } from './routes/ReadingPlan'
import { Events } from './routes/Events'
import { EventDetail } from './routes/EventDetail'
import { Groups } from './routes/Groups'
import { NewHere } from './routes/NewHere'
import { Prayer } from './routes/Prayer'
import { Profile } from './routes/Profile'
import { Privacy } from './routes/Privacy'
import { Contact } from './routes/Contact'

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
        <Route path="/" element={<Home />} />
        <Route path="/predigten" element={<Sermons />} />
        <Route path="/predigten/:id" element={<SermonDetail />} />
        <Route path="/frag" element={<Ask />} />
        <Route path="/impuls" element={<DevotionPage />} />
        <Route path="/bibel" element={<Bible />} />
        <Route path="/bibel/plaene" element={<ReadingPlans />} />
        <Route path="/bibel/plan/:id" element={<ReadingPlan />} />
        <Route path="/bibel/:book/:chapter" element={<BibleReader />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/gruppen" element={<Groups />} />
        <Route path="/neu-hier" element={<NewHere />} />
        <Route path="/gebet" element={<Prayer />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/datenschutz" element={<Privacy />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
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
