import {useRouter} from "next/navigation";
import {sleep} from "@/app/_utils/sleep";

interface FormDeleteProps {
    id: number;
    isStreaming: boolean,
    title: string,
    createAlert: (type: string, message?: string) => void;
    hideModal: () => void;
}

async function callDeleteMovie(id: number, isStreaming: boolean, title: string) {
    const response = await fetch("/api/DATABASE/deleteMovie/",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, isStreaming: isStreaming, title: title })
        });

    const data = await response.json();
    const result = {
        message: data?.message,
        isOk: response.ok,
    };

    return result;
}

export default function FormDelete({ id, isStreaming, title, createAlert, hideModal }: FormDeleteProps) {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();        
        createAlert("loading");
        const result = await callDeleteMovie(id, isStreaming, title);
        if (!result["isOk"]) {
            createAlert("error", result["message"]);
            return;
        }

        createAlert("validate", result["message"] + "  Vous allez être redirigé...");
        await sleep(2000);
        hideModal();
        router.push("/");
    }

    return (
        <form className="hidden" onSubmit={handleSubmit} id="formDelete"></form>
    );
}