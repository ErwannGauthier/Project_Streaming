"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from 'swr';
import SearchInput from "./_components/SearchInput";
import { MovieSearch } from "../api/TMDB/_types/MovieSearch";
import { SerieSearch } from "../api/TMDB/_types/SerieSearch";
import DivResult from "./_components/DivResults";
import LoadingScreen from "../_components/LoadingScreen";

async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fecth data');
    }

    return response.json();
}

export default function Search() {
    useEffect(() => {
        document.title = "GtrTV - Rechercher";
    }, []);

    const [isMovie, setIsMovie] = useState(true);
    const [isSerie, setIsSerie] = useState(false);
    const [movies, setMovies] = useState(Array<MovieSearch>);
    const [series, setSeries] = useState(Array<SerieSearch>);

    function handleClickMovie(event: React.MouseEvent) {
        setIsMovie(true);
        setIsSerie(false);
    }

    function handleClickSerie(event: React.MouseEvent) {
        setIsMovie(false);
        setIsSerie(true);
    }

    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");

    const { data, isLoading, error } = useSWR(
        encodedSearchQuery ? `/api/TMDB/searchMulti?q=${encodedSearchQuery}` : null,
        encodedSearchQuery ? fetchData : null
    );

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    if (error) {
        return (
            <>
                <div className="w-full flex justify-center pt-5">
                    <SearchInput />
                </div>
                <p>Une erreur est survenue</p>
            </>
        )
    }

    if (!data) {
        return (
            <div className="w-full flex justify-center pt-5">
                <SearchInput />
            </div>
        );
    }

    return (
        <>
            <div className="w-full flex justify-center pt-5">
                <SearchInput />
            </div>
            <section className="block box-border bg-white mt-5">
                <div className="flex items-start w-full content-start justify-center box-border">
                    <div className="max-w-[1400px] px-[40px] py-[30px] w-full flex items-start content-start box-border">

                        <div className="justify-end px-0 min-w-[260px] w-[260px] flex flex-wrap box-border">
                            <div className="m-0 block box-border min-w-[260px] w-[260px] border-[1px] border-solid border-gray-100 rounded-lg overflow-hidden shadow shadow-grey-200">
                                <h3 className="flex items-center content-center justify-between m-0 font-semibold p-[20px] text-white bg-sky-400">Résultats de votre recherche</h3>
                                <div className="box-border">
                                    <ul className="box-border px-0 py-[8px] list-none m-0 ">
                                        <li onClick={handleClickMovie} className={`inline-flex justify-between items-center w-full text-base m-0 box-border cursor-pointer hover:bg-gray-200 ${isMovie && "bg-gray-200"}`}>
                                            <p className={`text-black w-full h-full px-[20px] py-[10px] inline-flex items-center box-border ${isMovie && "font-semibold"}`}>Films</p>
                                            <span className="bg-white text-black inline-flex items-center text-sm font-normal px-[10px] py-0 rounded-lg mr-[20px] whitespace-nowrap box-border">{data.movies.length}</span>
                                        </li>
                                        <li onClick={handleClickSerie} className={`inline-flex justify-between items-center w-full text-base m-0 box-border cursor-pointer hover:bg-gray-200 ${isSerie && "bg-gray-200"}`}>
                                            <p className={`text-black w-full h-full px-[20px] py-[10px] inline-flex items-center box-border ${isSerie && "font-semibold"}`}>Séries</p>
                                            <span className="bg-white text-black inline-flex items-center text-sm font-normal px-[10px] py-0 rounded-lg mr-[20px] whitespace-nowrap box-border">{data.series.length}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="pl-[30px] pr-0 bg-white calcDivWidth flex flex-wrap grow-0 shrink basis-auto box-border">
                            <section className="py-0 w-full block box-border">
                                <div className="box-border">
                                    <div className="items-start content-start justify-start flex flex-wrap box-border">
                                        {isMovie && <>
                                            {data.movies.length !== 0 ? data.movies.map((movie: MovieSearch) => (<DivResult key={movie["id"]} id={movie["id"]} url={movie["poster_path"]} title={movie["title"]} release_date={movie["release_date"]} overview={movie["overview"]} isMovie={true} />))
                                                : <p className="w-full font-semibold text-black text-center">Aucun film trouvé pour cette recherche.</p>}
                                        </>
                                        }

                                        {isSerie && <>
                                            {data.series.length !== 0 ? data.series.map((serie: SerieSearch) => (<DivResult key={serie["id"]} id={serie["id"]} url={serie["poster_path"]} title={serie["name"]} release_date={serie["first_air_date"]} overview={serie["overview"]} isMovie={false} />))
                                                : <p className="w-full font-semibold text-black text-center">Aucune série trouvée pour cette recherche.</p>}
                                        </>
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}