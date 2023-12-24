"use client"

import {useEffect, useState} from 'react';
import Header from './_components/Header';
import Credits from './_components/Credits';
import Seasons from './_components/Seasons';
import LoadingScreen from '@/app/_components/screens/LoadingScreen';
import {SerieAPI} from "@/app/_types/SerieAPI";
import {fetchGetTmdbSerie} from "@/app/api/_fetchFunctions/serie/tmdb/fetchGetTmdbSerie";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";

export default function SearchSeriePage({params}: { params: { id: number } }) {
    const serieId: number = params.id;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [serieApi, setSerieApi] = useState<SerieAPI | undefined>();

    useEffect(() => {
        document.title = `GtrTV - Rechercher - Série n°${serieId}`;
        setError(false);
        fetchGetTmdbSerie(serieId, setSerieApi, setLoading, setError);
        setLoading(false);
    }, [serieId]);

    if (loading || (!serieApi && !error)) {
        return (
            <LoadingScreen/>
        )
    }

    if (error || !serieApi) {
        return (
            <InternalErrorScreen/>
        );
    }

    return (
        <>
            <Header serieAPI={serieApi}/>
            <Credits credits={serieApi.aggregateCredits}/>
            <Seasons seasons={serieApi.seasons}/>
        </>
    )
}