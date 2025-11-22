// src/pages/SuccessPage.tsx
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <img
        src="/logoS.png"
        alt="Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 mb-6"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center">
        ¡Pago realizado con éxito!
      </h1>
      <p className="text-blue-600 mb-6 text-center sm:text-lg md:text-xl">
        Gracias por tu compra. Tu transacción se completó correctamente.
      </p>
      <Link
        to="/"
        className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition text-lg sm:text-xl"
      >
        Volver al inicio
      </Link>
    </div>
  );
};
