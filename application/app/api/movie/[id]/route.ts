import {NextRequest, NextResponse} from "next/server";
import {MovieDb} from "@/app/_types/PrismaTypes";
import {addMovie, deleteMovie, getMovieByID, updateMovie} from "@/app/api/_services/MovieService";
import {bodyValidator} from "@/app/api/_services/UtilService";
import {Movie} from "@prisma/client";

const requiredFieldsBodyAddMovie: string[] = ["id", "title", "overview", "releaseDate", "pegi", "runtime", "tagline", "posterPath", "backdropPath", "genres", "typesStream", "directory"];
const requiredFieldsBodyUpdateMovie: string[] = ["id", "title", "overview", "typesStream", "wasStreaming", "directory"];
const requiredFieldsBodyDeleteMovie: string[] = ["id", "isStreaming", "title"];

export interface bodyAddMovie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    pegi: string;
    runtime: number;
    tagline: string;
    posterPath: string;
    backdropPath: string;
    genres: { _id: number, _name: string }[];
    typesStream: number[];
    directory: string | null;
}

export interface bodyUpdateMovie {
    id: number;
    title: string;
    overview: string;
    typesStream: number[];
    wasStreaming: boolean;
    directory: string | null;
}

export interface bodyDeleteMovie {
    id: number;
    isStreaming: boolean;
    title: string;
}

export async function GET(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const movie: MovieDb | null = await getMovieByID(id);
    if (!movie) {
        return NextResponse.json({message: "Une erreur est survenue lors de la récupération du film."}, {status: 400});
    }

    return NextResponse.json({...movie}, {status: 200});
}

export async function POST(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyAddMovie)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const movie: Movie | null = await addMovie(body);
    if (!movie) {
        return NextResponse.json({message: "Une erreur est survenue lors de la création du film."}, {status: 400});
    }

    return NextResponse.json({...movie}, {status: 201});
}

export async function PUT(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyUpdateMovie)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const movie: Movie | null = await updateMovie(body);
    if (!movie) {
        return NextResponse.json({message: "Une erreur est survenue lors de la modification du film."}, {status: 400});
    }

    return NextResponse.json({...movie}, {status: 201});
}

export async function DELETE(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyDeleteMovie)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const isDeleted: boolean = await deleteMovie(body);
    if (!isDeleted) {
        return NextResponse.json({message: "Une erreur est survenue lors de la suppression du film."}, {status: 400});
    }

    return NextResponse.json({message: "Le film a été supprimé avec succès."}, {status: 200});
}