import {NextRequest, NextResponse} from "next/server";
import {MovieAPI} from "../_types/MovieAPI";
import {Movie, TypeStream} from "@prisma/client";
import {MovieAPIDB} from "../_types/MovieAPIDB";

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
    if (!resultDB["isOk"] || !resultAPI["isOk"]) {
        return NextResponse.json({}, { status: 400 });
    }

    const movieDB: Movie & { TypeStream: Array<TypeStream> } = resultDB["result"]["movie"];
    const movieAPI: MovieAPI = resultAPI["result"]["result"];
    const movie: MovieAPIDB = {
        id: movieDB["id"],
        backdrop_path: movieDB["backdropPath"],
        budget: movieAPI["budget"],
        genres: movieAPI["genres"],
        overview: movieDB["overview"],
        poster_path: movieDB["posterPath"],
        release_date: movieDB["releaseDate"],
        revenue: movieAPI["revenue"],
        runtime: movieDB["runtime"],
        tagline: movieDB["tagline"],
        title: movieDB["title"],
        typesStream: movieDB["TypeStream"],
        credits: movieAPI["credits"],
        pegi: movieDB["pegi"],
    };

    return NextResponse.json({ movie: movie }, { status: 200 });
}