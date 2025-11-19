import type React from "react";

type AddFormProps = {
    handleSubmit: (e: React.FormEvent) => void;
    titulo: string;
    setTitulo(titulo: string): void;
    sinopsis: string;
    setSinopsis(sinpsis: string): void;
    setIdioma(idioma: string): void;
    precio: string;
    setPrecio(precio: string): void;
    isLoading: boolean;
    error: any;
}




export function AddFormBook({ handleSubmit, titulo, setTitulo, sinopsis, setSinopsis, setIdioma, precio, setPrecio, isLoading, error }: AddFormProps) {
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Título</label>
                <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                />
            </div>

            <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Sinopsis</label>
                <textarea
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"
                    rows={4}
                    required
                ></textarea>
            </div>

            <select
                onChange={(e) => setIdioma(e.target.value)}
                name="Idioma"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
                <option value="Español">Español</option>
                <option value="Inglés">Inglés</option>
                <option value="Francés">Francés</option>
            </select>


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
    )
}