"use client"

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from "react";
import {GenreDb, MovieDb, SerieDb} from "@/app/_types/PrismaTypes";

interface GenreCarrouselProps {
    genre: GenreDb,
    setHeaderMovie: (movie: MovieDb) => void,
    setHeaderSerie: (serie: SerieDb) => void,
    resetHeader: () => void,
}

interface GenreCardProps {
    o: MovieDb | SerieDb,
    key: number,
    id: number,
    setHeaderMovie: (movie: MovieDb) => void,
    setHeaderSerie: (serie: SerieDb) => void,
    resetHeader: () => void,
}

interface DivImgProps {
    poster_path: string;
    name: string;
}

interface DivSvgProps {
}


function DivImg({poster_path, name}: DivImgProps) {
    return (
        <div className="min-w-[130px] w-[130px] h-[195px] block">
            <Image className="w-full h-full" src={`https://www.themoviedb.org/t/p/w130_and_h195_face${poster_path}`}
                   alt={name} width={130} height={195} loading="lazy"/>
        </div>
    )
}

function DivSvg({}: DivSvgProps) {
    const svgUrl = "/assets/images/poster.svg";
    return (
        <div style={{backgroundImage: `url(${svgUrl})`}}
             className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[138px] w-[138px] h-[175px] bg-center bg-no-repeat"></div>
    )
}

function GenreCard({o, key, id, setHeaderMovie, setHeaderSerie, resetHeader}: GenreCardProps) {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    const divRingId: string = `divRing_${id}_${key}`
    const divRing: HTMLDivElement = hasMounted ? document.querySelector("#" + divRingId) as HTMLDivElement : null!;
    const linkId: string = `link_${id}_${key}`;
    const linkElem: HTMLLinkElement = hasMounted ? document.querySelector("#" + linkId) as HTMLLinkElement : null!;

    const name = (o as MovieDb).title || (o as SerieDb).name;
    const route = `/watch/${typeof (o as MovieDb).title !== "undefined" ? "movie" : "serie"}/${o.id}`;

    function setHeader() {
        typeof (o as MovieDb).title !== "undefined" ? setHeaderMovie(o as MovieDb) : setHeaderSerie(o as SerieDb);
    }

    function addClassRing() {
        divRing.classList.add("ring-4", "ring-red-700");
    }

    function removeClassRing() {
        divRing.classList.remove("ring-4", "ring-red-700");
    }

    function handleFocus() {
        addClassRing();
        setHeader();
    }

    function handleBlur() {
        removeClassRing();
        resetHeader();
    }

    function handleMouseEnter() {
        linkElem.focus();
    }

    return (
        <div id={divRingId} key={key}
             className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-neutral-700 rounded-lg overflow-hidden min-w-[130px] w-[130px] grayBackground shadow-md">
            <Link id={linkId} href={route} onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter}>
                {o.posterPath ? <DivImg poster_path={o.posterPath} name={name}/> : <DivSvg/>}
            </Link>
        </div>
    )
}

export default function GenreCarrousel({genre, setHeaderMovie, setHeaderSerie, resetHeader}: GenreCarrouselProps) {
    const tabGt: MovieDb[] | SerieDb[] = genre.Movie.length >= genre.Serie.length ? genre.Movie : genre.Serie;
    const tabLw: MovieDb[] | SerieDb[] = genre.Movie.length < genre.Serie.length ? genre.Movie : genre.Serie;
    const cards = [];
    let keyIndex = 0;
    for (let i = 0; i < tabGt.length; i++) {
        cards.push(GenreCard({
            o: tabGt[i],
            key: keyIndex,
            id: genre.id,
            setHeaderMovie: setHeaderMovie,
            setHeaderSerie: setHeaderSerie,
            resetHeader: resetHeader
        }));
        if (i < tabLw.length) {
            keyIndex++;
            cards.push(GenreCard({
                o: tabLw[i],
                key: keyIndex,
                id: genre.id,
                setHeaderMovie: setHeaderMovie,
                setHeaderSerie: setHeaderSerie,
                resetHeader: resetHeader
            }));
        }
        keyIndex++;
    }

    return (
        <div
            className="my-0 grayBackground w-full flex justify-center flex-wrap items-start content-start relative z-10">
            <div className="w-full flex items-start content-start justify-center">
                <div className="max-w-[1400px] px-[40px] pt-[30px] w-full flex items-start content-start">
                    <div className="grayBackground w-full flex flex-wrap px-[30px]">
                        <section className="w-full block px-0 py-0">
                            <h3 className="font-bold text-xl mb-[10px]">{genre.name}</h3>
                            <div className="relative top-0 left-0">
                                <ol className="overflow-x-scroll overflow-y-hidden ml-[-10px] mt-[-10px] pb-[10px] list-none list-inside mr-0 mb-0 px-0 pt-0 flex relative top-0 left-0">
                                    {cards}
                                </ol>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}