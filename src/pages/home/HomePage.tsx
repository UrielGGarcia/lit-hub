import Header from "./components/Header";
import { useEffect, useState, useRef } from "react";
import SiderBar from "./components/SiderBar";
import { Books } from "../../data";
import EBookCard from "./components/EBookCard";

function HomePage() {

    const [isVisible, setIsVisible] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [isHeader, setIsHeader] = useState<number>(0)

    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect();

            console.log(rect.top);
            setIsHeader(rect.height);
        }
    });

    useEffect(() => {
        if (isVisible && window.innerWidth < 768) { 
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [isVisible]);



    return (

        <div className="w-full max-w-xl-plus mx-auto flex flex-col bg-gray-200 ">

            {isVisible && (
                <div className="fixed w-full h-full bg-black/40 z-60 lg:hidden" onClick={() => { setIsVisible(false) }} />
            )}

            <div style={{ height: isHeader + 16 }} className="w-full bg-gray-200 fixed z-50" />

            <div className="p-4">
                <Header
                    ref={headerRef}
                    onToggle={() => { setIsVisible(!isVisible), setIsSearch(false) }}
                    onHandleSearch={() => { setIsSearch(!isSearch), setIsVisible(false) }} />

                <div
                    className={`flex justify-center fixed left-1/2 -translate-x-1/2 w-7/8 top-22 z-60 transition-all duration-500 ease-in-out  ${isSearch && !isVisible ? "opacity-100 max-h-full" : "opacity-0 max-h-0 overflow-hidden"}`}>

                    <div className="lg:hidden md:hidden w-full bg-white rounded-2xl shadow-2xl">

                        <div className="flex rounded-2xl items-center pl-2 pr-2">

                            <svg className="w-8 h-8">
                                <use xlinkHref="/sprite.svg#icon-search" />
                            </svg>

                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="p-3 lg:w-110 w-full focus:outline-none focus:ring-0"
                                title="Escribe palabras clave de tu interés"
                            />

                            <div className="relative group inline-block">
                                <svg className="w-7 h-7 text-gray-700 cursor-pointer">
                                    <use xlinkHref="/sprite.svg#icon-filter" />
                                </svg>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                    Filtrar resultados
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="flex gap-6  rounded-xl mt-5">

                    <div className={`fixed lg:static transition-all duration-500 ease-in-out z-70 ${isVisible ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                        <SiderBar />
                    </div>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 p-6">
                        {Books.map((book) =>
                            <EBookCard image={book.urlImg} />
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default HomePage;
