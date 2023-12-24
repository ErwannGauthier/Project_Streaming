import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import {SeasonSerie} from "@/app/_types/SeasonSerie";
import {SeasonDb} from "@/app/_types/PrismaTypes";

export interface SerieSeasonAPIDBObject {
    episode_number: number;
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export class SerieSeasonAPIDB {
    constructor(private _episodeNumber: number, private _airDate: string, private _episodeCount: number, private _id: number, private _name: string, private _overview: string, private _posterPath: string, private _seasonNumber: number, private _voteAverage: number) {
    }

    static getInstance(object: SerieSeasonAPIDBObject): SerieSeasonAPIDB {
        const episodeNumber: number = object?.episode_number || DEFAULT_NUMBER_VALUE;
        const airDate: string = object?.air_date || DEFAULT_STRING_VALUE;
        const episodeCount: number = object?.episode_count || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const seasonNumber: number = object?.season_number || DEFAULT_NUMBER_VALUE
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;

        return new SerieSeasonAPIDB(episodeNumber, airDate, episodeCount, id, name, overview, posterPath, seasonNumber, voteAverage);
    }

    static getInstanceFromSeasons(seasonSerie: SeasonSerie, seasonDb: SeasonDb | null): SerieSeasonAPIDB {
        const episodeNumber: number = seasonDb ? seasonDb.Episode.length : 0;
        const airDate: string = seasonSerie.airDate;
        const episodeCount: number = seasonSerie.episodeCount;
        const id: number = seasonSerie.id;
        const name: string = seasonSerie.name;
        const overview: string = seasonSerie.overview;
        const posterPath: string = seasonSerie.posterPath;
        const seasonNumber: number = seasonSerie.seasonNumber;
        const voteAverage: number = seasonSerie.voteAverage;

        return new SerieSeasonAPIDB(episodeNumber, airDate, episodeCount, id, name, overview, posterPath, seasonNumber, voteAverage);
    }

    get episodeNumber(): number {
        return this._episodeNumber;
    }

    get airDate(): string {
        return this._airDate;
    }

    get episodeCount(): number {
        return this._episodeCount;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get overview(): string {
        return this._overview;
    }

    get posterPath(): string {
        return this._posterPath;
    }

    get seasonNumber(): number {
        return this._seasonNumber;
    }

    get voteAverage(): number {
        return this._voteAverage;
    }

    isEpisodeCount(): boolean {
        return this._episodeCount !== DEFAULT_NUMBER_VALUE;
    }

    isEpisodeNumber(): boolean {
        return this._episodeNumber !== DEFAULT_NUMBER_VALUE;
    }

    isPosterPath(): boolean {
        return this._posterPath !== DEFAULT_STRING_VALUE;
    }

    isName(): boolean {
        return this._name !== DEFAULT_STRING_VALUE;
    }
}