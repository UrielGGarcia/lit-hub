type UploadFilesProps = {
    uploadSingleFile: (file: File | null, type: "COVER" | "PDF" | "EPUB") => void;

    isUploading: boolean;

    setPdf(pdf: File | null): void;
    setCover(cover: File | null): void;
    setEpub(epub: File | null): void;

    successCover: boolean;
    successEpub: boolean;
    successPdf: boolean;

    epub: File | null;
    pdf: File | null;
    cover: File | null;

    uploadError: any;

}

export function UploadFilesBook({
    uploadSingleFile,
    isUploading,
    setPdf,
    setCover,
    setEpub,
    successCover,
    successEpub,
    successPdf,
    epub,
    pdf,
    cover,
    uploadError
}
    : UploadFilesProps) {

    return (
        <div className="border-t pt-6 space-y-6">

            <h2 className="text-lg font-semibold">Subir archivos del eBook</h2>

            {/* COVER */}
            {!successCover && (
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
            )}

            {/* PDF */}
            {!successPdf && (
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
            )}

            {/* EPUB */}
            {!successEpub && (
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
            )}

            {uploadError && (
                <p className="text-red-600 text-sm">
                    Error al subir archivo: {uploadError.message}
                </p>
            )}
        </div>
    )
}