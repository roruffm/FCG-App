import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from './state'
import { BottomNav } from './components/BottomNav'
import { Home } from './routes/Home'
import { Sermons } from './routes/Sermons'
import { SermonDetail } from './routes/SermonDetail'
import { Ask } from './routes/Ask'
import { DevotionPage } from './routes/DevotionPage'
import { Events } from './routes/Events'
import { EventDetail } from './routes/EventDetail'
import { Groups } from './routes/Groups'
import { NewHere } from './routes/NewHere'
import { Prayer } from './routes/Prayer'
import { Profile } from './routes/Profile'
import { Privacy } from './routes/Privacy'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predigten" element={<Sermons />} />
            <Route path="/predigten/:id" element={<SermonDetail />} />
            <Route path="/frag" element={<Ask />} />
            <Route path="/impuls" element={<DevotionPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/gruppen" element={<Groups />} />
            <Route path="/neu-hier" element={<NewHere />} />
            <Route path="/gebet" element={<Prayer />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/datenschutz" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNav />
        </div>
      </HashRouter>
    </AppProvider>
  )
}
