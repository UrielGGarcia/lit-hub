import { useCart } from "../../context/CartContext";
import { ElementCard } from "./components/ElementCard";
import { useAuth } from "../../context/AuthContext";
import { apiLitHubCheckoutSessionCart } from "../../constants/rutas.constants";

export function CartApp() {
    const { cart, total } = useCart();
    const { user, token } = useAuth();

    const handleCheckout = async () => {

        if (!user || !token) {
            alert("Debes iniciar sesión para continuar con el pago");
            return;
        }

        if (cart.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }

        const items = cart.map(item => ({
            bookId: item.id,
            title: item.title,
            price: item.price,
            stripePriceId: item.stripePriceId,
        }));

        try {
            const res = await fetch(apiLitHubCheckoutSessionCart, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.id,
                    items
                })
            });

            if (!res.ok) {
                throw new Error("No se pudo crear la sesión de Stripe");
            }

            const data = await res.json();

            // 👇 Redirigir al checkout de Stripe
            window.location.href = data.url;

        } catch (error) {
            console.error("Error al iniciar el pago:", error);
            alert("Hubo un error al intentar pagar el carrito");
        }
    };


    return (
        <div className="bg-gray-900/80 p-2 rounded-lg ">
            <div className="text-center text-xl">
                <strong className="text-white">Mi carrito de compras</strong>
            </div>

            {cart.length >= 1 ? (
                <div className="h-full md:h-120 ">
                    <div className="space-y-3 overflow-scroll h-80 lg:h-100 no-scrollbar">
                        {cart.map(ebook =>
                            <ElementCard
                                key={ebook.id}
                                id={ebook.id}
                                title={ebook.title}
                                price={ebook.price}
                                autor={ebook.author.nombre}
                                ap={ebook.author.apellidoPaterno}
                                am={ebook.author.apellidoMaterno}
                            />
                        )}
                    </div>

                    <div className="mt-1">
                        <strong className="text-xl text-white">Total : ${total}</strong>

                        <button
                            onClick={handleCheckout}
                            className="bg-orange-500 w-full rounded-lg cursor-pointer text-white text-lg p-2 "
                        >
                            Pagar carrito
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center text-white">
                    <p>Tu carrito está vacío, te invitamos a explorar LitHub.</p>
                </div>
            )}
        </div>
    );
}
