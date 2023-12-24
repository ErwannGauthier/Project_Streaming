'use client'

import {useEffect, useState} from "react";
import SelectButton from "./SelectButton";
import {SeasonAPI} from "@/app/_types/SeasonAPI";
import {EpisodeAPI} from "@/app/_types/EpisodeAPI";
import {bodyAddEpisode} from "@/app/api/episode/[id]/route";
import {fetchGetDirectoriesAlerts} from "@/app/api/_fetchFunctions/util/fetchGetDirectories";
import {preventEnterSubmitting} from "@/app/_utils/utilsFunctions";
import {fetchPostIdEpisode} from "@/app/api/_fetchFunctions/episode/id/fetchPostIdEpisode";

interface FormAddProps {
    serieId: number;
    seasonApi: SeasonAPI;
    episodeNumber: number;
    createAlert: (type: string, message?: string) => void;
    callFetching: () => void,
    hideModal: () => void;
}

export default function FormAdd({
                                    serieId, seasonApi, createAlert,
                                    episodeNumber, callFetching, hideModal
                                }: FormAddProps) {
    const episode: EpisodeAPI = seasonApi.getEpisodeAPIByEpisodeNumber(episodeNumber)!;
    const [formData, setFormData] = useState<bodyAddEpisode>({
        serieId: serieId,
        seasonId: seasonApi.id_,
        seasonNumber: seasonApi.seasonNumber,
        episodeId: episode.id,
        episodeNumber: episodeNumber,
        typesStream: [],
        directory: null,
    });

    const [showSelect, setShowSelect] = useState(false);
    const [directories, setDirectories] = useState<string[]>([]);


    useEffect(() => {
        const episode: EpisodeAPI = seasonApi.getEpisodeAPIByEpisodeNumber(episodeNumber)!;
        setFormData({
            serieId: serieId,
            seasonId: seasonApi.id_,
            seasonNumber: seasonApi.seasonNumber,
            episodeId: episode.id,
            episodeNumber: episodeNumber,
            typesStream: [],
            directory: null,
        });
        setShowSelect(false);
    }, [episodeNumber]);

    useEffect(() => {
        if (showSelect) {
            fetchGetDirectoriesAlerts("serie", setDirectories, createAlert);
        } else {
            setFormData((previousForm: bodyAddEpisode) => ({
                ...previousForm, ["directory"]: null
            }));
        }
    }, [showSelect]);

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>, type: number): void => {
        const newTypes: number[] = formData.typesStream.includes(type) ?
            formData.typesStream.filter((value: number) => value != type) : [type, ...formData.typesStream];

        setFormData((previousForm: bodyAddEpisode) => ({
            ...previousForm, ["typesStream"]: newTypes
        }));

        (type === 4 && !showSelect) && setShowSelect(true);
        (type === 4 && showSelect) && setShowSelect(false);
    }

    const handleDirectoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setFormData((previousForm: bodyAddEpisode) => ({
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
        } else if (!episodeNumber) {
            createAlert("error", "Une erreur est survenue.");
        }

        createAlert("loading");
        const isOk: boolean = await fetchPostIdEpisode(formData);

        createAlert("reset");
        if (!isOk) {
            createAlert("error", "Une erreur s'est produite lors de l'ajout de l'épisode à la base de données.");
            return;
        }

        createAlert("validate", "L'épisode a été ajouté à la base de données.");
        callFetching();
        hideModal();
    }

    return (
        <>
            <form onSubmit={handleSubmit} id="formAdd" className="flex flex-col text-black">
                <div className="pb-4">
                    <h3 className="font-semibold text-xl text-neutral-900">Saison {seasonApi.seasonNumber}<span
                        className="font-medium text-lg text-neutral-700"> • Épisode {episodeNumber}</span>
                    </h3>
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
                        <label className="block text-base font-medium text-gray-900 px-2" htmlFor="dvdgr">DVD
                            Gravé</label>
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
        </>
    );
}