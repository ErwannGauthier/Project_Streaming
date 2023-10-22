"use client"

import {SeasonEpisodeAPIDB} from "@/app/api/TMDB/_types/SeasonEpisodeAPIDB";
import ButtonSelect from "./ButtonSelect";
import ButtonNext from "./ButtonNext";
import ButtonPrevious from "./ButtonPrevious";

import {useState} from "react";

interface ButtonsGroupProps {
    episodesStreaming: Array<SeasonEpisodeAPIDB>,
    changeCurrentEpNumber: (newEpIndex: number) => void
}

export default function ButtonsGroup({ episodesStreaming, changeCurrentEpNumber }: ButtonsGroupProps) {

    const [currentEp, setCurrentEp] = useState(0);
    const changeCurrentEp = (newEpIndex: number) => {
        setCurrentEp(newEpIndex);
        changeCurrentEpNumber(newEpIndex);
    }

    return (
        <>
            <div className="w-full flex justify-center items-center grayBackground rounded-lg">
                <div className="w-1/6">
                    <ButtonPrevious currentEp={currentEp} changeCurrentEp={changeCurrentEp} />
                </div>
                <div className="w-full">
                    <ButtonSelect episodes={episodesStreaming} currentEp={currentEp} changeCurrentEp={changeCurrentEp} />
                </div>
                <div className="w-1/6">
                    <ButtonNext currentEp={currentEp} episodesLength={episodesStreaming.length} changeCurrentEp={changeCurrentEp} />
                </div>
            </div>
        </>
    )
}