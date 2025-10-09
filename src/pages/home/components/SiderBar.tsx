import { useEffect, useRef, useState } from "react";
import { generos, autores } from "../../../data";

function SiderBar() {

    const containerRef = useRef<HTMLDivElement>(null);
    const [isTall, setIsTall] = useState(false);

    const [isCateries, setIsCategories] = useState(false);
    const [isAutor, setIsAutor] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        setIsTall(el.scrollHeight > el.clientHeight);
    }, [isCateries, isAutor]);

    const handleCsroll = () => {
        const el = containerRef.current;

        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;
        if (scrollTop >= (scrollHeight - clientHeight)) {
            setIsTall(false);
        } else {
            setIsTall(true);
        }
    }

    return (
        <nav className="sticky top-20 lg:top-32 md:top-32 flex flex-col rounded-xl p-6  text-xl font-sans h-120 md:h-150 border border-gray-300 bg-gray-200 md:bg-white">

            <div ref={containerRef} onScroll={handleCsroll} className="h-100 md:h-120  overflow-y-scroll gap-3 no-scrollbar">
                <p className="font-semibold text-2xl">
                    Inicio
                </p>

                <div className="flex flex-col">

                    <div className="flex items-center gap-3">
                        <p className="font-semibold text-2xl">Generos</p>
                        <svg className="w-5 h-5 text-black cursor-pointer" onClick={() => { setIsCategories(!isCateries) }}>
                            <use xlinkHref={isCateries ? "/sprite.svg#chevronup-icon" : "/sprite.svg#chevrondown-icon"} />
                        </svg>
                    </div>

                    {isCateries && (
                        <aside className="ml-3">
                            <ul className="flex flex-col gap-2">
                                {generos.map((genero) =>
                                    <li className="border rounded-xl p-1">{genero.nombre}</li>
                                )}
                            </ul>
                        </aside>
                    )}

                </div>

                <div className="flex flex-col">

                    <div className="flex items-center">
                        <p className="font-semibold text-2xl">Autores</p>
                        <svg className="w-5 h-5 text-black cursor-pointer" onClick={() => { setIsAutor(!isAutor) }}>
                            <use xlinkHref={isAutor ? "/sprite.svg#chevronup-icon" : "/sprite.svg#chevrondown-icon"} />
                        </svg>
                    </div>

                    {isAutor && (
                        <aside className="ml-3">
                            <ul className="flex flex-col gap-2">
                                {autores.map((autor) =>
                                    <li className="border rounded-xl p-1">{autor.nombre}</li>
                                )}
                            </ul>
                        </aside>
                    )}

                </div>

                <div>
                    <p className="font-semibold text-2xl cursor-pointer">Más comprado</p>
                </div>

                <div>
                    <p className="font-semibold text-2xl cursor-pointer">Mejor calificado</p>
                </div>

            </div>
            {isTall && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <svg className="w-7 h-7 text-gray-500 animate-bounce">
                        <use xlinkHref="/sprite.svg#arrow-down" />
                    </svg>
                </div>
            )}

        </nav>

    );
}

export default SiderBar;

