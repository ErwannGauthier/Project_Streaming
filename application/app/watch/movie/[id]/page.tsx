"use client"

import useSWR from 'swr';
import Header from './_components/Header';
import Credits from './_components/Credits';
import LoadingScreen from '@/app/_components/LoadingScreen';
import { MovieAPIDB } from '@/app/api/TMDB/_types/MovieAPIDB';
import { hasStreaming } from '@/app/_utils/hasStreaming';
import Player from './_components/Player';
import { useEffect } from 'react';

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function WatchMoviePage({ params }: { params: { id: number } }) {
    const movieID = params.id;

    useEffect(() => {
        document.title = `GtrTV - Regarder - Film n°${movieID}`;
    }, [movieID]);

    const { data, isLoading } = useSWR(`/api/TMDB/getMovieAndDB?id=${movieID}`, fetchData);
    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    const result: MovieAPIDB = data?.movie;
    const streaming = hasStreaming(result["typesStream"]);

    return (
        <>
            <Header backdrop_path={result["backdrop_path"]} budget={result["budget"]} genres={result["genres"]} overview={result["overview"]} poster_path={result["poster_path"]} release_date={result["release_date"]} revenue={result["revenue"]} runtime={result["runtime"]} tagline={result["tagline"]} title={result["title"]} typesStream={result["typesStream"]} credits={result["credits"]} pegi={result["pegi"]} />
            <Credits credits={result["credits"]} />
            {streaming && <Player movieId={result["id"]} />}
        </>
    )
}