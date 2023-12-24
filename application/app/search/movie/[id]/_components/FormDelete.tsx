import {Movie, TypeStream} from "@prisma/client";
import {PrismaUtils} from "@/app/_types/PrismaUtils";
import {useState} from "react";
import {bodyDeleteMovie} from "@/app/api/movie/[id]/route";
import {fetchDeleteIdMovie} from "@/app/api/_fetchFunctions/movie/id/fetchDeleteIdMovie";

interface FormDeleteProps {
    movieDB: Movie & { TypeStream: Array<TypeStream> };
    createAlert: (type: string, message?: string) => void;
    callFetching: () => void,
    hideModal: () => void;
}

export default function FormDelete({movieDB, createAlert, callFetching, hideModal}: FormDeleteProps) {
    const [formData, setFormData] = useState<bodyDeleteMovie>({
        id: movieDB.id,
        isStreaming: PrismaUtils.hasStreaming(movieDB.TypeStream),
        title: movieDB.title
    });

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        createAlert("reset");
        createAlert("loading");

        const isOk: boolean = await fetchDeleteIdMovie(formData);

        createAlert("reset");
        if (!isOk) {
            createAlert("error", "Une erreur s'est produite lors de la suppression du film de la base de données.");
            return;
        }

        createAlert("validate", "Le film a été supprimé de la base de données.");
        callFetching();
        hideModal();
    }

    return (
        <form className="hidden" onSubmit={handleSubmit} id="formDelete"></form>
    );
}