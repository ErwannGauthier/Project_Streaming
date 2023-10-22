"use client";

import { useEffect } from 'react';
import useSWR from 'swr';
import Header from './_components/Header';
import Episodes from './_components/Episodes';
import LoadingScreen from '@/app/_components/LoadingScreen';
import { SeasonAPIDB } from '@/app/api/TMDB/_types/SeasonAPIDB';
import { getEpisodesStreaming } from '@/app/_utils/getEpisodeStreaming';
import Player from './_components/Player';

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function Season({ params }: { params: { seasonNumber: number, id: number } }) {
    const serieID = params.id;
    const seasonNumber = params.seasonNumber;

    useEffect(() => {
        document.title = `GtrTV - Regarder - Série n°${serieID} - Saison ${seasonNumber}`;
    }, [serieID, seasonNumber]);

    const { data, isLoading } = useSWR(`/api/TMDB/getSeasonAndDB?id=${serieID}&seasonNumber=${seasonNumber}`, fetchData);
    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    const result: SeasonAPIDB = data?.result;
    const episodesStreaming = getEpisodesStreaming(result["episodes"]);

    return (
        <>
            <Header air_date={result["air_date"]} episodes_length={result["episodes"].length} name={result["name"]} overview={result["overview"]} poster_path={result["poster_path"]} />
            <Episodes episodes={result["episodes"]} />
            {episodesStreaming.length > 0 && <Player serieId={serieID} seasonNumber={seasonNumber} episodesStreaming={episodesStreaming} />}
        </>
    );
}