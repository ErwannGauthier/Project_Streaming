interface ButtonPreviousProps {
    currentEp: number;
    changeCurrentEp: (newEpIndex: number) => void
}

export default function ButtonPrevious({currentEp, changeCurrentEp}: ButtonPreviousProps) {
    const hasPrevious: boolean = currentEp > 0;

    return (
        <>
            <button onClick={() => {
                hasPrevious && changeCurrentEp(currentEp - 1)
            }}
                    disabled={!hasPrevious}
                    className={`w-full p-2.5 flex justify-center items-center bg-neutral-700 border-[1px] border-solid border-neutral-400 rounded-l-lg focus:ring-red-700 focus:border-red-700 ${!hasPrevious && "cursor-not-allowed"}`}>
                <div role="status">
                    <svg className={`w-4 h-4 ${hasPrevious ? "text-white" : "text-gray-400"}`} aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                </div>
                <div className="px-4">
                    <p className={`${hasPrevious ? "text-white" : "text-gray-400"}`}>Précédent</p>
                </div>
            </button>
        </>
    )
}