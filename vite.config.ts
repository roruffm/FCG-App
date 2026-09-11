import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Baukennung: Datum und Uhrzeit des Bauens. Sie steht auf der Diagnoseseite und
 * beantwortet die Frage, die sich sonst nicht klaeren laesst - laeuft auf dem
 * Geraet ueberhaupt der neue Stand?
 */
const baustand = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    __BAUSTAND__: JSON.stringify(baustand),
  },
})
