// App.tsx
import { Routes, Route } from 'react-router-dom'  // Importa Routes y Route
import HomePage from './pages/home/HomePage'
import AdminPanel from './pages/adminPanel/AdminPanel'
 
export default function App() {
  return (
    <Routes>  {/* Define las rutas aquí */}
      <Route path="/" element={<HomePage />} />  {/* Ruta principal: Home */}
      <Route path="/admin" element={<AdminPanel />} />  {/* Ruta para admin */}
      {/* Agrega más rutas si necesitas, ej: <Route path="/about" element={<About />} /> */}
    </Routes>
  )
}
