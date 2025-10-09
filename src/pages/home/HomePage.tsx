import Header from "./components/Header";
import { useEffect, useState } from "react";
import SiderBar from "./components/SiderBar";
import { Books } from "../../data";
import EBookCard from "./components/EBookCard";
import UserSesion from "./components/UserSesion";
import Browser from "./components/Browser";
import Delay from "../../components/Delay";

function HomePage() {

    const [isVisible, setIsVisible] = useState(window.innerWidth < 835 ? false : true);
    const [isSearch, setIsSearch] = useState(false);
    const [isSesion, setIsSesion] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isVisible && window.innerWidth < 640);
    }, [isVisible]);

    return (

        <div className="w-full max-w-xl-plus mx-auto flex flex-col bg-gray-200 items-center">

            <Delay
                isSesionP={isSesion}
                isVisibleP={isVisible}
                onHandleSesion={() => { setIsSesion(false) }}
                onHandleVisble={() => { setIsVisible(false) }}
            />

            <div
                className={`lg:hidden md:hidden top-25 fixed  transition-all duration-600 ease-in-out z-70 overflow-hidden ${isSesion ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}`}>
                <UserSesion />
            </div>

            <div className="pl-5 pr-5">

                <Header
                    isSesion={isSesion}
                    onHandleSesion={() => { setIsSesion(!isSesion), setIsSearch(false) }}
                    onToggle={() => { setIsVisible(!isVisible), setIsSearch(false) }}
                    onHandleSearch={() => { setIsSearch(!isSearch) }} />

                <Browser
                    isMovil={true}
                    isSearchP={isSearch}
                    isVisibleP={isVisible}
                />

                <div className="flex gap-6  rounded-xl mt-5">

                    <div className={`fixed md:static transition-all duration-500 ease-in-out z-70 ${isVisible ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                        <SiderBar />
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-3 pr-3">
                        {Books.map((book) =>
                            <EBookCard key={book.id} image={book.urlImg} />
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default HomePage;
