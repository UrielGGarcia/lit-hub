import Header from "./components/Header";
import { useEffect, useState } from "react";
import SiderBar from "./components/SiderBar";
import EBookCard from "./components/EBookCard";
import UserSesion from "./components/UserSesion";
import Browser from "./components/Browser";
import Delay from "../../components/Delay";
import type { Author, Ebook, Genre, SiderBarSection } from "../../interfaces/books.interfaces";
import { apiLitHubCoversBooks, apiLitHubBooks, apiLitHubGenres, apiLitHubAuthors } from "../../constants/rutas.constants";
import sinportada from '/sinportada.png';
import { useGet } from "../../hooks/public/useGet";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartApp } from "../cart/CartApp";
import { useGetWithHeaders } from "../../hooks/private/useGetWithHeader";

function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(window.innerWidth < 835 ? false : true);
    const [isSearch, setIsSearch] = useState(false);
    const [isSesion, setIsSesion] = useState(false);
    const [isCart, setIsCart] = useState<boolean>(false);


    const [isSidebarSections, setIsSidebarSections] = useState<SiderBarSection<any>[] | null>(null);

    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
    const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>([]);

    const { search } = useSearch();

    const { data: books, isLoading, error } = useGet<Ebook[]>(apiLitHubBooks);
    const { token } = useAuth();

    const { data: dataGenres, isLoading: isLoadingG, error: errorG } = useGetWithHeaders<Genre[]>(apiLitHubGenres, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const { data: dataAuthors, isLoading: isLoadingA, error: errorA } = useGetWithHeaders<Author[]>(apiLitHubAuthors, {
        headers: { Authorization: `Bearer ${token}` }
    });


    // Funciones para actualizar filtros
    const toggleGenreFilter = (id: number) => {
        setSelectedGenreIds(prev => prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]);
    };

    const toggleAuthorFilter = (id: number) => {
        setSelectedAuthorIds(prev => prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]);
    };

    // Filtrar libros según búsqueda y filtros
    const filteredBooks = books?.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());

        const matchesGenre = selectedGenreIds.length === 0 || (book.genres?.some(g => selectedGenreIds.includes(g.id)) ?? false);
        const matchesAuthor = selectedAuthorIds.length === 0 || (book.author && selectedAuthorIds.includes(book.author.id));

        return matchesSearch && matchesGenre && matchesAuthor;
    });

    // Construir secciones del Sidebar
    useEffect(() => {
        const sections: SiderBarSection<any>[] = [];

        if (dataGenres) {
            sections.push({
                id: 1,
                title: "Géneros",
                items: dataGenres,
                renderItem: item => (
                    <button
                        key={item.id}
                        className={`px-2 py-1 rounded-lg ${selectedGenreIds.includes(item.id) ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        onClick={() => toggleGenreFilter(item.id)}
                    >
                        {item.name}
                    </button>
                )
            });
        }

        if (dataAuthors) {
            sections.push({
                id: 2,
                title: "Autores",
                items: dataAuthors,
                renderItem: item => (
                    <button
                        key={item.id}
                        className={`px-2 py-1 rounded-lg ${selectedAuthorIds.includes(item.id) ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        onClick={() => toggleAuthorFilter(item.id)}
                    >
                        {item.nombre} {item.apellidoPaterno} {item.apellidoMaterno}
                    </button>
                )
            });
        }

        setIsSidebarSections(sections.length > 0 ? sections : null);
    }, [dataGenres, dataAuthors, selectedGenreIds, selectedAuthorIds]);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", (isVisible || isCart) && window.innerWidth < 640);
    }, [isVisible, isCart]);



    return (
        <div className="w-full max-w-xl-plus mx-auto flex flex-col bg-gray-200 items-center lg:min-h-200 md:min-h-300 ">


            <Delay
                isSesionP={isSesion}
                isVisibleP={isVisible}
                isCartV={isCart}
                onHandleSesion={() => { setIsSesion(false) }}
                onHandleVisble={() => { setIsVisible(false) }}
                onHandleCartV={() => { setIsCart(false) }}
            />

            <div className={`lg:hidden md:hidden top-25 fixed transition-all duration-600 ease-in-out z-70 overflow-hidden ${isSesion ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}`}>
                <UserSesion />
                {user && (
                    <div onClick={() => { navigate('/biblioteca') }} className="mt-2 gap-2 rounded-lg h-10 flex justify-center bg-blue-300">
                        <button className="text-xl font-bold">Ver mi biblioteca</button>
                        <img src="/biblioteca.png" alt="" className="w-12" />
                    </div>
                )}
            </div>

            <div className={`ml-5 mr-5 lg:hidden md:hidden top-25 fixed transition-all duration-600 ease-in-out z-70 overflow-hidden border border-gray-300 rounded-lg ${isCart ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}`}>
                <CartApp />
            </div>


            <div className="pl-5 pr-5">

                <Header
                    isSesion={isSesion}
                    isComplete={true}
                    onHandleSesion={() => {
                        setIsSesion(!isSesion);
                        setIsSearch(false);
                        setIsCart(false);
                    }}
                    onToggle={() => { setIsVisible(!isVisible); setIsSearch(false) }}
                    onHandleSearch={() => {
                        setIsSearch(!isSearch);
                        setIsCart(false);
                        setIsSesion(false);
                    }}
                    onHandleCart={() => {
                        setIsCart(!isCart);
                        setIsSesion(false);
                        setIsSearch(false);
                    }}
                    isCart={isCart}
                />


                <Browser
                    isMovil={true}
                    isSearchP={isSearch}
                    isVisibleP={isVisible}
                />

                <div className="flex gap-6 rounded-xl mt-5">

                    <div className={`fixed md:static transition-all duration-500 ease-in-out z-70 ${isVisible ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                        {isLoadingG || isLoadingA ? (
                            <p>Cargando categorías...</p>
                        ) : errorG || errorA ? (
                            <p>Error al cargar las categorías.</p>
                        ) : isSidebarSections ? (
                            <SiderBar<any> section={isSidebarSections} />
                        ) : (
                            <p>No hay libros disponibles.</p>
                        )}
                    </div>

                    {isLoading ? (
                        <p>Cargando libros...</p>
                    ) : error ? (
                        <p>Error al cargar los libros.</p>
                    ) : filteredBooks && filteredBooks.length > 0 ? (
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-3 pr-3">
                            {filteredBooks.map(book => (
                                <EBookCard
                                    key={book.id}
                                    id={book.id}
                                    authorId={book.author.id}
                                    image={book.cover ? `${apiLitHubCoversBooks}${book.cover}` : sinportada}
                                    book={book}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-xl w-full flex text-center justify-center">Sin resultados</p>
                    )}

                </div>

            </div>


        </div>
    );
}

export default HomePage;
