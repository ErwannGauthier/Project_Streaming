import {NextRequest, NextResponse} from "next/server";
import {callAPI} from "../callAPI";
import {SeasonAPI} from "../_types/SeasonAPI";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const season_number = searchParams.get("season_number");
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=fr`;
    const data = await callAPI(url);
    const resultData: SeasonAPI = data;
    return NextResponse.json({ result: resultData }, { status: 200 });
}