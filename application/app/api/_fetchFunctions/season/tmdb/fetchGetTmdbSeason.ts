import {Dispatch, SetStateAction} from "react";
import {SeasonAPI, SeasonAPIObject} from "@/app/_types/SeasonAPI";

export function fetchGetTmdbSeason(serieId: number, seasonNumber: number, setSeasonApi: Dispatch<SetStateAction<SeasonAPI | undefined>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    fetch(`/api/season/tmdb/${serieId}/${seasonNumber}/`)
        .then(response => {
            if (!response.ok) {
                setSeasonApi(undefined);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            const seasonApiObject: SeasonAPIObject = data;
            setSeasonApi(SeasonAPI.getInstance(seasonApiObject));
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
        });
}