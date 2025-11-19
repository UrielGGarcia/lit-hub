export interface Ebook {
    id: number;
    title: string;
    price: string;
    sinopsis: string;
    idioma : string;
    cover: string | null;
    author: Author;
}

export type Author = {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
}

export type Genre = {
    id: number;
    name: string;
}

// Sider Bar
export type SiderBarSection<T = unknown> = {
    title: string;
    id: number;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}





