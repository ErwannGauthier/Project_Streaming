import {NextRequest, NextResponse} from "next/server";
import {callAPI} from "../callAPI";
import {MovieSearch} from "../_types/MovieSearch";
import {SerieSearch} from "../_types/SerieSearch";
import {PersonSearch} from "../_types/PersonSearch";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=fr`;
    const data = await callAPI(url);
    const results = data?.results;

    let moviesArray: Array<MovieSearch> = [];
    let seriesArray: Array<SerieSearch> = [];
    let personsArray: Array<PersonSearch> = [];
    results.forEach((element: any) => {
        switch (element["media_type"]) {
            case 'movie':
                moviesArray.push(element);
                break;
            case 'tv':
                seriesArray.push(element);
                break;
            case 'person':
                personsArray.push(element);
                break;
        }
    });

    return NextResponse.json({ movies: moviesArray, series: seriesArray, persons: personsArray }, { status: 200 });
}