"use client";

import {useEffect, useState} from 'react';
import Header from './_components/Header';
import Episodes from './_components/Episodes';
import LoadingScreen from '@/app/_components/screens/LoadingScreen';
import Player from './_components/Player';
import {SeasonAPIDB} from "@/app/_types/SeasonAPIDB";
import {SeasonEpisodeAPIDB} from "@/app/_types/SeasonEpisodeAPIDB";
import {SeasonDb} from "@/app/_types/PrismaTypes";
import {SeasonAPI} from "@/app/_types/SeasonAPI";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";
import {fetchGetTmdbSeason} from "@/app/api/_fetchFunctions/season/tmdb/fetchGetTmdbSeason";
import {fetchGetIdSeason} from "@/app/api/_fetchFunctions/season/id/fetchGetIdSeason";

export default function Season({params}: { params: { seasonNumber: number, id: number } }) {
    const serieId: number = params.id;
    const seasonNumber: number = params.seasonNumber;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [seasonApi, setSeasonApi] = useState<SeasonAPI | undefined>();
    const [seasonDb, setSeasonDb] = useState<SeasonDb | undefined>();

    useEffect(() => {
        document.title = `GtrTV - Regarder - Série n°${serieId} - Saison ${seasonNumber}`;
        setError(false);
        fetchGetTmdbSeason(serieId, seasonNumber, setSeasonApi, setLoading, setError);
        setLoading(false);
    }, [serieId, seasonNumber]);

    useEffect(() => {
        setError(false);
        seasonApi && fetchGetIdSeason(seasonApi.id_, setSeasonDb, setLoading, setError);
        setLoading(false);
    }, [seasonApi]);

    if (loading || ((!seasonApi || !seasonDb) && !error)) {
        return (
            <LoadingScreen/>
        )
    }

    if (error || !seasonApi) {
        return (
            <InternalErrorScreen/>
        );
    }

    const seasonAPIDB: SeasonAPIDB = SeasonAPIDB.getInstanceFromSeasons(seasonApi, seasonDb!);
    const episodesStreaming: SeasonEpisodeAPIDB[] = seasonAPIDB.getEpisodesStreaming();

    return (
        <>
            <Header season={seasonAPIDB}/>
            <Episodes episodes={seasonAPIDB.episodes}/>
            {episodesStreaming.length > 0 &&
                <Player serieId={serieId} seasonNumber={seasonNumber} episodesStreaming={episodesStreaming}/>}
        </>
    );
}