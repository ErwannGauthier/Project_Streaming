import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {SeasonSerie} from "@/app/_types/SeasonSerie";

interface SeasonCardProps {
    season: SeasonSerie;
}

interface SeasonsProps {
    seasons: Array<SeasonSerie>;
}

function DivImg({season}: SeasonCardProps) {
    const posterPath: string = season.isPosterPath() ? season.posterPath : "";
    const name: string = season.isName() ? season.name : "-";

    return (
        <div className="min-w-[130px] w-[130px] h-[195px] block">
            <Image className="w-full h-full" src={`https://www.themoviedb.org/t/p/w130_and_h195_face${posterPath}`}
                   alt={name} width={130} height={195} loading="lazy"/>
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

function SeasonCard({season}: SeasonCardProps) {
    const path: string = usePathname();
    const href: string = season.isSeasonNumber() ? `${path}/season/${season.seasonNumber}` : "";
    const name: string = season.isName() ? season.name : "-";
    const episodeCount: number = season.isEpisodeCount() ? season.episodeCount : 0;

    return (
        <li className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-gray-300 rounded-lg pb-[10px] overflow-hidden min-w-[130px] w-[130px] bg-white shadow-md">
            <Link href={href}>
                {season.isPosterPath() ? <DivImg season={season}/> : <DivSvg/>}
            </Link>
            <p className="px-[10px] py-0 text-base m-0 overflow-hidden text-ellipsis font-bold">
                <Link href={href} className="hover:text-neutral-500 hover:no-underline">
                    {name}
                </Link>
            </p>
            <p className="m-0 py-0 px-[10px] text-sm overflow-hidden text-ellipsis">{episodeCount} épisodes</p>
        </li>
    )
}

function CreditsDiv({seasons}: SeasonsProps) {
    return (
        <div className="bg-white w-full flex flex-wrap px-[30px]">
            <section className="pt-0 w-full block px-0 pb-[30px]">
                <h3 className="font-semibold text-xl mb-[20px]">Saisons</h3>
                <div className="relative top-0 left-0">
                    <ol className="overflow-x-scroll overflow-y-hidden ml-[-10px] mt-[-10px] pb-[10px] list-none list-inside mr-0 mb-0 px-0 pt-0 flex relative top-0 left-0">
                        {seasons.map((season: SeasonSerie) => <SeasonCard key={season.id} season={season}/>)}
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default function Seasons({seasons}: SeasonsProps) {

    return (
        <div className="my-0 bg-white text-black w-full flex justify-center flex-wrap items-start content-start">
            <div className="w-full flex items-start content-start justify-center">
                <div className="max-w-[1400px] px-[40px] pb-[30px] w-full flex items-start content-start">
                    <CreditsDiv seasons={seasons}/>
                </div>
            </div>
        </div>
    )
}