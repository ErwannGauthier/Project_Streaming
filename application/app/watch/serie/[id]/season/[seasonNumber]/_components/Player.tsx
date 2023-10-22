"use client"

import {SeasonEpisodeAPIDB} from "@/app/api/TMDB/_types/SeasonEpisodeAPIDB";
import ButtonsGroup from "./ButtonsGroup";
import VideoPlayerEpisode from "@/app/_components/players/VideoPlayerEpisode";

import {useState} from "react";

interface PlayerProps {
    serieId: number,
    seasonNumber: number,
    episodesStreaming: Array<SeasonEpisodeAPIDB>,
}


export default function Player({ serieId, seasonNumber, episodesStreaming }: PlayerProps) {
    const [currentEp, setCurrentEp] = useState(1);
    const changeCurrentEp = (newEpIndex: number) => {
        setCurrentEp(episodesStreaming[newEpIndex]["episode_number"]);
    }

    return (
        <>
            <div className="w-full pt-0 pb-8 flex flex-col justify-center items-center grayBackground">
                <div className="PlayerVideo75vw pb-4">
                    <ButtonsGroup episodesStreaming={episodesStreaming} changeCurrentEpNumber={changeCurrentEp}/>
                </div>
                <VideoPlayerEpisode serieId={serieId} seasonNumber={seasonNumber} episodeNumber={currentEp} />
            </div>
        </>
    );
}