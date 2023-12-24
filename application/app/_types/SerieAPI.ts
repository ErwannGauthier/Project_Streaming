import {CreatedBy, CreatedByObject} from "@/app/_types/CreatedBy";
import {GenreAPI, GenreAPIObject} from "@/app/_types/GenreAPI";
import {EpisodeToAir, EpisodeToAirObject} from "@/app/_types/EpisodeToAir";
import {Network, NetworkObject} from "@/app/_types/Network";
import {ProductionCompany, ProductionCompanyObject} from "@/app/_types/ProductionCompany";
import {ProductionCountry, ProductionCountryObject} from "@/app/_types/ProductionCountry";
import {SeasonSerie, SeasonSerieObject} from "@/app/_types/SeasonSerie";
import {SpokenLanguage, SpokenLanguageObject} from "@/app/_types/SpokenLanguage";
import {ContentRating, ContentRatingObject} from "@/app/_types/ContentRating";
import {CreditsSerie, CreditsSerieObject} from "@/app/_types/CreditsSerie";
import {
    DEFAULT_ARRAY_VALUE,
    DEFAULT_BOOLEAN_VALUE,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_STRING_VALUE
} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";

export interface SerieAPIObject {
    adult: boolean;
    backdrop_path: string;
    created_by: Array<CreatedByObject>;
    episode_run_time: Array<number>;
    first_air_date: string;
    genres: Array<GenreAPIObject>;
    homepage: string;
    id: number;
    in_production: boolean;
    languages: Array<string>;
    last_air_date: string;
    last_episode_to_air: EpisodeToAirObject;
    name: string;
    next_episode_to_air: EpisodeToAirObject;
    networks: Array<NetworkObject>;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<ProductionCompanyObject>;
    production_countries: Array<ProductionCountryObject>;
    seasons: Array<SeasonSerieObject>;
    spoken_languages: Array<SpokenLanguageObject>;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    content_ratings: { results: Array<ContentRatingObject> };
    aggregate_credits: CreditsSerieObject;
}

export class SerieAPI {
    constructor(private _adult: boolean, private _backdropPath: string, private _createdBy: Array<CreatedBy>, private _episodeRunTime: Array<number>, private _firstAirDate: string, private _genres: Array<GenreAPI>, private _homepage: string, private _id: number, private _inProduction: boolean, private _languages: Array<string>, private _lastAirDate: string, private _lastEpisodeToAir: EpisodeToAir, private _name: string, private _nextEpisodeToAir: EpisodeToAir, private _networks: Array<Network>, private _numberOfEpisodes: number, private _numberOfSeasons: number, private _originCountry: Array<string>, private _originalLanguage: string, private _originalName: string, private _overview: string, private _popularity: number, private _posterPath: string, private _productionCompanies: Array<ProductionCompany>, private _productionCountries: Array<ProductionCountry>, private _seasons: Array<SeasonSerie>, private _spokenLanguages: Array<SpokenLanguage>, private _status: string, private _tagline: string, private _type: string, private _voteAverage: number, private _voteCount: number, private _contentRatings: {
        results: Array<ContentRating>
    }, private _aggregateCredits: CreditsSerie) {
    }

    static getInstance(object: SerieAPIObject): SerieAPI {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const backdropPath: string = object?.backdrop_path || DEFAULT_STRING_VALUE;
        const createdBy: Array<CreatedBy> = object?.created_by.map((createdByObject: CreatedByObject) => CreatedBy.getInstance(createdByObject)) || DEFAULT_ARRAY_VALUE;
        const episodeRunTime: Array<number> = object?.episode_run_time || DEFAULT_ARRAY_VALUE;
        const firstAirDate: string = object?.first_air_date || DEFAULT_STRING_VALUE;
        const genres: Array<GenreAPI> = object?.genres.map((genreAPIObject: GenreAPIObject) => GenreAPI.getInstance(genreAPIObject)) || DEFAULT_ARRAY_VALUE;
        const homepage: string = object?.homepage || DEFAULT_STRING_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const inProduction: boolean = object?.in_production || DEFAULT_BOOLEAN_VALUE;
        const languages: Array<string> = object?.languages || DEFAULT_ARRAY_VALUE;
        const lastAirDate: string = object?.last_air_date || DEFAULT_STRING_VALUE;
        const lastEpisodeToAir: EpisodeToAir = EpisodeToAir.getInstance(object?.last_episode_to_air);
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const nextEpisodeToAir: EpisodeToAir = EpisodeToAir.getInstance(object?.next_episode_to_air);
        const networks: Array<Network> = object?.networks.map((networkObject: NetworkObject) => Network.getInstance(networkObject)) || DEFAULT_ARRAY_VALUE;
        const numberOfEpisodes: number = object?.number_of_episodes || DEFAULT_NUMBER_VALUE;
        const numberOfSeasons: number = object?.number_of_seasons || DEFAULT_NUMBER_VALUE;
        const originCountry: Array<string> = object?.origin_country || DEFAULT_ARRAY_VALUE;
        const originalLanguage: string = object?.original_language || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const productionCompanies: Array<ProductionCompany> = object?.production_companies.map((productionCompanyObject: ProductionCompanyObject) => ProductionCompany.getInstance(productionCompanyObject)) || DEFAULT_ARRAY_VALUE;
        const productionCountries: Array<ProductionCountry> = object?.production_countries.map((productionCountryObject: ProductionCountryObject) => ProductionCountry.getInstance(productionCountryObject)) || DEFAULT_ARRAY_VALUE;
        const seasons: Array<SeasonSerie> = object?.seasons.map((seasonSerieObject: SeasonSerieObject) => SeasonSerie.getInstance(seasonSerieObject)) || DEFAULT_ARRAY_VALUE;
        const spokenLanguages: Array<SpokenLanguage> = object?.spoken_languages.map((spokenLanguageObject: SpokenLanguageObject) => SpokenLanguage.getInstance(spokenLanguageObject)) || DEFAULT_ARRAY_VALUE;
        const status: string = object?.status || DEFAULT_STRING_VALUE;
        const tagline: string = object?.tagline || DEFAULT_STRING_VALUE;
        const type: string = object?.type || DEFAULT_STRING_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;
        const voteCount: number = object?.vote_count || DEFAULT_NUMBER_VALUE;
        const contentRatings: { results: Array<ContentRating> } = {
            results: object?.content_ratings.results.map((contentRatingObject: ContentRatingObject) => ContentRating.getInstance(contentRatingObject)) || DEFAULT_ARRAY_VALUE,
        };
        const aggregateCredits: CreditsSerie = CreditsSerie.getInstance(object?.aggregate_credits);
        return new SerieAPI(adult, backdropPath, createdBy, episodeRunTime, firstAirDate, genres, homepage, id, inProduction, languages, lastAirDate, lastEpisodeToAir, name, nextEpisodeToAir, networks, numberOfEpisodes, numberOfSeasons, originCountry, originalLanguage, originalName, overview, popularity, posterPath, productionCompanies, productionCountries, seasons, spokenLanguages, status, tagline, type, voteAverage, voteCount, contentRatings, aggregateCredits);
    }

    get adult(): boolean {
        return this._adult;
    }

    get backdropPath(): string {
        return this._backdropPath;
    }

    get createdBy(): Array<CreatedBy> {
        return this._createdBy;
    }

    get episodeRunTime(): Array<number> {
        return this._episodeRunTime;
    }

    get firstAirDate(): string {
        return this._firstAirDate;
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

    get inProduction(): boolean {
        return this._inProduction;
    }

    get languages(): Array<string> {
        return this._languages;
    }

    get lastAirDate(): string {
        return this._lastAirDate;
    }

    get lastEpisodeToAir(): EpisodeToAir {
        return this._lastEpisodeToAir;
    }

    get name(): string {
        return this._name;
    }

    get nextEpisodeToAir(): EpisodeToAir {
        return this._nextEpisodeToAir;
    }

    get networks(): Array<Network> {
        return this._networks;
    }

    get numberOfEpisodes(): number {
        return this._numberOfEpisodes;
    }

    get numberOfSeasons(): number {
        return this._numberOfSeasons;
    }

    get originCountry(): Array<string> {
        return this._originCountry;
    }

    get originalLanguage(): string {
        return this._originalLanguage;
    }

    get originalName(): string {
        return this._originalName;
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

    get seasons(): Array<SeasonSerie> {
        return this._seasons;
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

    get type(): string {
        return this._type;
    }

    get voteAverage(): number {
        return this._voteAverage;
    }

    get voteCount(): number {
        return this._voteCount;
    }

    get contentRatings(): { results: Array<ContentRating> } {
        return this._contentRatings;
    }

    get aggregateCredits(): CreditsSerie {
        return this._aggregateCredits;
    }

    isBackdropPath(): boolean {
        return this._backdropPath !== DEFAULT_STRING_VALUE;
    }

    isFirstAirDate(): boolean {
        return this._firstAirDate !== DEFAULT_STRING_VALUE;
    }

    isGenres(): boolean {
        return this._genres !== DEFAULT_ARRAY_VALUE;
    }

    isName(): boolean {
        return this._name !== DEFAULT_STRING_VALUE;
    }

    isNetworks(): boolean {
        return this._networks !== DEFAULT_ARRAY_VALUE;
    }

    isOverview(): boolean {
        return this._overview !== DEFAULT_STRING_VALUE;
    }

    isPosterPath(): boolean {
        return this._posterPath !== DEFAULT_STRING_VALUE;
    }

    isTagline(): boolean {
        return this._tagline !== DEFAULT_STRING_VALUE;
    }

    getDirectorsName(): Array<string> {
        return this._createdBy.map((createdBy: CreatedBy) => createdBy.name);
    }

    getFormattedDate(): string {
        const date: Date = new Date(this._firstAirDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getYear(): string {
        const date: Date = new Date(this._firstAirDate);
        return format(date, 'yyyy', {locale: frLocale});
    }

    getPegi(): string {
        const content: ContentRating | undefined = this._contentRatings.results.find((contentRating: ContentRating) => contentRating.iso3166_1.toLocaleLowerCase() === "fr");
        return content?.rating || "-";
    }

    genresToString(): string {
        let genresString: string = "";
        this._genres.forEach((genreAPI: GenreAPI) => {
            genresString = genresString + genreAPI.name + ", ";
        })

        return genresString.slice(0, -2);
    }
}