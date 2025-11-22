
import { useSearch } from "../../../context/SearchContext";

type Props = {
    isMovil?: boolean,
    isSearchP: boolean,
    isVisibleP: boolean
}


function Browser({ isMovil, isSearchP, isVisibleP }: Props) {
    const { setSearch } = useSearch();

    return (
        <>
            {isMovil ? (

                <div
                    className={`lg:hidden md:hidden flex justify-center mt-4 z-80 transition-all duration-500 ease-in-out  ${isSearchP && !isVisibleP ? "opacity-100 max-h-full" : "opacity-0 max-h-0 overflow-hidden"}`}>

                    <div className="lg:hidden md:hidden w-full bg-white rounded-2xl shadow-2xl">

                        <div className="flex rounded-2xl items-center pl-2 pr-2">

                            <svg className="w-8 h-8">
                                <use xlinkHref="/sprite.svg#icon-search" />
                            </svg>

                            <input
                                onChange={(e) => { setSearch(e.target.value) }}
                                type="text"
                                placeholder="Buscar..."
                                className="p-3 lg:w-110 w-full focus:outline-none focus:ring-0"
                                title="Escribe palabras clave de tu interés"
                            />

                        </div>

                    </div>

                </div>

            ) : (

                <div className="hidden md:flex items-center border rounded-2xl pl-1 pr-1  md:ml-10">
                    <svg className="w-9 h-9 text-gray-600">
                        <use xlinkHref="/sprite.svg#icon-search" />
                    </svg>

                    <input
                        type="text"
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder="Buscar..."
                        className="p-3 lg:w-110 focus:outline-none focus:ring-0"
                        title="Escribe palabras clave de tu interés"
                    />

                </div>

            )}
        </>
    )
}


export default Browser;