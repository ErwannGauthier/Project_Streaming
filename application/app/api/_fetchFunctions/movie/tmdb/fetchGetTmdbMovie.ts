import {Dispatch, SetStateAction} from "react";
import {MovieAPI, MovieAPIObject} from "@/app/_types/MovieAPI";

export function fetchGetTmdbMovie(movieId: number, setMovieApi: Dispatch<SetStateAction<MovieAPI | undefined>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    fetch(`/api/movie/tmdb/${movieId}/`)
        .then(response => {
            if (!response.ok) {
                setMovieApi(undefined);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            const movieApiObject: MovieAPIObject = data;
            setMovieApi(MovieAPI.getInstance(movieApiObject));
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
        });
}