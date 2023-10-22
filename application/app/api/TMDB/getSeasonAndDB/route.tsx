import {NextRequest, NextResponse} from "next/server";
import {Episode, Season, TypeStream} from "@prisma/client";
import {SeasonAPI} from "../_types/SeasonAPI";
import {EpisodeAPI} from "../_types/EpisodeAPI";
import {SeasonEpisodeAPIDB} from "../_types/SeasonEpisodeAPIDB";
import {SeasonAPIDB} from "../_types/SeasonAPIDB";

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

function getEpisodes(episodesDB: Array<Episode & { TypeStream: Array<TypeStream> }>, episodesAPI: Array<EpisodeAPI>) {
    let episodes = [];
    for (let i = 0; i < episodesAPI.length; i++) {
        let episodeAPI = episodesAPI[i];
        let typesStream: Array<TypeStream> = [];
        for (let j = 0; j < episodesDB.length; j++) {
            let episodeDB = episodesDB[j];
            if (episodeAPI["id"] === episodeDB["id"]) {
                typesStream = episodeDB["TypeStream"];
                break;
            }
        }
        episodes.push({ ...episodeAPI, ...{ typesStream: typesStream } });
    }

    return episodes;
}

export async function GET(request: NextRequest) {
    const origin = request.nextUrl.origin;
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));
    const seasonNumber = Number(searchParams.get("seasonNumber"));
    const resultDB = await fetchDB(origin, id, seasonNumber);
    const resultAPI = await fetchAPI(origin, id, seasonNumber);
    if (!resultDB["isOk"] || !resultAPI["isOk"]) {
        return NextResponse.json({}, { status: 400 });
    }

    const seasonDB: Season & { Episode: Array<Episode & { TypeStream: Array<TypeStream> }> } = resultDB["result"]["result"];
    const seasonAPI: SeasonAPI = resultAPI["result"]["result"];
    const episodes: Array<SeasonEpisodeAPIDB> = getEpisodes(seasonDB["Episode"], seasonAPI["episodes"]);
    const season: SeasonAPIDB = {
        _id: seasonAPI["_id"],
        air_date: seasonAPI["air_date"],
        episodes: episodes,
        name: seasonAPI["name"],
        overview: seasonAPI["overview"],
        id: seasonDB["id"],
        poster_path: seasonAPI["poster_path"],
        season_number: seasonAPI["season_number"],
        vote_average: seasonAPI["vote_average"],
    }

    return NextResponse.json({ result: season }, { status: 200 });
}