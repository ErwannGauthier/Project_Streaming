import Image from 'next/image'
import Link from 'next/link'
import {getFormatedDateFromReleaseDate} from '@/app/_utils/getFormatedDateFromReleaseDate';

interface DivImageProps {
    id: number;
    isMovie: boolean;
    url: string;
    alternative: string;
};

interface DivSvgProps {
    id: number;
    isMovie: boolean;
}

interface DetailsDivProps {
    id: number;
    isMovie: boolean;
    title: string;
    release_date: string;
    overview: string;
};

interface DivResultProps {
    id: number;
    isMovie: boolean;
    url: string;
    title: string;
    release_date: string;
    overview: string;
};

function DivSvg({ id, isMovie }: DivSvgProps) {
    const urlLink = isMovie ? `/search/movie/${id}` : `/search/serie/${id}`;

    return (
        <Link href={urlLink}>
            <div style={{ backgroundImage: "url(/assets/images/poster.svg)" }} className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[94px] w-[94px] h-[141px] bg-center bg-no-repeat"></div>
        </Link>
    )
}

function DivImage({ id, url, alternative, isMovie }: DivImageProps) {
    const source = `https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${url}`;
    const urlLink = isMovie ? `/search/movie/${id}` : `/search/serie/${id}`;

    return (
        <div className="min-w-[94px] w-[94px] h-[141px] box-border">
            <div className="w-full h-full">
                <Link href={urlLink} className="block w-full h-full">
                    <Image src={source} alt={alternative} width="94" height="141" className="w-full h-full" />
                </Link>
            </div>
        </div>
    )
}

export function DetailsDiv({ id, title, release_date, overview, isMovie }: DetailsDivProps) {
    const urlLink = isMovie ? `/search/movie/${id}` : `/search/serie/${id}`;
    const formatedDate = release_date ? getFormatedDateFromReleaseDate(release_date) : "??/??/????";

    return (
        <div id="details" className="w-full py-[10px] px-[15px] flex flex-col flex-wrap content-center items-center">
            <div id="wrapper" className="flex flex-col items-center w-full">
                <div id="title" className="w-full flex flex-col flex-wrap items-baseline overflow-hidden">
                    <div className="flex flex-col">
                        <Link href={urlLink} className="text-base font-semibold text-neutral-950 hover:text-neutral-500 hover:no-underline">
                            {title}
                        </Link>
                        <span id="release_date" className="w-full whitespace-nowrap text-gray-500">
                            {formatedDate || release_date}
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

export default function DivResult({ id, url, title, release_date, overview, isMovie }: DivResultProps) {
    return <>
        <div className="w-full bg-white mb-6 shadow shadow-grey-200 flex overflow-hidden box-border rounded-lg">
            {url ? <DivImage id={id} url={url} alternative={title} isMovie={isMovie} /> : <DivSvg id={id} isMovie={isMovie} />}
            <DetailsDiv id={id} title={title} release_date={release_date} overview={overview} isMovie={isMovie} />
        </div>
    </>
}