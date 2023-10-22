import {NextRequest, NextResponse} from "next/server";
import {callAPI} from "../callAPI";
import {SerieAPI} from "../_types/SerieAPI";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=aggregate_credits%2Ccontent_ratings&language=fr`;
    const data = await callAPI(url);
    const resultData: SerieAPI = data;
    return NextResponse.json({ result: resultData }, { status: 200 });
}