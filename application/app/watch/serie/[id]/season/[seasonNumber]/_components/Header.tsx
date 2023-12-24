import Image from 'next/image';
import {SeasonAPIDB} from "@/app/_types/SeasonAPIDB";

interface HeaderProps {
    season: SeasonAPIDB;
}

function DivSvg() {
    return (
        <div style={{backgroundImage: "url(/assets/images/poster.svg)"}}
             className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[300px] w-[300px] h-[450px] bg-center bg-no-repeat"></div>
    )
}


function Poster({season}: HeaderProps) {
    const posterPath: string = season.isPosterPath() ? season.posterPath : "";
    const name: string = season.isName() ? season.name : "-";

    return (
        <div className="border-0 min-w-[300px] w-[300px] h-auto overflow-hidden rounded-lg">
            <div className="block min-w-[300px] w-[300px] h-[450px] relative top-0 left-0">
                <div className="w-full min-w-full h-full">
                    {season.isPosterPath() ?
                        <Image src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`} alt={name}
                               width="300" height="450" className="block w-full min-w-full h-full min-h-full border-0"
                               quality={100}/> : <DivSvg/>}
                </div>
            </div>
        </div>
    )
}

function Text({season}: HeaderProps) {
    const name: string = season.isName() ? season.name : "-";
    const overview: string = season.isOverview() ? season.overview : "-";
    const formattedDate: string = season.isAirDate() ? season.getFormattedDate() : "??/??/????";
    const year: string = season.isAirDate() ? season.getYear() : "????";
    const episodesLength: number = season.episodes.length;

    return (
        <div className="flex">
            <section className="flex flex-wrap items-start content-center box-border pl-[40px]">
                <div className="w-full mb-6 flex flex-wrap">
                    <h2 className="w-full m-0 p-0 text-3xl font-semibold">
                        {name}
                        &nbsp;
                        <span className="opacity-80 font-normal">
                            ({year})
                        </span>
                    </h2>
                    <div className="flex">
                        <span className="relative top-0 left-0 pl-0">{formattedDate}</span>
                        <span
                            className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{episodesLength} épisodes</span>
                    </div>
                </div>
                <div className="w-full">
                    <h3 className="font-semibold text-xl w-full mb-2 mt-2.5">Synopsis</h3>
                    <div>
                        <p className="p-0 mb-4 text-base">{overview}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function Header({season}: HeaderProps) {
    return (
        <>
            <div className="w-full relative z-10 backgroundImageCalc bg-cover bg-no-repeat"
                 style={{backgroundImage: ""}}>
                <div className="flex justify-center flex-wrap"
                     style={{backgroundImage: "linear-gradient(to right, rgba(50, 50, 50, 1) calc((50vw - 170px) - 340px), rgba(50, 50, 50, 0.84) 50%, rgba(50, 50, 50, 0.84) 100%)"}}>
                    <div className="w-full max-w-[1400px] px-10 py-[30px] z-0">
                        <section className="flex flex-nowrap text-white">
                            <Poster season={season}/>
                            <Text season={season}/>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}