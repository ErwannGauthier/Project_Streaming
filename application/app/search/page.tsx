"use client"

import {useEffect, useState} from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import SearchInput from "./_components/SearchInput";
import LoadingScreen from "../_components/screens/LoadingScreen";
import {MovieSearch} from "@/app/_types/MovieSearch";
import {SerieSearch} from "@/app/_types/SerieSearch";
import DivMovie from "@/app/search/_components/DivMovie";
import DivSerie from "./_components/DivSerie";
import {PersonSearch} from "@/app/_types/PersonSearch";
import {fetchGetSearch} from "@/app/api/_fetchFunctions/search/fetchGetSearch";
import InternalErrorScreen from "@/app/_components/screens/InternalErrorScreen";

export default function Search() {
    const [movies, setMovies] = useState<MovieSearch[]>([]);
    const [series, setSeries] = useState<SerieSearch[]>([]);
    const [persons, setPersons] = useState<PersonSearch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const [isMovie, setIsMovie] = useState<boolean>(true);
    const [isSerie, setIsSerie] = useState<boolean>(false);

    const search: ReadonlyURLSearchParams = useSearchParams();
    const searchQuery: string = search.get("q") || "";

    useEffect(() => {
        document.title = "GtrTV - Rechercher";
        const encodedSearchQuery: string = encodeURI(searchQuery || "");
        if (encodedSearchQuery !== "") {
            setError(false);
            fetchGetSearch(encodedSearchQuery, setMovies, setSeries, setPersons, setLoading, setError);
        }

        setLoading(false);
    }, [searchQuery]);

    function handleClickMovie(event: React.MouseEvent) {
        setIsMovie(true);
        setIsSerie(false);
    }

    function handleClickSerie(event: React.MouseEvent) {
        setIsMovie(false);
        setIsSerie(true);
    }

    if (loading) {
        return (
            <LoadingScreen/>
        );
    }

    if (error) {
        return (
            <InternalErrorScreen/>
        );
    }

    if (searchQuery === "") {
        return (
            <div className="w-full flex justify-center pt-5">
                <SearchInput/>
            </div>
        );
    }

    return (
        <>
            <div className="w-full flex justify-center pt-5">
                <SearchInput/>
            </div>
            <section className="block box-border bg-white mt-5">
                <div className="flex items-start w-full content-start justify-center box-border">
                    <div
                        className="max-w-[1400px] px-[40px] py-[30px] w-full flex items-start content-start box-border">

                        <div className="justify-end px-0 min-w-[260px] w-[260px] flex flex-wrap box-border">
                            <div
                                className="m-0 block box-border min-w-[260px] w-[260px] border-[1px] border-solid border-gray-100 rounded-lg overflow-hidden shadow shadow-grey-200">
                                <h3 className="flex items-center content-center justify-between m-0 font-semibold p-[20px] text-white bg-sky-400">Résultats
                                    de votre recherche</h3>
                                <div className="box-border">
                                    <ul className="box-border px-0 py-[8px] list-none m-0 ">
                                        <li onClick={handleClickMovie}
                                            className={`inline-flex justify-between items-center w-full text-base m-0 box-border cursor-pointer hover:bg-gray-200 ${isMovie && "bg-gray-200"}`}>
                                            <p className={`text-black w-full h-full px-[20px] py-[10px] inline-flex items-center box-border ${isMovie && "font-semibold"}`}>Films</p>
                                            <span
                                                className="bg-white text-black inline-flex items-center text-sm font-normal px-[10px] py-0 rounded-lg mr-[20px] whitespace-nowrap box-border">{movies.length}</span>
                                        </li>
                                        <li onClick={handleClickSerie}
                                            className={`inline-flex justify-between items-center w-full text-base m-0 box-border cursor-pointer hover:bg-gray-200 ${isSerie && "bg-gray-200"}`}>
                                            <p className={`text-black w-full h-full px-[20px] py-[10px] inline-flex items-center box-border ${isSerie && "font-semibold"}`}>Séries</p>
                                            <span
                                                className="bg-white text-black inline-flex items-center text-sm font-normal px-[10px] py-0 rounded-lg mr-[20px] whitespace-nowrap box-border">{series.length}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div
                            className="pl-[30px] pr-0 bg-white calcDivWidth flex flex-wrap grow-0 shrink basis-auto box-border">
                            <section className="py-0 w-full block box-border">
                                <div className="box-border">
                                    <div className="items-start content-start justify-start flex flex-wrap box-border">
                                        {isMovie && <>
                                            {movies.length !== 0 ? movies.map((movie: MovieSearch) => (
                                                    <DivMovie key={movie.id} movie={movie}/>))
                                                : <p className="w-full font-semibold text-black text-center">Aucun film
                                                    trouvé pour cette recherche.</p>}
                                        </>
                                        }

                                        {isSerie && <>
                                            {series.length !== 0 ? series.map((serie: SerieSearch) => (
                                                    <DivSerie key={serie.id} serie={serie}/>))
                                                :
                                                <p className="w-full font-semibold text-black text-center">Aucune série
                                                    trouvée pour cette recherche.</p>}
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