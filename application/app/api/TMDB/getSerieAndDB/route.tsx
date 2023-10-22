import {NextRequest, NextResponse} from "next/server";
import {SerieAPI} from "../_types/SerieAPI";
import {Episode, Season, Serie, TypeStream} from "@prisma/client";
import {SeasonSerie} from "../_types/SeasonSerie";
import {SerieSeasonAPIDB} from "../_types/SerieSeasonAPIDB";
import {SerieAPIDB} from "../_types/SerieAPIDB";

async function fetchDB(url: string, id: number) {
    const response = await fetch(`${url}/api/DATABASE/isSerie?id=${id}`);
    const result = await response.json();
    return { isOk: response.ok, result: result };
}

async function fetchAPI(url: string, id: number) {
    const response = await fetch(`${url}/api/TMDB/getSerie?id=${id}`);
    const result = await response.json();
    return { isOk: response.ok, result: result };
}

function getEpisodesNumber(seasons: Array<Season & { Episode: Array<Episode & { TypeStream: Array<TypeStream> }> }>) {
    let seasonsDB = [];
    for (let i = 0; i < seasons.length; i++) {
        const season = seasons[i];
        seasonsDB.push({ id: season["id"], episodes: season["Episode"].length });
    }

    return seasonsDB;
}

function getSeasons(serieDBSeasons: Array<Season & { Episode: Array<Episode & { TypeStream: Array<TypeStream> }> }>, serieAPISeasons: Array<SeasonSerie>) {
    const episodesNumber = getEpisodesNumber(serieDBSeasons);
    let seasons = [];
    for (let i = 0; i < serieAPISeasons.length; i++) {
        let season = serieAPISeasons[i];
        let episodeNumber = 0
        for (let j = 0; j < episodesNumber.length; j++) {
            if (episodesNumber[j]["id"] === season["id"]) {
                episodeNumber = episodesNumber[j]["episodes"];
                break;
            }
        }
        seasons.push({ ...season, ...{ episode_number: episodeNumber } });
    }

    return seasons;
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

    const serieDB: Serie & { Season: Array<Season & { Episode: Array<Episode & { TypeStream: Array<TypeStream> }> }> } = resultDB["result"]["result"];
    const serieAPI: SerieAPI = resultAPI["result"]["result"];
    const seasons: Array<SerieSeasonAPIDB> = getSeasons(serieDB["Season"], serieAPI["seasons"]);
    const serie: SerieAPIDB = {
        created_by: serieAPI["created_by"],
        backdrop_path: serieDB["backdropPath"],
        genres: serieAPI["genres"],
        overview: serieDB["overview"],
        poster_path: serieDB["posterPath"],
        first_air_date: serieDB["firstAirDate"],
        tagline: serieDB["tagline"],
        name: serieDB["name"],
        networks: serieAPI["networks"],
        pegi: serieDB["pegi"],
        credits: serieAPI["aggregate_credits"],
        seasons: seasons,
    }


    return NextResponse.json({ result: serie }, { status: 200 });
}