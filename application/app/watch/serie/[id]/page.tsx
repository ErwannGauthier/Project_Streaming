"use client"

import Header from './_components/Header';
import Credits from './_components/Credits';
import Seasons from './_components/Seasons';
import LoadingScreen from '@/app/_components/screens/LoadingScreen';
import {useEffect, useState} from 'react';
import {SerieAPIDB} from "@/app/_types/SerieAPIDB";
import {SerieAPI} from "@/app/_types/SerieAPI";
import {SerieDb} from "@/app/_types/PrismaTypes";
import {fetchGetTmdbSerie} from "@/app/api/_fetchFunctions/serie/tmdb/fetchGetTmdbSerie";
import {fetchGetIdSerie} from "@/app/api/_fetchFunctions/serie/id/fetchGetIdSerie";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";

export default function WatchSeriePage({params}: { params: { id: number } }) {
    const serieId: number = params.id;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [serieApi, setSerieApi] = useState<SerieAPI | undefined>();
    const [serieDb, setSerieDb] = useState<SerieDb | undefined>();

    useEffect(() => {
        document.title = `GtrTV - Regarder - Série n°${serieId}`;
        setError(false);
        fetchGetTmdbSerie(serieId, setSerieApi, setLoading, setError);
        fetchGetIdSerie(serieId, setSerieDb, setLoading, setError);
        setLoading(false);
    }, [serieId]);

    if (loading || ((!serieApi || !serieDb) && !error)) {
        return (
            <LoadingScreen/>
        )
    }

    if (error || !serieApi || !serieDb) {
        return (
            <InternalErrorScreen/>
        );
    }

    const serieApiDb: SerieAPIDB = SerieAPIDB.getInstanceFromSeries(serieApi, serieDb);

    return (
        <>
            <Header serie={serieApiDb}/>
            <Credits credits={serieApiDb.credits}/>
            <Seasons seasons={serieApiDb.seasons}/>
        </>
    )
}