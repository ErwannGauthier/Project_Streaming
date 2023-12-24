"use client"

import Header from './_components/Header';
import Credits from './_components/Credits';
import LoadingScreen from '@/app/_components/screens/LoadingScreen';
import Player from './_components/Player';
import {useEffect, useState} from 'react';
import {MovieAPIDB} from "@/app/_types/MovieAPIDB";
import {PrismaUtils} from "@/app/_types/PrismaUtils";
import {MovieAPI} from "@/app/_types/MovieAPI";
import {MovieDb} from "@/app/_types/PrismaTypes";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";
import {fetchGetTmdbMovie} from "@/app/api/_fetchFunctions/movie/tmdb/fetchGetTmdbMovie";
import {fetchGetIdMovie} from "@/app/api/_fetchFunctions/movie/id/fetchGetIdMovie";

export default function WatchMoviePage({params}: { params: { id: number } }) {
    const movieId: number = params.id;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [movieApi, setMovieApi] = useState<MovieAPI | undefined>();
    const [movieDb, setMovieDb] = useState<MovieDb | undefined>();

    useEffect(() => {
        document.title = `GtrTV - Regarder - Film n°${movieId}`;
        setError(false);
        fetchGetTmdbMovie(movieId, setMovieApi, setLoading, setError);
        fetchGetIdMovie(movieId, setMovieDb, setLoading, setError);
        setLoading(false);
    }, [movieId]);

    if (loading || ((!movieApi || !movieDb) && !error)) {
        return (
            <LoadingScreen/>
        );
    }

    if (error || !movieApi || !movieDb) {
        return (
            <InternalErrorScreen/>
        );
    }

    const movieApiDb: MovieAPIDB = MovieAPIDB.getInstanceFromMovies(movieApi, movieDb);

    return (
        <>
            <Header movie={movieApiDb}/>
            <Credits credits={movieApiDb.credits}/>
            {PrismaUtils.hasStreaming(movieApiDb.typesStream) && <Player movieId={movieApiDb.id}/>}
        </>
    )
}