import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // `updateViaCache: 'none'` holt die Datei am Browser-Cache vorbei. Sonst
    // bliebe eine neue Veroeffentlichung bis zu zehn Minuten unbemerkt.
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: 'none' })
      .then((registration) => registration.update())
      .catch(() => {})

    // Uebernimmt eine neue Fassung, wird einmal neu geladen - sonst liefe die
    // Seite mit halb altem, halb neuem Stand weiter. Beim allerersten Besuch
    // gab es noch keinen Vorgaenger; dann waere das Neuladen nur laestig.
    const hatteVorgaenger = Boolean(navigator.serviceWorker.controller)
    let reloading = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hatteVorgaenger || reloading) return
      reloading = true
      window.location.reload()
    })
  })
}
