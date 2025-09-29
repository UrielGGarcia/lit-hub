// Datos para llenar y probar

interface Book {
    urlImg: string,
    titulo: string
}

interface Autor {
    nombre: string
}

interface Genero {
    nombre: string
}

export const Books: Book[] = [
    { urlImg: "https://m.media-amazon.com/images/I/91u4JgsroxL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/91sTC4V37qL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" },
    { urlImg: "https://m.media-amazon.com/images/I/71oNYYiX3PL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/91sTC4V37qL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" },
    { urlImg: "https://m.media-amazon.com/images/I/91u4JgsroxL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/71oNYYiX3PL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" },
    { urlImg: "https://m.media-amazon.com/images/I/91u4JgsroxL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/91sTC4V37qL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" },
    { urlImg: "https://m.media-amazon.com/images/I/91u4JgsroxL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/91sTC4V37qL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" },
    { urlImg: "https://m.media-amazon.com/images/I/71oNYYiX3PL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/91sTC4V37qL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" },
    { urlImg: "https://m.media-amazon.com/images/I/91u4JgsroxL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/71oNYYiX3PL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" },
    { urlImg: "https://m.media-amazon.com/images/I/91u4JgsroxL._SL1500_.jpg", titulo: "Metro 2033 (NE)" },
    { urlImg: "https://m.media-amazon.com/images/I/91sTC4V37qL._SL1500_.jpg", titulo: "Guerra Mundial Z: Una Historia Oral de la Guerra Zombi" }
]


export const generos: Genero[] = [
    { nombre: "Fantasía" },
    { nombre: "Ciencia ficción" },
    { nombre: "Romance" },
    { nombre: "Misterio" },
    { nombre: "Terror" },
    { nombre: "Histórico" },
    { nombre: "Aventura" },
    { nombre: "Drama" },
    { nombre: "Thriller" },
    { nombre: "Biografía" }
];

export const autores: Autor[] = [
    { nombre: "Gabriel García Márquez" },
    { nombre: "Isabel Allende" },
    { nombre: "J. K. Rowling" },
    { nombre: "Stephen King" },
    { nombre: "George R. R. Martin" },
    { nombre: "Julio Verne" },
    { nombre: "Jane Austen" },
    { nombre: "Haruki Murakami" },
    { nombre: "Ernest Hemingway" },
    { nombre: "Agatha Christie" }
];