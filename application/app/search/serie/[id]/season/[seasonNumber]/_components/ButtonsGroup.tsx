interface ButtonGroupProps {
    isInDb: boolean;
    hideModal: () => void
}

export default function ButtonsGroup({isInDb, hideModal}: ButtonGroupProps) {
    return (
        <>
            {isInDb ?
                <>
                    <button
                        className="text-black bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-amber-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 w-[100px]"
                        id="updateButton" type="submit" form="formUpdate">Modifier
                    </button>
                    <button
                        className="text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 w-[100px]"
                        id="deleteButton" type="submit" form="formDelete">Supprimer
                    </button>
                </>
                :
                <>
                    <button id="submitButton" type="submit" form="formAdd"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ajouter
                    </button>
                    <button type="button" onClick={hideModal}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Annuler
                    </button>
                </>
            }
        </>
    );
}