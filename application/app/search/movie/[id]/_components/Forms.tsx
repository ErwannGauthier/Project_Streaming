import {MovieAPI} from "@/app/api/TMDB/_types/MovieAPI";
import {Movie, TypeStream} from "@prisma/client";
import AlertError from "@/app/_components/alerts/AlertError";
import AlertLoading from "@/app/_components/alerts/AlertLoading";
import AlertValidate from "@/app/_components/alerts/AlertValidate";
import AlertWarning from "@/app/_components/alerts/AlertWarning";

import {useState} from 'react';
import FormUpdate from "./FormUpdate";
import FormDelete from "./FormDelete";
import FormAdd from "./FormAdd";
import getPegiMovie from "@/app/_utils/getPegiMovie";

interface FormsProps {
    movieAPI: MovieAPI;
    movieDB: Movie & { TypeStream: Array<TypeStream> } | null;
    hideModal: () => void;
}

export default function Forms({ movieAPI, movieDB, hideModal }: FormsProps) {
    const [showLoading, setShowLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [validateText, setValidateText] = useState("");
    const [warningText, setWarningText] = useState("");

    const resetAlerts = () => {
        setShowLoading(false);
        setErrorText("");
        setValidateText("");
        setWarningText("");
    }

    const createAlertLoading = () => {
        resetAlerts();
        setShowLoading(true);
    }

    const createAlertError = (message: string) => {
        resetAlerts();
        setErrorText(message);
    }

    const createAlertValidate = (message: string) => {
        resetAlerts();
        setValidateText(message);
    }

    const createAlertWarning = (message: string) => {
        resetAlerts();
        setWarningText(message);
    }

    const createAlert = (type: string, message: string = "") => {
        switch (type.toLocaleLowerCase()) {
            case "loading":
                createAlertLoading();
                break;
            case "error":
                createAlertError(message);
                break;
            case "validate":
                createAlertValidate(message);
                break;
            case "warning":
                createAlertWarning(message);
                break;
            case "reset":
                resetAlerts();
                break;
            default:
                break;
        }
    }

    const pegi = getPegiMovie(movieAPI["release_dates"]);
    const isInDb = movieDB !== null;
    let types: Array<number> = [];
    if (isInDb) {
        movieDB["TypeStream"].map((value: { id: number, name: string }) => {
            types.push(value.id)
        });
    }

    const showDiv = (showLoading || errorText || validateText || warningText);
    return (
        <>
            {showDiv &&
                <div>
                    {showLoading && <AlertLoading text="Chargement..." />}
                    {errorText && <AlertError text={errorText} />}
                    {validateText && <AlertValidate text={validateText} />}
                    {warningText && <AlertWarning text={warningText} />}
                </div>
            }
            {!isInDb && <FormAdd id={movieAPI["id"]} title={movieAPI["title"]} overview={movieAPI["overview"]} releaseDate={movieAPI["release_date"]} pegi={pegi} runtime={movieAPI["runtime"]} tagline={movieAPI["tagline"]} posterPath={movieAPI["poster_path"]} backdropPath={movieAPI["backdrop_path"]} genres={movieAPI["genres"]} createAlert={createAlert} hideModal={hideModal} />}
            {isInDb && <FormUpdate id={movieDB["id"]} title={movieDB["title"]} overview={movieDB["overview"]} typesStream={types} createAlert={createAlert} hideModal={hideModal} />}
            {isInDb && <FormDelete id={movieDB["id"]} isStreaming={types.includes(4)} title={movieDB["title"]} createAlert={createAlert} hideModal={hideModal} />}
        </>
    )
}