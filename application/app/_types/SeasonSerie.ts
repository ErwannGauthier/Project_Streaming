import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";

export interface SeasonSerieObject {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export class SeasonSerie {
    constructor(private _airDate: string, private _episodeCount: number, private _id: number, private _name: string, private _overview: string, private _posterPath: string, private _seasonNumber: number, private _voteAverage: number) {
    }

    static getInstance(object: SeasonSerieObject): SeasonSerie {
        const airDate: string = object?.air_date || DEFAULT_STRING_VALUE;
        const episodeCount: number = object?.episode_count || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const seasonNumber: number = object?.season_number || DEFAULT_NUMBER_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;
        return new SeasonSerie(airDate, episodeCount, id, name, overview, posterPath, seasonNumber, voteAverage);
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

    isName(): boolean {
        return this._name !== DEFAULT_STRING_VALUE;
    }

    isPosterPath(): boolean {
        return this._posterPath !== DEFAULT_STRING_VALUE;
    }

    isSeasonNumber(): boolean {
        return this._seasonNumber !== DEFAULT_NUMBER_VALUE;
    }

    getFormatedDate(): string {
        const date: Date = new Date(this._airDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getYear(): string {
        const date: Date = new Date(this._airDate);
        return format(date, 'yyyy', {locale: frLocale});
    }
}