import {Dispatch, SetStateAction} from "react";
import {SeasonDb} from "@/app/_types/PrismaTypes";

export function fetchGetIdSeason(seasonId: number, setSeasonDb: Dispatch<SetStateAction<SeasonDb | undefined>>, setLoading: Dispatch<SetStateAction<boolean>>, setError?: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    fetch(`/api/season/${seasonId}/`)
        .then(response => {
            if (!response.ok) {
                setSeasonDb(undefined);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            setSeasonDb(data);
            setLoading(false);
        })
        .catch(error => {
            setError && console.error(error);
            setError && setError(true);
        });
}