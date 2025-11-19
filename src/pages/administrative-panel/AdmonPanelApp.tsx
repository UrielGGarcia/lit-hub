import React, { useState } from "react";
import { usePost } from "../../hooks/public/usePost.hook";
import { useUploadFile } from "../../hooks/public/useUploadFile.hook";
import { apiLitHubBooks, apiLitHubFiles } from "../../constants/rutas.constants";
import { useAuth } from "../../context/AuthContext";

export function AdmonPanelApp() {
    const [activeTab, setActiveTab] = useState<"ebook" | "cuenta" | "config">("ebook");

    const [titulo, setTitulo] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [precio, setPrecio] = useState("");

    const { user, logOut } = useAuth();

    const [ebookId, setEbookId] = useState<string | null>(null);

    const { data, isLoading, error, postData } = usePost(apiLitHubBooks);

    const { uploadFile, isLoading: isUploading, error: uploadError } = useUploadFile<any>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = {
            title: titulo,
            sinopsis,
            price: parseFloat(precio),
            authorId: 2,
        };

        try {
            const result = await postData(body) as { id: string };

            alert("E-book guardado correctamente ✅");

            if (result.id) setEbookId(result.id);

            setTitulo("");
            setSinopsis("");
            setPrecio("");

        } catch (err) {
            alert("Error al guardar el e-book ❌");
        }
    };

    const [cover, setCover] = useState<File | null>(null);
    const [pdf, setPdf] = useState<File | null>(null);
    const [epub, setEpub] = useState<File | null>(null);

    const uploadSingleFile = async (file: File | null, type: "COVER" | "PDF" | "EPUB") => {
        if (!ebookId) return alert("Primero debes crear el eBook");
        if (!file) return alert("Selecciona un archivo");

        const formData = new FormData();
        formData.append("file", file);

        try {
            await uploadFile(
                formData,
                `${apiLitHubFiles}/${type}/${ebookId}`
            );

            alert(`${type} subido correctamente ✅`);

        } catch (err) {
            alert(`Error al subir ${type} ❌`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">

            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">

                <div className="border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 gap-3">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-700 text-center sm:text-left">
                        Panel de Administración
                    </h1>

                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {["cuenta", "ebook", "config"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {tab === "cuenta" ? "Cuenta" : tab === "ebook" ? "E-book" : "Configuración"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">

                    {activeTab === "ebook" && (
                        <>
                            {/* FORM 1 - CREAR EBOOK */}
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

                            {/* FORM 2 - SUBIDA DE ARCHIVOS */}
                            {ebookId && (
                                <div className="border-t pt-6 space-y-6">

                                    <h2 className="text-lg font-semibold">Subir archivos del eBook</h2>

                                    {/* COVER */}
                                    <div>
                                        <label className="block mb-1 font-medium">Portada</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setCover(e.target.files?.[0] || null)}
                                            className="border p-2 rounded w-full bg-gray-50"
                                        />
                                        <button
                                            onClick={() => uploadSingleFile(cover, "COVER")}
                                            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
                                            disabled={isUploading}
                                        >
                                            Subir Portada
                                        </button>
                                    </div>

                                    {/* PDF */}
                                    <div>
                                        <label className="block mb-1 font-medium">Archivo PDF</label>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={(e) => setPdf(e.target.files?.[0] || null)}
                                            className="border p-2 rounded w-full bg-gray-50"
                                        />
                                        <button
                                            onClick={() => uploadSingleFile(pdf, "PDF")}
                                            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
                                            disabled={isUploading}
                                        >
                                            Subir PDF
                                        </button>
                                    </div>

                                    {/* EPUB */}
                                    <div>
                                        <label className="block mb-1 font-medium">Archivo EPUB</label>
                                        <input
                                            type="file"
                                            accept=".epub"
                                            onChange={(e) => setEpub(e.target.files?.[0] || null)}
                                            className="border p-2 rounded w-full bg-gray-50"
                                        />
                                        <button
                                            onClick={() => uploadSingleFile(epub, "EPUB")}
                                            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
                                            disabled={isUploading}
                                        >
                                            Subir EPUB
                                        </button>
                                    </div>

                                    {uploadError && (
                                        <p className="text-red-600 text-sm">
                                            Error al subir archivo: {uploadError.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === "cuenta" && (
                        <div className="gap-2">
                            <h1 className="text-2xl font-bold">Datos de la cuenta</h1>
                            <div className="flex  text-xl mt-2">
                                <strong>Nombre: </strong>
                                <p className="text-gray-600 ml-1">
                                     {user?.nombre} {user?.apellidoPaterno} {user?.apellidoMaterno}
                                </p>
                            </div>

                            <div className="flex text-xl mt-2">
                                <strong>Correo electrónico: </strong>
                                <p className="text-gray-600 ml-1">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="mt-2">
                                <button className="border rounded-lg text-2xl bg-red-700 text-white p-1 cursor-pointer">
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "config" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Configuración general</h2>
                            <p className="text-gray-600">
                                Ajusta opciones del sistema o preferencias.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
