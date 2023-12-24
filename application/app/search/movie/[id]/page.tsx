"use client"

import {useCallback, useEffect, useState} from 'react';

import Header from './_components/Header';
import Credits from './_components/Credits';
import MyModal from './_components/Modal';
import LoadingScreen from '@/app/_components/screens/LoadingScreen';
import type {ModalInterface} from 'flowbite';
import {MovieAPI} from "@/app/_types/MovieAPI";
import {MovieDb} from "@/app/_types/PrismaTypes";
import {fetchGetTmdbMovie} from "@/app/api/_fetchFunctions/movie/tmdb/fetchGetTmdbMovie";
import {fetchGetIdMovie} from "@/app/api/_fetchFunctions/movie/id/fetchGetIdMovie";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";

export default function SearchMoviePage({params}: { params: { id: number } }) {
    const movieId: number = params.id;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [movieApi, setMovieApi] = useState<MovieAPI | undefined>();
    const [movieDb, setMovieDb] = useState<MovieDb | undefined>();
    const [fetchData, setFetchData] = useState<boolean>(true);

    const [modal, setModal] = useState<ModalInterface | null>(null);

    useEffect(() => {
        document.title = `GtrTV - Rechercher - Film n°${movieId}`;
        if (fetchData) {
            setError(false);
            fetchGetTmdbMovie(movieId, setMovieApi, setLoading, setError);
            fetchGetIdMovie(movieId, setMovieDb, setLoading);
            setLoading(false);
            setFetchData(false);
        }
    }, [movieId, fetchData]);

    const callFetching = () => setFetchData(true);

    const handleModal = useCallback((modalInterface: ModalInterface) => {
        setModal(modalInterface);
    }, []);

    const openModal = () => {
        modal && modal.show();
    }

    const hideModal = () => {
        modal && modal.hide();
    }

    if (loading || (!movieApi && !error)) {
        return (
            <LoadingScreen/>
        );
    }

    if (error || !movieApi) {
        return (
            <InternalErrorScreen/>
        );
    }

    return (
        <>
            <Header movieApi={movieApi} movieDb={movieDb} openModal={openModal}/>
            <Credits credits={movieApi.credits}/>
            <MyModal movieApi={movieApi} movieDb={movieDb} callFetching={callFetching} parentFunction={handleModal}
                     hideModal={hideModal}/>
        </>
    )
}