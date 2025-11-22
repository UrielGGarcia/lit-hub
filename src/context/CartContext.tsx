import { createContext, useState, useEffect, useContext } from "react";
import type { Ebook } from "../interfaces/books.interfaces";
import { useLibrary } from "./LibraryContext";

// Props del contexto
interface CartContextProps {
    cart: Ebook[];
    addToCart: (ebook: Ebook) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    total: number;
}

// Crear contexto
const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    total: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Ebook[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const { library, loading } = useLibrary(); // ✅ incluir loading

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (ebook: Ebook) => {
        if (loading) {
            alert("Cargando biblioteca, espera un momento...");
            return;
        }

        const existsInCart = cart.some((item) => Number(item.id) === Number(ebook.id));
        const existsInLibrary = library.some((item) => Number(item.bookId) === Number(ebook.id));

        if (existsInCart) {
            alert(`El libro "${ebook.title}" ya está en tu carrito.`);
            return;
        }

        if (existsInLibrary) {
            alert(`El libro "${ebook.title}" ya está en tu biblioteca, no se puede agregar al carrito.`);
            return;
        }

        setCart((prev) => [...prev, ebook]);
    };


    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
