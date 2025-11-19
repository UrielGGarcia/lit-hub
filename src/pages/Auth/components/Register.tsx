import { useEffect, useState } from "react";
import { usePost } from "../../../hooks/public/usePost.hook";
import { apiLitHubUsers } from "../../../constants/rutas.constants";

type PropsRegister = {
    enviarValor: (valor: boolean) => void;
}

export function Register({ enviarValor }: PropsRegister) {

    // Variables de petición
    const { data, isLoading, error, success, postData } = usePost(apiLitHubUsers);
    const [nombre, setNomombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("CLIENT");

    // Variables de componente
    const [isAlreadyExists, seIsAlreadyExists] = useState("");
    const [isLoadingF, setIsloadingF] = useState(false);
    const [isErrroIn, setErrorIn] = useState("");

    // Evento usando el hook usePost
    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const bodyLogIn = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            password,
            rol
        };

        try {
            await postData(bodyLogIn);
        } catch {
            alert("Error inesperado al crear usuario intente más tarde.");
        }
    };


    useEffect(() => {
        setErrorIn("");
        seIsAlreadyExists("")
        if (error?.includes("ya está asociado")) {
            seIsAlreadyExists(error);
            enviarValor(false);
        }
        if (error?.includes("Error inesperado, inténtalo más tarde.")) {
            setErrorIn(error);
        }
    }, [error]);

    useEffect(() => {
        if (success && data) {
            seIsAlreadyExists("");
            enviarValor(true);
            console.log("Usuario creado:", data);
        }
    }, [success, data]);

    useEffect(() => {
        if (isLoading) {
            setIsloadingF(true);
        } else {
            setIsloadingF(false);
        }
    }, [isLoading])


    return (
        <form
            onSubmit={handleSubmitRegister}
            className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="md:col-span-1">
                <label className="text-gray-800 mb-1 block font-medium">
                    Nombre
                </label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNomombre(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-400 
                                border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />
            </div>

            <div className="md:col-span-1">
                <label className="text-gray-800 mb-1 block font-medium">
                    Apellido paterno
                </label>
                <input
                    value={apellidoPaterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-400 
                                border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />
            </div>

            <div className="md:col-span-1">
                <label className="text-gray-800 mb-1 block font-medium">
                    Apellido materno
                </label>
                <input
                    value={apellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-400 
                                border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-gray-800 mb-1 block font-medium">
                    Correo electrónico
                </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-400 
                                border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="tucorreo@example.com"
                    required
                />
                {isAlreadyExists && (
                    <aside>
                        <p className="text-sm text-red-700">{isAlreadyExists}</p>
                    </aside>
                )}

            </div>

            <div className="md:col-span-2">
                <label className="text-gray-800 mb-1 block font-medium">
                    Contraseña (mínimo 8 caracteres)
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-400 
                                border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="••••••••"
                    required
                />
            </div>
            <div>
                {isErrroIn && (
                    <aside>
                        <p className="text-sm text-red-700">{isErrroIn}</p>
                    </aside>
                )}

                {isLoadingF && (
                    <aside>
                        <p className="text-sm text-yellow-500">Creando usuario...</p>
                    </aside>
                )}
            </div>

            <div className="md:col-span-2">
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl 
                                shadow-md transition-all"
                >
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}