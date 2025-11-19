import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Alert from "../../components/Alert";
import { Login } from "./components/LogIn";
import { Register } from "./components/Register";

export function AuthForm() {
    const location = useLocation();
    const sesion = location.state?.sesion || "login";
    const [mode, setMode] = useState<"login" | "register">(sesion);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setMode(sesion);
    }, [sesion]);

    const recibirIsSuccess = (valor: boolean) => {
        setIsSuccess(valor);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <div className="w-full max-w-md backdrop-blur-xl bg-white/60 border border-white/80 rounded-2xl shadow-xl p-8">

                {/* Tabs */}
                <div className="flex mb-6 bg-white/40 rounded-xl overflow-hidden border border-white/60">
                    <button
                        className={`w-1/2 py-3 text-center font-semibold transition-all ${mode === "login"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-white/70"
                            }`}
                        onClick={() => setMode("login")}
                    >
                        Iniciar sesión
                    </button>

                    <button
                        className={`w-1/2 py-3 text-center font-semibold transition-all ${mode === "register"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-white/70"
                            }`}
                        onClick={() => setMode("register")}
                    >
                        Registrarse
                    </button>
                </div>

                {mode === "login" && (
                    <Login />
                )}

                {mode === "register" && (
                    <Register
                        enviarValor={recibirIsSuccess} />
                )}
            </div>

            {isSuccess &&
                <>
                    <Alert
                        message="Usuario creado exitosamente"
                        textColor="text-white"
                        bgColor="bg-green-700"
                        borderColor="border-gren-700" />
                </>
            }
        </div>
    );
}
