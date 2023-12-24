import Image from 'next/image';
import {MovieAPI} from "@/app/_types/MovieAPI";
import {MovieDb} from "@/app/_types/PrismaTypes";

interface HeaderProps {
    movieApi: MovieAPI;
    movieDb: MovieDb | undefined;
    openModal: () => void;
}

interface PosterProps {
    movieApi: MovieAPI;
    movieDb: MovieDb | undefined;
    openModal: () => void;
}

interface TextProps {
    movieApi: MovieAPI;
    movieDb: MovieDb | undefined;
}

function DivSvg() {
    return (
        <div style={{backgroundImage: "url(/assets/images/poster.svg)"}}
             className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[300px] w-[300px] h-[450px] bg-center bg-no-repeat"></div>
    )
}


function Poster({movieApi, movieDb, openModal}: PosterProps) {
    const posterPath: string = movieApi.isPosterPath() ? movieApi.posterPath : "";

    const title: string = movieDb ? movieDb.title : (movieApi.isTitle() ? movieApi.title : "-");
    const style: string = movieDb ? "bg-amber-300 text-black hover:bg-amber-500 active:border-amber-200" : "bg-blue-700 text-white hover:bg-blue-800 active:border-blue-500";
    const text: string = movieDb ? "Modifier" : "Ajouter";

    return (
        <div className="border-0 min-w-[300px] w-[300px] h-auto overflow-hidden rounded-lg">
            <div className="block min-w-[300px] w-[300px] h-[450px] relative top-0 left-0">
                <div className="w-full min-w-full h-full">
                    {posterPath ?
                        <Image src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`} alt={title}
                               width="300" height="450" className="block w-full min-w-full h-full min-h-full border-0"
                               quality={100}/> : <DivSvg/>}
                </div>
            </div>
            <button onClick={openModal}
                    className={`block w-full p-2 rounded-b-lg font-bold active:border-2 active:border-t-0 ${style}`}>{text}</button>
        </div>
    )
}

function Text({movieApi, movieDb}: TextProps) {
    const title: string = movieDb ? movieDb.title : (movieApi.isTitle() ? movieApi.title : "-");
    const pegi: string = movieDb ? movieDb.pegi : movieApi.getPegi();
    const overview: string = movieDb ? movieDb.overview : (movieApi.isOverview() ? movieApi.overview : "-");
    const tagline: string = movieApi.tagline;
    const releaseDate: string = movieApi.isReleaseDate() ? movieApi.getFormattedDate() : "??/??/????";
    const year: string = movieApi.isReleaseDate() ? movieApi.getYear() : "????";
    const genres: string = movieApi.isGenres() ? movieApi.genresToString() : "-";
    const runtimeHours: string = movieApi.isRuntime() ? movieApi.getHours() : "??";
    const runtimeMinutes: string = movieApi.isRuntime() ? movieApi.getMinutes() : "??";
    const budget: string = movieApi.isBudget() ? movieApi.budget.toLocaleString() : "-";
    const revenue: string = movieApi.isRevenue() ? movieApi.revenue.toLocaleString() : "-";
    const directorName: string = movieApi.credits.isCrew() ? movieApi.credits.getDirectorName() : "-";
    const directorJob: string = "Réalisateur";

    return (
        <div className="flex">
            <section className="flex flex-wrap items-start content-center box-border pl-[40px]">
                <div className="w-full mb-6 flex flex-wrap">
                    <h2 className="w-full m-0 p-0 text-3xl font-semibold">
                        {title}
                        &nbsp;
                        <span className="opacity-80 font-normal">
                            ({year})
                        </span>
                    </h2>
                    <div className="flex">
                        <span
                            className="border border-solid border-white/[0.6] text-white/[0.6] inline-flex whitespace-nowrap items-center content-center pt-[0.06em] pb-[0.15em] px-2 leading-none radius-sm mr-2">{pegi}</span>
                        <span className="relative top-0 left-0 pl-0">{releaseDate}</span>
                        <span
                            className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{genres}</span>
                        <span
                            className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{runtimeHours}h {runtimeMinutes}m</span>
                    </div>
                </div>
                <div className="w-full">
                    <h3 className="mb-0 text-lg font-normal italic opacity-70">{tagline}</h3>
                    <h3 className="font-semibold text-xl w-full mb-2 mt-2.5">Synopsis</h3>
                    <div>
                        <p className="p-0 mb-4 text-base">{overview}</p>
                    </div>
                    <ol className="list-none list-inside m-0 p-0 flex relative top-0 left-0 mt-[20px] justify-start flex-wrap">
                        <li className="bg-transparent h-auto mb-0 mr-0 w-1/4 basis-1/4 text-left box-border pr-[20px] min-w-[140px]">
                            <p className="p-0 m-0 text-base overflow-hidden text-ellipsis font-bold">{directorName}</p>
                            <p className="p-0 m-0 text-sm overflow-hidden text-ellipsis">{directorJob}</p>
                        </li>
                        <li className="bg-transparent h-auto mb-0 mr-0 w-1/8 basis-1/8 text-left box-border pr-[20px] min-w-[140px]">
                            <p className="p-0 m-0 text-base overflow-hidden text-ellipsis font-bold">Budget</p>
                            <p className="p-0 m-0 text-sm overflow-hidden text-ellipsis">${budget}</p>
                        </li>
                        <li className="bg-transparent h-auto mb-0 mr-0 w-1/8 basis-1/8 text-left box-border pr-[20px] min-w-[140px]">
                            <p className="p-0 m-0 text-base overflow-hidden text-ellipsis font-bold">Recette</p>
                            <p className="p-0 m-0 text-sm overflow-hidden text-ellipsis">${revenue}</p>
                        </li>
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default function Header({movieApi, movieDb, openModal}: HeaderProps) {
    const backdropPath: string = movieApi.isBackdropPath() ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieApi.backdropPath})` : "";

    return (
        <>
            <div className="w-full relative z-10 backgroundImageCalc bg-cover bg-no-repeat"
                 style={{backgroundImage: backdropPath}}>
                <div className="flex justify-center flex-wrap"
                     style={{backgroundImage: "linear-gradient(to right, rgba(50, 50, 50, 1) calc((50vw - 170px) - 340px), rgba(50, 50, 50, 0.84) 50%, rgba(50, 50, 50, 0.84) 100%)"}}>
                    <div className="w-full max-w-[1400px] px-10 py-[30px] z-0">
                        <section className="flex flex-nowrap text-white">
                            <Poster movieApi={movieApi} movieDb={movieDb} openModal={openModal}/>
                            <Text movieApi={movieApi} movieDb={movieDb}/>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}