type Props = {
    isVisibleP: boolean,
    onHandleVisble?(): void,
    isSesionP?: boolean,
    onHandleSesion?(): void,
    isCartV?: boolean,
    onHandleCartV?(): void,
}


function Delay({ isVisibleP, isSesionP, isCartV, onHandleSesion, onHandleVisble, onHandleCartV }: Props) {
    return (
        <>
            {
                isVisibleP && (
                    <div className="fixed w-full h-600 bg-black/40 z-60 md:hidden" onClick={onHandleVisble} />
                )
            }

            {
                isSesionP && (
                    <div className="fixed w-full h-600 bg-black/40 z-60 md:hidden" onClick={onHandleSesion} />
                )
            }

            {
                isCartV && (
                    <div className="fixed w-full h-600 bg-black/40 z-60 md:hidden" onClick={onHandleCartV} />
                )
            }
        </>
    )

}

export default Delay;
