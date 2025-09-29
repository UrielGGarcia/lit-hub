# Historias de Usuario - LitHub

## HU Épico: Gestión de Cuenta de Usuario (Clientes)
- **HU-1:** Como cliente registrado, quiero iniciar sesión con mi email y contraseña para acceder a mi cuenta y ver mis compras.  
  - Pantalla Asociada: Pantalla de Inicio de Sesión, Historial de Pedidos.  
  - Roles Intervienen: Cliente (inicia sesión y consulta historial).

- **HU-2:** Como cliente, quiero restablecer mi contraseña si la olvido, para recuperar el acceso a mi cuenta.  
  - Pantalla Asociada: Pantalla de Restablecimiento de Contraseña.  
  - Roles Intervienen: Cliente (solicita restablecimiento), Administrador (sistema genera y envía al correo).

- **HU-3:** Como cliente, quiero registrar una nueva cuenta para poder realizar compras y acceder a mis e-books adquiridos.  
  - Pantalla Asociada: Pantalla de Registro de Cliente.  
  - Roles Intervienen: Cliente (se registra), Administrador (sistema valida que no exista duplicidad).

## HU Épico: Gestión de Cuenta de Autor (Comerciantes)
- **HU-4:** Como administrador, quiero crear cuentas de autor para que los escritores puedan acceder al sistema y subir sus e-books.  
  - Pantalla Asociada: Panel de Administración → Gestión de Autores.  
  - Roles Intervienen: Administrador (crea la cuenta), Autor (recibe credenciales a su correo).

- **HU-5:** Como autor, quiero iniciar sesión para gestionar mis e-books publicados.  
  - Pantalla Asociada: Pantalla de Inicio de Sesión Autor.  
  - Roles Intervienen: Autor (se autentica), Administrador (sistema gestiona permisos de acceso).

- **HU-6:** Como autor, quiero agregar, editar y eliminar e-books (con portada, sinopsis, precio y archivos digitales) para mantener actualizado mi catálogo.  
  - Pantalla Asociada: Panel de Autor → Gestión de E-books.  
  - Roles Intervienen: Autor (gestiona e-books), Administrador (supervisa).

## HU Épico: Navegación y Búsqueda de Productos (Clientes)
- **HU-7:** Como cliente, quiero buscar e-books por título, autor o palabra clave para encontrar rápidamente lo que me interesa.  
  - Pantalla Asociada: Pantalla de Catálogo con Buscador.  
  - Roles Intervienen: Cliente (realiza búsqueda), Autor (proporciona libros), Administrador (mantiene indexado el catálogo).

- **HU-8:** Como cliente, quiero filtrar los e-books por género, precio o autor para refinar mi búsqueda.  
  - Pantalla Asociada: Catálogo con Filtros.  
  - Roles Intervienen: Cliente (usa filtros), Autor (define metadatos), Administrador (mantiene filtros).

- **HU-9:** Como cliente, quiero ver los detalles de un e-book (portada, descripción, precio, reseñas, archivo digital disponible) para decidir si lo compro.  
  - Pantalla Asociada: Pantalla Detalle de E-book.  
  - Roles Intervienen: Cliente (consulta), Autor (sube datos), Administrador (modera reseñas).

## HU Épico: Proceso de Compra (Stripe)
- **HU-10:** Como cliente, quiero añadir e-books a mi carrito de compras, para comprarlos en una sola transacción.  
  - Pantalla Asociada: Carrito de Compras.  
  - Roles Intervienen: Cliente (añade libros), Autor (libros disponibles), Administrador (garantiza funcionalidad).

- **HU-11:** Como cliente, quiero revisar el resumen de mi carrito antes de pagar, para confirmar mi pedido.  
  - Pantalla Asociada: Carrito de Compras (detalle con total y opción de pago).  
  - Roles Intervienen: Cliente (revisa), Administrador (valida precios y totales).

- **HU-12:** Como cliente, quiero pagar con tarjeta mediante Stripe, para realizar la compra de forma segura.  
  - Pantalla Asociada: Pantalla de Pago (Stripe Checkout).  
  - Roles Intervienen: Cliente (paga), Administrador (configura integración), Stripe (procesa el pago).

## HU Épico: Gestión Post-Venta
- **HU-13:** Como cliente, quiero recibir un correo de confirmación con mis e-books en formato digital (PDF/EPUB), para descargarlos después del pago.  
  - Pantalla Asociada: Confirmación de Compra (email automático con enlaces de descarga).  
  - Roles Intervienen: Cliente (recibe correo), Administrador (sistema envía correo), Autor (proporciona archivo).

- **HU-14:** Como cliente, quiero acceder a mi historial de compras para volver a descargar los e-books adquiridos.  
  - Pantalla Asociada: Pantalla Historial de Pedidos.  
  - Roles Intervienen: Cliente (consulta historial), Administrador (mantiene registros), Autor (asocia e-books al pedido).

## HU Épico: Administración Global
- **HU-15:** Como administrador, quiero acceder a un panel de control para supervisar autores, clientes y ventas.  
  - Pantalla Asociada: Dashboard de Administración.  
  - Roles Intervienen: Administrador (gestiona), Autor y Cliente (indirectamente impactados).
