import {NextRequest, NextResponse} from "next/server";
import {getSerieApiById} from "@/app/api/_services/SerieService";
import {SerieAPIObject} from "@/app/_types/SerieAPI";

export async function GET(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const serieApiObject: SerieAPIObject = await getSerieApiById(id);
    return NextResponse.json({...serieApiObject}, {status: 200});
}