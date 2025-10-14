// main.tsx (o index.tsx)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // Importa el router
import './index.css'
import App from './App'  // Crea este archivo nuevo (ver abajo)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  {/* Envuelve la app para habilitar routing */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)