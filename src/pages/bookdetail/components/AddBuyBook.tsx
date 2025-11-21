import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { usePost } from "../../../hooks/public/usePost.hook";
import { apiLitHubCheckoutSession } from "../../../constants/rutas.constants";
import { useCart } from "../../../context/CartContext";
import type { Ebook } from "../../../interfaces/books.interfaces";

type AddBuyBookProps = {
    title: string | undefined,
    price: string | undefined,
    bookId: number | undefined,
    book: Ebook;
}

export function AddBuyBook({ title, price, bookId, book }: AddBuyBookProps) {
    const { user } = useAuth();
    const [isNotUserBuy, setIsNotUserBuy] = useState(true);
    const [isNotUserAdd, setIsNotUserAdd] = useState(true);

    const { data, isLoading, error, postData } = usePost(apiLitHubCheckoutSession);
    const [response, setResponse] = useState<any>(null);


    const onBuyBook = async () => {
        if (!user) {
            setIsNotUserBuy(false);
        } else {
            setIsNotUserBuy(true);
            const body = {
                bookId: bookId,
                userEmail: user.email,
                userId: user.id
            }
            console.log(body);

            try {
                const response = await postData(body);
                setResponse(response);
                console.log(response);
                window.location.href = response.url;

            } catch (error) {
                alert(`Ya se ha comprado este E-book. Te invitamos a revisar en tu bliblioteca.`)
            }
        }
    }

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
                className="bg-orange-500 text-white w-full py-2 rounded-md mb-3 hover:bg-orange-400 transition">
                Comprar ahora
            </button>
            <button
                onClick={onAddBook}
                className="bg-gray-200 w-full py-2 rounded-md hover:bg-gray-300 transition mb-4 text-gray-800">
                Agregar al carrito
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