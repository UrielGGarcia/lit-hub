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
export const apiLitHubFiles = `http://${direccionIp}:3003/files/book-create`

// Rutas de usuarios
export const apiLitHubUsers = `http://${direccionIp}:3003/users`

// Rutas de autenticación
export const apiLitHubAuth = `http://${direccionIp}:3003/auth/login`
export const apiLitHubAuthMe = `http://${direccionIp}:3003/auth/me`

