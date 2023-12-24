import {EpisodeAPI, EpisodeAPIObject} from "@/app/_types/EpisodeAPI";
import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";

export interface SeasonAPIObject {
    _id: string;
    air_date: string;
    episodes: Array<EpisodeAPIObject>;
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export class SeasonAPI {
    constructor(private _id: string, private _airDate: string, private _episodes: Array<EpisodeAPI>, private _name: string, private _overview: string, private _id_: number, private _posterPath: string, private _seasonNumber: number, private _voteAverage: number) {
    }

    static getInstance(object: SeasonAPIObject): SeasonAPI {
        const _id: string = object?._id || DEFAULT_STRING_VALUE;
        const airDate: string = object?.air_date || DEFAULT_STRING_VALUE;
        const episodes: Array<EpisodeAPI> = object?.episodes.map((episodeAPIObject: EpisodeAPIObject) => EpisodeAPI.getInstance(episodeAPIObject));
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const seasonNumber: number = object?.season_number || DEFAULT_NUMBER_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;
        return new SeasonAPI(_id, airDate, episodes, name, overview, id, posterPath, seasonNumber, voteAverage);
    }

    get id(): string {
        return this._id;
    }

    get airDate(): string {
        return this._airDate;
    }

    get episodes(): Array<EpisodeAPI> {
        return this._episodes;
    }

    get name(): string {
        return this._name;
    }

    get overview(): string {
        return this._overview;
    }

    get id_(): number {
        return this._id_;
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

    isAirDate(): boolean {
        return this._airDate !== DEFAULT_STRING_VALUE;
    }

    isName(): boolean {
        return this._name !== DEFAULT_STRING_VALUE;
    }

    isOverview(): boolean {
        return this._overview !== DEFAULT_STRING_VALUE;
    }

    isPosterPath(): boolean {
        return this._posterPath !== DEFAULT_STRING_VALUE;
    }

    getEpisodeAPIByEpisodeNumber(episodeNumber: number): EpisodeAPI | undefined {
        return this._episodes.find((episodeAPI: EpisodeAPI) => episodeAPI.episodeNumber === episodeNumber);
    }

    getFormattedDate(): string {
        const date: Date = new Date(this._airDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getYear(): string {
        const date: Date = new Date(this._airDate);
        return format(date, 'yyyy', {locale: frLocale});
    }
}