import {ChangeEvent} from "react";
import {SeasonEpisodeAPIDB} from "@/app/_types/SeasonEpisodeAPIDB";

interface ButtonSelectProps {
    episodes: Array<SeasonEpisodeAPIDB>,
    currentEp: number,
    changeCurrentEp: (newEpIndex: number) => void
}

export default function ButtonSelect({episodes, currentEp, changeCurrentEp}: ButtonSelectProps) {

    function handleChange(event: ChangeEvent) {
        const target = event.target as HTMLSelectElement;
        const value = Number(target.value);
        changeCurrentEp(value);
    }

    return (
        <>
            <select id="episodes" onChange={handleChange} value={currentEp}
                    className="block w-full p-2.5 bg-neutral-700 border-[1px] border-solid border-neutral-400 placeholder-gray-400 text-white focus:ring-red-700 focus:border-red-700">
                {episodes.map((episode: SeasonEpisodeAPIDB, index: number) => <option key={episode.id}
                                                                                      value={index}>Episode {episode.episodeNumber} - {episode.name}</option>)}
            </select>
        </>
    )
}