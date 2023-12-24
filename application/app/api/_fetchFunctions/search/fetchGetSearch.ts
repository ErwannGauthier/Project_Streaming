import {Dispatch, SetStateAction} from "react";
import {MovieSearch, MovieSearchObject} from "@/app/_types/MovieSearch";
import {PersonSearch, PersonSearchObject} from "@/app/_types/PersonSearch";
import {SerieSearch, SerieSearchObject} from "@/app/_types/SerieSearch";
import {SearchResult} from "@/app/api/_services/SearchService";

export function fetchGetSearch(query: string, setMovies: Dispatch<SetStateAction<MovieSearch[]>>, setSeries: Dispatch<SetStateAction<SerieSearch[]>>, setPersons: Dispatch<SetStateAction<PersonSearch[]>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    fetch(`/api/search?q=${query}`)
        .then(response => {
            if (!response.ok) {
                setMovies([]);
                setSeries([]);
                setPersons([]);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then((data: SearchResult) => {
            setMovies(data.movies.map((movie: MovieSearchObject) => MovieSearch.getInstance(movie)));
            setSeries(data.series.map((serie: SerieSearchObject) => SerieSearch.getInstance(serie)));
            setPersons(data.persons.map((person: PersonSearchObject) => PersonSearch.getInstance(person)));
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
        });
}