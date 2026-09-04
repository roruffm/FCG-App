import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

/**
 * Schriften erst nach dem Rendern anfordern. Ein blockierendes Stylesheet
 * haelt die Seite sonst so lange leer, wie das Netz braucht - die Ersatz-
 * schriften stehen im Stack bereits bereit.
 */
function loadFonts(): void {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href =
    'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700&family=Karla:wght@400;500;700&display=swap'
  // Als Druck-Stylesheet eingehaengt haelt es die Darstellung nicht auf;
  // sobald es da ist, gilt es fuer den Bildschirm.
  link.media = 'print'
  link.onload = () => {
    link.media = 'all'
  }
  document.head.appendChild(link)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

loadFonts()

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // Fehlt der Service Worker (z. B. bei der Einzeldatei-Demo), laeuft die App normal weiter.
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
  })
}
