import {NextRequest, NextResponse} from "next/server";
import {MovieAPI} from "../_types/MovieAPI";
import {Movie, TypeStream} from "@prisma/client";

async function fetchDB(url: string, id: number) {
    const response = await fetch(`${url}/api/DATABASE/isMovie?id=${id}`);
    const result = await response.json();
    return { isOk: response.ok, result: result };
}

async function fetchAPI(url: string, id: number) {
    const response = await fetch(`${url}/api/TMDB/getMovie?id=${id}`);
    const result = await response.json();
    return { isOk: response.ok, result: result };
}

export async function GET(request: NextRequest) {
    const origin = request.nextUrl.origin;
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));
    const resultDB = await fetchDB(origin, id);
    const resultAPI = await fetchAPI(origin, id);
    if (!resultAPI["isOk"]) {
        return NextResponse.json({}, { status: 400 });
    }

    const movieDB: Movie & { TypeStream: Array<TypeStream> } | null = resultDB["isOk"] ? resultDB["result"]["movie"] : null;
    const movieAPI: MovieAPI = resultAPI["result"]["result"];

    return NextResponse.json({ movieAPI: movieAPI, movieDB: movieDB }, { status: 200 });
}