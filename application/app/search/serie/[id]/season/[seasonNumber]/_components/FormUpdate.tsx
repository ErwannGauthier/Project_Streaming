"use client"

import {useEffect, useState} from "react";
import SelectButton from "./SelectButton";
import {SeasonAPI} from "@/app/_types/SeasonAPI";
import {TypeStream} from "@prisma/client";
import {EpisodeAPI} from "@/app/_types/EpisodeAPI";
import {PrismaUtils} from "@/app/_types/PrismaUtils";
import {bodyUpdateEpisode} from "@/app/api/episode/[id]/route";
import {EpisodeDb, SeasonDb} from "@/app/_types/PrismaTypes";
import {fetchGetDirectoriesAlerts} from "@/app/api/_fetchFunctions/util/fetchGetDirectories";
import {compareArray, preventEnterSubmitting} from "@/app/_utils/utilsFunctions";
import {fetchPutIdEpisode} from "@/app/api/_fetchFunctions/episode/id/fetchPutIdEpisode";

interface FormUpdateProps {
    serieId: number;
    seasonApi: SeasonAPI;
    seasonDb: SeasonDb;
    episodeNumber: number,
    createAlert: (type: string, message?: string) => void;
    callFetching: () => void,
    hideModal: () => void;
}

export default function FormUpdate({
                                       serieId, seasonApi, seasonDb, episodeNumber,
                                       createAlert, callFetching, hideModal
                                   }: FormUpdateProps) {
    const episodeApi: EpisodeAPI = seasonApi.getEpisodeAPIByEpisodeNumber(episodeNumber)!;
    const episodeDb: EpisodeDb = PrismaUtils.getEpisodeDBByEpisodeNumber(seasonDb.Episode, episodeNumber)!;
    const [formData, setFormData] = useState<bodyUpdateEpisode>({
        serieId: serieId,
        seasonId: seasonApi.id_,
        seasonNumber: seasonApi.seasonNumber,
        episodeId: episodeApi.id,
        episodeNumber: episodeNumber,
        typesStream: episodeDb.TypeStream.map((type: TypeStream) => type.id),
        wasStreaming: (episodeDb.TypeStream.map((type: TypeStream) => type.id)).includes(4),
        directory: null,
    });

    const [showSelect, setShowSelect] = useState(false);
    const [directories, setDirectories] = useState<string[]>([]);

    useEffect(() => {
        const episodeApi: EpisodeAPI = seasonApi.getEpisodeAPIByEpisodeNumber(episodeNumber)!;
        const episodeDb: EpisodeDb = PrismaUtils.getEpisodeDBByEpisodeNumber(seasonDb.Episode, episodeNumber)!;
        setFormData({
            serieId: serieId,
            seasonId: seasonApi.id_,
            seasonNumber: seasonApi.seasonNumber,
            episodeId: episodeApi.id,
            episodeNumber: episodeNumber,
            typesStream: episodeDb.TypeStream.map((type: TypeStream) => type.id),
            wasStreaming: (episodeDb.TypeStream.map((type: TypeStream) => type.id)).includes(4),
            directory: null,
        });
        fetchGetDirectoriesAlerts("serie", setDirectories, createAlert);
        setShowSelect(false);
    }, [episodeDb, episodeNumber]);

    useEffect(() => {
        if (showSelect) {
            fetchGetDirectoriesAlerts("serie", setDirectories, createAlert);
        } else {
            setFormData((previousForm: bodyUpdateEpisode) => ({
                ...previousForm, ["directory"]: null
            }));
        }
    }, [showSelect]);

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>, type: number): void => {
        const newTypes: number[] = formData.typesStream.includes(type) ?
            formData.typesStream.filter((value: number) => value != type) : [type, ...formData.typesStream];

        setFormData((previousForm: bodyUpdateEpisode) => ({
            ...previousForm, ["typesStream"]: newTypes
        }));

        (type === 4 && newTypes.includes(type) && !showSelect) && setShowSelect(true);
        (type === 4 && !newTypes.includes(type) && showSelect) && setShowSelect(false);
    }

    const handleDirectoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setFormData((previousForm: bodyUpdateEpisode) => ({
            ...previousForm, ["directory"]: event.target.value
        }));
    }

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        createAlert("reset");

        if (formData.typesStream.length === 0) {
            createAlert("warning", "Vous devez sélectionner au moins un mode de visionnage.");
            return;
        } else if (showSelect && formData.typesStream.includes(4) && (formData.directory === "defaultValue" || formData.directory === null)) {
            createAlert("warning", "Vous devez sélectionner un fichier pour pouvoir ajouter un épisode en streaming.");
            return;
        } else if ((compareArray(episodeDb.TypeStream.map((type: TypeStream) => type.id), formData.typesStream)) && ((formData.typesStream.includes(4) && formData.directory === null) || !formData.typesStream.includes(4))) {
            createAlert("warning", "Aucune modification n'a été apporté à cet épisode.");
            return;
        }

        createAlert("loading");
        const isOk: boolean = await fetchPutIdEpisode(formData);

        createAlert("reset");
        if (!isOk) {
            createAlert("error", "Une erreur s'est produite lors de la modification de l'épisode dans la base de données.");
            return;
        }

        createAlert("validate", "L'épisode a été modifié dans la base de données.");
        callFetching();
        setShowSelect(false);
        hideModal();
    }


    return (
        <form onSubmit={handleSubmit} id="formUpdate" className="flex flex-col text-black">
            <div className="pb-4">
                <h2 className="font-bold text-xl text-neutral-900">{episodeApi.name}</h2>
                <h3 className="font-semibold text-xl text-neutral-900">Saison {seasonDb.seasonNumber}<span
                    className="font-medium text-lg text-neutral-700"> • Épisode {episodeNumber}</span></h3>
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