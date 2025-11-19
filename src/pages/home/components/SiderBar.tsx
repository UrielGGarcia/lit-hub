import { useEffect, useState } from "react";
import type { SiderBarSection } from "../../../interfaces/books.interfaces";

type SiderBarProps<T> = {
    section: SiderBarSection<T>[] | null;
};

function SiderBar<T>({ section }: SiderBarProps<T>) {

    const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (!section) return;
        const initialState: Record<number, boolean> = {};
        section.forEach(s => {
            initialState[s.id] = false;
        });
        setOpenSections(initialState);
    }, [section]);

    const toggleSection = (id: number) => {
        setOpenSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <nav className="sticky top-20 lg:top-32 md:top-32 flex flex-col rounded-xl p-6 text-xl font-sans h-120 md:h-120 border border-gray-300 bg-gray-200 md:bg-white">

            <div className="h-100 md:h-120 overflow-y-scroll gap-3 no-scrollbar">

                {section?.map(section => (
                    <div className="flex flex-col" key={section.id}>
                        <div
                            className="flex items-center gap-3 cursor-pointer select-none justify-center border p-1 rounded-2xl mb-2 mt-2 bg-blue-100"
                            onClick={() => toggleSection(section.id)}
                        >
                            <p className="font-semibold text-2xl">{section.title}</p>

                            <span className="">
                                {openSections[section.id] ?
                                    <svg className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform block md:block border rounded-2xl p-0.5 bg-blue-200">
                                        <use xlinkHref="/sprite.svg#chevronup-icon" />
                                    </svg> :
                                    <svg className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform block md:block border rounded-2xl p-0.5  bg-blue-200">
                                        <use xlinkHref="/sprite.svg#chevrondown-icon" />
                                    </svg>}
                            </span>
                        </div>

                        {openSections[section.id] && (
                            <aside className="ml-3 transition-all">
                                <ul className="flex flex-col gap-2">
                                    {section.items.map((item, i) => (
                                        <li className="border rounded-xl p-1 cursor-pointer bg-blue-50" key={i}>
                                            {section.renderItem(item)}
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        )}
                    </div>
                ))}

            </div>

        </nav>
    );
}

export default SiderBar;
