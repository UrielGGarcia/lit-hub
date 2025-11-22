import { useAuth } from "../../context/AuthContext";
import { apiLitHubBooks, apiLitHubCoversBooks, apiLitHubDownload } from "../../constants/rutas.constants";
import sinportada from '/sinportada.png';
import { useGetWithHeaders } from "../../hooks/private/useGetWithHeader";


interface Book {
    bookId: number;
    title: string;
    sinopsis: string;
    cover: string;
    author?: string;
}

export default function BibliotecaApp() {
    const { user, token } = useAuth();

    const { data: books, isLoading } = useGetWithHeaders<Book[]>(
        user?.id ? `${apiLitHubBooks}/mybooks/${user.id}` : null,
        { headers: { Authorization: `Bearer ${token}` } }
    );


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
                <p className="animate-pulse text-xl">Cargando biblioteca...</p>
            </div>
        );
    }

    if (!books || books.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white text-center p-6">
                <h1 className="text-2xl font-bold mb-2">Tu biblioteca está vacía 📭</h1>
                <p className="text-gray-400">Aún no has comprado ningún libro.</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-10 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">📚 Mi Biblioteca</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books?.map((book: Book) => (
                    <div
                        key={book.bookId}
                        className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                        <img
                            src={book.cover ? `${apiLitHubCoversBooks}${book.cover}` : sinportada}
                            alt={book.title}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-4 flex flex-col">
                            <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                            {book.author && <p className="text-sm text-gray-400 mb-2">{book.author}</p>}
                            <p className="text-sm text-gray-300 line-clamp-3 flex-1">{book.sinopsis}</p>
                            <button
                                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
                                onClick={async () => {
                                    try {
                                        const res = await fetch(`${apiLitHubDownload}/${book.bookId}`, {
                                            method: 'GET',
                                            headers: { Authorization: `Bearer ${token}` },
                                        });
                                        if (!res.ok) throw new Error('Error descargando el libro');

                                        const blob = await res.blob();
                                        const url = window.URL.createObjectURL(blob);

                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = book.title + '.pdf';
                                        document.body.appendChild(link);
                                        link.click();
                                        link.remove();
                                        window.URL.revokeObjectURL(url);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                            >
                                Descargar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
