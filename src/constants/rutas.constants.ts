// Direccion Ip en local
const direccionIp = "192.168.100.10"

// Rutas de libros
export const apiLitHubBooks = `http://${direccionIp}:3003/books`;
export const apiLitHubBooksByAutor = `http://${direccionIp}:3003/books/by-author`;
export const apiLitHubBooksByAutorNoPublished = `http://${direccionIp}:3003/books/by-author-no-published`;
export const apiLitHubGenres = `http://${direccionIp}:3003/genres`;
export const apiLitHubAuthors = `http://${direccionIp}:3003/users/authors`;
export const apiLitHubCoversBooks = `http://${direccionIp}:3003/uploads/books/covers/`;


// Rutas de archivos 
export const apiLitHubFiles = `http://${direccionIp}:3003/files/book-create`;

// Rutas de usuarios
export const apiLitHubUsers = `http://${direccionIp}:3003/users`;

// Rutas de autenticación
export const apiLitHubAuth = `http://${direccionIp}:3003/auth/login`;
export const apiLitHubAuthMe = `http://${direccionIp}:3003/auth/me`;
export const apiLitHubRegister = `http://${direccionIp}:3003/auth/register`;
export const apiLitHubAddUser = `http://${direccionIp}:3003/auth/admin/users`;

export const apiLitHubVerifyCode = `http://${direccionIp}:3003/auth/verify-code`;
export const apiLitHubSendCode = `http://${direccionIp}:3003/auth/send-code`;


// Rutas de compra
export const apiLitHubCheckoutSessionCart = `http://${direccionIp}:3003/stripe/checkout-session/cart`;

export const apiLitHubPurchasesPaid = `http://${direccionIp}:3003/purchases/paid`;
export const apiLitHubAccesos = `http://${direccionIp}:3003/books/usersbooks`;


// Rutas de descarga
export const apiLitHubDownload = `http://${direccionIp}:3003/books/download`;


