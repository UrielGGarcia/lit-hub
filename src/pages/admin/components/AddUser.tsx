// src/components/AddUserForm.tsx
import { useState } from "react";
import type { User } from "../../../interfaces/users.interface";
import { useAuth } from "../../../context/AuthContext";
import { apiLitHubAddUser } from "../../../constants/rutas.constants";

interface AddUserFormProps {
    onSuccess?: (user: User) => void;
}

export const AddUserForm = ({ onSuccess }: AddUserFormProps) => {
    const { token } = useAuth();

    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState<"AUTHOR" | "ADMIN">("AUTHOR");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(apiLitHubAddUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                    email,
                    password,
                    rol,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Error al crear usuario");
            }

            const newUser = await res.json();
            setSuccess(`Usuario ${newUser.user.nombre} creado correctamente`);
            setNombre("");
            setApellidoPaterno("");
            setApellidoMaterno("");
            setEmail("");
            setPassword("");
            setRol("AUTHOR");

            if (onSuccess) onSuccess(newUser);
        } catch (err: any) {
            setError(err.message || "Error desconocido");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Agregar Usuario</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Apellido Paterno"
                        value={apellidoPaterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        required
                    />
                </div>

                <input
                    type="text"
                    placeholder="Apellido Materno"
                    value={apellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />

                <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value as "AUTHOR" | "ADMIN")}
                    className="w-full p-2 border rounded"
                >
                    <option value="AUTHOR" selected>Autor</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Creando..." : "Agregar Usuario"}
                </button>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>
        </div>
    );
};
