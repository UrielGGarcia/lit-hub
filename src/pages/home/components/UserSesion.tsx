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
                    {user.rol === "AUTHOR" || user.rol === "ADMIN" &&
                        (
                            <div className="flex flex-col gap-2 ">

                                <button
                                    onClick={() => {
                                        navigate("/administrative-panel")
                                    }}
                                    className="border rounded-lg bg-blue-200 cursor-pointer p-1">
                                    Panel administrativo
                                </button>
                            </div>
                        )}
                    <div>
                        <button
                            className="p-1 bg-red-700 hover:bg-red-600 text-white rounded-xl cursor-pointer"
                            onClick={logOut}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <ul className="space-y-3">
                        <li
                            className="cursor-pointer text-2xl rounded-lg bg-blue-300 hover:bg-blue-200"
                            onClick={() => {
                                navigate("/auth", {
                                    state: {
                                        sesion: "login"
                                    }
                                }
                                );
                            }
                            }
                        >Inicia Sesión</li>
                        <li
                            className="cursor-pointer text-2xl  bg-blue-200 hover:bg-blue-100 rounded-lg"
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
                        <li
                            className="cursor-pointer text-2xl  bg-blue-100 hover:bg-blue-50 rounded-lg"
                            onClick={() => {
                                navigate("/acerca-lithub");
                            }
                            }
                        >Ver más</li>
                    </ul>

                </div>
            )}

        </nav>
    );
}

export default UserSesion;