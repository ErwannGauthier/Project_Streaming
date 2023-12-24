import {NextRequest, NextResponse} from "next/server";
import {MovieAPIObject} from "@/app/_types/MovieAPI";
import {getMovieApiById} from "@/app/api/_services/MovieService";

export async function GET(request: NextRequest, {params}: { params: { id: number } }) {
    const id: number = Number(params.id);
    const movieApiObject: MovieAPIObject = await getMovieApiById(id);
    return NextResponse.json({...movieApiObject}, {status: 200});
}