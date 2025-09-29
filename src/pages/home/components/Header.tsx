import { forwardRef } from "react";

type Props = {
    onToggle: () => void;
    onHandleSearch: () => void;
}

const Header = forwardRef<HTMLDivElement, Props>(
    ({ onToggle, onHandleSearch }, ref) => {

        return (
            <div
                ref={ref}
                className="flex sticky top-4 items-center w-full justify-center shadow-xl  pl-6 pr-6 rounded-xl bg-white z-760 ">
                <div className="flex-col w-full">
                    <div className="flex items-center gap-4 justify-between">

                        <div className="flex items-center">
                            <button>
                                <svg className="cursor-pointer  w-9 h-9" onClick={onToggle}>
                                    <use href="/sprite.svg#menu" />
                                </svg>
                            </button>
                            <a href="/">
                                <img src="/Logo.png" alt="" className="lg:w-30 w-15 cursor-pointer" />
                            </a>
                        </div>

                        <div className="flex lg:hidden md:hidden  ">
                            <svg className="w-7 h-7 text-black mr-7" onClick={onHandleSearch}>
                                <use xlinkHref="/sprite.svg#icon-search" />
                            </svg>
                            <svg className="w-7 h-7 text-black ">
                                <use xlinkHref="/sprite.svg#icon-cart" />
                            </svg>
                            <svg className="w-7 h-7 text-black ">
                                <use xlinkHref="/sprite.svg#icon-user" />
                            </svg>
                        </div>

                    </div>

                </div>


                <div className="flex  gap-7 items-center">

                    <div className="hidden lg:block">

                        <div className="flex border rounded-2xl items-center pl-1 pr-1">
                            <svg className="w-9 h-9">
                                <use xlinkHref="/sprite.svg#icon-search" />
                            </svg>
                            <input type="text" name="" id="" placeholder="Buscar..." className="p-3 lg:w-110 focus:outline-none focus:ring-0" title="Escribe palabras clave de tu interés" />

                            <div className="relative group inline-block">
                                <svg className="w-8 h-8 text-gray-700 cursor-pointer">
                                    <use xlinkHref="/sprite.svg#icon-filter" />
                                </svg>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                    Filtrar resultados
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center gap-4">

                        <a href="about-us" className={"text-xl font-semibold cursor-pointer hidden lg:block"}>Sobre LitHub</a>

                        <div className="relative group inline-block">
                            <svg className="hover:scale-110 transition-transform cursor-pointer h-10 w-10 hidden lg:block">
                                <use xlinkHref="/sprite.svg#icon-cart" />
                            </svg>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 rounded-sm text-white p-1 mt-2 w-24 text-center">Ver carrito</span>
                        </div>

                        <svg className="w-13 h-13  cursor-pointer hover:scale-110 transition-transform hidden lg:block">
                            <use xlinkHref="/sprite.svg#icon-user" />
                        </svg>

                    </div>

                </div>

            </div>
        )
    }
);

export default Header;