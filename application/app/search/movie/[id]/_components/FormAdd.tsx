import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import SelectButton from "./SelectButton";
import {GenreAPI} from "@/app/api/TMDB/_types/GenreAPI";
import {sleep} from "@/app/_utils/sleep";

interface FormAddProps {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    pegi: string;
    runtime: number;
    tagline: string;
    posterPath: string;
    backdropPath: string;
    genres: Array<GenreAPI>;
    createAlert: (type: string, message?: string) => void;
    hideModal: () => void;
}

interface sendMovieToAPIProps {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    pegi: string;
    runtime: number;
    tagline: string;
    posterPath: string;
    backdropPath: string;
    genres: Array<GenreAPI>;
    typesStream: Array<number>;
    file: string | null;
}

async function sendMovieToAPI(movieData: sendMovieToAPIProps) {
    const response = await fetch("/api/DATABASE/addMovie/",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movieData })
        });

    const data = await response.json();
    const result = {
        message: data?.message,
        isOk: response.ok,
    };

    return result;
}

export default function FormAdd({ id, title, overview, releaseDate, pegi, runtime, tagline, posterPath, backdropPath, genres, createAlert, hideModal }: FormAddProps) {
    const [showSelect, setShowSelect] = useState(false);
    const [movieFiles, setMovieFiles] = useState(Array<string>);
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

        const title = (target.elements.namedItem("title") as HTMLInputElement).value;
        const overview = (target.elements.namedItem("overview") as HTMLTextAreaElement).value;
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
            createAlert("warning", "Vous devez sélectionner un fichier pour pouvoir ajouter un film en streaming.");
            return;
        }

        const movieData = {
            id: id,
            title: title,
            overview: overview,
            releaseDate: releaseDate,
            pegi: pegi,
            runtime: runtime,
            tagline: tagline,
            posterPath: posterPath,
            backdropPath: backdropPath,
            genres: genres,
            typesStream: typesStream,
            file: file
        };

        createAlert("loading");
        const apiResult = await sendMovieToAPI(movieData);
        if (!apiResult["isOk"]) {
            createAlert("error", apiResult["message"]);
            return;
        }

        createAlert("validate", apiResult["message"] + "  Vous allez être redirigé...");
        await sleep(2000);
        hideModal();
        router.push("/");
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
                setMovieFiles(result.files);
                setShowSelect(true);
                disableSubmitButton(false);
            }
        }
        createAlert("reset");
        return;
    }

    return (
        <form onSubmit={submitForm} id="formAdd" className="flex flex-col text-black">
            <div className="pb-4">
                <label className="block mb-1 text-base font-semibold text-gray-900 px-2" htmlFor="title">Titre</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onKeyDown={preventEnterSubmition}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Titre du film..."
                    defaultValue={title}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="pb-4">
                <label className="block mb-1 text-base font-semibold text-gray-900 px-2" htmlFor="overview">Synopsis</label>
                <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="overview" id="overview" defaultValue={overview} placeholder="Synopsis du film..." autoComplete="off" required></textarea>
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
                {showSelect && <SelectButton files={movieFiles} />}
            </div>
        </form>
    );
}