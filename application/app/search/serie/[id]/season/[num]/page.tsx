"use client";

import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { SeasonAPI } from '@/app/api/TMDB/_types/SeasonAPI';
import Header from './_components/Header';
import Episodes from './_components/Episodes';
import MyModal from './_components/Modal';
import LoadingScreen from '@/app/_components/LoadingScreen';
import { Episode, Season, TypeStream } from '@prisma/client';
import type { ModalInterface } from 'flowbite';
import { getEpisodesNumber } from '@/app/_utils/getEpisodesNumber';
import { getEpisodeAPIWithEpisodeNumber } from '@/app/_utils/getEpisodeAPIWithEpisodeNumber';
import { getEpisodeDBWithEpisodeNumber } from '@/app/_utils/getEpisodeDBWithEpisodeNumber';

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function Season({ params }: { params: { num: number, id: number } }) {
    const serieID = params.id;
    const seasonNumber = params.num;

    useEffect(() => {
        document.title = `GtrTV - Rechercher - Série n°${serieID} - Saison ${seasonNumber}`;
    }, [serieID, seasonNumber]);

    const [modal, setModal] = useState<ModalInterface | null>(null);
    const [showForms, setShowForms] = useState(false);
    const handleModal = useCallback((modalInterface: ModalInterface) => { setModal(modalInterface); }, [])
    const openModal = () => { modal && modal.show(); modal && setShowForms(true); }
    const hideModal = () => { modal && modal.hide(); modal && setShowForms(false); }
    const [episodeNumber, setEpisodeNumber] = useState(0);
    const changeEpisodeNumber = (id: number) => { setEpisodeNumber(id) };

    const { data, isLoading } = useSWR(`/api/TMDB/getSeasonOrDB?id=${serieID}&seasonNumber=${seasonNumber}`, fetchData);
    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    const seasonAPI: SeasonAPI = data?.seasonAPI;
    const seasonDB: Season & { Episode: Array<Episode & { TypeStream: Array<TypeStream> }> } | null = data?.seasonDB;
    const episodesNumber = seasonDB ? getEpisodesNumber(seasonDB["Episode"]) : [];

    return (
        <>
            <Header air_date={seasonAPI["air_date"]} episodes_length={seasonAPI["episodes"].length} name={seasonAPI["name"]} overview={seasonAPI["overview"]} poster_path={seasonAPI["poster_path"]} />
            <Episodes episodesAPI={seasonAPI["episodes"]} episodesNumber={episodesNumber} changeEpisodeNumber={changeEpisodeNumber} openModal={openModal} />
            <MyModal showForms={showForms} serieId={serieID} seasonId={seasonAPI["id"]} seasonNumber={seasonNumber} episodeAPI={getEpisodeAPIWithEpisodeNumber(seasonAPI["episodes"], episodeNumber)} episodeDB={seasonDB ? getEpisodeDBWithEpisodeNumber(seasonDB["Episode"], episodeNumber) : null} parentFunction={handleModal} hideModal={hideModal} />
        </>
    );
}