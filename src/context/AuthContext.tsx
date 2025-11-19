// src/context/AuthContext.tsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { User } from "../interfaces/users.interface";
import { useNavigate } from "react-router-dom";
import { apiLitHubAuthMe } from "../constants/rutas.constants";

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

    const logIn = (jwt: string, userData: User) => {
        localStorage.setItem("access_token", jwt);
        setToken(jwt);
        setUser(userData);

    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
       
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