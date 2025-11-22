import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { usePost } from "../../../hooks/public/usePost.hook";
import { apiLitHubCheckoutSessionCart } from "../../../constants/rutas.constants";
import { useCart } from "../../../context/CartContext";
import type { Ebook } from "../../../interfaces/books.interfaces";
import { useLibrary } from "../../../context/LibraryContext";

type AddBuyBookProps = {
    title: string | undefined,
    price: string | undefined,
    bookId: number | undefined,
    book: Ebook;
}

export function AddBuyBook({ title, price, bookId, book }: AddBuyBookProps) {
    const { user } = useAuth();
    const { library } = useLibrary();
    const { cart } = useCart();

    const [isNotUserBuy, setIsNotUserBuy] = useState(true);
    const [isNotUserAdd, setIsNotUserAdd] = useState(true);

    const { postData } = usePost(apiLitHubCheckoutSessionCart);
    const [setResponse] = useState<any>(null);

    const inLibrary = library.some((b) => Number(b.bookId) === Number(book?.id));
    const inCart = cart.some((b) => Number(b.id) === Number(book?.id));
    const disableAddButton = inLibrary || inCart;

    const onBuyBook = async () => {
        if (!user) {
            setIsNotUserBuy(false);
            return;
        }

        setIsNotUserBuy(true);

        const body = {
            userId: user.id,
            userEmail: user.email,
            items: [
                {
                    bookId: bookId
                }
            ]
        };


        try {
            const response = await postData(body);
            setResponse(response);
            window.location.href = response.url;
        } catch (error) {
            console.error(error);
            alert(`Ya se ha comprado este E-book. Te invitamos a revisar en tu biblioteca.`);
        }
    };


    const { addToCart } = useCart();

    const onAddBook = () => {
        if (!user) {
            setIsNotUserAdd(true);
        } else {
            setIsNotUserAdd(false);
            addToCart(book);
        }
    }

    return (
        <div className="hidden lg:block bg-white p-5 rounded-lg h-fit shadow sticky top-6">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-xl font-bold mb-4 text-gray-900">${price}</p>
            <button
                onClick={onBuyBook}
                disabled={disableAddButton}
                className={`bg-orange-500 text-white w-full py-2 rounded-md mb-3 transition
        ${disableAddButton ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-400"}`}
            >
                {inLibrary ? "YA EN TU BIBLIOTECA" : inCart ? "YA EN EL CARRITO" : "Comprar ahora"}
            </button>

            <button
                onClick={onAddBook}
                disabled={disableAddButton}
                className={`bg-gray-200 w-full py-2 rounded-md mb-4 text-gray-800 transition
        ${disableAddButton ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
            >
                {inLibrary ? "YA EN TU BIBLIOTECA" : inCart ? "YA EN EL CARRITO" : "Agregar al carrito"}
            </button>

            {isNotUserBuy || isNotUserAdd && (
                <div>
                    <p className="text-sm text-orange-700">Por favor inicia sesión o regístrate para poder comprar alguno de nuestros E-books.</p>
                    <a href="/auth" className="underline text-blue-800">Iniciar sesión o Registrarme</a>
                </div>
            )}
            <div className="text-sm text-gray-600 space-y-1">
                <div>
                    <strong className="text-gray-700">Formato:</strong> .EPUB y .PDF
                </div>
                <div>Disponible inmediatamente</div>
            </div>
            <div className="mt-3 text-justify">
                <p className="text-sm text-gray-700">
                    Todos los e-books que ofrece LitHub son envíados vía correo electrónico, el que se registró
                    con la cuenta.
                    Se envía en formato .EPUB y .PDF, para más información de cómo abrir dichos formatos puede dirigirse a
                    <a
                        className="text-blue-700 underline"
                        target="_blank"
                        href="https://www.ionos.mx/digitalguide/servidores/know-how/abrir-archivo-epub/"> Archivos .EPUB</a>
                </p>
            </div>
        </div>
    );
}