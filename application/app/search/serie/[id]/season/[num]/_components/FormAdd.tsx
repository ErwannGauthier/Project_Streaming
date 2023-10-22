'use client'

import {useEffect, useState} from "react";
import SelectButton from "./SelectButton";
import {sleep} from "@/app/_utils/sleep";
import {useRouter} from "next/navigation";


interface FormAddProps {
    serieId: number,
    seasonId: number,
    seasonNumber: number
    episodeId: number,
    episodeNumber: number,
    createAlert: (type: string, message?: string) => void;
    hideModal: () => void;
}

interface sendEpisodeToAPIProps {
    serieId: number,
    seasonId: number,
    seasonNumber: number,
    episodeId: number,
    episodeNumber: number,
    typesStream: Array<number>,
    file: string | null
}

async function sendEpisodeToAPI(episodeData: sendEpisodeToAPIProps) {
    const response = await fetch("/api/DATABASE/addEpisode/",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ episodeData })
        });

    const data = await response.json();
    const result = {
        message: data?.message,
        isOk: response.ok,
    };

    return result;
}

export default function FormAdd({ serieId, seasonId, seasonNumber, episodeId, episodeNumber, createAlert, hideModal }: FormAddProps) {
    const [showSelect, setShowSelect] = useState(false);
    const [episodeFiles, setEpisodeFiles] = useState(Array<string>);
    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    function scrollToTop() {
        const modalElement: HTMLElement = hasMounted ? document.querySelector('#modalEl')! : null!;
        hasMounted && modalElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    function preventEnterSubmition(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    async function submitForm(event: React.FormEvent) {
        event.preventDefault();
        createAlert("reset");
        scrollToTop();

        const target = event.target as HTMLFormElement;
        const dvd = (target.elements.namedItem("dvd") as HTMLInputElement).checked;
        const dvdgr = (target.elements.namedItem("dvdgr") as HTMLInputElement).checked;
        const k7 = (target.elements.namedItem("k7") as HTMLInputElement).checked;
        const streaming = (target.elements.namedItem("streaming") as HTMLInputElement).checked;
        const file = showSelect ? (target.elements.namedItem("file") as HTMLSelectElement).value : null;
        // @ts-ignore
        const typesStream: Array<number> = [dvd && 1, dvdgr && 2, k7 && 3, streaming && 4].filter(value => value != false);


        if (!dvd && !dvdgr && !k7 && !streaming) {
            createAlert("warning", "Vous devez sélectionner au moins un mode de visionnage.");
            return;
        } else if (showSelect && file === 'defaultValue') {
            createAlert("warning", "Vous devez sélectionner un fichier pour pouvoir ajouter un épisode en streaming.");
            return;
        } else if (!episodeNumber) {
            createAlert("error", "Une erreur est suvernue.");
        }

        const episodeData = {
            serieId: serieId,
            seasonId: seasonId,
            seasonNumber: seasonNumber,
            episodeId: episodeId,
            episodeNumber: episodeNumber,
            typesStream: typesStream,
            file: file,
        }

        createAlert("loading");
        const apiResult = await sendEpisodeToAPI(episodeData);
        if (!apiResult["isOk"]) {
            createAlert("error", apiResult["message"]);
            return;
        }

        createAlert("validate", apiResult["message"] + " Vous allez être redirigé...");
        await sleep(2000);
        hideModal();
        router.push(`/search/serie/${serieId}`);
    }

    function disableSubmitButton(disable: boolean) {
        const submitButton = document.querySelector('#submitButton') as HTMLElement;

        if (disable) {
            submitButton.classList.add("cursor-not-allowed");
            submitButton.setAttribute("disabled", "");
        } else {
            submitButton.classList.remove("cursor-not-allowed");
            submitButton.removeAttribute("disabled");
        }
    }

    async function callAPI() {
        const response = await fetch('/api/UTILS/getSerieFiles');
        if (response.ok) {
            const result = await response.json();
            return result;
        }

        createAlert("reset");
        scrollToTop();
        createAlert("error", "Erreur lors de la récupération des fichiers.");
    }

    async function streamingChecked(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement;
        const isChecked = target.checked;
        disableSubmitButton(false);

        createAlert("reset");

        if (!isChecked) {
            setShowSelect(false);
            return;
        }

        disableSubmitButton(true);
        createAlert("loading");
        const result: any = await callAPI();
        if (result) {
            if (result.files.length === 0) {
                createAlert("warning", "Il n'y a aucun fichier au format MP4 dans le dossier.");
                return;
            } else {
                setEpisodeFiles(result.files);
                setShowSelect(true);
                disableSubmitButton(false);
            }
        }
        createAlert("reset");
        return;
    }

    return (
        <>
            <form onSubmit={submitForm} id="formAdd" className="flex flex-col text-black">
                <div className="pb-4">
                    <h3 className="font-semibold text-xl text-neutral-900">Saison {seasonNumber}<span className="font-medium text-lg text-neutral-700"> • Épisode {episodeNumber}</span>
                    </h3>
                    <p className="hidden">Épisode ID: <span id="spanEpId"></span></p>
                </div>
                <div>
                    <p className="block mb-1 text-base font-semibold text-gray-900 px-2">Disponible en :</p>
                    <div className="flex flex-row items-center px-1">
                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" onKeyDown={preventEnterSubmition} type="checkbox" name="dvd" id="dvd" />
                        <label className="block text-base font-medium text-gray-900 px-2" htmlFor="dvd">DVD</label>
                    </div>
                    <div className="flex flex-row items-center px-1">
                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" onKeyDown={preventEnterSubmition} type="checkbox" name="dvdgr" id="dvdgr" />
                        <label className="block text-base font-medium text-gray-900 px-2" htmlFor="dvdgr">DVD Gravé</label>
                    </div>
                    <div className="flex flex-row items-center px-1">
                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" onKeyDown={preventEnterSubmition} type="checkbox" name="k7" id="k7" />
                        <label className="block text-base font-medium text-gray-900 px-2" htmlFor="k7">K7</label>
                    </div>
                    <div className="flex flex-row items-center px-1">
                        <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" onKeyDown={preventEnterSubmition} onChange={streamingChecked} type="checkbox" name="streaming" id="streaming" />
                        <label className="block text-base font-medium text-gray-900 px-2" htmlFor="streaming">Streaming</label>
                    </div>
                </div>
                <div className={showSelect ? "pt-6" : ""}>
                    {showSelect && <SelectButton files={episodeFiles} />}
                </div>
            </form>
        </>
    );
}