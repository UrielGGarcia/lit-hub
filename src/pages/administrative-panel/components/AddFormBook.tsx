import React, { useEffect, useState } from "react";
import { apiLitHubGenres } from "../../../constants/rutas.constants";
import { useAuth } from "../../../context/AuthContext";

type Genre = {
    id: number;
    name: string;
};

type AddFormProps = {
    handleSubmit: (e: React.FormEvent) => void;
    titulo: string;
    setTitulo(titulo: string): void;
    sinopsis: string;
    setSinopsis(sinopsis: string): void;
    setIdioma(idioma: string): void;
    precio: string;
    setPrecio(precio: string): void;
    isLoading: boolean;
    error: any;
    selectedGenres: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
};

export function AddFormBook({
    handleSubmit,
    titulo,
    setTitulo,
    sinopsis,
    setSinopsis,
    setIdioma,
    precio,
    setPrecio,
    isLoading,
    error,
    selectedGenres,
    setSelectedGenres,
}: AddFormProps) {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [newGenre, setNewGenre] = useState("");
    const { token } = useAuth(); // agregar esto arriba del return


    // Cargar géneros existentes
    useEffect(() => {
        fetch(apiLitHubGenres)
            .then((res) => res.json())
            .then((data: Genre[]) => setGenres(data))
            .catch((err) => console.error(err));
    }, []);

    // Agregar nuevo género

    const handleAddGenre = async () => {
        if (!newGenre.trim()) return;

        if (!token) return alert("No estás autenticado");

        try {
            const res = await fetch(apiLitHubGenres, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // <-- aquí agregas el token
                },
                body: JSON.stringify({ name: newGenre }),
            });

            if (!res.ok) throw new Error("Error al crear género");

            const created: Genre = await res.json();

            setGenres((prev: Genre[]) => [...prev, created]);
            setSelectedGenres((prev: number[]) => [...prev, created.id]);
            setNewGenre("");
        } catch (err) {
            console.error(err);
            alert("No se pudo crear el género");
        }
    };


    // Seleccionar / deseleccionar género
    const toggleGenre = (id: number) => {
        setSelectedGenres((prev: number[]) =>
            prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <h1 className="font-bold text-lg text-justify">Asegúrate de agregar y llenar todos y cada uno de los campos. Así como subir todos los archivos correspondientes, de lo contrario no serán publicados en LitHub.</h1>
            <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Título</label>
                <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                />
            </div>

            {/* Sinopsis */}
            <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Sinopsis</label>
                <textarea
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"
                    rows={4}
                    required
                />
            </div>

            {/* Idioma */}
            <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Idioma</label>
                <select
                    required
                    onChange={(e) => setIdioma(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    defaultValue="Español"
                >
                    <option value="Español" selected>Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                </select>
            </div>

            {/* Precio */}
            <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Precio</label>
                <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                />
            </div>

            {/* Géneros */}
            <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Géneros</label>

                {/* Botones de géneros existentes */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            type="button"
                            className={`px-3 py-1 rounded-lg border ${selectedGenres.includes(genre.id) ? "bg-blue-600 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => toggleGenre(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>

                {/* Input para agregar nuevo género */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Agregar nuevo género"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        className="border rounded-lg px-2 py-1 w-full"
                    />
                    <button
                        type="button"
                        onClick={handleAddGenre}
                        className="px-4 py-1 bg-green-600 text-white rounded-lg"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            {/* Botón Guardar */}
            <div className="col-span-2 flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    {isLoading ? "Guardando..." : "Guardar E-book"}
                </button>
            </div>

            {error && <p className="col-span-2 text-red-600">Error: {error}</p>}
        </form>
    );
}
