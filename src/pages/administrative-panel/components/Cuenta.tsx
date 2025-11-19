import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


type CuentaProps = {
    nombre: string | undefined;
    apellidoPaterno: string | undefined;
    apellidoMaterno: string | undefined;
    email: string | undefined;
}

export function Cuenta({ nombre, apellidoPaterno, apellidoMaterno, email }: CuentaProps) {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    return (<div className="gap-2">
        <h1 className="text-2xl font-bold">Datos de la cuenta</h1>
        <div className="flex  text-xl mt-2">
            <strong>Nombre: </strong>
            <p className="text-gray-600 ml-1">
                {nombre} {apellidoPaterno} {apellidoMaterno}
            </p>
        </div>

        <div className="flex text-xl mt-2">
            <strong>Correo electrónico: </strong>
            <p className="text-gray-600 ml-1">
                {email}
            </p>
        </div>
        <div className="mt-2">
            <button
                onClick={() => {
                    navigate("/")
                    logOut()
                }}
                className="border rounded-lg text-2xl bg-red-700 text-white p-1 cursor-pointer">
                Cerrar sesión
            </button>
        </div>
    </div>
    );
}