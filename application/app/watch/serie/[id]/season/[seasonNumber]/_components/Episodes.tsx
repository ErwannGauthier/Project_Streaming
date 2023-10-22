import Image from "next/image";
import {TypeStream} from '@prisma/client';
import {SeasonEpisodeAPIDB} from '@/app/api/TMDB/_types/SeasonEpisodeAPIDB';
import {getFormatedDateFromReleaseDate} from '@/app/_utils/getFormatedDateFromReleaseDate';
import {getHoursFromRuntime} from '@/app/_utils/getHoursFromRuntime';
import {getMinutesFromRuntime} from '@/app/_utils/getMinutesFromRuntime';

interface EpisodesProps {
    episodes: Array<SeasonEpisodeAPIDB>;
}

interface EpisodeCardProps {
    air_date: string;
    episode_id: number;
    episode_number: number;
    episode_type: string;
    name: string;
    overview: string;
    runtime: number;
    still_path: string;
    typesStream: Array<TypeStream>;
}

interface DivImgProps {
    still_path: string;
    name: string;
    blackAndWhite: boolean;
}

interface DivSvgProps {

}

function DivImg({ still_path, name, blackAndWhite }: DivImgProps) {
    return (
        <div className="min-w-[227] w-[227px] h-[127px] block">
            <Image className={`w-full h-full ${blackAndWhite && "imgToBlackAndWhite"}`} src={`https://www.themoviedb.org/t/p/w227_and_h127_face${still_path}`} alt={name} width={227} height={127} loading="lazy" />
        </div>
    )
}

function DivSvg({ }: DivSvgProps) {
    const svgUrl = "/assets/images/poster.svg";
    return (
        <div style={{ backgroundImage: `url(${svgUrl})` }} className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[227px] w-[227px] h-[127px] bg-center bg-no-repeat"></div>
    )
}

function EpisodeCard({ air_date, episode_id, episode_number, episode_type, name, overview, runtime, still_path, typesStream }: EpisodeCardProps) {
    const formatedDate = air_date ? getFormatedDateFromReleaseDate(air_date) : "??/??/????";
    const runtimeHours = runtime ? getHoursFromRuntime(runtime) : "??";
    const runtimeMinutes = runtime ? getMinutesFromRuntime(runtime) : "??";

    return (
        <div className="w-full mb-6 border-[1px] border-solid border-neutral-700 rounded-lg overflow-hidden grayBackground shadow-md box-border">
            <div className="flex flex-wrap box-border">
                <div className="w-full flex box-border">
                    <div className="w-[227px] h-[127px] box-border">
                        {still_path ? <DivImg still_path={still_path} name={name} blackAndWhite={typesStream.length === 0} /> : <DivSvg />}
                    </div>
                    <div className="w-full box-border px-[20px] py-[10px] flex flex-wrap items-center">
                        <div className="w-full box-border">
                            <div className="w-full flex justify-between items-baseline mb-[20px]">
                                <div className="flex items-start whitespace-nowrap overflow-hidden text-ellipsis pr-[20px] w-full">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="inline text-lg font-bold">
                                                    <span className="text-neutral-200 font-semibold">{episode_number} - </span>{name}
                                                </h3>
                                                <div className="w-full flex flex-wrap mt-[2px]">
                                                    <div className="flex items-center">
                                                        {episode_type.toLocaleLowerCase() !== "standard" && <span className="mr-[6px] px-[8px] py-[1px] whitespace-nowrap text-sm inline-flex items-center bg-neutral-200 rounded-lg text-black">{`Épisode ${episode_type.toLocaleLowerCase()}`}</span>}
                                                    </div>
                                                    <div className="flex items-center whitespace-nowrap text-sm font-normal text-neutral-400">
                                                        <span className="mr-[6px] ">{formatedDate}</span>
                                                        •
                                                        <span className="ml-[6px]">{runtimeHours !== "0" && `${runtimeHours}h `}{`${runtimeMinutes}min`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {typesStream.map((type, index) => <span key={index} className="bg-red-700 px-4 py-2 mx-2 rounded-xl text-sm font-bold">{type["name"]}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="webkitOverflow mb-0 p-0 whitespace-normal text-sm">{overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Episodes({ episodes }: EpisodesProps) {
    return (
        <div className="grayBackground w-full flex items-start content-start justify-center box-border">
            <div className="max-w-[1400px] px-[40px] py-[30px] w-full flex items-start content-start box-border">
                <section className="w-full box-border block">
                    <div className="flex justify-between items-center content-center h-[40px] mb-[6px] box-border">
                        <h3 className="m-0 p-0 font-semibold text-xl">Épisodes</h3>
                    </div>
                    <div className="w-full box-border">
                        {episodes.map(episode => <EpisodeCard key={episode.id} air_date={episode.air_date} episode_id={episode.id} episode_number={episode.episode_number} episode_type={episode.episode_type} name={episode.name} overview={episode.overview} runtime={episode.runtime} still_path={episode.still_path} typesStream={episode.typesStream} />)}
                    </div>
                </section>
            </div>
        </div>
    )
}