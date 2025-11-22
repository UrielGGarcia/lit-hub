import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useLibrary } from "../../../context/LibraryContext";
import type { Ebook } from "../../../interfaces/books.interfaces";

type Props = {
    image?: string;
    id: number;
    authorId: number;
    book: Ebook;
}

function EBookCard({ image, id, authorId, book }: Props) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart, cart } = useCart();
    const { library, loading } = useLibrary();
    const [isUser, setIsUser] = useState(false);

    // Verificaciones
    const isLoadingLibrary = loading;
    const inLibrary = library.some((b) => Number(b.bookId) === Number(book.id));
    const inCart = cart.some((b) => Number(b.id) === Number(book.id));
    const disableButton = isLoadingLibrary || inLibrary || inCart;

    const onHandleCheckSession = () => {
        if (!user) {
            setIsUser(true);
        } else {
            setIsUser(false);
            addToCart(book);
        }
    };

    return (
        <article className="gap-3 flex flex-col items-center justify-center bg-white/60 border-2 border-white rounded-2xl p-2 backdrop-blur-lg shadow-xl z-10">
            <img src={image} alt={book.title} className="rounded-xl shadow-2xl h-100 md:h-65 lg:h-80 w-65" />

            <button
                className="bg-white/60 border-2 border-white rounded-2xl w-6/7 text-gray-700 font-bold cursor-pointer hover:scale-110 transition-transform shadow-2xl"
                onClick={() => navigate(`/ebook/${id}/${authorId}`)}
            >
                VER MÁS
            </button>

            <button
                onClick={onHandleCheckSession}
                disabled={disableButton}
                className={`text-white bg-[#316b9d] rounded-2xl p-1 font-semibold w-6/7 mb-4 transition-transform
                    ${disableButton ? "opacity-50 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}`}
            >
                {isLoadingLibrary
                    ? "CARGANDO..."
                    : inLibrary
                    ? "YA EN TU BIBLIOTECA"
                    : inCart
                    ? "YA EN EL CARRITO"
                    : "AGREGAR AL CARRITO"}
            </button>

            {isUser && (
                <div className="w-full  flex flex-col items-center text-center fixed bg-white/70 pl-2 pr-2 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-50">
                    <p className="text-lg lg:text-sm text-orange-800 mb-2">
                        Por favor inicia sesión o regístrate para poder comprar alguno de nuestros E-books.
                    </p>
                    <a href="/auth" className="underline text-blue-800 font-semibold">
                        Iniciar sesión o Registrarme
                    </a>
                </div>
            )}
        </article>
    );
}

export default EBookCard;
