import { useNavigate } from "react-router-dom";

export default function AboutPage() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-blue-50 text-gray-800 px-4 sm:px-6 lg:px-16 py-12">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
                    Bienvenido a LitHub
                </h1>
                <p className="text-md sm:text-lg lg:text-xl text-blue-400 mt-2">
                    Un espacio para escritores independientes y amantes de las historias
                </p>
            </header>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Texto */}
                <div className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500">
                        ¿Qué es LitHub?
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg">
                        LitHub nace de la idea de dar un espacio a escritores independientes
                        para compartir sus escritos de manera libre y segura. Aquí no necesitas
                        tener un libro completo; puedes exponer poemas, relatos cortos,
                        fragmentos o cualquier forma de expresión escrita.
                    </p>
                    <p className="text-gray-700 text-base sm:text-lg">
                        Queremos que los escritores tengan la confianza de mostrar su talento
                        y que los lectores descubran nuevas voces y perspectivas únicas. LitHub
                        celebra la creatividad, la diversidad de estilos y la pasión por contar
                        historias.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <div className="bg-blue-100 p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-blue-600 text-lg">Para escritores</h3>
                            <p className="text-gray-700 text-sm">
                                Publica tus escritos de manera libre y segura, recibe feedback y hazte
                                visible en la comunidad. Si quieres ser parte de esto puedes escribir a
                                <p className="font-bold"> lithub.digital@gmail.com </p> para asignarte un cuenta de autor.
                            </p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-blue-600 text-lg">Para lectores</h3>
                            <p className="text-gray-700 text-sm">
                                Descubre historias únicas, poesía y relatos cortos de escritores
                                independientes de todo el mundo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Imagen */}
                <div className="flex justify-center">
                    <img
                        src='/logoS.png'
                        alt="Escritura creativa"
                        className="rounded-2xl shadow-lg w-full max-w-md object-cover"
                    />
                </div>
            </div>

            {/* Sección final */}
            <section className="mt-16 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 mb-4">
                    Únete a la comunidad
                </h2>
                <p className="text-gray-700 text-base sm:text-lg mb-6">
                    Si eres escritor, este es tu espacio. Si eres lector, este es tu lugar
                    para descubrir nuevas historias. LitHub es para todos los amantes de la palabra.
                </p>
                <a

                    onClick={() => {
                        navigate("/auth", {
                            state: {
                                sesion: "register"
                            }
                        }
                        )
                    }}
                    className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-400 transition cursor-pointer"
                >
                    Comenzar ahora
                </a>
            </section>
        </div>
    );
}
