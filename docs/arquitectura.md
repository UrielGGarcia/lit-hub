# Arquitectura del Frontend - LitHub

## Estructura de carpetas

```
src/
├─ assets/      # Imágenes, fuentes e íconos
├─ components/  # Componentes reutilizables
├─ hooks/       # Hooks personalizados (para fetching y lógica)
├─ pages/       # Páginas principales (HomePage, etc.)
├─ routes/      # Configuración de rutas con React Router
├─ main.tsx     # Renderizado principal de la app
└─ index.css    # Estilos globales
```

## Componentes principales
- **main.tsx** → Renderiza toda la aplicación.
- **HomePage** → Página principal del e-commerce.

## Estado global
- Actualmente no se usa un estado global; se evaluará el uso de Context API o Redux más adelante.

## Hooks personalizados
- Se implementarán hooks para **fetching de datos** (API del backend, Stripe, etc.)