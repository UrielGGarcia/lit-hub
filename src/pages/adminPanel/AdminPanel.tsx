// AdminPanel.tsx
import { useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin"; // Assuming you can reuse or adapt the Header for admin
import { generos } from "../../data"; // Import generos from your data file
import UserSesionAdmin from "./components/UserSesionAdmin"; // Reuse if needed for session
import { useEffect } from "react";

type Genre = {
    nombre: string;
};

type FormData = {
    name: string;
    selectedGenres: string[];
    epubFile: File | null;
    pdfFile: File | null;
    coverFile: File | null;
};

function AdminPanel() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        selectedGenres: [],
        epubFile: null,
        pdfFile: null,
        coverFile: null,
    });
    const [showGenresDropdown, setShowGenresDropdown] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSesion, setIsSesion] = useState(false); // Reuse for session if needed

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleGenreToggle = (genreName: string) => {
        setFormData((prev) => ({
            ...prev,
            selectedGenres: prev.selectedGenres.includes(genreName)
                ? prev.selectedGenres.filter((g) => g !== genreName)
                : [...prev.selectedGenres, genreName],
        }));
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fileType: "epubFile" | "pdfFile" | "coverFile"
    ) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            let error = "";
            switch (fileType) {
                case "epubFile":
                    if (!file.name.toLowerCase().endsWith(".epub")) {
                        error = "Solo se permiten archivos .epub";
                    }
                    break;
                case "pdfFile":
                    if (!file.name.toLowerCase().endsWith(".pdf")) {
                        error = "Solo se permiten archivos .pdf";
                    }
                    break;
                case "coverFile":
                    if (!file.type.startsWith("image/") || !["image/jpeg", "image/png"].includes(file.type)) {
                        error = "Solo se permiten imágenes JPG o PNG";
                    }
                    break;
            }
            if (error) {
                setErrors((prev) => ({ ...prev, [fileType]: error }));
                return;
            }
        }
        setFormData((prev) => ({ ...prev, [fileType]: file }));
        if (errors[fileType]) {
            setErrors((prev) => ({ ...prev, [fileType]: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setErrors((prev) => ({ ...prev, name: "El nombre es requerido" }));
            return;
        }
        if (formData.selectedGenres.length === 0) {
            setErrors((prev) => ({ ...prev, selectedGenres: "Selecciona al menos un género" }));
            return;
        }
        if (!formData.epubFile || !formData.pdfFile || !formData.coverFile) {
            setErrors((prev) => ({ ...prev, files: "Todos los archivos son requeridos" }));
            return;
        }

        // Simulate submit (e.g., upload to backend)
        console.log("Submitting ebook:", formData);
        alert("Ebook agregado exitosamente!");
        // Reset form
        setFormData({
            name: "",
            selectedGenres: [],
            epubFile: null,
            pdfFile: null,
            coverFile: null,
        });
        setErrors({});
    };

    useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (isSesion && e.target instanceof HTMLElement && !e.target.closest('nav')) {
      setIsSesion(false);
    }
  };
  if (isSesion) document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [isSesion]);

    return (
        <div className="w-full max-w-xl-plus mx-auto flex flex-col bg-gray-200 items-center min-h-screen">
            {/* Reuse Header, adapted for admin */}
            <HeaderAdmin
                isSesion={isSesion}
                onHandleSesion={() => setIsSesion(!isSesion)}
                onToggle={() => { }} // No sidebar toggle for admin, or adapt
                onHandleSearch={() => { }} // No search for admin, or adapt
            />

            <UserSesionAdmin
                isOpen={isSesion}  // Pasa el estado como prop
                onClose={() => setIsSesion(false)}  // Para cerrar al clic
            />

            <div className="pl-5 pr-5 w-full mt-5">
                {/* Admin Form */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-300">
                    <h1 className="text-2xl font-bold text-center mb-6">Agregar Nuevo Ebook</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Ebook
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ingresa el nombre del ebook"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Géneros Multi-Select Combo Box */}
                        <div>
                            <label htmlFor="genres" className="block text-sm font-medium text-gray-700 mb-2">
                                Géneros (Selecciona uno o más)
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowGenresDropdown(!showGenresDropdown)}
                                    className="w-full p-3 border border-gray-300 rounded-xl bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {formData.selectedGenres.length > 0
                                        ? `${formData.selectedGenres.length} género(s) seleccionados`
                                        : "Selecciona géneros..."}
                                    <svg
                                        className={`w-5 h-5 transition-transform ${showGenresDropdown ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showGenresDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                        {generos.map((genre: Genre, index: number) => (
                                            <label key={index} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.selectedGenres.includes(genre.nombre)}
                                                    onChange={() => handleGenreToggle(genre.nombre)}
                                                    className="mr-2"
                                                />
                                                {genre.nombre}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.selectedGenres && (
                                <p className="text-red-500 text-sm mt-1">{errors.selectedGenres}</p>
                            )}
                        </div>

                        {/* File Uploads - Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* EPUB Upload */}
                            <div>
                                <label htmlFor="epubFile" className="block text-sm font-medium text-gray-700 mb-2">
                                    Archivo EPUB
                                </label>
                                <input
                                    type="file"
                                    id="epubFile"
                                    accept=".epub"
                                    onChange={(e) => handleFileChange(e, "epubFile")}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formData.epubFile && (
                                    <p className="text-sm text-gray-600 mt-1">{formData.epubFile.name}</p>
                                )}
                                {errors.epubFile && <p className="text-red-500 text-sm mt-1">{errors.epubFile}</p>}
                            </div>

                            {/* PDF Upload */}
                            <div>
                                <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700 mb-2">
                                    Archivo PDF
                                </label>
                                <input
                                    type="file"
                                    id="pdfFile"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(e, "pdfFile")}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formData.pdfFile && (
                                    <p className="text-sm text-gray-600 mt-1">{formData.pdfFile.name}</p>
                                )}
                                {errors.pdfFile && <p className="text-red-500 text-sm mt-1">{errors.pdfFile}</p>}
                            </div>

                            {/* Cover Upload */}
                            <div>
                                <label htmlFor="coverFile" className="block text-sm font-medium text-gray-700 mb-2">
                                    Portada (JPG/PNG)
                                </label>
                                <input
                                    type="file"
                                    id="coverFile"
                                    accept="image/jpeg,image/png"
                                    onChange={(e) => handleFileChange(e, "coverFile")}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formData.coverFile && (
                                    <p className="text-sm text-gray-600 mt-1">{formData.coverFile.name}</p>
                                )}
                                {errors.coverFile && <p className="text-red-500 text-sm mt-1">{errors.coverFile}</p>}
                            </div>
                        </div>

                        {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#316b9d] text-white py-3 rounded-2xl font-semibold hover:scale-105 transition-transform shadow-xl"
                        >
                            Agregar Ebook
                        </button>
                    </form>
                </div>
            </div>

            {/* Session for desktop 
            <div
                className={`fixed hidden md:block lg:block lg:top-30 md:top-30 transition-all duration-500 ease-in-out z-70 ${isSesion ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                    }`}
            >
                <UserSesionAdmin />
            </div>*/}
        </div>
    );
}

export default AdminPanel;