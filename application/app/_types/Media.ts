import {
    DEFAULT_ARRAY_VALUE,
    DEFAULT_BOOLEAN_VALUE,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_STRING_VALUE
} from "@/app/_types/_constants";

export interface MediaObject {
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
}

export class Media {
    constructor(private _adult: boolean, private _backdropPath: string, private _id: number, private _originalLanguage: string, private _overview: string, private _posterPath: string, private _mediaType: string, private _genreIds: Array<number>, private _popularity: number, private _voteAverage: number, private _voteCount: number) {
    }

    static getInstance(object: MediaObject): Media {
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
        return new Media(adult, backdropPath, id, originalLanguage, overview, posterPath, mediaType, genreIds, popularity, voteAverage, voteCount);
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
}