import {Dispatch, SetStateAction} from "react";
import {GenreDb} from "@/app/_types/PrismaTypes";

export function fetchGetGenre(setGenres: Dispatch<SetStateAction<GenreDb[] | undefined>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    setError(false);
    fetch(`/api/genre/`)
        .then(response => {
            if (!response.ok) {
                setGenres(undefined);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            setGenres(data.genres.filter((genre: GenreDb) => genre.Movie.length > 0 || genre.Serie.length > 0));
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
        });
}