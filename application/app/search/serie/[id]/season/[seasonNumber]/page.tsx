"use client";

import {useCallback, useEffect, useState} from 'react';
import Header from './_components/Header';
import Episodes from './_components/Episodes';
import MyModal from './_components/Modal';
import LoadingScreen from '@/app/_components/screens/LoadingScreen';
import type {ModalInterface} from 'flowbite';
import {SeasonAPI} from "@/app/_types/SeasonAPI";
import {SeasonDb} from "@/app/_types/PrismaTypes";
import {fetchGetTmdbSeason} from "@/app/api/_fetchFunctions/season/tmdb/fetchGetTmdbSeason";
import {fetchGetIdSeason} from "@/app/api/_fetchFunctions/season/id/fetchGetIdSeason";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";

export default function Season({params}: { params: { seasonNumber: number, id: number } }) {
    const serieId: number = params.id;
    const seasonNumber: number = params.seasonNumber;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [seasonApi, setSeasonApi] = useState<SeasonAPI | undefined>();
    const [seasonDb, setSeasonDb] = useState<SeasonDb | undefined>();
    const [fetchData, setFetchData] = useState<boolean>(true);

    const [modal, setModal] = useState<ModalInterface | null>(null);
    const [showForms, setShowForms] = useState<boolean>(false);

    const [episodeNumber, setEpisodeNumber] = useState<number>(0);

    useEffect(() => {
        document.title = `GtrTV - Rechercher - Série n°${serieId} - Saison ${seasonNumber}`;
        if (fetchData) {
            setError(false);
            fetchGetTmdbSeason(serieId, seasonNumber, setSeasonApi, setLoading, setError);
            setLoading(false);
            setFetchData(false);
        }
    }, [serieId, seasonNumber, fetchData]);

    useEffect(() => {
        setError(false);
        seasonApi && fetchGetIdSeason(seasonApi.id_, setSeasonDb, setLoading);
        setLoading(false);
    }, [seasonApi]);

    const callFetching = () => setFetchData(true);

    const handleModal = useCallback((modalInterface: ModalInterface) => {
        setModal(modalInterface);
    }, []);

    const openModal = () => {
        modal && modal.show();
        modal && setShowForms(true);
    };

    const hideModal = () => {
        modal && modal.hide();
        modal && setShowForms(false);
    };

    const changeEpisodeNumber = (id: number) => {
        setEpisodeNumber(id)
    };

    if (loading || (!seasonApi && !error)) {
        return (
            <LoadingScreen/>
        );
    }

    if (error || !seasonApi) {
        return (
            <InternalErrorScreen/>
        );
    }

    return (
        <>
            <Header seasonAPI={seasonApi}/>
            <Episodes episodesAPI={seasonApi.episodes} episodesDB={seasonDb?.Episode}
                      changeEpisodeNumber={changeEpisodeNumber} openModal={openModal}/>
            <MyModal showForms={showForms} serieID={serieId} seasonAPI={seasonApi} seasonDB={seasonDb}
                     episodeNumber={episodeNumber} parentFunction={handleModal}
                     callFetching={callFetching} hideModal={hideModal}/>
        </>
    );
}