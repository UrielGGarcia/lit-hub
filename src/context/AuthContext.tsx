// src/context/AuthContext.tsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { User } from "../interfaces/users.interface";
import { apiLitHubAuthMe } from "../constants/rutas.constants";
import { useCart } from "./CartContext";

interface AuthContextProps {
    user: User | null;
    token: string | null;
    logIn: (token: string, user: User) => void;
    logOut: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    logIn: () => { },
    logOut: () => { },
    isLoading: true,
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { clearCart } = useCart();

    useEffect(() => {
        const restoreSession = async () => {
            const savedToken = localStorage.getItem("access_token");
            if (!savedToken) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch(apiLitHubAuthMe, {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                });

                if (res.ok) {
                    const userData = await res.json();
                    setToken(savedToken);
                    setUser(userData);
                } else {
                    localStorage.removeItem("access_token");
                    setToken(null);
                    setUser(null);
                }
            } catch (err) {
                console.error("Error al restaurar sesión:", err);
                localStorage.removeItem("access_token");
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (!token) return;

            try {
                const res = await fetch(apiLitHubAuthMe, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401) { // ← usuario eliminado o token inválido
                    logOut();
                    alert("Tu sesión ha expirado o el usuario fue eliminado. Vuelve a iniciar sesión");
                }
            } catch (err) {
                console.error("Error al validar sesión:", err);
                logOut();
            }
        }, 5 * 60 * 1000); // cada 5 minutos

        return () => clearInterval(interval);
    }, [token]);



    const logIn = (jwt: string, userData: User) => {
        localStorage.setItem("access_token", jwt);
        setToken(jwt);
        setUser(userData);
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
        clearCart();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Cargando sesión...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, token, logIn, logOut, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);