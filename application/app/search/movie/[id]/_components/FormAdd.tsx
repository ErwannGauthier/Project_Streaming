"use client"

import {useEffect, useState} from "react";
import SelectButton from "@/app/search/movie/[id]/_components/SelectButton";
import {MovieAPI} from "@/app/_types/MovieAPI";
import {bodyAddMovie} from "@/app/api/movie/[id]/route";
import {fetchGetDirectoriesAlerts} from "@/app/api/_fetchFunctions/util/fetchGetDirectories";
import {fetchPostIdMovie} from "@/app/api/_fetchFunctions/movie/id/fetchPostIdMovie";
import {preventEnterSubmitting} from "@/app/_utils/utilsFunctions";
import {GenreAPI} from "@/app/_types/GenreAPI";

interface FormAddProps {
    movieApi: MovieAPI;
    createAlert: (type: string, message?: string) => void;
    callFetching: () => void,
    hideModal: () => void;
}

export default function FormAdd({movieApi, createAlert, callFetching, hideModal}: FormAddProps) {
    const [formData, setFormData] = useState<bodyAddMovie>({
        id: movieApi.id,
        title: movieApi.title,
        overview: movieApi.overview,
        releaseDate: movieApi.releaseDate,
        pegi: movieApi.getPegi(),
        runtime: movieApi.runtime,
        tagline: movieApi.tagline,
        posterPath: movieApi.posterPath,
        backdropPath: movieApi.backdropPath,
        genres: movieApi.genres.map((genre: GenreAPI) => ({"_id": genre.id, "_name": genre.name})),
        typesStream: [],
        directory: null,
    });

    const [showSelect, setShowSelect] = useState(false);
    const [directories, setDirectories] = useState<string[]>([]);


    useEffect(() => {
        if (showSelect) {
            fetchGetDirectoriesAlerts("movie", setDirectories, createAlert);
        } else {
            setFormData((previousForm: bodyAddMovie) => ({
                ...previousForm, ["directory"]: null
            }));
        }
    }, [showSelect]);

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>, type: number): void => {
        const newTypes: number[] = formData.typesStream.includes(type) ?
            formData.typesStream.filter((value: number) => value != type) : [type, ...formData.typesStream];

        setFormData((previousForm: bodyAddMovie) => ({
            ...previousForm, ["typesStream"]: newTypes
        }));

        (type === 4 && !showSelect) && setShowSelect(true);
        (type === 4 && showSelect) && setShowSelect(false);
    }

    const handleDirectoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setFormData((previousForm: bodyAddMovie) => ({
            ...previousForm, ["directory"]: event.target.value
        }));
    }

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        createAlert("reset");

        if (formData.typesStream.length === 0) {
            createAlert("warning", "Vous devez sélectionner au moins un mode de visionnage.");
            return;
        } else if (formData.typesStream.includes(4) && (formData.directory === "defaultValue" || formData.directory === null)) {
            createAlert("warning", "Vous devez sélectionner un fichier pour pouvoir ajouter un film en streaming.");
            return;
        }

        createAlert("loading");
        const isOk: boolean = await fetchPostIdMovie(formData);

        createAlert("reset");
        if (!isOk) {
            createAlert("error", "Une erreur s'est produite lors de l'ajout du film à la base de données.");
            return;
        }

        createAlert("validate", "Le film a été ajouté à la base de données.");
        callFetching();
        hideModal();
    }


    return (
        <form onSubmit={handleSubmit} id="formAdd" className="flex flex-col text-black">
            <div className="pb-4">
                <label className="block mb-1 text-base font-semibold text-gray-900 px-2" htmlFor="title">Titre</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onKeyDown={preventEnterSubmitting} type="text"
                    id="title" name="title" placeholder="Titre du film..." autoComplete="off" required
                    value={formData.title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormData((previousForm: bodyAddMovie) => ({
                        ...previousForm,
                        [event.target.name]: event.target.value
                    }))}
                />
            </div>
            <div className="pb-4">
                <label className="block mb-1 text-base font-semibold text-gray-900 px-2"
                       htmlFor="overview">Synopsis</label>
                <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="overview" name="overview" placeholder="Synopsis du film..." autoComplete="off" required
                    value={formData.overview}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((previousForm: bodyAddMovie) => ({
                        ...previousForm,
                        [event.target.name]: event.target.value
                    }))}
                ></textarea>
            </div>
            <div>
                <p className="block mb-1 text-base font-semibold text-gray-900 px-2">Disponible en :</p>
                <div className="flex flex-row items-center px-1">
                    <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmitting} type="checkbox" name="dvd" id="dvd"
                        checked={formData.typesStream.includes(1)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTypeChange(event, 1)}/>
                    <label className="block text-base font-medium text-gray-900 px-2" htmlFor="dvd">DVD</label>
                </div>
                <div className="flex flex-row items-center px-1">
                    <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmitting} type="checkbox" name="dvdgr" id="dvdgr"
                        checked={formData.typesStream.includes(2)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTypeChange(event, 2)}/>
                    <label className="block text-base font-medium text-gray-900 px-2" htmlFor="dvdgr">DVD Gravé</label>
                </div>
                <div className="flex flex-row items-center px-1">
                    <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmitting} type="checkbox" name="k7" id="k7"
                        checked={formData.typesStream.includes(3)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTypeChange(event, 3)}/>
                    <label className="block text-base font-medium text-gray-900 px-2" htmlFor="k7">K7</label>
                </div>
                <div className="flex flex-row items-center px-1">
                    <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        onKeyDown={preventEnterSubmitting} type="checkbox" name="streaming" id="streaming"
                        checked={formData.typesStream.includes(4)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTypeChange(event, 4)}/>
                    <label className="block text-base font-medium text-gray-900 px-2"
                           htmlFor="streaming">Streaming</label>
                </div>
            </div>
            <div className={showSelect ? "pt-6" : ""}>
                {showSelect && <SelectButton directories={directories} directory={formData.directory}
                                             handleDirectoryChange={handleDirectoryChange}/>}
            </div>
        </form>
    );
}