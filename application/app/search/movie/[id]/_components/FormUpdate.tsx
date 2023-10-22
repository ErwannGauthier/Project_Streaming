"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import SelectButton from "./SelectButton";
import {sleep} from "@/app/_utils/sleep";

interface FormUpdateProps {
    id: number,
    title: string;
    overview: string;
    typesStream: Array<number>,
    createAlert: (type: string, message?: string) => void;
    hideModal: () => void;
}

function compareTwoArray(first: number[], second: number[]) {
    let areSameArray = false;
    if (first.length === second.length) {
        areSameArray = true;
        for (let i = 0; i < first.length; ++i) {
            if (!second.includes(first[i])) {
                areSameArray = false;
                break;
            }
        }
    }

    return areSameArray;
}

async function callUpdateMovie(id: number, title: string, overview: string, typesStream: Array<number>, wasStreaming: boolean, file: string | null) {
    const response = await fetch("/api/DATABASE/updateMovie/",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: title,
                overview: overview,
                typesStream: typesStream,
                wasStreaming: wasStreaming,
                file: file,
            })
        });

    const data = await response.json();
    const result = {
        message: data?.message,
        isOk: response.ok,
    };

    return result;
}

export default function FormUpdate({ id, title, overview, typesStream, createAlert, hideModal }: FormUpdateProps) {
    const [showSelect, setShowSelect] = useState(false);
    const [movieFiles, setMovieFiles] = useState(Array<string>);
    const router = useRouter();

    function preventEnterSubmition(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    async function submitForm(event: React.FormEvent) {
        event.preventDefault();
        createAlert("reset");

        const target = event.target as HTMLFormElement;
        const newTitle = (target.elements.namedItem("title") as HTMLInputElement).value;
        const newOverview = (target.elements.namedItem("overview") as HTMLTextAreaElement).value;
        const dvd = (target.elements.namedItem("dvd") as HTMLInputElement).checked;
        const dvdgr = (target.elements.namedItem("dvdgr") as HTMLInputElement).checked;
        const k7 = (target.elements.namedItem("k7") as HTMLInputElement).checked;
        const streaming = (target.elements.namedItem("streaming") as HTMLInputElement).checked;
        const file = showSelect ? (target.elements.namedItem("file") as HTMLSelectElement).value : null;
        // @ts-ignore
        const newTypesStream: Array<number> = [dvd && 1, dvdgr && 2, k7 && 3, streaming && 4].filter(value => value != false);

        if (newTypesStream.length === 0) {
            createAlert("warning", "Vous devez sélectionner au moins un mode de visionnage.");
            return;
        } else if (showSelect && file === 'defaultValue') {
            createAlert("warning", "Vous devez sélectionner un fichier pour pouvoir ajouter un film en streaming.");
            return;
        } else if (title === newTitle && overview === newOverview && compareTwoArray(typesStream, newTypesStream) && ((typesStream.includes(4) && file === null) || !typesStream.includes(4))) {
            createAlert("warning", "Aucune modification n'a été apporté à ce film.");
            return;
        }

        createAlert("loading");
        const result = await callUpdateMovie(id, newTitle, newOverview, newTypesStream, typesStream.includes(4), file);
        if (!result["isOk"]) {
            createAlert("error", result["message"]);
            return;
        }

        createAlert("validate", result["message"] + "  Vous allez être redirigé...");
        await sleep(2000);
        hideModal();
        router.push("/");
    }

    async function callAPI() {
        const response = await fetch('/api/UTILS/getMovieFiles');
        if (response.ok) {
            const result = await response.json();
            return result;
        }

        createAlert("error", "Erreur lors de la récupération des fichiers.");
    }

    async function streamingChecked(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement;
        const isChecked = target.checked;

        createAlert("reset");

        if (!isChecked) {
            setShowSelect(false);
            return;
        }

        createAlert("loading");
        const result: any = await callAPI();
        if (result) {
            if (result.files.length === 0) {
                createAlert("warning", "Il n'y a aucun fichier au format MP4 dans le dossier.");
                return;
            } else {
                setMovieFiles(result.files);
                setShowSelect(true);
            }
        }
        createAlert("reset");
        return;
    }

    return (
        <form onSubmit={submitForm} id="formUpdate" className="flex flex-col text-black">
            <div className="pb-4">
                <label className="block mb-1 text-base font-semibold text-gray-900 px-2" htmlFor="title">Titre</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onKeyDown={preventEnterSubmition} type="text" name="title" id="title"
                    placeholder="Titre du film..." defaultValue={title} autoComplete="off" required />
            </div>
            <div className="pb-4">
                <label className="block mb-1 text-base font-semibold text-gray-900 px-2" htmlFor="overview">Synopsis</label>
                <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="overview" id="overview" defaultValue={overview} placeholder="Synopsis du film..."
                    autoComplete="off" required>
                </textarea>
            </div>
            <div>
                <p className="block mb-1 text-base font-semibold text-gray-900 px-2">Disponible en :</p>
                <div className="flex flex-row items-center px-1">
                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmition} type="checkbox" name="dvd" id="dvd"
                        defaultChecked={typesStream.includes(1)} />
                    <label className="block text-base font-medium text-gray-900 px-2" htmlFor="dvd">DVD</label>
                </div>
                <div className="flex flex-row items-center px-1">
                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmition} type="checkbox" name="dvdgr" id="dvdgr"
                        defaultChecked={typesStream.includes(2)} />
                    <label className="block text-base font-medium text-gray-900 px-2" htmlFor="dvdgr">DVD Gravé</label>
                </div>
                <div className="flex flex-row items-center px-1">
                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmition} type="checkbox" name="k7" id="k7"
                        defaultChecked={typesStream.includes(3)} />
                    <label className="block text-base font-medium text-gray-900 px-2" htmlFor="k7">K7</label>
                </div>
                <div className="flex flex-row items-center px-1">
                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmition} onChange={streamingChecked} type="checkbox" name="streaming" id="streaming"
                        defaultChecked={typesStream.includes(4)} />
                    <label className="block text-base font-medium text-gray-900 px-2" htmlFor="streaming">Streaming</label>
                </div>
            </div>
            <div className={showSelect ? "pt-6" : ""}>
                {showSelect && <SelectButton files={movieFiles} />}
            </div>
        </form>
    );
}