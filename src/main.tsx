import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './routes/Router'
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import { LibraryProvider } from './context/LibraryContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LibraryProvider>
        <CartProvider>
          <SearchProvider>
            <Router />
          </SearchProvider>
        </CartProvider>
      </LibraryProvider>
      <Footer />
    </AuthProvider>
  </StrictMode>

)
