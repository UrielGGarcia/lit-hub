import { useEffect, useState } from "react";
import { useGet } from "../../hooks/public/useGet";
import { apiLitHubAccesos, apiLitHubBooks, apiLitHubGenres, apiLitHubPurchasesPaid, apiLitHubUsers } from "../../constants/rutas.constants";
import type { User } from "../../interfaces/users.interface";
import { useGetWithHeaders } from "../../hooks/private/useGetWithHeader";
import { useAuth } from "../../context/AuthContext";
import type { Purchases } from "../../interfaces/purchases.interfaces";
import type { Acceso } from "../../interfaces/accesos.interface";
import { useApi } from "../../hooks/private/useApi";
import { AddUserForm } from "./components/AddUser";

export interface Author {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    title: string;
    price: string;
    sinopsis: string;
    idioma: string;
    stripePriceId: string;
    stripeProductId: string;
    author: Author;
    genres: Genre[];
    cover: string;
}


export function AdminPanelApp() {
    const [tab, setTab] = useState<string>("Usuarios");
    const tabs: string[] = ["Usuarios", "Libros", "Géneros", "Compras", "Accesos", "Agregar usuario"];
    const { token } = useAuth()


    const { data: usersData, isLoading: usersLoading, error: userError } = useGetWithHeaders<User[]>(
        apiLitHubUsers,
        { headers: { Authorization: `Bearer ${token}` } }
    );


    const { data: purchases, isLoading: purchasesLoading, error: purchasesError } = useGetWithHeaders<Purchases[]>(
        apiLitHubPurchasesPaid,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data: accesos, error: accesosError } = useGetWithHeaders<Acceso[]>(
        apiLitHubAccesos,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        if (usersData) setUsers(usersData);
    }, [usersData]);

    const { callApi: deleteUserApi, isLoading: deletingUser } = useApi<void>();

    const handleDeleteUser = async (userId: number) => {
        const confirmed = window.confirm(
            "¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer."
        );
        if (!confirmed) return;

        try {
            await deleteUserApi(`${apiLitHubUsers}/${userId}`, { method: "DELETE" });
            alert("Usuario eliminado correctamente");
            // Actualizamos la tabla filtrando el usuario eliminado
            setUsers(prev => prev?.filter(u => u.id !== userId) || null);
        } catch (error: any) {
            alert("Error al eliminar usuario: " + (error.message || error));
        }
    };


    const { data: books, isLoading: booksLoading, error: booksError } = useGet<Book[]>(apiLitHubBooks);
    const { data: genres, isLoading: genresLoading, error: genresError } = useGet<Genre[]>(apiLitHubGenres);


    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

            {/* Sidebar / Tabs */}
            <div className="bg-gray-200 w-full lg:w-64 flex lg:flex-col overflow-x-auto lg:overflow-y-auto p-2 gap-2">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex-1 lg:flex-none text-gray-800 font-semibold p-2 rounded-lg border transition
                            ${tab === t ? "bg-blue-500 text-white" : "bg-gray-50 hover:bg-gray-300"}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 bg-white shadow-inner overflow-x-auto">

                {/* Usuarios */}
                {tab === "Usuarios" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>

                        {usersLoading && <p>Cargando usuarios...</p>}
                        {userError && <p>Error al cargar usuarios: {userError}</p>}

                        {users && users.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4 text-left">ID</th>
                                            <th className="py-2 px-4 text-left">Nombre</th>
                                            <th className="py-2 px-4 text-left">Apellido Paterno</th>
                                            <th className="py-2 px-4 text-left">Apellido Materno</th>
                                            <th className="py-2 px-4 text-left">Rol</th>
                                            <th className="py-2 px-4 text-left">Email</th>
                                            <th className="py-2 px-4 text-left">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {users.map((user: User) => (
                                            <tr key={user.id} className="border-b hover:bg-gray-100">
                                                <td className="py-2 px-4">{user.id}</td>
                                                <td className="py-2 px-4">{user.nombre}</td>
                                                <td className="py-2 px-4">{user.apellidoPaterno}</td>
                                                <td className="py-2 px-4">{user.apellidoMaterno}</td>
                                                <td className="py-2 px-4">{user.rol}</td>
                                                <td className="py-2 px-4">{user.email}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                                                        disabled={deletingUser}
                                                    >
                                                        {deletingUser ? "Eliminando..." : "Eliminar"}
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {usersData && usersData.length === 0 && <p>No hay usuarios registrados.</p>}
                    </div>
                )}

                {/* Libros */}
                {tab === "Libros" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Gestión de Libros</h2>

                        {booksLoading && <p>Cargando libros...</p>}
                        {booksError && <p>Error al cargar libros: {booksError}</p>}

                        {books && books.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4 text-left">ID</th>
                                            <th className="py-2 px-4 text-left">Título</th>
                                            <th className="py-2 px-4 text-left">Autor</th>
                                            <th className="py-2 px-4 text-left">Géneros</th>
                                            <th className="py-2 px-4 text-left">Precio</th>
                                            <th className="py-2 px-4 text-left">stripePriceId</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {books.map((book: Book) => (
                                            <tr key={book.id} className="border-b hover:bg-gray-100">
                                                <td className="py-2 px-4">{book.id}</td>
                                                <td className="py-2 px-4">{book.title}</td>
                                                <td className="py-2 px-4">{`${book.author.nombre} ${book.author.apellidoPaterno}`}</td>
                                                <td className="py-2 px-4">{book.genres.map(g => g.name).join(", ")}</td>
                                                <td className="py-2 px-4">${book.price}</td>
                                                <td className="py-2 px-4">${book.stripePriceId}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {books && books.length === 0 && <p>No hay libros registrados.</p>}
                    </div>
                )}

                {tab === "Géneros" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Gestión de Géneros</h2>

                        {genresLoading && <p>Cargando géneros...</p>}
                        {genresError && <p>Error al cargar géneros: {genresError}</p>}

                        {genres && genres.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4 text-left">ID</th>
                                            <th className="py-2 px-4 text-left">Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {genres.map((genre: Genre) => (
                                            <tr key={genre.id} className="border-b hover:bg-gray-100">
                                                <td className="py-2 px-4">{genre.id}</td>
                                                <td className="py-2 px-4">{genre.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {genres && genres.length === 0 && <p>No hay géneros registrados.</p>}
                    </div>
                )}

                {tab === "Compras" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Gestión de Compras</h2>

                        {purchasesLoading && <p>Cargando compras...</p>}
                        {purchasesError && <p>Error al cargar compras: {purchasesError}</p>}

                        {purchases && purchases.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4 text-left">ID</th>
                                            <th className="py-2 px-4 text-left">Id Usuario</th>
                                            <th className="py-2 px-4 text-left">Id Book</th>
                                            <th className="py-2 px-4 text-left">Etado</th>
                                            <th className="py-2 px-4 text-left">Total</th>
                                            <th className="py-2 px-4 text-left">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {purchases.map((purchase: Purchases) => (
                                            <tr key={purchase.id} className="border-b hover:bg-gray-100">
                                                <td className="py-2 px-4">{purchase.id}</td>
                                                <td className="py-2 px-4">{purchase.userId}</td>
                                                <td className="py-2 px-4">{purchase.bookId}</td>
                                                <td className="py-2 px-4">{purchase.status}</td>
                                                <td className="py-2 px-4">${purchase.priceAtPurchase}</td>
                                                <td className="py-2 px-4">{new Date(purchase.purchaseDate).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {purchases && purchases.length === 0 && <p>No hay compras registradas.</p>}
                    </div>
                )}

                {tab === "Accesos" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Gestión de accesos</h2>

                        {purchasesLoading && <p>Cargando accesos...</p>}
                        {purchasesError && <p>Error al cargar accesos: {accesosError}</p>}

                        {accesos && accesos.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4 text-left">ID</th>
                                            <th className="py-2 px-4 text-left">Id Usuario</th>
                                            <th className="py-2 px-4 text-left">Id Book</th>
                                            <th className="py-2 px-4 text-left">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {accesos.map((acceso: Acceso) => (
                                            <tr key={acceso.id} className="border-b hover:bg-gray-100">
                                                <td className="py-2 px-4">{acceso.id}</td>
                                                <td className="py-2 px-4">{acceso.userId}</td>
                                                <td className="py-2 px-4">{acceso.bookId}</td>
                                                <td className="py-2 px-4">{new Date(acceso.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {accesos && accesos.length === 0 && <p>No hay compras registradas.</p>}
                    </div>
                )}

                {tab === "Agregar usuario" && (
                    <div>
                        <AddUserForm />
                    </div>
                )}
            </div>
        </div>
    );
}
