interface ButtonNextProps {
    currentEp: number;
    episodesLength: number;
    changeCurrentEp: (newEpIndex: number) => void
}

export default function ButtonNext({currentEp, episodesLength, changeCurrentEp}: ButtonNextProps) {
    const hasNext: boolean = currentEp < episodesLength - 1;

    return (
        <>
            <button onClick={() => {
                hasNext && changeCurrentEp(currentEp + 1)
            }} disabled={!hasNext}
                    className={`w-full p-2.5 flex justify-center items-center bg-neutral-700 border-[1px] border-solid border-neutral-400 rounded-r-lg focus:ring-red-700 focus:border-red-700 ${!hasNext && "cursor-not-allowed"}`}>
                <div className="px-4">
                    <p className={`${hasNext ? "text-white" : "text-gray-400"}`}>Suivant</p>
                </div>
                <div role="status">
                    <svg className={`w-4 h-4 ${hasNext ? "text-white" : "text-gray-400"}`} aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </div>
            </button>
        </>
    )
}