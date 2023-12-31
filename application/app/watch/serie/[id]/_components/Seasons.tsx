import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {SerieSeasonAPIDB} from "@/app/_types/SerieSeasonAPIDB";

interface SeasonCardProps {
    season: SerieSeasonAPIDB;
}

interface DivImgProps {
    season: SerieSeasonAPIDB;
    blackAndWhite: boolean;
}

interface SeasonsProps {
    seasons: Array<SerieSeasonAPIDB>;
}


function DivImg({season, blackAndWhite}: DivImgProps) {
    const posterPath: string = season.isPosterPath() ? season.posterPath : "";
    const name: string = season.isName() ? season.name : "-";

    return (
        <div className="min-w-[130px] w-[130px] h-[195px] block">
            <Image className={`w-full h-full ${blackAndWhite && "imgToBlackAndWhite"}`}
                   src={`https://www.themoviedb.org/t/p/w130_and_h195_face${posterPath}`} alt={name} width={130}
                   height={195} loading="lazy"/>
        </div>
    )
}

function DivSvg() {
    const svgUrl: string = "/assets/images/poster.svg";
    return (
        <div style={{backgroundImage: `url(${svgUrl})`}}
             className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[138px] w-[138px] h-[175px] bg-center bg-no-repeat"></div>
    )
}

function SeasonCardLink({season}: SeasonCardProps) {
    const path: string = usePathname();
    const name: string = season.isName() ? season.name : "-";
    const seasonNumber: number = season.seasonNumber;
    const episodeNumber: string = season.isEpisodeNumber() ? season.episodeNumber.toLocaleString() : "0";
    const episodeCount: string = season.isEpisodeCount() ? season.episodeCount.toLocaleString() : "-";

    return (
        <li className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-neutral-700 rounded-lg pb-[10px] overflow-hidden min-w-[130px] w-[130px] grayBackground shadow-md">
            <Link href={`${path}/season/${seasonNumber}`}>
                {season.isPosterPath() ? <DivImg season={season} blackAndWhite={false}/> : <DivSvg/>}
            </Link>
            <p className="px-[10px] py-0 text-base m-0 overflow-hidden text-ellipsis font-bold">
                <Link href={`${path}/season/${seasonNumber}`} className="hover:text-neutral-500 hover:no-underline">
                    {name}
                </Link>
            </p>
            <p className="m-0 py-0 px-[10px] text-sm overflow-hidden text-ellipsis">{episodeNumber}/{episodeCount} épisodes</p>
        </li>
    )
}

function SeasonCardNoLink({season}: SeasonCardProps) {
    const name: string = season.isName() ? season.name : "-";
    const episodeNumber: string = season.isEpisodeNumber() ? season.episodeNumber.toLocaleString() : "0";
    const episodeCount: string = season.isEpisodeCount() ? season.episodeCount.toLocaleString() : "-";

    return (
        <li className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-neutral-700 rounded-lg pb-[10px] overflow-hidden min-w-[130px] w-[130px] grayBackground shadow-md">
            {season.isPosterPath() ? <DivImg season={season} blackAndWhite={true}/> : <DivSvg/>}
            <p className="px-[10px] py-0 text-base m-0 overflow-hidden text-ellipsis font-bold">
                {name}
            </p>
            <p className="m-0 py-0 px-[10px] text-sm overflow-hidden text-ellipsis">{episodeNumber}/{episodeCount} épisodes</p>
        </li>
    )
}

function SeasonCard({season}: SeasonCardProps) {
    return season.episodeNumber <= 0 ? <SeasonCardNoLink season={season}/> : <SeasonCardLink season={season}/>
}

function CreditsDiv({seasons}: SeasonsProps) {
    return (
        <div className="grayBackground w-full flex flex-wrap px-[30px]">
            <section className="pt-0 w-full block px-0 pb-[30px]">
                <h3 className="font-semibold text-xl mb-[20px]">Saisons</h3>
                <div className="relative top-0 left-0">
                    <ol className="overflow-x-scroll overflow-y-hidden ml-[-10px] mt-[-10px] pb-[10px] list-none list-inside mr-0 mb-0 px-0 pt-0 flex relative top-0 left-0">
                        {seasons.map((season: SerieSeasonAPIDB) => <SeasonCard key={season.id} season={season}/>)}
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default function Seasons({seasons}: SeasonsProps) {

    return (
        <div className="my-0 grayBackground w-full flex justify-center flex-wrap items-start content-start">
            <div className="w-full flex items-start content-start justify-center">
                <div className="max-w-[1400px] px-[40px] pb-[30px] w-full flex items-start content-start">
                    <CreditsDiv seasons={seasons}/>
                </div>
            </div>
        </div>
    )
}