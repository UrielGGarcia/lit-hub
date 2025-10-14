
import { Link, Navigate } from 'react-router-dom';  // Si usas routing

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function UserSesionAdmin({ isOpen, onClose }: Props) {
    if (!isOpen) return null;  // No renderiza si cerrado

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-70">  {/* Overlay responsive */}
            <nav className="w-80 bg-gray-200 lg:bg-white border border-gray-300 rounded-2xl p-4 text-lg mx-4 lg:mx-0">  {/* Centrado en mobile */}
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/login"
                            onClick={onClose}
                            className="block w-full text-left px-4 py-2 bg-[#00ff66]  text-white rounded-xl hover:bg-green-500 transition-colors cursor-pointer font-semibold"
                        >
                            Inicia Sesión
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/register"
                            onClick={onClose}
                            className="block w-full text-left px-4 py-2 bg-[#316b9d] text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer font-semibold"
                        >
                            Registrarse
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            onClick={onClose}
                            className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors cursor-pointer font-semibold"

                        >
                            Cerrar Sesión
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default UserSesionAdmin;