import {NextRequest, NextResponse} from "next/server";
import {GenreDb} from "@/app/_types/PrismaTypes";
import {getGenres} from "@/app/api/_services/GenreService";

export async function GET(request: NextRequest) {
    const searchParams: URLSearchParams = request.nextUrl.searchParams

    const genres: GenreDb[] = await getGenres();
    return NextResponse.json({genres}, {status: 200});
}