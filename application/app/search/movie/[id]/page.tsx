"use client"

import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';

import { MovieAPI } from '@/app/api/TMDB/_types/MovieAPI';
import Header from './_components/Header';
import Credits from './_components/Credits';
import MyModal from './_components/Modal';
import getPegiMovie from '@/app/_utils/getPegiMovie';
import LoadingScreen from '@/app/_components/LoadingScreen';
import { Movie, TypeStream } from '@prisma/client';
import type { ModalInterface } from 'flowbite';

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function SearchMoviePage({ params }: { params: { id: number } }) {
    const movieID = params.id;

    useEffect(() => {
        document.title = `GtrTV - Rechercher - Film n°${movieID}`;
    }, [movieID]);

    const [modal, setModal] = useState<ModalInterface | null>(null);
    const handleModal = useCallback((modalInterface: ModalInterface) => { setModal(modalInterface); }, []);
    const openModal = () => { modal && modal.show(); }
    const hideModal = () => { modal && modal.hide(); }

    const { data, isLoading } = useSWR(`/api/TMDB/getMovieOrDB?id=${movieID}`, fetchData);
    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    const movieAPI: MovieAPI = data?.movieAPI;
    const movieDB: Movie & { TypeStream: Array<TypeStream> } | null = data?.movieDB;
    const pegi = getPegiMovie(movieAPI["release_dates"]);

    return (
        <>
            <Header backdrop_path={movieAPI["backdrop_path"]} budget={movieAPI["budget"]} genres={movieAPI["genres"]} overview={movieAPI["overview"]} poster_path={movieAPI["poster_path"]} release_date={movieAPI["release_date"]} revenue={movieAPI["revenue"]} runtime={movieAPI["runtime"]} tagline={movieAPI["tagline"]} title={movieAPI["title"]} credits={movieAPI["credits"]} pegi={pegi} isInDb={movieDB !== null} openModal={openModal} />
            <Credits credits={movieAPI["credits"]} />
            <MyModal movieAPI={movieAPI} movieDB={movieDB} parentFunction={handleModal} hideModal={hideModal} />
        </>
    )
}