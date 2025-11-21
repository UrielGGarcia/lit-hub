import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import type { Ebook } from "../../../interfaces/books.interfaces";

type Props = {
    image?: string,
    id: number;
    authorId: number;
    book: Ebook;
}

function EBookCard({ image, id, authorId, book }: Props) {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addToCart } = useCart();
    const [isUser, setIsUser] = useState(false);

    const onHandleCheckSession = () => {
        if (!user) {
            setIsUser(true);
        } else {
            setIsUser(false);
            addToCart(book);
        }
    }

    return (
        <article className="gap-3 flex flex-col items-center justify-center bg-white/60 border-2 border-white rounded-2xl p-2 backdrop-blur-lg shadow-xl z-10 ">
            <img src={image} className="rounded-xl shadow-2xl h-100 lg:h-80 w-65" />
            <button className="bg-white/60 border-2 border-white rounded-2xl w-6/7 text-gray-700 font-bold cursor-pointer hover:scale-110 transition-transform shadow-2xl"
                onClick={() => {
                    navigate(`/ebook/${id}/${authorId}`)
                }}
            >
                VER MÁS
            </button>
            <button
                onClick={onHandleCheckSession}
                className="text-white bg-[#316b9d] rounded-2xl p-1 font-semibold w-6/7 cursor-pointer mb-4 hover:scale-110 transition-transform">
                AGREGAR AL CARRITO
            </button>
            {isUser && (
                <div className="flex flex-col items-center text-center fixed bg-white/70">
                    <p className="text-lg lg:text-sm text-orange-800 lg">Por favor inicia sesión o regístrate para poder comprar alguno de nuestros E-books.</p>
                    <a href="/auth" className="underline text-blue-800">Iniciar sesión o Registrarme</a>
                </div>
            )}
        </article>
    );
};

export default EBookCard;