import {NextRequest, NextResponse} from "next/server";
import {MovieDb} from "@/app/_types/PrismaTypes";
import {getMovies} from "@/app/api/_services/MovieService";

export async function GET(request: NextRequest) {
    const movies: MovieDb[] = await getMovies();
    return NextResponse.json({...movies}, {status: 200});
}