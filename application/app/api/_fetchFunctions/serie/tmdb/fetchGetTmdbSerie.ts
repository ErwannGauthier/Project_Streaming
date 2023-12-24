import {Dispatch, SetStateAction} from "react";
import {SerieAPI, SerieAPIObject} from "@/app/_types/SerieAPI";

export function fetchGetTmdbSerie(serieId: number, setSerieApi: Dispatch<SetStateAction<SerieAPI | undefined>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    fetch(`/api/serie/tmdb/${serieId}/`)
        .then(response => {
            if (!response.ok) {
                setSerieApi(undefined);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            const serieApiObject: SerieAPIObject = data;
            setSerieApi(SerieAPI.getInstance(serieApiObject));
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
        });
}