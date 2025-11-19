import { useRef } from "react";
import UserSesion from "./UserSesion";
import Browser from "./Browser";

type Props = {
    onToggle?: () => void;
    onHandleSearch?: () => void;
    onHandleSesion?: () => void;
    isSesion?: boolean;
    isComplete: boolean;
};

function Header({ onToggle, onHandleSearch, onHandleSesion, isSesion, isComplete = true }: Props) {
    const headerRef = useRef<HTMLElement>(null);
    if (!isComplete) {
        return (
            <header
                ref={headerRef}
                className=" sticky flex flex-col top-0 bg-gray-50 z-80  w-full items-center md:items-end">
                <div
                    className="mt-4 flex items-center w-full md:h-22 justify-between shadow-xl/15 pl-6 pr-6 rounded-xl bg-white z-760 border border-gray-300"
                >

                    {/* --- Lado izquierdo: logo y menú --- */}
                    <div className="flex items-center gap-4">

                        <a href="/" aria-label="Ir al inicio">
                            <img src="/Logo.png" alt="Logo de LitHub" className="lg:w-30 w-15 cursor-pointer" />
                        </a>
                    </div>


                    {/* --- Navegación principal --- */}
                    <nav className="flex items-center gap-4">

                        <div className="relative group inline-block">
                            <svg className="hover:scale-110 transition-transform cursor-pointer h-10 w-10 hidden lg:block md:block">
                                <use xlinkHref="/sprite.svg#icon-cart" />
                            </svg>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 rounded-sm text-white p-1 mt-2 w-24 text-center">
                                Ver carrito
                            </span>
                        </div>



                        {/* --- Iconos móviles --- */}
                        <div className="flex md:hidden  gap-3">

                            <svg className="w-7 h-7 text-black">
                                <use xlinkHref="/sprite.svg#icon-cart" />
                            </svg>

                        </div>

                    </nav>
                </div>


            </header>
        )
    }
    if (isComplete) {
        return (
            <header
                ref={headerRef}
                className="sticky flex flex-col top-0 bg-gray-200 z-50  w-full items-center md:items-end">
                <div
                    className="mt-4 flex items-center w-full md:h-22 justify-between shadow-xl/15 pl-6 pr-6 rounded-xl bg-white z-760 border border-gray-300"
                >

                    {/* --- Lado izquierdo: logo y menú --- */}
                    <div className="flex items-center">
                        <button
                            onClick={onToggle}
                            aria-label="Abrir menú lateral"
                            className="cursor-pointer"
                        >
                            <svg className="w-9 h-9 cursor-pointer">
                                <use xlinkHref="/sprite.svg#menu" />
                            </svg>
                        </button>

                        <a href="/" aria-label="Ir al inicio">
                            <img src="/Logo.png" alt="Logo de LitHub" className="lg:w-30 w-15 cursor-pointer" />
                        </a>
                    </div>

                    {/* --- Barra de búsqueda (visible solo en escritorio) --- */}
                    <Browser
                        isMovil={false}
                        isVisibleP={false}
                        isSearchP={false}
                    />

                    {/* --- Navegación principal --- */}
                    <nav className="flex items-center gap-4">
                        <a
                            href="/about-us"
                            className="text-xl font-semibold cursor-pointer hidden md:block lg:block"
                        >
                            Sobre LitHub
                        </a>

                        <div className="relative group inline-block">
                            <svg className="hover:scale-110 transition-transform cursor-pointer h-10 w-10 hidden lg:block md:block">
                                <use xlinkHref="/sprite.svg#icon-cart" />
                            </svg>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 rounded-sm text-white p-1 mt-2 w-24 text-center">
                                Ver carrito
                            </span>
                        </div>

                        <button onClick={onHandleSesion}>
                            <svg className="w-13 h-13 cursor-pointer hover:scale-110 transition-transform hidden lg:block md:block">
                                <use xlinkHref="/sprite.svg#icon-user" />
                            </svg>
                        </button>

                        {/* --- Iconos móviles --- */}
                        <div className="flex md:hidden  gap-3">
                            <svg
                                className="w-7 h-7 text-black"
                                onClick={onHandleSearch}
                            >
                                <use xlinkHref="/sprite.svg#icon-search" />
                            </svg>
                            <svg className="w-7 h-7 text-black">
                                <use xlinkHref="/sprite.svg#icon-cart" />
                            </svg>
                            <svg className="w-7 h-7 text-black"
                                onClick={onHandleSesion}>
                                <use xlinkHref="/sprite.svg#icon-user" />
                            </svg>
                        </div>

                    </nav>
                </div>

                <div
                    className={`fixed hidden md:block lg:block lg:top-30 md:top-30 transition-all duration-500 ease-in-out z-70 ${isSesion ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                    <UserSesion />
                </div>

            </header>
        );
    }

};

export default Header;
