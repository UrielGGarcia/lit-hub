import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { apiLitHubBooks } from "../constants/rutas.constants";

// Interfaz de libro
interface Book {
  bookId: number;  // ⚡ ahora usamos bookId
  title: string;
  sinopsis?: string;
  author?: string;
  cover?: string;
}

// Props del contexto
interface LibraryContextProps {
  library: Book[];
  loading: boolean;
  addBook: (book: Book) => void;
  removeBook: (bookId: number) => void;
  clearLibrary: () => void;
}

// Crear contexto
const LibraryContext = createContext<LibraryContextProps>({
  library: [],
  loading: true,
  addBook: () => {},
  removeBook: () => {},
  clearLibrary: () => {},
});

export const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [library, setLibrary] = useState<Book[]>(() => {
    const saved = localStorage.getItem("userLibrary");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  // Guardar biblioteca en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("userLibrary", JSON.stringify(library));
  }, [library]);

  // Cargar biblioteca desde backend
  useEffect(() => {
    if (!user) {
      setLibrary([]);
      setLoading(false);
      return;
    }

    const fetchLibrary = async () => {
      try {
        const res = await fetch(`${apiLitHubBooks}/mybooks/${user.id}`);
        if (!res.ok) throw new Error("Error al obtener la biblioteca");
        const data = await res.json();

        // ⚡ mapear usando bookId
        const formatted: Book[] = data.map((book: any) => ({
          bookId: book.bookId,
          title: book.title,
          sinopsis: book.sinopsis,
          author: book.author,
          cover: book.cover,
        }));

        setLibrary(formatted);
      } catch (error) {
        console.error("Error cargando biblioteca:", error);
        setLibrary([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [user]);

  const addBook = (book: Book) => {
    if (library.some((b) => Number(b.bookId) === Number(book.bookId))) return;
    setLibrary((prev) => [...prev, book]);
  };

  const removeBook = (bookId: number) => {
    setLibrary((prev) => prev.filter((b) => Number(b.bookId) !== Number(bookId)));
  };

  const clearLibrary = () => setLibrary([]);

  return (
    <LibraryContext.Provider value={{ library, loading, addBook, removeBook, clearLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};

// Hook para usar el contexto
export const useLibrary = () => useContext(LibraryContext);
