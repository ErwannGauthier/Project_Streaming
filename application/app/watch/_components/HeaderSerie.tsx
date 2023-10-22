import {getFormatedDateFromReleaseDate} from '@/app/_utils/getFormatedDateFromReleaseDate';
import {getYearFromReleaseDate} from '@/app/_utils/getYearFromReleaseDate';
import {setGenresToString} from '@/app/_utils/setGenresToString';
import Image from 'next/image';

interface HeaderProps {
    backdrop_path: string;
    genres: Array<{
        id: number;
        name: string
    }>;
    overview: string;
    poster_path: string;
    first_air_date: string;
    tagline: string;
    name: string;
    pegi: string;
}

interface PosterProps {
    poster_path: string;
    name: string;
}

interface TextProps {
    genres: Array<{
        id: number;
        name: string
    }>;
    overview: string;
    first_air_date: string;
    tagline: string;
    name: string;
    pegi: string;
}

function DivSvg() {
    return (
        <div style={{ backgroundImage: "url(/assets/images/poster.svg)" }} className="calcPosterWidth50vh flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center h-[50vh] bg-center bg-no-repeat"></div>
    )
}


function Poster({ poster_path, name }: PosterProps) {
    return (
        <div className="calcPosterWidth50vh border-0 h-auto overflow-hidden rounded-lg">
            <div className="calcPosterWidth50vh block h-[50vh] relative top-0 left-0">
                <div className="w-full min-w-full h-full">
                    {poster_path ? <Image src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={name} width="300" height="450" className="block w-full min-w-full h-full min-h-full border-0" quality={100} /> : <DivSvg />}
                </div>
            </div>
        </div>
    )
}

function Text({ genres, overview, first_air_date, tagline, name, pegi }: TextProps) {
    const formatedDate = first_air_date ? getFormatedDateFromReleaseDate(first_air_date) : "??/??/????";
    const year = first_air_date ? getYearFromReleaseDate(first_air_date) : "????";
    const genresString = genres ? setGenresToString(genres) : "";

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
                        <span className="border border-solid border-white/[0.6] text-white/[0.6] inline-flex whitespace-nowrap items-center content-center pt-[0.06em] pb-[0.15em] px-2 leading-none radius-sm mr-2">{pegi}</span>
                        <span className="relative top-0 left-0 pl-0">{formatedDate}</span>
                        <span className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{genresString}</span>
                    </div>
                </div>
                <div className="w-full">
                    <h3 className="mb-0 text-lg font-normal italic opacity-70">{tagline}</h3>
                    <h3 className="font-semibold text-xl w-full mb-2 mt-2.5">Synopsis</h3>
                    <div>
                        <p className="webkitOverflow4lines p-0 mb-4 text-base">{overview || "-"}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function HeaderSerie({ backdrop_path, genres, overview, poster_path, first_air_date, tagline, name, pegi }: HeaderProps) {
    const backdropUrl = backdrop_path ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})` : "";

    return (
        <div className='sticky top-0 left-0 z-20'>
            <div className="w-full relative z-10 backgroundImageCalc bg-cover bg-no-repeat" style={{ backgroundImage: backdropUrl }}>
                <div className="flex justify-center flex-wrap" style={{ backgroundImage: "linear-gradient(to right, rgba(50, 50, 50, 1) calc((50vw - 170px) - 340px), rgba(50, 50, 50, 0.84) 50%, rgba(50, 50, 50, 0.84) 100%)" }}>
                    <div className="w-full max-w-[1400px] px-10 py-[30px] z-0">
                        <section className="flex flex-nowrap text-white">
                            <Poster poster_path={poster_path} name={name} />
                            <Text genres={genres} overview={overview} first_air_date={first_air_date} tagline={tagline} name={name} pegi={pegi} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}