
type Props = {
    image?: string,
}

function EBookCard({ image }: Props) {
    return (
        <div className="gap-3 flex flex-col items-center justify-center bg-white/60 border-2 border-white rounded-2xl p-2 backdrop-blur-lg shadow-xl z-10 ">
            <img src={image} className="rounded-xl shadow-2xl" />
            <button className="bg-white/60 border-2 border-white rounded-2xl w-6/7 text-gray-700 font-bold cursor-pointer hover:scale-110 transition-transform shadow-2xl">VER MÁS</button>
            <button className="text-white bg-[#316b9d] rounded-2xl p-1 font-semibold w-6/7 cursor-pointer mb-4 hover:scale-110 transition-transform">AGREGAR AL CARRITO</button>
        </div>
    );
};

export default EBookCard;