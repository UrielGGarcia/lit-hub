const API_URL = import.meta.env.VITE_API_URL;

// Rutas de libros
export const apiLitHubBooks = `${API_URL}/books`;
export const apiLitHubBooksByAutor = `${API_URL}/books/by-author`;
export const apiLitHubBooksByAutorNoPublished = `${API_URL}/books/by-author-no-published`;
export const apiLitHubGenres = `${API_URL}/genres`;
export const apiLitHubAuthors = `${API_URL}/users/authors`;
export const apiLitHubCoversBooks = `${API_URL}/uploads/books/covers/`;

// Rutas de archivos 
export const apiLitHubFiles = `${API_URL}/files/book-create`;

// Rutas de usuarios
export const apiLitHubUsers = `${API_URL}/users`;

// Rutas de autenticación
export const apiLitHubAuth = `${API_URL}/auth/login`;
export const apiLitHubAuthMe = `${API_URL}/auth/me`;
export const apiLitHubRegister = `${API_URL}/auth/register`;
export const apiLitHubAddUser = `${API_URL}/auth/admin/users`;

export const apiLitHubVerifyCode = `${API_URL}/auth/verify-code`;
export const apiLitHubSendCode = `${API_URL}/auth/send-code`;

// Rutas de compra
export const apiLitHubCheckoutSessionCart = `${API_URL}/stripe/checkout-session/cart`;
export const apiLitHubPurchasesPaid = `${API_URL}/purchases/paid`;
export const apiLitHubAccesos = `${API_URL}/books/usersbooks`;

// Rutas de descarga
export const apiLitHubDownload = `${API_URL}/books/download`;
