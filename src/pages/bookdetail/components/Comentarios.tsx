export function Comentarios() {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">Comentarios</h3>
            <div className="gap-2  overflow-scroll flex max-w-screen no-scrollbar">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 3].map((num, index) =>
                    <div className="min-w-55 bg-gray-100 rounded-lg " key={index}>
                        <p className="text-lg text-gray-700 font-bold mb-1">
                            Jane Smith ⭐⭐⭐⭐⭐
                        </p>
                        <p className="text-sm text-gray-600">
                            “Un libro bellamente escrito que te hace reflexionar sobre las
                            decisiones en la vida y las infinitas posibilidades.”
                        </p>
                    </div>
                )}
            </div>
        </div>  
    );
}