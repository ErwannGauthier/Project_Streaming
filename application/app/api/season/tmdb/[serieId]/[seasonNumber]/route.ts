import {NextRequest, NextResponse} from "next/server";
import {SeasonAPIObject} from "@/app/_types/SeasonAPI";
import {getSeasonApiById} from "@/app/api/_services/SeasonService";

export async function GET(request: NextRequest, {params}: { params: { serieId: number, seasonNumber: number } }) {
    const serieId: number = Number(params.serieId);
    const seasonNumber: number = Number(params.seasonNumber);
    const seasonApiObject: SeasonAPIObject = await getSeasonApiById(serieId, seasonNumber);
    return NextResponse.json({...seasonApiObject}, {status: 200});
}