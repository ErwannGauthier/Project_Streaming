import {NextRequest, NextResponse} from "next/server";
import {EpisodeDb} from "@/app/_types/PrismaTypes";
import {bodyValidator} from "@/app/api/_services/UtilService";
import {Episode} from "@prisma/client";
import {getEpisodeById, safeAddEpisode, safeDeleteEpisode, updateEpisode} from "@/app/api/_services/EpisodeService";

const requiredFieldsBodyAddEpisode: string[] = ["serieId", "seasonId", "seasonNumber", "episodeId", "episodeNumber", "typesStream", "directory"];
const requiredFieldsBodyUpdateEpisode: string[] = ["serieId", "seasonId", "seasonNumber", "episodeId", "episodeNumber", "typesStream", "wasStreaming", "directory"];
const requiredFieldsBodyDeleteEpisode: string[] = ["serieId", "seasonId", "seasonNumber", "episodeId", "episodeNumber", "isStreaming"];

export interface bodyAddEpisode {
    serieId: number;
    seasonId: number;
    seasonNumber: number;
    episodeId: number;
    episodeNumber: number;
    typesStream: number[];
    directory: string | null;
}

export interface bodyUpdateEpisode {
    serieId: number;
    seasonId: number;
    seasonNumber: number;
    episodeId: number;
    episodeNumber: number;
    typesStream: number[];
    wasStreaming: boolean;
    directory: string | null;
}

export interface bodyDeleteEpisode {
    serieId: number;
    seasonId: number;
    seasonNumber: number;
    episodeId: number;
    episodeNumber: number;
    isStreaming: boolean;
}

export async function GET(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const episode: EpisodeDb | null = await getEpisodeById(id);
    if (!episode) {
        return NextResponse.json({message: "Une erreur est survenue lors de la récupération de l'épisode."}, {status: 400});
    }

    return NextResponse.json({...episode}, {status: 200});
}

export async function POST(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyAddEpisode)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const episode: Episode | null = await safeAddEpisode(body);
    if (!episode) {
        return NextResponse.json({message: "Une erreur est survenue lors de la création de l'épisode."}, {status: 400});
    }

    return NextResponse.json({...episode}, {status: 201});
}

export async function PUT(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyUpdateEpisode)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const episode: Episode | null = await updateEpisode(body);
    if (!episode) {
        return NextResponse.json({message: "Une erreur est survenue lors de la modification de l'épisode."}, {status: 400});
    }

    return NextResponse.json({...episode}, {status: 201});
}

export async function DELETE(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyDeleteEpisode)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const isDeleted: boolean = await safeDeleteEpisode(body);
    if (!isDeleted) {
        return NextResponse.json({message: "Une erreur est survenue lors de la suppression de l'épisode."}, {status: 400});
    }

    return NextResponse.json({message: "L'épisode a été supprimée avec succès."}, {status: 200});
}