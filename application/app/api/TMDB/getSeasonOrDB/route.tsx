import {NextRequest, NextResponse} from "next/server";
import {Episode, Season, TypeStream} from "@prisma/client";
import {SeasonAPI} from "../_types/SeasonAPI";

async function fetchDB(url: string, id: number, seasonNumber: number) {
    const response = await fetch(`${url}/api/DATABASE/isSeason?id=${id}&seasonNumber=${seasonNumber}`);
    const result = await response.json();
    return { isOk: response.ok, result: result };
}

async function fetchAPI(url: string, id: number, seasonNumber: number) {
    const response = await fetch(`${url}/api/TMDB/getSeason?id=${id}&season_number=${seasonNumber}`);
    const result = await response.json();
    return { isOk: response.ok, result: result };
}

export async function GET(request: NextRequest) {
    const origin = request.nextUrl.origin;
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));
    const seasonNumber = Number(searchParams.get("seasonNumber"));
    const resultDB = await fetchDB(origin, id, seasonNumber);
    const resultAPI = await fetchAPI(origin, id, seasonNumber);
    if (!resultAPI["isOk"]) {
        return NextResponse.json({}, { status: 400 });
    }

    const seasonAPI: SeasonAPI = resultAPI["result"]["result"];
    const seasonDB: Season & { Episode: Array<Episode & { TypeStream: Array<TypeStream> }> } | null = resultDB["result"]["result"];

    return NextResponse.json({ seasonAPI: seasonAPI, seasonDB: seasonDB }, { status: 200 });
}