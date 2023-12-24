import Image from 'next/image';
import {SerieAPIDB} from "@/app/_types/SerieAPIDB";

interface HeaderProps {
    serie: SerieAPIDB;
}

function DivSvg() {
    return (
        <div style={{backgroundImage: "url(/assets/images/poster.svg)"}}
             className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[300px] w-[300px] h-[450px] bg-center bg-no-repeat"></div>
    )
}


function Poster({serie}: HeaderProps) {
    const posterPath: string = serie.isPosterPath() ? serie.posterPath : "";
    const name: string = serie.isName() ? serie.name : "-";

    return (
        <div className="border-0 min-w-[300px] w-[300px] h-auto overflow-hidden rounded-lg">
            <div className="block min-w-[300px] w-[300px] h-[450px] relative top-0 left-0">
                <div className="w-full min-w-full h-full">
                    {serie.isPosterPath() ?
                        <Image src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`} alt={name}
                               width="300" height="450" className="block w-full min-w-full h-full min-h-full border-0"
                               quality={100}/> : <DivSvg/>}
                </div>
            </div>
        </div>
    )
}

function Text({serie}: HeaderProps) {
    const name: string = serie.isName() ? serie.name : "-";
    const pegi: string = serie.pegi;
    const tagline: string = serie.tagline;
    const overview: string = serie.isOverview() ? serie.overview : "-";
    const formattedDate: string = serie.isFirstAirDate() ? serie.getFormattedDate() : "??/??/????";
    const year: string = serie.isFirstAirDate() ? serie.getYear() : "????";
    const genresString: string = serie.isGenres() ? serie.genresToString() : "-";
    const directorName: string = serie.createdBy.length > 0 ? serie.createdBy[0].name : "-";
    const secondDirectorName: string = serie.createdBy.length > 1 ? serie.createdBy[1].name : "-";
    const directorJob: string = "Créatrice / Créateur";
    const networkUrl: string = serie.networks.length > 0 ? serie.networks[0].logoPath : "";
    const networkName: string = serie.networks.length > 0 ? serie.networks[0].name : "";

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
                        <span
                            className="border border-solid border-white/[0.6] text-white/[0.6] inline-flex whitespace-nowrap items-center content-center pt-[0.06em] pb-[0.15em] px-2 leading-none radius-sm mr-2">{pegi}</span>
                        <span className="relative top-0 left-0 pl-0">{formattedDate}</span>
                        <span
                            className="pl-[20px] relative top-0 left-0 before:text-lg before:leading-none before:content-['•'] before:w-full before:h-full before:absolute before:top-0 before:left-[7px] before:inline-flex before:content-center before:items-center before:-z-10">{genresString}</span>
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
                        {serie.createdBy.length > 1 &&
                            <li className="bg-transparent h-auto mb-0 mr-0 w-1/4 basis-1/4 text-left box-border pr-[20px] min-w-[140px]">
                                <p className="p-0 m-0 text-base overflow-hidden text-ellipsis font-bold">{secondDirectorName}</p>
                                <p className="p-0 m-0 text-sm overflow-hidden text-ellipsis">{directorJob}</p>
                            </li>}
                        <li className="bg-transparent h-auto mb-0 mr-0 w-1/4 basis-1/4 text-left box-border pr-[20px] min-w-[140px]">
                            <p className="p-0 m-0 text-base overflow-hidden text-ellipsis font-bold">Diffuseur
                                télévisé</p>
                            <p className="p-0 m-0 text-sm overflow-hidden text-ellipsis">{serie.isNetworks() ?
                                <Image className='h-[30px] w-max'
                                       src={`https://www.themoviedb.org/t/p/h30${networkUrl}`} alt={networkName}
                                       title={networkName} width={50} height={30}/> : "-"}</p>
                        </li>
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default function Header({serie}: HeaderProps) {
    const backdropUrl: string = serie.isBackdropPath() ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${serie.backdropPath})` : "";

    return (
        <>
            <div className="w-full relative z-10 backgroundImageCalc bg-cover bg-no-repeat"
                 style={{backgroundImage: backdropUrl}}>
                <div className="flex justify-center flex-wrap"
                     style={{backgroundImage: "linear-gradient(to right, rgba(50, 50, 50, 1) calc((50vw - 170px) - 340px), rgba(50, 50, 50, 0.84) 50%, rgba(50, 50, 50, 0.84) 100%)"}}>
                    <div className="w-full max-w-[1400px] px-10 py-[30px] z-0">
                        <section className="flex flex-nowrap text-white">
                            <Poster serie={serie}/>
                            <Text serie={serie}/>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}