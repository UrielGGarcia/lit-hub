import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function UserSesion() {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

    return (
        <nav className="w-80 bg-gray-200 lg:bg-white border border-gray-300 h-50 rounded-2xl p-4 text-lg z-60">
            {user ? (
                <div className="flex flex-col text-center text-xl  items-center h-full justify-between">
                    <div className="flex flex-col">
                        <strong>{user.email}</strong>
                        <p>{user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}</p>
                    </div>
                    {user.rol === "AUTHOR" &&
                        (
                            <div className="flex flex-col gap-2 ">
                                <button
                                    onClick={() => {
                                        navigate("")
                                    }}
                                    className="border rounded-lg bg-blue-100 cursor-pointer">
                                    Configuración
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/administrative-panel")
                                    }}
                                    className="border rounded-lg bg-blue-200 cursor-pointer">
                                    Cargar nuevo libro
                                </button>
                            </div>
                        )}
                    <div>
                        <button
                            className="p-1 bg-red-700 text-white rounded-xl cursor-pointer"
                            onClick={logOut}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <ul>
                        <li
                            className="cursor-pointer text-2xl"
                            onClick={() => {
                                navigate("/auth", {
                                    state: {
                                        sesion: "login"
                                    }
                                }
                                )
                            }
                            }
                        >Inicia Sesión</li>
                        <li
                            className="cursor-pointer text-2xl"
                            onClick={() => {
                                navigate("/auth", {
                                    state: {
                                        sesion: "register"
                                    }
                                }
                                )
                            }
                            }
                        >Registrarse</li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default UserSesion;