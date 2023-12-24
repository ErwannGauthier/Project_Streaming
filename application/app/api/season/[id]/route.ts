import {NextRequest, NextResponse} from "next/server";
import {SeasonDb} from "@/app/_types/PrismaTypes";
import {bodyValidator} from "@/app/api/_services/UtilService";
import {Season} from "@prisma/client";
import {deleteSeason, getSeasonById, safeAddSeason} from "@/app/api/_services/SeasonService";

const requiredFieldsBodyAddSeason: string[] = ["id", "seasonNumber", "serieId"];

export interface bodyAddSeason {
    id: number,
    seasonNumber: number,
    serieId: number
}

export async function GET(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const season: SeasonDb | null = await getSeasonById(id);
    if (!season) {
        return NextResponse.json({message: "Une erreur est survenue lors de la récupération de la saison."}, {status: 400});
    }

    return NextResponse.json({...season}, {status: 200});
}

export async function POST(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const json = await request.json();
    const body = {...json, ["id"]: id};
    if (!bodyValidator(body, requiredFieldsBodyAddSeason)) {
        return NextResponse.json({message: "Votre requête doit contenir tous les champs requis."}, {status: 400});
    }

    const season: Season | null = await safeAddSeason(body);
    if (!season) {
        return NextResponse.json({message: "Une erreur est survenue lors de la création de la saison."}, {status: 400});
    }

    return NextResponse.json({...season}, {status: 201});
}

export async function PUT(request: NextRequest, {params}: { params: { id: number } }) {
    return NextResponse.json({message: "Une erreur est survenue lors de la modification de la saison."}, {status: 404});
}

export async function DELETE(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);

    const isDeleted: boolean = await deleteSeason(id);
    if (!isDeleted) {
        return NextResponse.json({message: "Une erreur est survenue lors de la suppression de la saison."}, {status: 400});
    }

    return NextResponse.json({message: "La saison a été supprimée avec succès."}, {status: 200});
}