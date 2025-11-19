import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Ebook } from "../../interfaces/books.interfaces";
import { useGet } from "../../hooks/public/useGet";
import { apiLitHubBooks, apiLitHubBooksByAutor, apiLitHubCoversBooks } from "../../constants/rutas.constants";
import Header from "../home/components/Header";
import sinportada from '/sinportada.png';

export default function BookDetail() {

    const navigate = useNavigate();

    const { id, authorId } = useParams();

    const { data, error, isLoading } = useGet<Ebook[]>(`${apiLitHubBooks}/${id}`);

    const [book, setBook] = useState<Ebook | null>(null);
    const { data: dataByA, error: errorByA, isLoading: isLoadingByA } = useGet<Ebook[]>(`${apiLitHubBooksByAutor}/${authorId}`);

    useEffect(() => {
        console.log(`${apiLitHubBooksByAutor}/${id}/${authorId}`)
    }, [authorId])

    const [bookByAuthor, setBookByAuthor] = useState<Ebook[] | null>(null);

    useEffect(() => {
        if (data && data.length > 0) {
            setBook(data[0]);
            console.log(book);
        }
    }, [data, dataByA]);

    useEffect(() => {
        if (dataByA && dataByA.length > 0) {
            setBookByAuthor(dataByA);
        }
    }, [dataByA]);

    if (error) return <p>Error al cargar libro {error}</p>;
    if (isLoading) return <p>Cargando libro...</p>;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 px-4 md:px-6 lg:px-8 py-6 font-sans">
            <Header isComplete={false} />

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

                    <div className="flex items-center mb-3">
                        <span className="text-yellow-400 text-lg mr-1">★★★★★</span>
                        <span className="text-sm text-gray-500">12,345 calificaciones</span>
                    </div>

                    <p className="text-2xl font-bold mb-4 text-gray-900">${book?.price}</p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-400 transition">
                            Agregar al carrito
                        </button>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                        {book?.sinopsis}
                    </p>

                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-10">
                        <div>
                            <strong className="text-gray-700">Género:</strong> Ficción
                        </div>
                        <div>
                            <strong className="text-gray-700">Lenguaje:</strong> {book?.idioma}
                        </div>
                        <div>
                            <strong className="text-gray-700">Formato:</strong> .EPUB y PDF
                        </div>
                    </div>

                </div>

                <div className="hidden lg:block bg-white p-5 rounded-lg h-fit shadow sticky top-6">
                    <h3 className="text-lg font-semibold mb-2">{book?.title}</h3>
                    <p className="text-xl font-bold mb-4 text-gray-900">${book?.price}</p>
                    <button className="bg-orange-500 text-white w-full py-2 rounded-md mb-3 hover:bg-orange-400 transition">
                        Comprar ahora
                    </button>
                    <button className="bg-gray-200 w-full py-2 rounded-md hover:bg-gray-300 transition mb-4 text-gray-800">
                        Agregar al carrito
                    </button>
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

            </div>

            <div className="mt-6">
                <h3 className="text-xl font-bold mb-3">Comentarios</h3>
                <div className="gap-2  overflow-scroll flex max-w-screen no-scrollbar">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 3].map((num, index) =>
                        <div className="min-w-55 bg-gray-100 rounded-lg " key={index}>
                            <p className="text-lg text-gray-700 font-bold mb-1">
                                Jane Smith ⭐⭐⭐⭐⭐
                            </p>
                            <p className="text-sm text-gray-600">
                                “Un libro bellamente escrito que te hace reflexionar sobre las
                                decisiones en la vida y las infinitas posibilidades.”
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Ebooks del autor */}
            {dataByA ? (
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-3 ">Más libros del autor</h3>
                    <div className="overflow-x-auto no-scrollbar flex gap-4 pb-3">
                        {bookByAuthor?.map((b) => (
                            <div
                                key={b.id}
                                className="w-35  flex-shrink-0"
                                onClick={() => {
                                    navigate(`/ebook/${b.id}/${authorId}`)
                                }}>
                                <img
                                    src={b?.cover ? `${apiLitHubCoversBooks}${b.cover}` : sinportada}
                                    alt={b.title}
                                    className="rounded-md mb-2 shadow-md w-full h-55 object-cover"
                                />
                                <p className="text-sm text-gray-700">{b.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>No hay ebooks</div>
            )}

            <div className="lg:hidden bg-white mt-8 p-5 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Opciones de compra</h3>
                <p className="text-xl font-bold mb-4 text-gray-900">${book?.price}</p>
                <button className="bg-orange-500 text-white w-full py-2 rounded-md mb-3 hover:bg-orange-400 transition">
                    Comprar ahora
                </button>
                <button className="bg-gray-200 w-full py-2 rounded-md hover:bg-gray-300 transition mb-4 text-gray-800">
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
