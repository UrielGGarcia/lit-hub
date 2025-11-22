import { useCart } from "../../../context/CartContext";

interface ElementCardProps {
    title: string,
    price: string,
    autor: string,
    ap: string,
    am: string,
    id: number,
}


export function ElementCard({ title, price, autor, ap, am, id }: ElementCardProps) {
    const { removeFromCart } = useCart();
    return (
        <div className="flex border border-gray-300 rounded-lg items-center justify-between p-1 bg-white space-x-4">
            <div className="">
                <p><strong>Título</strong> : {title}</p>
                <p><strong>Autor</strong>: {autor} {ap} {am}</p>
                <p><strong>Precio</strong> : ${price}</p>
            </div>
            <button
                onClick={() => { removeFromCart(id) }}
                className="rounded-lg p-1 bg-red-700 cursor-pointer hover:bg-red-600 text-white font-bold">
                Eliminar
            </button>
        </div>
    );
};