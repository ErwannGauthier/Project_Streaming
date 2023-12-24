"use client"

import ButtonsGroup from "./ButtonsGroup";

import {useState} from "react";
import {SeasonEpisodeAPIDB} from "@/app/_types/SeasonEpisodeAPIDB";
import HlsPlayerEpisode from "@/app/_components/players/HlsPlayerEpisode";

interface PlayerProps {
    serieId: number,
    seasonNumber: number,
    episodesStreaming: Array<SeasonEpisodeAPIDB>,
}


export default function Player({serieId, seasonNumber, episodesStreaming}: PlayerProps) {
    const [currentEp, setCurrentEp] = useState<number>(1);
    const changeCurrentEp = (newEpIndex: number) => {
        setCurrentEp(episodesStreaming[newEpIndex].episodeNumber);
    }

    return (
        <>
            <div className="w-full pt-0 pb-8 flex flex-col justify-center items-center grayBackground">
                <div className="PlayerVideo75vw pb-4">
                    <ButtonsGroup episodesStreaming={episodesStreaming} changeCurrentEpNumber={changeCurrentEp}/>
                </div>
                <HlsPlayerEpisode serieId={serieId} seasonNumber={seasonNumber} episodeNumber={currentEp}/>
            </div>
        </>
    );
}