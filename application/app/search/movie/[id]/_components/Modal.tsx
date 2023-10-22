'use client'

import { useEffect } from "react";
import type { ModalInterface, ModalOptions } from 'flowbite';
import { Modal } from "flowbite";
import { MovieAPI } from "@/app/api/TMDB/_types/MovieAPI";
import { Movie, TypeStream } from "@prisma/client";
import Forms from "./Forms";
import ButtonsGroup from "./ButtonsGroup";

interface MyModalProps {
    movieAPI: MovieAPI;
    movieDB: Movie & { TypeStream: Array<TypeStream> } | null;
    parentFunction: (modal: ModalInterface) => void,
    hideModal: () => void;
}

export default function MyModal({ movieAPI, movieDB, parentFunction, hideModal }: MyModalProps) {
    useEffect(() => {
        const modalElement: HTMLElement = document.querySelector('#modalEl')!;
        const modalOptions: ModalOptions = {
            placement: 'center',
            backdrop: 'dynamic',
            backdropClasses: 'z-40 bg-gray-900 bg-opacity-50 fixed inset-0',
            closable: true,
        }
        const modal: ModalInterface = new Modal(modalElement, modalOptions);
        parentFunction(modal);
    }, [parentFunction]);

    const isInDb = movieDB !== null;
    const modalTitle = isInDb ? "Modifier ce film" : "Ajouter ce film";

    return (
        <>
            <div id="modalEl" className="z-50 fixed top-0 left-0 right-0 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                                {modalTitle}
                            </h3>
                            <button onClick={hideModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Fermer</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <Forms movieAPI={movieAPI} movieDB={movieDB} hideModal={hideModal} />
                        </div>
                        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <ButtonsGroup isInDb={isInDb} hideModal={hideModal} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}