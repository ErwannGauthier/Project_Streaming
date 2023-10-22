"use client"

import { SerieAPI } from '@/app/api/TMDB/_types/SerieAPI';
import { useEffect } from 'react';
import useSWR from 'swr';
import Header from './_components/Header';
import Credits from './_components/Credits';
import Seasons from './_components/Seasons';
import getPegiSerie from '@/app/_utils/getPegiSerie';
import LoadingScreen from '@/app/_components/LoadingScreen';

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function SearchSeriePage({ params }: { params: { id: number } }) {
    const serieID = params.id;

    useEffect(() => {
        document.title = `GtrTV - Rechercher - Série n°${serieID}`;
    }, [serieID]);

    const { data, isLoading } = useSWR(`/api/TMDB/getSerie?id=${serieID}`, fetchData);
    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    const result: SerieAPI = data?.result;
    return (
        <>
            <Header backdrop_path={result["backdrop_path"]} created_by={result["created_by"]} genres={result["genres"]} overview={result["overview"]} poster_path={result["poster_path"]} first_air_date={result["first_air_date"]} tagline={result["tagline"]} name={result["name"]} networks={result["networks"]} pegi={getPegiSerie(result["content_ratings"])} />
            <Credits credits={result["aggregate_credits"]} />
            <Seasons seasons={result["seasons"]} />
        </>
    )
}