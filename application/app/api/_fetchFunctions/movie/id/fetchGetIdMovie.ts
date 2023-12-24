import {Dispatch, SetStateAction} from "react";
import {MovieDb} from "@/app/_types/PrismaTypes";

export function fetchGetIdMovie(movieId: number, setMovieDb: Dispatch<SetStateAction<MovieDb | undefined>>, setLoading: Dispatch<SetStateAction<boolean>>, setError?: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    fetch(`/api/movie/${movieId}/`)
        .then(response => {
            if (!response.ok) {
                setMovieDb(undefined);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            setMovieDb(data);
            setLoading(false);
        })
        .catch(error => {
            setError && console.error(error);
            setError && setError(true);
        });
}