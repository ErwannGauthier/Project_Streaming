import AlertError from "@/app/_components/alerts/AlertError";
import AlertLoading from "@/app/_components/alerts/AlertLoading";
import AlertValidate from "@/app/_components/alerts/AlertValidate";
import AlertWarning from "@/app/_components/alerts/AlertWarning";

import {useState} from 'react';
import FormUpdate from "./FormUpdate";
import FormDelete from "./FormDelete";
import FormAdd from "./FormAdd";
import {SeasonAPI} from "@/app/_types/SeasonAPI";
import {PrismaUtils} from "@/app/_types/PrismaUtils";
import {EpisodeDb, SeasonDb} from "@/app/_types/PrismaTypes";

interface FormsProps {
    showForms: boolean;
    serieID: number;
    seasonAPI: SeasonAPI;
    seasonDB: SeasonDb | undefined;
    episodeNumber: number;
    callFetching: () => void,
    hideModal: () => void;
}

export default function Forms({
                                  showForms,
                                  serieID,
                                  seasonAPI,
                                  seasonDB,
                                  episodeNumber,
                                  callFetching,
                                  hideModal
                              }: FormsProps) {
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

    const showDiv = (showLoading || errorText || validateText || warningText);
    const episodeDB: EpisodeDb | undefined = PrismaUtils.getEpisodeDBByEpisodeNumber(seasonDB ? seasonDB.Episode : [], episodeNumber);

    return (
        <>
            {showDiv &&
                <div>
                    {showLoading && <AlertLoading text="Chargement..."/>}
                    {errorText && <AlertError text={errorText}/>}
                    {validateText && <AlertValidate text={validateText}/>}
                    {warningText && <AlertWarning text={warningText}/>}
                </div>
            }
            {showForms &&
                <>
                    {!episodeDB && <FormAdd serieId={serieID} seasonApi={seasonAPI} episodeNumber={episodeNumber}
                                            createAlert={createAlert} callFetching={callFetching}
                                            hideModal={hideModal}/>}
                    {episodeDB && <FormUpdate serieId={serieID} seasonApi={seasonAPI} seasonDb={seasonDB!}
                                              episodeNumber={episodeNumber} createAlert={createAlert}
                                              callFetching={callFetching} hideModal={hideModal}/>}
                    {episodeDB && <FormDelete serieId={serieID} seasonApi={seasonAPI} seasonDb={seasonDB!}
                                              episodeNumber={episodeNumber} createAlert={createAlert}
                                              callFetching={callFetching} hideModal={hideModal}/>}
                </>
            }
        </>
    )
}