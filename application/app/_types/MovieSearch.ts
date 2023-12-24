import {
    DEFAULT_ARRAY_VALUE,
    DEFAULT_BOOLEAN_VALUE,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_STRING_VALUE
} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";

export interface MovieSearchObject {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: Array<number>;
    popularity: number;
    vote_average: number;
    vote_count: number;
    title: string;
    original_title: string;
    release_date: string;
    video: boolean;
}

export class MovieSearch {
    constructor(private _adult: boolean, private _backdropPath: string, private _id: number, private _originalLanguage: string, private _overview: string, private _posterPath: string, private _mediaType: string, private _genreIds: Array<number>, private _popularity: number, private _voteAverage: number, private _voteCount: number, private _title: string, private _originalTitle: string, private _releaseDate: string, private _video: boolean) {
    }

    static getInstance(object: MovieSearchObject): MovieSearch {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const backdropPath: string = object?.backdrop_path || DEFAULT_STRING_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const originalLanguage: string = object?.original_language || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const mediaType: string = object?.media_type || DEFAULT_STRING_VALUE;
        const genreIds: Array<number> = object?.genre_ids || DEFAULT_ARRAY_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;
        const voteCount: number = object?.vote_count || DEFAULT_NUMBER_VALUE;
        const title: string = object?.title || DEFAULT_STRING_VALUE;
        const originalTitle: string = object?.original_title || DEFAULT_STRING_VALUE;
        const releaseDate: string = object?.release_date || DEFAULT_STRING_VALUE;
        const video: boolean = object?.video || DEFAULT_BOOLEAN_VALUE;
        return new MovieSearch(adult, backdropPath, id, originalLanguage, overview, posterPath, mediaType, genreIds, popularity, voteAverage, voteCount, title, originalTitle, releaseDate, video);
    }


    get adult(): boolean {
        return this._adult;
    }

    get backdropPath(): string {
        return this._backdropPath;
    }

    get id(): number {
        return this._id;
    }

    get originalLanguage(): string {
        return this._originalLanguage;
    }

    get overview(): string {
        return this._overview;
    }

    get posterPath(): string {
        return this._posterPath;
    }

    get mediaType(): string {
        return this._mediaType;
    }

    get genreIds(): Array<number> {
        return this._genreIds;
    }

    get popularity(): number {
        return this._popularity;
    }

    get voteAverage(): number {
        return this._voteAverage;
    }

    get voteCount(): number {
        return this._voteCount;
    }

    get title(): string {
        return this._title;
    }

    get originalTitle(): string {
        return this._originalTitle;
    }

    get releaseDate(): string {
        return this._releaseDate;
    }

    get video(): boolean {
        return this._video;
    }

    isOverview(): boolean {
        return this._overview !== DEFAULT_STRING_VALUE;
    }

    isPosterPath(): boolean {
        return this._posterPath !== DEFAULT_STRING_VALUE;
    }

    isTitle(): boolean {
        return this._title !== DEFAULT_STRING_VALUE;
    }

    isReleaseDate(): boolean {
        return this._releaseDate !== DEFAULT_STRING_VALUE;
    }

    getFormattedDate(): string {
        const date: Date = new Date(this._releaseDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getYear(): string {
        const date: Date = new Date(this._releaseDate);
        return format(date, 'yyyy', {locale: frLocale});
    }
}