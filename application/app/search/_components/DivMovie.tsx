import Image from 'next/image'
import Link from 'next/link'
import {MovieSearch} from "@/app/_types/MovieSearch";

interface DivMovieProps {
    movie: MovieSearch
}

function DivSvg({movie}: DivMovieProps) {
    const urlLink: string = `/search/movie/${movie.id}`;

    return (
        <Link href={urlLink}>
            <div style={{backgroundImage: "url(/assets/images/poster.svg)"}}
                 className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[94px] w-[94px] h-[141px] bg-center bg-no-repeat"></div>
        </Link>
    )
}

function DivImage({movie}: DivMovieProps) {
    const source: string = `https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${movie.posterPath}`;
    const urlLink: string = `/search/movie/${movie.id}`;
    const alternative: string = movie.isTitle() ? movie.title : "-";

    return (
        <div className="min-w-[94px] w-[94px] h-[141px] box-border">
            <div className="w-full h-full">
                <Link href={urlLink} className="block w-full h-full">
                    <Image src={source} alt={alternative} width="94" height="141" className="w-full h-full"/>
                </Link>
            </div>
        </div>
    )
}

export function DetailsDiv({movie}: DivMovieProps) {
    const urlLink: string = `/search/movie/${movie.id}`;
    const title: string = movie.isTitle() ? movie.title : "-";
    const formattedDate: string = movie.releaseDate ? movie.getFormattedDate() : "??/??/????";
    const overview: string = movie.isOverview() ? movie.overview : "-";

    return (
        <div id="details" className="w-full py-[10px] px-[15px] flex flex-col flex-wrap content-center items-center">
            <div id="wrapper" className="flex flex-col items-center w-full">
                <div id="title" className="w-full flex flex-col flex-wrap items-baseline overflow-hidden">
                    <div className="flex flex-col">
                        <Link href={urlLink}
                              className="text-base font-semibold text-neutral-950 hover:text-neutral-500 hover:no-underline">
                            {title}
                        </Link>
                        <span id="release_date" className="w-full whitespace-nowrap text-gray-500">
                            {formattedDate}
                        </span>
                    </div>
                </div>
                <div id="overview" className="h-auto mt-[20px] box-border w-full">
                    <p className="webkitOverflow w-full text-neutral-800">
                        {overview}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function DivMovie({movie}: DivMovieProps) {
    return <>
        <div className="w-full bg-white mb-6 shadow shadow-grey-200 flex overflow-hidden box-border rounded-lg">
            {movie.isPosterPath() ? <DivImage movie={movie}/> : <DivSvg movie={movie}/>}
            <DetailsDiv movie={movie}/>
        </div>
    </>
}