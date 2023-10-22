import AlertError from "@/app/_components/alerts/AlertError";
import AlertLoading from "@/app/_components/alerts/AlertLoading";
import AlertValidate from "@/app/_components/alerts/AlertValidate";
import AlertWarning from "@/app/_components/alerts/AlertWarning";

import {useState} from 'react';
import FormUpdate from "./FormUpdate";
import FormDelete from "./FormDelete";
import FormAdd from "./FormAdd";
import {EpisodeAPI} from "@/app/api/TMDB/_types/EpisodeAPI";
import {Episode, TypeStream} from "@prisma/client";

interface FormsProps {
    showForms: boolean,
    serieId: number,
    seasonId: number,
    seasonNumber: number,
    episodeAPI: EpisodeAPI,
    episodeDB: Episode & { TypeStream: Array<TypeStream> } | null;
    hideModal: () => void;
}

export default function Forms({ showForms, serieId, seasonId, seasonNumber, episodeAPI, episodeDB, hideModal }: FormsProps) {
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

    const isInDb = episodeDB !== null;
    let types: Array<number> = [];
    if (isInDb) {
        episodeDB["TypeStream"].map((value: TypeStream) => {
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
            {showForms &&
                <>
                    {!isInDb && <FormAdd serieId={serieId} seasonId={seasonId} seasonNumber={seasonNumber} episodeId={episodeAPI["id"]} episodeNumber={episodeAPI["episode_number"]} createAlert={createAlert} hideModal={hideModal} />}
                    {isInDb && <FormUpdate serieId={serieId} name={episodeAPI["name"]} seasonId={seasonId} seasonNumber={seasonNumber} episodeId={episodeDB["id"]} episodeNumber={episodeDB["episodeNumber"]} typesStream={types} createAlert={createAlert} hideModal={hideModal} />}
                    {isInDb && <FormDelete serieId={serieId} name={episodeAPI["name"]} seasonId={seasonId} seasonNumber={seasonNumber} episodeId={episodeDB["id"]} episodeNumber={episodeDB["episodeNumber"]} isStreaming={types.includes(4)} createAlert={createAlert} hideModal={hideModal} />}
                </>
            }
        </>
    )
}