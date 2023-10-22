import Image from 'next/image';
import {Genre, TypeStream} from '@prisma/client';
import {getFormatedDateFromReleaseDate} from '@/app/_utils/getFormatedDateFromReleaseDate';
import {getYearFromReleaseDate} from '@/app/_utils/getYearFromReleaseDate';
import {setGenresToString} from '@/app/_utils/setGenresToString';
import {getHoursFromRuntime} from '@/app/_utils/getHoursFromRuntime';
import {getMinutesFromRuntime} from '@/app/_utils/getMinutesFromRuntime';

interface HeaderProps {
    backdrop_path: string;
    genres: Array<Genre>;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    tagline: string;
    title: string;
    typesStream: Array<TypeStream>,
    pegi: string;
}

interface PosterProps {
    poster_path: string;
    title: string;
}

interface TextProps {
    genres: Array<Genre>;
    overview: string;
    release_date: string;
    runtime: number;
    tagline: string;
    title: string,
    typesStream: Array<TypeStream>,
    pegi: string;
}

function DivSvg() {
    return (
        <div style={{ backgroundImage: "url(/assets/images/poster.svg)" }} className="calcPosterWidth50vh flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center h-[50vh] bg-center bg-no-repeat"></div>
    )
}


function Poster({ poster_path, title }: PosterProps) {
    return (
        <div className="calcPosterWidth50vh border-0 h-auto overflow-hidden rounded-lg" >
            <div className="calcPosterWidth50vh block h-[50vh] relative top-0 left-0" >
                <div className="w-full min-w-full h-full">
                    {poster_path ? <Image src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={title} width="300" height="450" className="block w-full min-w-full h-full min-h-full border-0" quality={100} /> : <DivSvg />}
                </div>
            </div>
        </div>
    )
}

function Text({ genres, overview, release_date, runtime, tagline, title, typesStream, pegi }: TextProps) {
    const formatedDate = release_date ? getFormatedDateFromReleaseDate(release_date) : "??/??/????";
    const year = release_date ? getYearFromReleaseDate(release_date) : "????";
    const genresString = genres ? setGenresToString(genres) : "";
    const runtimeHours = runtime ? getHoursFromRuntime(runtime) : "??";
    const runtimeMinutes = runtime ? getMinutesFromRuntime(runtime) : "??";

    return (
        <div className="flex">
            <section className="flex flex-wrap items-start content-center box-border pl-[40px]">
                <div className="w-full mb-6 flex flex-wrap">
                    <div className='w-full flex justify-between items-center'>
                        <h2 className="m-0 p-0 text-3xl font-semibold">
                            {title}
                            &nbsp;
                            <span className="opacity-80 font-normal">
                                ({year})
                            </span>
                        </h2>
                        <div className='m-0 p-0'>
                            {typesStream.map((type, index) => <span key={index} className="bg-red-700 px-4 py-2 mx-2 rounded-xl text-sm font-bold">{type["name"]}</span>)}
                        </div>
                    </div>
                    <div className="flex">
                        <span className="border border-solid border-white/[0.6] text-white/[0.6] inline-flex whitespace-nowrap items-center content-center pt-[0.06em] pb-[0.15em] px-2 leading-none radius-sm mr-2">{pegi}</span>
                        <span className="relative top-0 left-0 pl-0">{formatedDate}</span>
                        <span className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{genresString}</span>
                        <span className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{runtimeHours}h {runtimeMinutes}m</span>
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

export default function HeaderMovie({ backdrop_path, genres, overview, poster_path, release_date, runtime, tagline, title, pegi, typesStream }: HeaderProps) {
    const backdropUrl = backdrop_path ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})` : "";

    return (
        <div className="sticky top-0 left-0 z-20">
            <div className="w-full relative z-10 backgroundImageCalc bg-cover bg-no-repeat" style={{ backgroundImage: backdropUrl }}>
                <div className="flex justify-center flex-wrap" style={{ backgroundImage: "linear-gradient(to right, rgba(50, 50, 50, 1) calc((50vw - 170px) - 340px), rgba(50, 50, 50, 0.84) 50%, rgba(50, 50, 50, 0.84) 100%)" }}>
                    <div className="w-full max-w-[1400px] px-10 py-[30px] z-0">
                        <section className="flex flex-nowrap text-white">
                            <Poster poster_path={poster_path} title={title} />
                            <Text genres={genres} overview={overview} release_date={release_date} runtime={runtime} tagline={tagline} title={title} typesStream={typesStream} pegi={pegi} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}