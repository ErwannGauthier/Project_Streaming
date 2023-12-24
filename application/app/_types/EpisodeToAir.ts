import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface EpisodeToAirObject {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
}

export class EpisodeToAir {
    constructor(private _id: number, private _name: string, private _overview: string, private _voteAverage: number, private _voteCount: number, private _airDate: string, private _episodeNumber: number, private _episodeType: string, private _productionCode: string, private _runtime: number, private _seasonNumber: number, private _showId: number, private _stillPath: string) {
    }

    static getInstance(object: EpisodeToAirObject): EpisodeToAir {
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;
        const voteCount: number = object?.vote_count || DEFAULT_NUMBER_VALUE;
        const airDate: string = object?.air_date || DEFAULT_STRING_VALUE;
        const episodeNumber: number = object?.episode_number || DEFAULT_NUMBER_VALUE;
        const episodeType: string = object?.episode_type || DEFAULT_STRING_VALUE;
        const productionCode: string = object?.production_code || DEFAULT_STRING_VALUE;
        const runtime: number = object?.runtime || DEFAULT_NUMBER_VALUE;
        const seasonNumber: number = object?.season_number || DEFAULT_NUMBER_VALUE;
        const showId: number = object?.show_id || DEFAULT_NUMBER_VALUE;
        const stillPath: string = object?.still_path || DEFAULT_STRING_VALUE;
        return new EpisodeToAir(id, name, overview, voteAverage, voteCount, airDate, episodeNumber, episodeType, productionCode, runtime, seasonNumber, showId, stillPath);
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

    get voteAverage(): number {
        return this._voteAverage;
    }

    get voteCount(): number {
        return this._voteCount;
    }

    get airDate(): string {
        return this._airDate;
    }

    get episodeNumber(): number {
        return this._episodeNumber;
    }

    get episodeType(): string {
        return this._episodeType;
    }

    get productionCode(): string {
        return this._productionCode;
    }

    get runtime(): number {
        return this._runtime;
    }

    get seasonNumber(): number {
        return this._seasonNumber;
    }

    get showId(): number {
        return this._showId;
    }

    get stillPath(): string {
        return this._stillPath;
    }

    getHours(): string {
        return new Date(this._runtime * 1000).toISOString().substring(15, 16);
    }

    getMinutes(): string {
        return new Date(this._runtime * 1000).toISOString().substring(17, 19);
    }
}