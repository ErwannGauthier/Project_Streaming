import AlertError from "@/app/_components/alerts/AlertError";
import AlertLoading from "@/app/_components/alerts/AlertLoading";
import AlertValidate from "@/app/_components/alerts/AlertValidate";
import AlertWarning from "@/app/_components/alerts/AlertWarning";

import {useState} from 'react';
import FormUpdate from "./FormUpdate";
import FormDelete from "./FormDelete";
import FormAdd from "./FormAdd";
import {MovieAPI} from "@/app/_types/MovieAPI";
import {MovieDb} from "@/app/_types/PrismaTypes";

interface FormsProps {
    movieApi: MovieAPI;
    movieDb: MovieDb | undefined;
    callFetching: () => void,
    hideModal: () => void;
}

export default function Forms({movieApi, movieDb, callFetching, hideModal}: FormsProps) {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [validateText, setValidateText] = useState<string>("");
    const [warningText, setWarningText] = useState<string>("");

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

    const showDiv: boolean = (showLoading || errorText !== "" || validateText !== "" || warningText !== "");
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
            {!movieDb && <FormAdd movieApi={movieApi} createAlert={createAlert} callFetching={callFetching}
                                  hideModal={hideModal}/>}
            {movieDb && <FormUpdate movieDB={movieDb} createAlert={createAlert} callFetching={callFetching}
                                    hideModal={hideModal}/>}
            {movieDb && <FormDelete movieDB={movieDb} createAlert={createAlert} callFetching={callFetching}
                                    hideModal={hideModal}/>}
        </>
    )
}