import {useRouter} from "next/navigation";
import {sleep} from "@/app/_utils/sleep"

interface FormDeleteProps {
    serieId: number,
    name: string,
    seasonId: number,
    seasonNumber: number,
    episodeId: number,
    episodeNumber: number,
    isStreaming: boolean,
    createAlert: (type: string, message?: string) => void;
    hideModal: () => void;
}

async function callDeleteEpisode(serieId: number, name: string, seasonId: number, seasonNumber: number, episodeId: number, episodeNumber: number, isStreaming: boolean) {
    const response = await fetch("/api/DATABASE/deleteEpisode/",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serieId: serieId, name: name, seasonId: seasonId, seasonNumber: seasonNumber, episodeId: episodeId, episodeNumber: episodeNumber, isStreaming: isStreaming })
        });

    const data = await response.json();
    const result = {
        message: data?.message as string,
        isOk: response.ok,
    };

    return result;
}

export default function FormDelete({ serieId, name, seasonId, seasonNumber, episodeId, episodeNumber, isStreaming, createAlert, hideModal }: FormDeleteProps) {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        createAlert("loading");
        const result = await callDeleteEpisode(serieId, name, seasonId, seasonNumber, episodeId, episodeNumber, isStreaming);
        if (!result["isOk"]) {
            createAlert("error", result["message"]);
            return;
        }

        createAlert("validate", result["message"] + " Vous allez être redirigé...");
        await sleep(2000);
        hideModal();
        router.push(`/search/serie/${serieId}`);
    }

    return (
        <form className="hidden" onSubmit={handleSubmit} id="formDelete"></form>
    );
}