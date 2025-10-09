type Props = {
    isVisibleP: boolean,
    onHandleVisble(): void,
    isSesionP: boolean,
    onHandleSesion(): void,
}


function Delay({ isVisibleP, isSesionP, onHandleSesion, onHandleVisble }: Props) {
    return (
        <>
            {
                isVisibleP && (
                    <div className="fixed w-full h-full bg-black/40 z-60 md:hidden" onClick={onHandleVisble} />
                )
            }

            {
                isSesionP && (
                    <div className="fixed w-full h-full bg-black/40 z-60 md:hidden" onClick={onHandleSesion} />
                )
            }
        </>
    )

}

export default Delay;
