# Requerimientos del Proyecto - LitHub

## Requerimientos Funcionales (RF)

**RF-1 (Gestión de usuarios - Clientes):**  
El sistema debe permitir a los clientes registrarse, iniciar sesión y restablecer su contraseña.

**RF-2 (Gestión de usuarios - Autores):**  
El sistema debe permitir que los administradores creen cuentas de autor y los autores puedan iniciar sesión en su panel.

**RF-3 (Catálogo de productos):**  
El sistema debe mostrar un catálogo de e-books con filtros por título, autor, género y precio, y permitir búsquedas por palabras clave.

**RF-4 (Detalle de producto):**  
El sistema debe mostrar la información completa de cada e-book, incluyendo portada, sinopsis, autor, precio, formatos disponibles y reseñas.

**RF-5 (Carrito de compras):**  
El sistema debe permitir a los clientes agregar e-books a un carrito de compras, eliminar productos y revisar el total antes del pago.

**RF-6 (Proceso de pago):**  
El sistema debe integrar un gateway de pago seguro (Stripe) para procesar transacciones en línea y generar confirmaciones de compra.

**RF-7 (Entrega de e-books):**  
El sistema debe enviar automáticamente los e-books adquiridos al correo electrónico del cliente en los formatos adquiridos (.pdf, .epub).

**RF-8 (Gestión de e-books - Autores):**  
El sistema debe permitir a los autores agregar, editar y eliminar e-books, incluyendo portada, descripción, precio y archivos digitales.

**RF-9 (Gestión de reseñas y comentarios):**  
El sistema debe permitir que los clientes agreguen reseñas y calificaciones a los e-books, y que los autores puedan responder a comentarios.

**RF-10 (Panel de administración):**  
El sistema debe proporcionar a los administradores un panel para supervisar usuarios (clientes y autores), ventas y estado de la plataforma.

## Requerimientos No Funcionales (RN)

**RN-2 (Rendimiento):** El sistema debe procesar y confirmar un pago en un tiempo máximo de 10 segundos.

**RN-3 (Escalabilidad):** La arquitectura debe permitir escalar horizontalmente los servidores de la aplicación para soportar picos de tráfico (ej.: Black Friday).

**RN-4 (Seguridad):** Todos los datos sensibles (contraseñas, números de tarjeta) deben estar encriptados en tránsito (TLS 1.2+) y en reposo (AES-256).

**RN-5 (Seguridad):** La aplicación debe ser inmune a las vulnerabilidades OWASP Top 10 (ej.: inyección SQL, XSS).

**RN-6 (Disponibilidad):** La tienda online debe tener una disponibilidad del 99.9% (uptime) fuera de las ventanas de mantenimiento programado.

**RN-7 (Usabilidad):** La interfaz debe ser responsive y funcionar correctamente en los navegadores Chrome, Firefox, Safari y Edge, así como en dispositivos móviles y tablets.

**RN-8 (Mantenibilidad):** El código debe pasar revisiones (code reviews) y tener una cobertura de tests automatizados superior al 80%.

**RN-9 (Compatibilidad):** El proceso de pago debe ser compatible con los principales gateways de pago (Stripe, PayPal, Mercado Pago) y cumplir con la normativa PCI DSS.
