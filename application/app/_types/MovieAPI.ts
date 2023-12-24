import {BelongsToCollection, BelongsToCollectionObject} from "@/app/_types/BelongsToCollection";
import {GenreAPI, GenreAPIObject} from "@/app/_types/GenreAPI";
import {ProductionCompany, ProductionCompanyObject} from "@/app/_types/ProductionCompany";
import {ProductionCountry, ProductionCountryObject} from "@/app/_types/ProductionCountry";
import {SpokenLanguage, SpokenLanguageObject} from "@/app/_types/SpokenLanguage";
import {CreditsMovie, CreditsMovieObject} from "@/app/_types/CreditsMovie";
import {ReleaseDates, ReleaseDatesObject} from "@/app/_types/ReleaseDates";
import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

import {
    DEFAULT_ARRAY_VALUE,
    DEFAULT_BOOLEAN_VALUE,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_STRING_VALUE
} from "@/app/_types/_constants";
import {ReleaseDate} from "@/app/_types/ReleaseDate";

export interface MovieAPIObject {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollectionObject;
    budget: number;
    genres: Array<GenreAPIObject>;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<ProductionCompanyObject>;
    production_countries: Array<ProductionCountryObject>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<SpokenLanguageObject>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credits: CreditsMovieObject;
    release_dates: { results: Array<ReleaseDatesObject> };
}

export class MovieAPI {
    constructor(private _adult: boolean, private _backdropPath: string,
                private _belongsToCollection: BelongsToCollection, private _budget: number,
                private _genres: Array<GenreAPI>, private _homepage: string, private _id: number,
                private _imdbId: string, private _originalLanguage: string, private _originalTitle: string,
                private _overview: string, private _popularity: number, private _posterPath: string,
                private _productionCompanies: Array<ProductionCompany>,
                private _productionCountries: Array<ProductionCountry>, private _releaseDate: string,
                private _revenue: number, private _runtime: number,
                private _spokenLanguages: Array<SpokenLanguage>, private _status: string,
                private _tagline: string, private _title: string, private _video: boolean,
                private _voteAverage: number, private _voteCount: number, private _credits: CreditsMovie,
                private _releaseDates: {
                    results: Array<ReleaseDates>
                }) {
    }

    static getInstance(object: MovieAPIObject): MovieAPI {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const backdropPath: string = object?.backdrop_path || DEFAULT_STRING_VALUE;
        const belongsToCollection: BelongsToCollection = BelongsToCollection.getInstance(object?.belongs_to_collection);
        const budget: number = object?.budget || DEFAULT_NUMBER_VALUE;
        const genres: Array<GenreAPI> = object?.genres.map((genreAPIObject: GenreAPIObject) => GenreAPI.getInstance(genreAPIObject)) || DEFAULT_ARRAY_VALUE;
        const homepage: string = object?.homepage || DEFAULT_STRING_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const imdbId: string = object?.imdb_id || DEFAULT_STRING_VALUE;
        const originalLanguage: string = object?.original_language || DEFAULT_STRING_VALUE;
        const originalTitle: string = object?.original_title || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const productionCompanies: Array<ProductionCompany> = object?.production_companies.map((productionCompanyObject: ProductionCompanyObject) => ProductionCompany.getInstance(productionCompanyObject)) || DEFAULT_ARRAY_VALUE;
        const productionCountries: Array<ProductionCountry> = object?.production_countries.map((productionCountryObject: ProductionCountryObject) => ProductionCountry.getInstance(productionCountryObject)) || DEFAULT_ARRAY_VALUE;
        const releaseDate: string = object?.release_date || DEFAULT_STRING_VALUE;
        const revenue: number = object?.revenue || DEFAULT_NUMBER_VALUE;
        const runtime: number = object?.runtime || DEFAULT_NUMBER_VALUE;
        const spokenLanguages: Array<SpokenLanguage> = object?.spoken_languages.map((spokenLanguageObject: SpokenLanguageObject) => SpokenLanguage.getInstance(spokenLanguageObject)) || DEFAULT_ARRAY_VALUE;
        const status: string = object?.status || DEFAULT_STRING_VALUE;
        const tagline: string = object?.tagline || DEFAULT_STRING_VALUE;
        const title: string = object?.title || DEFAULT_STRING_VALUE;
        const video: boolean = object?.video || DEFAULT_BOOLEAN_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;
        const voteCount: number = object?.vote_count || DEFAULT_NUMBER_VALUE;
        const credits: CreditsMovie = CreditsMovie.getInstance(object?.credits);
        const releaseDates: { results: Array<ReleaseDates> } = {
            results: object?.release_dates.results.map((releaseDatesObject: ReleaseDatesObject) => ReleaseDates.getInstance(releaseDatesObject)) || DEFAULT_ARRAY_VALUE,
        }
        return new MovieAPI(adult, backdropPath, belongsToCollection, budget, genres, homepage, id, imdbId, originalLanguage, originalTitle, overview, popularity, posterPath, productionCompanies, productionCountries, releaseDate, revenue, runtime, spokenLanguages, status, tagline, title, video, voteAverage, voteCount, credits, releaseDates);
    }

    get adult(): boolean {
        return this._adult;
    }

    get backdropPath(): string {
        return this._backdropPath;
    }

    get belongsToCollection(): BelongsToCollection {
        return this._belongsToCollection;
    }

    get budget(): number {
        return this._budget;
    }

    get genres(): Array<GenreAPI> {
        return this._genres;
    }

    get homepage(): string {
        return this._homepage;
    }

    get id(): number {
        return this._id;
    }

    get imdbId(): string {
        return this._imdbId;
    }

    get originalLanguage(): string {
        return this._originalLanguage;
    }

    get originalTitle(): string {
        return this._originalTitle;
    }

    get overview(): string {
        return this._overview;
    }

    get popularity(): number {
        return this._popularity;
    }

    get posterPath(): string {
        return this._posterPath;
    }

    get productionCompanies(): Array<ProductionCompany> {
        return this._productionCompanies;
    }

    get productionCountries(): Array<ProductionCountry> {
        return this._productionCountries;
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

    get spokenLanguages(): Array<SpokenLanguage> {
        return this._spokenLanguages;
    }

    get status(): string {
        return this._status;
    }

    get tagline(): string {
        return this._tagline;
    }

    get title(): string {
        return this._title;
    }

    get video(): boolean {
        return this._video;
    }

    get voteAverage(): number {
        return this._voteAverage;
    }

    get voteCount(): number {
        return this._voteCount;
    }

    get credits(): CreditsMovie {
        return this._credits;
    }

    get releaseDates(): { results: Array<ReleaseDates> } {
        return this._releaseDates;
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

    getPegi(): string {
        let pegi: string = "-";
        const isoFr: ReleaseDates | undefined = this._releaseDates.results.find((releaseDates: ReleaseDates) => releaseDates.iso3166_1.toLocaleLowerCase() === "fr");
        if (isoFr) {
            const releaseDate: Array<ReleaseDate> = isoFr.releaseDates;
            for (let i = 0; i < releaseDate.length; i++) {
                const release: ReleaseDate = releaseDate[i];
                if (release.certification !== "") {
                    pegi = release.certification;
                    if (release.type === 3 || release.type === 4 || release.type === 5) {
                        break;
                    }
                }
            }
        }

        return pegi;
    }

    genresToString(): string {
        let genresString: string = "";
        this._genres.forEach((genreAPI: GenreAPI) => {
            genresString = genresString + genreAPI.name + ", ";
        })

        return genresString.slice(0, -2);
    }
}