import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './routes/Router'
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <SearchProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SearchProvider>
    </CartProvider>
  </StrictMode>,
)
