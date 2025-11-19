import React from "react";

interface AlertProps {
    message: string;
    textColor?: string;       // ej: "text-white"
    bgColor?: string;         // ej: "bg-red-500"
    borderColor?: string;     // ej: "border-red-700"
}

// Ejemplo de uso:
// <Alert message="Algo salió mal" textColor="text-white" bgColor="bg-red-500" borderColor="border-red-700" />

const Alert: React.FC<AlertProps> = ({ message, textColor = "text-white", bgColor = "bg-blue-500", borderColor = "border-blue-700" }) => {
    return (
        <>
            {/* Fondo oscuro */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>

            {/* Alerta centrada */}
            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
        p-5 rounded-xl border ${bgColor} ${textColor} ${borderColor}
        shadow-xl z-50 transition-all text-center`}
            >
                {message}
            </div>
        </>
    );

}
export default Alert;
