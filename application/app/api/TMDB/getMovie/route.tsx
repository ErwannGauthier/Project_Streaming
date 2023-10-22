import {NextRequest, NextResponse} from "next/server";
import {callAPI} from "../callAPI";
import {MovieAPI} from "../_types/MovieAPI";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Crelease_dates&language=fr`;
    const data = await callAPI(url);
    const resultData: MovieAPI = data;
    return NextResponse.json({ result: resultData }, { status: 200 });
}