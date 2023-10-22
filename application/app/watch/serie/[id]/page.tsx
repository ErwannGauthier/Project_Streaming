"use client"

import useSWR from 'swr';
import Header from './_components/Header';
import Credits from './_components/Credits';
import Seasons from './_components/Seasons';
import LoadingScreen from '@/app/_components/LoadingScreen';
import { SerieAPIDB } from '@/app/api/TMDB/_types/SerieAPIDB';
import { useEffect } from 'react';

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function WatchSeriePage({ params }: { params: { id: number } }) {
    const serieID = params.id;

    useEffect(() => {
        document.title = `GtrTV - Regarder - Série n°${serieID}`;
    }, [serieID]);

    const { data, isLoading } = useSWR(`/api/TMDB/getSerieAndDB?id=${serieID}`, fetchData);
    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    const result: SerieAPIDB = data?.result;
    return (
        <>
            <Header backdrop_path={result["backdrop_path"]} created_by={result["created_by"]} genres={result["genres"]} overview={result["overview"]} poster_path={result["poster_path"]} first_air_date={result["first_air_date"]} tagline={result["tagline"]} name={result["name"]} networks={result["networks"]} pegi={result["pegi"]} />
            <Credits credits={result["credits"]} />
            <Seasons seasons={result["seasons"]} />
        </>
    )
}