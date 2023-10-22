import {getFormatedDateFromReleaseDate} from '@/app/_utils/getFormatedDateFromReleaseDate';
import {getYearFromReleaseDate} from '@/app/_utils/getYearFromReleaseDate';
import Image from 'next/image';

interface HeaderProps {
    air_date: string;
    episodes_length: number;
    name: string;
    overview: string;
    poster_path: string;
}

interface PosterProps {
    poster_path: string;
    name: string;
}

interface TextProps {
    air_date: string;
    episodes_length: number;
    name: string;
    overview: string;
}

function DivSvg() {
    return (
        <div style={{ backgroundImage: "url(/assets/images/poster.svg)" }} className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[300px] w-[300px] h-[450px] bg-center bg-no-repeat"></div>
    )
}


function Poster({ poster_path, name }: PosterProps) {
    return (
        <div className="border-0 min-w-[300px] w-[300px] h-auto overflow-hidden rounded-lg">
            <div className="block min-w-[300px] w-[300px] h-[450px] relative top-0 left-0">
                <div className="w-full min-w-full h-full">
                    {poster_path ? <Image src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={name} width="300" height="450" className="block w-full min-w-full h-full min-h-full border-0" quality={100} /> : <DivSvg />}
                </div>
            </div>
        </div>
    )
}

function Text({ air_date, episodes_length, name, overview }: TextProps) {
    const formatedDate = air_date ? getFormatedDateFromReleaseDate(air_date) : "??/??/????";
    const year = air_date ? getYearFromReleaseDate(air_date) : "????";

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
                        <span className="relative top-0 left-0 pl-0">{formatedDate}</span>
                        <span className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{episodes_length} épisodes</span>
                    </div>
                </div>
                <div className="w-full">
                    <h3 className="font-semibold text-xl w-full mb-2 mt-2.5">Synopsis</h3>
                    <div>
                        <p className="p-0 mb-4 text-base">{overview || "-"}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function Header({ air_date, episodes_length, name, overview, poster_path }: HeaderProps) {
    return (
        <>
            <div className="w-full relative z-10 backgroundImageCalc bg-cover bg-no-repeat" style={{ backgroundImage: "" }}>
                <div className="flex justify-center flex-wrap" style={{ backgroundImage: "linear-gradient(to right, rgba(50, 50, 50, 1) calc((50vw - 170px) - 340px), rgba(50, 50, 50, 0.84) 50%, rgba(50, 50, 50, 0.84) 100%)" }}>
                    <div className="w-full max-w-[1400px] px-10 py-[30px] z-0">
                        <section className="flex flex-nowrap text-white">
                            <Poster poster_path={poster_path} name={name} />
                            <Text air_date={air_date} episodes_length={episodes_length} overview={overview} name={name} />
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}