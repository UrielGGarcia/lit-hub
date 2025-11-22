export default function Footer() {
    return (
        <footer className="relative bg-sky-100 text-sky-900 mt-20 ">

            {/* Onda sobrepuesta */}
            <div className="absolute -top-24 left-0 w-full  mx-auto overflow-hidden leading-none ">
                <svg
                    className="relative block w-[150%] h-24 -scale-y-100  bg-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86
               82.39-16.72 168.19-17.73 250.45-.39
               56.26 11.79 108.64 31.3 164.93 42.89
               48.05 9.91 96.5 10.7 145.31 2.11V0H0v27.35
               a600.21 600.21 0 00321.39 29.09z"
                        className="fill-sky-100"
                    ></path>
                </svg>
            </div>

            {/* Contenido real del footer */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

                    {/* Logo / Marca */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-wide">LitHub</h2>
                        <p className="mt-3 text-sm text-gray-600">
                            Tu biblioteca digital de historias únicas, creadas por autores independientes.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quejas, sugerencias o dudas</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:underline cursor-pointer">Contacto</li>
                        </ul>
                    </div>

                </div>

                <div className="my-8 border-t border-sky-200"></div>

                <p className="text-center text-xs text-gray-600">
                    © {new Date().getFullYear()} LitHub. Todos los derechos reservados.
                </p>

            </div>

        </footer>
    )
}
