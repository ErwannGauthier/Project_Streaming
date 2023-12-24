import {NextRequest, NextResponse} from "next/server";
import {SerieDb} from "@/app/_types/PrismaTypes";
import {addSerie, deleteSerie, getSerieById} from "@/app/api/_services/SerieService";
import {bodyValidator} from "@/app/api/_services/UtilService";
import {Serie} from "@prisma/client";

const requiredFieldsBodyAddSerie: string[] = ["id", "name", "firstAirDate", "pegi", "overview", "tagline", "posterPath", "backdropPath", "genres"];

export interface bodyAddSerie {
    id: number,
    name: string,
    firstAirDate: string,
    pegi: string,
    overview: string,
    tagline: string,
    posterPath: string,
    backdropPath: string,
    genres: { _id: number, _name: string }[]
}

export async function GET(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const serie: SerieDb | null = await getSerieById(id);
    if (!serie) {
        return NextResponse.json({message: "Une erreur est survenue lors de la récupération de la série."}, {status: 400});
    }

    return NextResponse.json({...serie}, {status: 200});
}

export async function POST(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyAddSerie)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const serie: Serie | null = await addSerie(body);
    if (!serie) {
        return NextResponse.json({message: "Une erreur est survenue lors de la création de la série."}, {status: 400});
    }

    return NextResponse.json({...serie}, {status: 201});
}

export async function PUT(request: NextRequest, {params}: { params: { id: number } }) {
    return NextResponse.json({message: "Une erreur est survenue lors de la modification de la série."}, {status: 404});
}

export async function DELETE(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);

    const isDeleted: boolean = await deleteSerie(id);
    if (!isDeleted) {
        return NextResponse.json({message: "Une erreur est survenue lors de la suppression de la série."}, {status: 400});
    }

    return NextResponse.json({message: "La série a été supprimée avec succès."}, {status: 200});
}