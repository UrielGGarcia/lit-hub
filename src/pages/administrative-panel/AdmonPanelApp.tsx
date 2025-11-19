import React, { useEffect, useState } from "react";
import { usePost } from "../../hooks/public/usePost.hook";
import { useUploadFile } from "../../hooks/public/useUploadFile.hook";
import { apiLitHubBooks, apiLitHubBooksByAutor, apiLitHubBooksByAutorNoPublished, apiLitHubFiles } from "../../constants/rutas.constants";
import { useAuth } from "../../context/AuthContext";
import { useGet } from "../../hooks/public/useGet";
import type { Ebook } from "../../interfaces/books.interfaces";
import { AddFormBook } from "./components/AddFormBook";
import { UploadFilesBook } from "./components/UploadFilesBook";
import { Cuenta } from "./components/Cuenta";
import { Settins } from "./components/Settings";

export function AdmonPanelApp() {

    const [activeTab, setActiveTab] = useState<"ebook" | "cuenta" | "config">("ebook");
    const [activeTabBook, setActiveTabBook] = useState<"agregar" | "Ver mis E-books">("Ver mis E-books");

    const [titulo, setTitulo] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [precio, setPrecio] = useState("");
    const [idioma, setIdioma] = useState("");

    const [successBody, setSuccessBody] = useState<boolean>(false);
    const [successCover, setSuccessCover] = useState<boolean>(false);
    const [successEpub, setSuccessEpub] = useState<boolean>(false);
    const [successPdf, setSuccessPdf] = useState<boolean>(false);


    const { user } = useAuth();

    const [userId, setUserId] = useState<string | any>("");
    const [ebookId, setEbookId] = useState<string | null>(null);

    const { data, isLoading, error, postData } = usePost(apiLitHubBooks);

    const { data: dataEB, isLoading: isLoadingEB, error: errorEB } = useGet<Ebook[]>(`${apiLitHubBooksByAutor}/${userId}`)
    const { data: dataEBN, isLoading: isLoadingEBN, error: errorEBN } = useGet<Ebook[]>(`${apiLitHubBooksByAutorNoPublished}/${userId}`)


    const { uploadFile, isLoading: isUploading, error: uploadError } = useUploadFile<any>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = {
            title: titulo,
            sinopsis,
            price: parseFloat(precio),
            authorId: userId,
            idioma: idioma,
        };

        console.log(body);

        try {
            const result = await postData(body) as { id: string };

            alert("E-book guardado correctamente");
            setSuccessBody(true);

            if (result.id) setEbookId(result.id);

            setTitulo("");
            setSinopsis("");
            setPrecio("");

        } catch (err) {
            alert("Error al guardar el e-book");
        }
    };

    useEffect(() => {
        setUserId(user?.id);
    }, [user?.id])

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

            if (type == "COVER") {
                setSuccessCover(true);
            }
            if (type == "EPUB") {
                setSuccessEpub(true);
            }
            if (type == "PDF") {
                setSuccessPdf(true);
            }

            alert(`${type} subido correctamente `);

        } catch (err) {
            alert(`Error al subir ${type} `);
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
                            <div className="space-x-4">
                                {["agregar", "Ver mis E-books"].map(tab =>
                                    <button
                                        key={tab}
                                        onClick={() => { setActiveTabBook(tab as any) }}
                                        className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTabBook === tab
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`} >
                                        {tab}
                                    </button>
                                )}
                            </div>

                            {/* FORM 1 - CREAR EBOOK */}
                            {activeTabBook == "agregar" && !successBody && (
                                <AddFormBook
                                    handleSubmit={handleSubmit}
                                    titulo={titulo}
                                    setTitulo={setTitulo}
                                    sinopsis={sinopsis}
                                    setSinopsis={setSinopsis}
                                    setIdioma={setIdioma}
                                    precio={precio}
                                    setPrecio={setPrecio}
                                    isLoading={isLoading}
                                    error={error}
                                />
                            )}
                            {activeTabBook == "Ver mis E-books" && (
                                <div className="mt-4">
                                    <strong className="text-green-900 text-2xl">PUBLICADOS</strong>
                                    <div className="space-y-2 border rounded-lg p-2 mb-7">
                                        {dataEB?.map(book =>
                                            <div
                                                key={book.id}
                                                className="flex gap-1 border p-1 rounded-lg">
                                                <p className="text-lg w-1/2">{book.title}</p>
                                                <div
                                                    className="w-1/2 flex justify-between lg:justify-around">
                                                    <button
                                                        className=" rounded-lg p-1 text-sm cursor-pointer bg-amber-300 font-bold"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className=" rounded-lg p-1 text-sm text-white bg-red-700 cursor-pointer font-bold">
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <strong className="text-red-900 text-2xl">PENDIENTES</strong>
                                    <p className="text-sm text-gray-700">Por falta de portada, archivo PDF o archivo EPUB</p>
                                    <p className="text-sm text-gray-700">Favor de agregar lo faltante. En caso de que no se agregue, Se eliminará automáticamente en 15 días.</p>
                                    <div className="space-y-2 border rounded-lg p-2">
                                        {dataEBN?.map(book =>
                                            <div
                                                key={book.id}
                                                className="flex gap-1 border p-1 rounded-lg">
                                                <p className="text-lg w-1/2">{book.title}</p>
                                                <div className="w-1/2 flex justify-between">
                                                    <button
                                                        className=" rounded-lg p-1 text-sm cursor-pointer bg-amber-300 font-bold">
                                                        Editar
                                                    </button>
                                                    <button
                                                        className=" rounded-lg p-1 text-sm text-white bg-red-700 cursor-pointer font-bold">
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )}

                            {/* FORM 2 - SUBIDA DE ARCHIVOS */}
                            {ebookId && activeTabBook == "agregar" && (
                                <UploadFilesBook
                                    uploadSingleFile={uploadSingleFile}
                                    isUploading={isUploading}
                                    setPdf={setPdf}
                                    setCover={setCover}
                                    setEpub={setEpub}
                                    successCover={successCover}
                                    successEpub={successEpub}
                                    successPdf={successPdf}
                                    epub={epub}
                                    pdf={pdf}
                                    cover={cover}
                                    uploadError={uploadError}
                                />
                            )}
                        </>
                    )}

                    {activeTab === "cuenta" && (
                        <Cuenta
                            nombre={user?.nombre}
                            apellidoPaterno={user?.apellidoPaterno}
                            apellidoMaterno={user?.apellidoMaterno}
                            email={user?.email}
                        />
                    )}

                    {activeTab === "config" && (
                        <Settins />
                    )}

                </div>
            </div>
        </div >
    );
}
