import {SerieSeasonAPIDB} from '@/app/api/TMDB/_types/SerieSeasonAPIDB';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface SeasonCardProps {
    name: string;
    episode_count: number;
    episode_number: number;
    poster_path: string;
    season_number: number;
}

interface SeasonsDivProps {
    seasons: Array<SerieSeasonAPIDB>;
}

interface SeasonsProps {
    seasons: Array<SerieSeasonAPIDB>;
}

interface DivImgProps {
    poster_path: string;
    name: string;
    blackAndWhite: boolean,
}

interface DivSvgProps {
}

function DivImg({ poster_path, name, blackAndWhite }: DivImgProps) {
    return (
        <div className="min-w-[130px] w-[130px] h-[195px] block">
            <Image className={`w-full h-full ${blackAndWhite && "imgToBlackAndWhite"}`} src={`https://www.themoviedb.org/t/p/w130_and_h195_face${poster_path}`} alt={name} width={130} height={195} loading="lazy" />
        </div>
    )
}

function DivSvg({ }: DivSvgProps) {
    const svgUrl = "/assets/images/poster.svg";
    return (
        <div style={{ backgroundImage: `url(${svgUrl})` }} className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[138px] w-[138px] h-[175px] bg-center bg-no-repeat"></div>
    )
}

function SeasonCardLink({ name, episode_count, episode_number, poster_path, season_number }: SeasonCardProps) {
    const path = usePathname();

    return (
        <li className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-neutral-700 rounded-lg pb-[10px] overflow-hidden min-w-[130px] w-[130px] grayBackground shadow-md">
            <Link href={`${path}/season/${season_number}`}>
                {poster_path ? <DivImg poster_path={poster_path} name={name} blackAndWhite={false} /> : <DivSvg />}
            </Link>
            <p className="px-[10px] py-0 text-base m-0 overflow-hidden text-ellipsis font-bold">
                <Link href={`${path}/season/${season_number}`} className="hover:text-neutral-500 hover:no-underline">
                    {name}
                </Link>
            </p>
            <p className="m-0 py-0 px-[10px] text-sm overflow-hidden text-ellipsis">{episode_number}/{episode_count} épisodes</p>
        </li>
    )
}

function SeasonCardNoLink({ name, episode_count, episode_number, poster_path, season_number }: SeasonCardProps) {
    return (
        <li className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-neutral-700 rounded-lg pb-[10px] overflow-hidden min-w-[130px] w-[130px] grayBackground shadow-md">
            {poster_path ? <DivImg poster_path={poster_path} name={name} blackAndWhite={true} /> : <DivSvg />}
            <p className="px-[10px] py-0 text-base m-0 overflow-hidden text-ellipsis font-bold">
                {name}
            </p>
            <p className="m-0 py-0 px-[10px] text-sm overflow-hidden text-ellipsis">{episode_number}/{episode_count} épisodes</p>
        </li>
    )
}

function SeasonCard({ name, episode_count, episode_number, poster_path, season_number }: SeasonCardProps) {
    const card = episode_number === 0 ? <SeasonCardNoLink name={name} episode_count={episode_count} episode_number={episode_number} poster_path={poster_path} season_number={season_number} /> : <SeasonCardLink name={name} episode_count={episode_count} episode_number={episode_number} poster_path={poster_path} season_number={season_number} />
    return card;
}

function CreditsDiv({ seasons }: SeasonsDivProps) {
    return (
        <div className="grayBackground w-full flex flex-wrap px-[30px]">
            <section className="pt-0 w-full block px-0 pb-[30px]">
                <h3 className="font-semibold text-xl mb-[20px]">Saisons</h3>
                <div className="relative top-0 left-0">
                    <ol className="overflow-x-scroll overflow-y-hidden ml-[-10px] mt-[-10px] pb-[10px] list-none list-inside mr-0 mb-0 px-0 pt-0 flex relative top-0 left-0">
                        {seasons.map(season => <SeasonCard key={season["id"]} name={season["name"]} episode_count={season["episode_count"]} episode_number={season["episode_number"]} poster_path={season["poster_path"]} season_number={season["season_number"]} />)}
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default function Seasons({ seasons }: SeasonsProps) {

    return (
        <div className="my-0 grayBackground w-full flex justify-center flex-wrap items-start content-start">
            <div className="w-full flex items-start content-start justify-center">
                <div className="max-w-[1400px] px-[40px] pb-[30px] w-full flex items-start content-start">
                    <CreditsDiv seasons={seasons} />
                </div>
            </div>
        </div>
    )
}