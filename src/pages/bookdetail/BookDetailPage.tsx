import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Ebook } from "../../interfaces/books.interfaces";
import { useGet } from "../../hooks/public/useGet";
import { apiLitHubBooks, apiLitHubBooksByAutor, apiLitHubCheckoutSessionCart, apiLitHubCoversBooks } from "../../constants/rutas.constants";
import Header from "../home/components/Header";
import sinportada from '/sinportada.png';
import { BooksByAuthor } from "./components/BooksByAuthor";
import { AddBuyBook } from "./components/AddBuyBook";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../hooks/public/usePost.hook";
import { useCart } from "../../context/CartContext";
import { CartApp } from "../cart/CartApp";
import { useLibrary } from "../../context/LibraryContext";

export default function BookDetail() {

    const { id, authorId } = useParams();

    const { library } = useLibrary();
    const { cart } = useCart();

    const { data, error, isLoading } = useGet<Ebook[]>(`${apiLitHubBooks}/${id}`);

    const [book, setBook] = useState<Ebook>();
    const { data: dataByA} = useGet<Ebook[]>(`${apiLitHubBooksByAutor}/${authorId}`);

    const [isNotUserBuy, setIsNotUserBuy] = useState(true);
    const [isNotUserAdd, setIsNotUserAdd] = useState(true);

    const [isCart, setIsCart] = useState(false);

    const inLibrary = library.some((b) => Number(b.bookId) === Number(book?.id));
    const inCart = cart.some((b) => Number(b.id) === Number(book?.id));
    const disableAddButton = inLibrary || inCart;

    const [bookByAuthor, setBookByAuthor] = useState<Ebook[] | null>(null);

    useEffect(() => {
        if (data && data.length > 0) {
            setBook(data[0]);
        }
    }, [data, dataByA]);

    useEffect(() => {
        if (dataByA && dataByA.length > 0) {
            setBookByAuthor(dataByA);
        }
    }, [dataByA]);



    const { user } = useAuth();
    const { addToCart } = useCart();
    const [ setResponse] = useState<any>(null);

    const { postData } = usePost(apiLitHubCheckoutSessionCart);

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
                    bookId: book?.id
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

    const onAddBook = () => {
        if (!user) {
            setIsNotUserAdd(true);
        } else {
            setIsNotUserAdd(false);
            if (book) {
                addToCart(book);
            }
        }
    }

    if (error) return <p>Error al cargar libro {error}</p>;
    if (isLoading) return <p>Cargando libro...</p>;

    return (
        <div className="min-h-screen bg-gray-200 text-gray-800 px-4 md:px-6 lg:px-8  font-sans">
            <Header
                isCart={isCart}
                onHandleCart={() => { setIsCart(!isCart) }}
                isComplete={false} />
            {isCart && (
                <CartApp />
            )}


            <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            </header>

            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr_300px] gap-8">
                <div className="flex flex-col items-center bg-white rounded-lg shadow p-4">
                    <img
                        src={book?.cover ? `${apiLitHubCoversBooks}${book.cover}` : sinportada}
                        alt={book?.title}
                        className="rounded-lg shadow mb-4 w-3/4 md:w-full lg:w-full object-cover"
                    />
                    <h3 className="text-lg font-medium text-center">{book?.title}</h3>
                    <p className="text-sm text-gray-500 text-center">
                        Por {book?.author.apellidoPaterno} {book?.author.apellidoMaterno} {book?.author.nombre}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2">{book?.title}</h2>
                    <p className="text-gray-600 mb-3">
                        {book?.author.nombre} {book?.author.apellidoPaterno} {book?.author.apellidoMaterno}
                    </p>


                    <p className="text-2xl font-bold mb-4 text-gray-900">${book?.price}</p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <button
                            onClick={onAddBook}
                            disabled={disableAddButton}
                            className={`bg-orange-500 text-white px-4 py-2 rounded-md transition
        ${disableAddButton ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-400"}`}
                        >
                            {inLibrary ? "YA EN TU BIBLIOTECA" : inCart ? "YA EN EL CARRITO" : "Agregar al carrito"}
                        </button>
                    </div>
                    {isNotUserBuy || isNotUserAdd && (
                        <div>
                            <p className="text-sm text-orange-700">Por favor inicia sesión o regístrate para poder comprar alguno de nuestros E-books.</p>
                            <a href="/auth" className="underline text-blue-800">Iniciar sesión o Registrarme</a>
                        </div>)
                    }

                    <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                        {book?.sinopsis}
                    </p>

                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-10">
                        {
                            book && (
                                <div>
                                    <strong className="text-gray-700">Género:</strong>{" "}
                                    {book.genres?.length > 0
                                        ? book.genres.map(gen => gen.name).join(", ")
                                        : "Sin género"}
                                </div>
                            )
                        }

                        <div>
                            <strong className="text-gray-700">Lenguaje:</strong> {book?.idioma}
                        </div>
                        <div>
                            <strong className="text-gray-700">Formato:</strong> PDF
                        </div>
                    </div>

                </div>

                {book && (
                    <AddBuyBook
                        title={book?.title}
                        price={book?.price}
                        bookId={book?.id}
                        book={book}
                    />
                )}

            </div>


            {/* Ebooks del autor */}
            {dataByA ? (
                <BooksByAuthor
                    bookByAuthor={bookByAuthor}
                    sinportada={sinportada}
                    authorId={authorId}
                />
            ) : (
                <div>No hay ebooks</div>
            )}

            <div className="lg:hidden bg-white mt-8 p-5 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Opciones de compra</h3>
                <p className="text-xl font-bold mb-4 text-gray-900">${book?.price}</p>
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
            </div>
        </div>
    );
}


