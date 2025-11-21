import { useNavigate } from "react-router-dom";
import type { Ebook } from "../../../interfaces/books.interfaces";
import { apiLitHubCoversBooks } from "../../../constants/rutas.constants";

type BooksAuthorProps = {
    bookByAuthor: Ebook[] | null;
    sinportada: string,
    authorId: string | undefined
}


export function BooksByAuthor({ bookByAuthor, sinportada, authorId }: BooksAuthorProps) {
    const navigate = useNavigate();
    return (
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
    );
}