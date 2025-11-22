import { useNavigate } from "react-router-dom";
import { apiLitHubAuth } from "../../../constants/rutas.constants";
import { usePost } from "../../../hooks/public/usePost.hook"
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export function Login() {

    const navigate = useNavigate();

    const { data, isLoading, error, success, postData } = usePost(apiLitHubAuth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [isloadingF, setIsloadingF] = useState(false);
    const [isIncorrectCredentials, setIsIncorrectCredentials] = useState("");
    const [isNotExists, setIsNotExists] = useState("");

    const { logIn } = useAuth();


    const handleSubmitLogIn = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = {
            email,
            password
        }
        try {
            await postData(body);

        } catch {
            alert(error);
        }
    }

    useEffect(() => {
        setIsIncorrectCredentials("");
        setIsNotExists("");
        if (error?.includes("Credenciales incorrectas")) {
            setIsIncorrectCredentials(error);
            return;
        }
        if (error?.includes("no está asociado a ninguna cuenta")) {
            setIsNotExists(error);
            return;
        }
    }, [error]);

    useEffect(() => {
        if (success && data) {
            setIsIncorrectCredentials("");
            logIn(data.access_token, data.user);
            navigate("/");
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
            onSubmit={handleSubmitLogIn}
            className="flex flex-col gap-5">
            <div>
                <label className="text-gray-800 mb-1 block font-medium">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-400 
                                border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="tucorreo@example.com"
                    required
                />
                {isNotExists && (
                    <aside>
                        <p className="text-sm text-red-700">{isNotExists}</p>
                    </aside>
                )}
            </div>

            <div>
                <label className="text-gray-800 mb-1 block font-medium">
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-400 
                                border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="••••••••"
                    required
                />
            </div>
            {isIncorrectCredentials && (
                <aside>
                    <p className="text-sm text-red-700">{error}</p>
                </aside>
            )}
            {
                isloadingF && (
                    <aside>
                        <p className="text-sm text-red-700">Cargando...</p>
                    </aside>
                )
            }

            <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl 
                            shadow-md transition-all"
            >
                Iniciar sesión
            </button>
        </form>
    )
}