import { useRef } from "react";
import UserSesion from "./UserSesion";
import Browser from "./Browser";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { CartApp } from "../../cart/CartApp";

type Props = {
    onToggle?: () => void;
    onHandleSearch?: () => void;
    onHandleSesion?: () => void;
    onHandleCart?: () => void;
    isSesion?: boolean;
    isCart?: boolean;
    isComplete: boolean;
};

function Header({ onToggle, onHandleSearch, onHandleSesion, onHandleCart, isSesion, isComplete = true, isCart }: Props) {
    const headerRef = useRef<HTMLElement>(null);
    const { user } = useAuth();
    const { cart } = useCart();

    const navigate = useNavigate();
    if (!isComplete) {
        return (
            <header
                ref={headerRef}
                className=" sticky flex flex-col top-0 bg-gray-200 z-80  w-full items-center md:items-end">
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

                        <div

                            className="relative group inline-block">
                            <button
                                onClick={onHandleCart}>
                                <svg className="hover:scale-110 transition-transform cursor-pointer h-10 w-10 hidden lg:block md:block ">
                                    <use xlinkHref="/sprite.svg#icon-cart" />
                                </svg>
                            </button>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 rounded-sm text-white p-1 mt-2 w-24 text-center">
                                Ver carrito
                            </span>
                            {user && (
                                <div
                                    className="rounded-full w-4 h-4 bg-blue-800 absolute top-0 right-0 -mt-3 hidden md:block lg:block text-sm text-white">
                                    <p className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{cart.length}</p>
                                </div>
                            )}
                        </div>



                        {/* --- Iconos móviles --- */}
                        <div className="flex md:hidden  gap-3 relative">

                            <button
                                className=""
                                onClick={onHandleCart}>
                                <svg className="w-7 h-7 text-black">
                                    <use xlinkHref="/sprite.svg#icon-cart" />
                                </svg>
                                {user && (
                                    <div
                                        className="md:hidden lg:hidden rounded-full w-5 h-5 bg-blue-800  top-0 right-0 -mt-5 text-sm text-white absolute">
                                        <p className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{cart.length}</p>
                                    </div>
                                )}
                            </button>

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
                            href="/acerca-lithub"
                            className="text-xl font-semibold cursor-pointer hidden md:block lg:block"
                        >
                            Sobre LitHub
                        </a>

                        <div className="relative group inline-block">
                            <div className="relative">
                                <button
                                    className=""
                                    onClick={onHandleCart}>
                                    <svg className="hover:scale-110 transition-transform cursor-pointer h-10 w-10 hidden lg:block md:block">
                                        <use xlinkHref="/sprite.svg#icon-cart" />
                                    </svg>
                                    {user && (
                                        <div
                                            className="hidden rounded-full w-5 h-5 bg-blue-800 absolute top-0 right-0 -mt-4  lg:block text-sm text-white">
                                            <p>{cart.length}</p>
                                        </div>
                                    )}
                                </button>
                            </div>
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
                            <button
                                className="relative"
                                onClick={onHandleCart}>
                                <svg
                                    className="w-7 h-7 text-black">
                                    <use xlinkHref="/sprite.svg#icon-cart" />
                                </svg>
                                {user && (
                                    <div
                                        className="md:hidden lg:hidden rounded-full w-4 h-4 bg-blue-800 absolute top-0 right-0 -mt-4  justify-center items-center text-sm text-white">
                                        {cart.length}
                                    </div>
                                )}
                            </button>
                            <button
                                onClick={onHandleSesion}>
                                <svg className="w-7 h-7 text-black">
                                    <use xlinkHref="/sprite.svg#icon-user" />
                                </svg>
                            </button>
                        </div>

                    </nav>
                </div>

                <div
                    className={`fixed hidden md:block lg:block lg:top-30 md:top-30 transition-all duration-500 ease-in-out z-70 ${isSesion ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                    <UserSesion />
                    {user && (
                        <div
                            onClick={() => { navigate('/biblioteca') }}
                            className="mt-2 gap-2 rounded-lg h-10 flex justify-center bg-blue-300">
                            <button className="text-xl font-bold">
                                Ver mi biblioteca
                            </button>
                            <img src="/biblioteca.png" alt="" className="w-12" />
                        </div>
                    )}
                </div>

                <div
                    className={`fixed hidden md:block lg:block border-gray-300 lg:top-30 md:top-30 transition-all duration-500 ease-in-out z-70 rounded-lg ${isCart ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                    <CartApp />
                </div>

            </header>
        );
    }

};

export default Header;
