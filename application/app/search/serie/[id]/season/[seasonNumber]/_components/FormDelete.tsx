import {SeasonAPI} from "@/app/_types/SeasonAPI";
import {EpisodeAPI} from "@/app/_types/EpisodeAPI";
import {useEffect, useState} from "react";
import {bodyDeleteEpisode} from "@/app/api/episode/[id]/route";
import {EpisodeDb, SeasonDb} from "@/app/_types/PrismaTypes";
import {PrismaUtils} from "@/app/_types/PrismaUtils";
import {fetchDeleteIdEpisode} from "@/app/api/_fetchFunctions/episode/id/fetchDeleteIdEpisode";

interface FormDeleteProps {
    serieId: number,
    seasonApi: SeasonAPI,
    seasonDb: SeasonDb;
    episodeNumber: number,
    createAlert: (type: string, message?: string) => void;
    callFetching: () => void,
    hideModal: () => void;
}

export default function FormDelete({
                                       serieId, seasonApi, seasonDb,
                                       episodeNumber, createAlert, callFetching, hideModal
                                   }: FormDeleteProps) {
    const episodeApi: EpisodeAPI = seasonApi.getEpisodeAPIByEpisodeNumber(episodeNumber)!;
    const episodeDb: EpisodeDb = PrismaUtils.getEpisodeDBByEpisodeNumber(seasonDb.Episode, episodeNumber)!;
    const [formData, setFormData] = useState<bodyDeleteEpisode>({
        serieId: serieId,
        seasonId: seasonApi.id_,
        seasonNumber: seasonApi.seasonNumber,
        episodeId: episodeApi.id,
        episodeNumber: episodeNumber,
        isStreaming: PrismaUtils.hasStreaming(episodeDb.TypeStream),
    });

    useEffect(() => {
        const episodeApi: EpisodeAPI = seasonApi.getEpisodeAPIByEpisodeNumber(episodeNumber)!;
        const episodeDb: EpisodeDb = PrismaUtils.getEpisodeDBByEpisodeNumber(seasonDb.Episode, episodeNumber)!;
        setFormData({
            serieId: serieId,
            seasonId: seasonApi.id_,
            seasonNumber: seasonApi.seasonNumber,
            episodeId: episodeApi.id,
            episodeNumber: episodeNumber,
            isStreaming: PrismaUtils.hasStreaming(episodeDb.TypeStream),
        });
    }, [episodeNumber]);

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        createAlert("reset");
        createAlert("loading");

        const isOk: boolean = await fetchDeleteIdEpisode(formData);

        createAlert("reset");
        if (!isOk) {
            createAlert("error", "Une erreur s'est produite lors de la suppression de l'épisode de la base de données.");
            return;
        }

        createAlert("validate", "L'épisode a été supprimé de la base de données.");
        callFetching();
        hideModal();
    }

    return (
        <form className="hidden" onSubmit={handleSubmit} id="formDelete"></form>
    );
}