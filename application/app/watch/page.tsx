"use client"

import LoadingScreen from '@/app/_components/screens/LoadingScreen';
import {useEffect, useState} from 'react';
import {GenreDb, MovieDb, SerieDb} from "@/app/_types/PrismaTypes";
import HeaderMovie from "@/app/watch/_components/HeaderMovie";
import HeaderSerie from "@/app/watch/_components/HeaderSerie";
import GenreCarrousel from "@/app/watch/_components/GenreCarrousel";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";
import {fetchGetGenre} from "@/app/api/_fetchFunctions/genre/fetchGetGenre";

export default function WatchPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [genres, setGenres] = useState<GenreDb[] | undefined>();
    const [movie, setMovie] = useState<MovieDb | undefined>();
    const [serie, setSerie] = useState<SerieDb | undefined>();

    useEffect(() => {
        document.title = `GtrTV - Regarder`;
        setError(false);
        fetchGetGenre(setGenres, setLoading, setError);
        setLoading(false);
    }, []);

    const setHeaderMovie = (movie: MovieDb) => {
        setSerie(undefined);
        setMovie(movie);
    }
    const setHeaderSerie = (serie: SerieDb) => {
        setMovie(undefined);
        setSerie(serie);
    }
    const resetHeader = () => {
        setMovie(undefined);
        setSerie(undefined);
    }

    if (loading || (!genres && !error)) {
        return <LoadingScreen/>;
    }

    if (!genres || error) {
        return (
            <InternalErrorScreen/>
        );
    }

    return (
        <>
            {movie && <HeaderMovie movie={movie}/>}
            {serie && <HeaderSerie serie={serie}/>}
            {genres.map((genre: GenreDb, index: number) => <GenreCarrousel key={index} genre={genre}
                                                                           setHeaderMovie={setHeaderMovie}
                                                                           setHeaderSerie={setHeaderSerie}
                                                                           resetHeader={resetHeader}/>)}
        </>
    )
}