import {TypeStream} from "@prisma/client";
import {GenreAPI, GenreAPIObject} from "@/app/_types/GenreAPI";
import {CreditsMovie, CreditsMovieObject} from "@/app/_types/CreditsMovie";
import {DEFAULT_ARRAY_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import {MovieDb} from "@/app/_types/PrismaTypes";
import {MovieAPI} from "@/app/_types/MovieAPI";

export interface MovieAPIDBObject {
    id: number,
    backdrop_path: string;
    budget: number;
    genres: Array<GenreAPIObject>;
    overview: string;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    tagline: string;
    title: string;
    typesStream: Array<TypeStream>,
    credits: CreditsMovieObject;
    pegi: string;
}

export class MovieAPIDB {
    constructor(private _id: number, private _backdropPath: string, private _budget: number, private _genres: Array<GenreAPI>, private _overview: string, private _posterPath: string, private _releaseDate: string, private _revenue: number, private _runtime: number, private _tagline: string, private _title: string, private _typesStream: Array<TypeStream>, private _credits: CreditsMovie, private _pegi: string) {
    }

    static getInstance(object: MovieAPIDBObject): MovieAPIDB {
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const backdropPath: string = object?.backdrop_path || DEFAULT_STRING_VALUE;
        const budget: number = object?.budget || DEFAULT_NUMBER_VALUE;
        const genres: Array<GenreAPI> = object?.genres.map((genreAPIObject: GenreAPIObject) => GenreAPI.getInstance(genreAPIObject)) || DEFAULT_ARRAY_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const releaseDate: string = object?.release_date || DEFAULT_STRING_VALUE;
        const revenue: number = object?.revenue || DEFAULT_NUMBER_VALUE;
        const runtime: number = object?.runtime || DEFAULT_NUMBER_VALUE;
        const tagline: string = object?.tagline || DEFAULT_STRING_VALUE;
        const title: string = object?.title || DEFAULT_STRING_VALUE;
        const typesStream: Array<TypeStream> = object?.typesStream || DEFAULT_ARRAY_VALUE;
        const credits: CreditsMovie = CreditsMovie.getInstance(object?.credits);
        const pegi: string = object?.pegi || DEFAULT_STRING_VALUE;

        return new MovieAPIDB(id, backdropPath, budget, genres, overview, posterPath, releaseDate, revenue, runtime, tagline, title, typesStream, credits, pegi);
    }

    static getInstanceFromMovies(movieApi: MovieAPI, movieDb: MovieDb): MovieAPIDB {
        const id: number = movieApi.id;
        const backdropPath: string = movieApi.backdropPath;
        const budget: number = movieApi.budget;
        const genres: Array<GenreAPI> = movieApi.genres;
        const overview: string = movieDb.overview;
        const posterPath: string = movieApi.posterPath;
        const releaseDate: string = movieApi.releaseDate;
        const revenue: number = movieApi.revenue;
        const runtime: number = movieApi.runtime;
        const tagline: string = movieDb.tagline;
        const title: string = movieDb.title;
        const typesStream: Array<TypeStream> = movieDb.TypeStream;
        const credits: CreditsMovie = movieApi.credits;
        const pegi: string = movieDb.pegi;

        return new MovieAPIDB(id, backdropPath, budget, genres, overview, posterPath, releaseDate, revenue, runtime, tagline, title, typesStream, credits, pegi);
    }

    get id(): number {
        return this._id;
    }

    get backdropPath(): string {
        return this._backdropPath;
    }

    get budget(): number {
        return this._budget;
    }

    get genres(): Array<GenreAPI> {
        return this._genres;
    }

    get overview(): string {
        return this._overview;
    }

    get posterPath(): string {
        return this._posterPath;
    }

    get releaseDate(): string {
        return this._releaseDate;
    }

    get revenue(): number {
        return this._revenue;
    }

    get runtime(): number {
        return this._runtime;
    }

    get tagline(): string {
        return this._tagline;
    }

    get title(): string {
        return this._title;
    }

    get typesStream(): Array<TypeStream> {
        return this._typesStream;
    }

    get credits(): CreditsMovie {
        return this._credits;
    }

    get pegi(): string {
        return this._pegi;
    }

    isBackdropPath(): boolean {
        return this._backdropPath !== DEFAULT_STRING_VALUE;
    }

    isBudget(): boolean {
        return this._budget !== DEFAULT_NUMBER_VALUE;
    }

    isGenres(): boolean {
        return this._genres !== DEFAULT_ARRAY_VALUE;
    }

    isOverview(): boolean {
        return this._overview !== DEFAULT_STRING_VALUE;
    }

    isPosterPath(): boolean {
        return this._posterPath !== DEFAULT_STRING_VALUE;
    }

    isReleaseDate(): boolean {
        return this._releaseDate !== DEFAULT_STRING_VALUE;
    }

    isRevenue(): boolean {
        return this._revenue !== DEFAULT_NUMBER_VALUE;
    }

    isRuntime(): boolean {
        return this._runtime !== DEFAULT_NUMBER_VALUE;
    }

    isTagline(): boolean {
        return this._tagline !== DEFAULT_STRING_VALUE;
    }

    isTitle(): boolean {
        return this._title !== DEFAULT_STRING_VALUE;
    }

    getFormattedDate(): string {
        const date: Date = new Date(this._releaseDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getYear(): string {
        const date: Date = new Date(this._releaseDate);
        return format(date, 'yyyy', {locale: frLocale});
    }

    getHours(): string {
        return new Date(this._runtime * 1000).toISOString().substring(15, 16);
    }

    getMinutes(): string {
        return new Date(this._runtime * 1000).toISOString().substring(17, 19);
    }

    genresToString(): string {
        let genresString: string = "";
        this._genres.forEach((genreAPI: GenreAPI) => {
            genresString = genresString + genreAPI.name + ", ";
        })

        return genresString.slice(0, -2);
    }
}