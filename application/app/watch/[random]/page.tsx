"use client"

import useSWR from 'swr';
import LoadingScreen from '@/app/_components/LoadingScreen';
import {Genre, Movie, Serie, TypeStream} from '@prisma/client';
import GenreCarrousel from "../_components/GenreCarrousel";
import HeaderMovie from "../_components/HeaderMovie";
import HeaderSerie from "../_components/HeaderSerie";
import {useEffect, useState} from 'react';

type MovieTypestreamGenre = Movie & { TypeStream: Array<TypeStream>, Genre: Array<Genre> };
type SerieGenre = Serie & { Genre: Array<Genre> };
type GenreMovieSerie = Genre & { Movie: Array<MovieTypestreamGenre>, Serie: Array<SerieGenre> };

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function WatchPage({ params }: { params: { random: string } }) {
    useEffect(() => {
        document.title = `GtrTV - Regarder`;
    }, []);

    const [movie, setMovie] = useState() as any;
    const [serie, setSerie] = useState() as any;
    const setHeaderMovie = (movie: Movie) => {
        setSerie(null);
        setMovie(movie);
    }
    const setHeaderSerie = (serie: Serie) => {
        setMovie(null);
        setSerie(serie);
    }
    const resetHeader = () => {
        setMovie(null);
        setSerie(null);
    }

    const { data, isLoading } = useSWR(`/api/DATABASE/getAllGenres`, fetchData);
    if (isLoading) {
        return <LoadingScreen />;
    }

    const genres: Array<GenreMovieSerie> = data["result"].filter((genre: GenreMovieSerie) => genre["Movie"].length > 0 || genre["Serie"].length > 0);

    return (
        <>
            {movie && <HeaderMovie backdrop_path={movie["backdropPath"]} genres={movie["Genre"]} overview={movie["overview"]} poster_path={movie["posterPath"]} release_date={movie["releaseDate"]} runtime={movie["runtime"]} tagline={movie["tagline"]} title={movie["title"]} pegi={movie["pegi"]} typesStream={movie["TypeStream"]} />}
            {serie && <HeaderSerie backdrop_path={serie["backdropPath"]} genres={serie["Genre"]} name={serie["name"]} overview={serie["overview"]} poster_path={serie["posterPath"]} first_air_date={serie["firstAirDate"]} tagline={serie["tagline"]} pegi={serie["pegi"]} />}

            {genres.map((genre, index) => <GenreCarrousel key={index} genre={genre} setHeaderMovie={setHeaderMovie} setHeaderSerie={setHeaderSerie} resetHeader={resetHeader} />)}
        </>
    )
}