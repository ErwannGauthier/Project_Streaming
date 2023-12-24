import {Dispatch, SetStateAction} from "react";
import {SerieDb} from "@/app/_types/PrismaTypes";

export function fetchGetIdSerie(serieId: number, setSerieDb: Dispatch<SetStateAction<SerieDb | undefined>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    fetch(`/api/serie/${serieId}/`)
        .then(response => {
            if (!response.ok) {
                setSerieDb(undefined);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            setSerieDb(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
        });
}