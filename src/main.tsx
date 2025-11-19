import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './routes/Router'
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </SearchProvider>
  </StrictMode>,
)
