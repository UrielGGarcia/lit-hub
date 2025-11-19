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



function HomePage() {
    const [isVisible, setIsVisible] = useState(window.innerWidth < 835 ? false : true);
    const [isSearch, setIsSearch] = useState(false);
    const [isSesion, setIsSesion] = useState(false);
    const [isSidebarSections, setIsSidebarSections] = useState<SiderBarSection<any>[] | null>(null);

    const { search } = useSearch();

    const { data, isLoading, error } = useGet<Ebook[]>(apiLitHubBooks);
    const { data: dataG, isLoading: isLoadingG, error: errorG } = useGet<Genre[]>(apiLitHubGenres);
    const { data: dataA, isLoading: isLoadingA, error: errorA } = useGet<Author[]>(apiLitHubAuthors);


    const filteredBooks = data?.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const sections: (SiderBarSection<any>)[] = [];

        if (dataG) {
            sections.push({
                id: 1,
                title: "Géneros",
                items: dataG,
                renderItem: item => <span key={item.id}>{item.name}</span>
            });
        }

        if (dataA) {
            sections.push({
                id: 2,
                title: "Autores",
                items: dataA,
                renderItem: item => <span>{item.nombre}</span>
            });
        }

        setIsSidebarSections(sections.length > 0 ? sections : null);
    }, [dataG, dataA]);


    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isVisible && window.innerWidth < 640);
    }, [isVisible]);


    return (

        <div className="w-full max-w-xl-plus mx-auto flex flex-col bg-gray-200 items-center min-h-200">

            <Delay
                isSesionP={isSesion}
                isVisibleP={isVisible}
                onHandleSesion={() => { setIsSesion(false) }}
                onHandleVisble={() => { setIsVisible(false) }}
            />

            <div
                className={`lg:hidden md:hidden top-25 fixed  transition-all duration-600 ease-in-out z-70 overflow-hidden ${isSesion ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}`}>
                <UserSesion />
            </div>

            <div className="pl-5 pr-5">

                <Header
                    isSesion={isSesion}
                    isComplete={true}
                    onHandleSesion={() => { setIsSesion(!isSesion), setIsSearch(false) }}
                    onToggle={() => { setIsVisible(!isVisible), setIsSearch(false) }}
                    onHandleSearch={() => { setIsSearch(!isSearch) }} />

                <Browser
                    isMovil={true}
                    isSearchP={isSearch}
                    isVisibleP={isVisible}
                />

                <div className="flex gap-6  rounded-xl mt-5">

                    <div className={`fixed md:static transition-all duration-500 ease-in-out z-70 ${isVisible ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                        {isLoadingG || isLoadingA ? (
                            <p>Cargando categorías...</p>
                        ) : errorG || errorA ? (
                            <p>Error al cargar las categorías.</p>
                        ) : dataG && dataG.length > 0 || dataA && dataA.length > 0 ? (
                            <SiderBar<any>
                                section={isSidebarSections}
                            />
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
                            {filteredBooks?.map((book) =>
                                <EBookCard key={book.id} id={book.id} authorId={book.author.id} image={book.cover ? `${apiLitHubCoversBooks}${book.cover}` : sinportada} />
                            )}
                        </div>) : (
                        <p className="text-xl  w-full flex text-center justify-center">Sin resultados</p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default HomePage;
