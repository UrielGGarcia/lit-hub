import { createContext, useState, useEffect, useContext } from "react";
import type { Ebook } from "../interfaces/books.interfaces";



// Props del contexto
interface CartContextProps {
    cart: Ebook[];
    addToCart: (ebook: Ebook) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

// Crear contexto
const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Ebook[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (ebook: Ebook) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === ebook.id);
            if (exists) {
                alert(`El libro ${exists.title} ya está en tu carrito, listo para comprar.`);
                return prev;
            }
            return [...prev, ebook];
        });
    };


    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
