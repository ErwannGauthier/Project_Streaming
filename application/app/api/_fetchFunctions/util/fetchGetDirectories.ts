import {Dispatch, SetStateAction} from "react";

export function fetchGetDirectories(source: string, setDirectories: Dispatch<SetStateAction<string[]>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>): void {
    setLoading(true);
    setError(false);
    fetch(`/api/util/directories?source=${source}`)
        .then(response => {
            if (!response.ok) {
                setDirectories([]);
                setLoading(false);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(data => {
            setDirectories(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
        });
}

export function fetchGetDirectoriesAlerts(source: string, setDirectories: Dispatch<SetStateAction<string[]>>, createAlert: (type: string, message?: string) => void): void {
    createAlert("reset");
    createAlert("loading");
    fetch(`/api/util/directories?source=${source}`)
        .then(response => {
            if (!response.ok) {
                setDirectories([]);
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then((data) => {
            const directories: string[] = Object.values(data);
            setDirectories(directories);
            createAlert("reset");
            directories.length === 0 && createAlert("warning", "Il n'y a aucun fichier au format m3u8 dans le dossier.");
        })
        .catch(error => {
            console.error(error);
            createAlert("reset");
            createAlert("error", error);
        });
}