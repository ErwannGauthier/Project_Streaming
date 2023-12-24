import {CreatedBy, CreatedByObject} from "@/app/_types/CreatedBy";
import {GenreAPI, GenreAPIObject} from "@/app/_types/GenreAPI";
import {Network, NetworkObject} from "@/app/_types/Network";
import {CreditsSerie, CreditsSerieObject} from "@/app/_types/CreditsSerie";
import {SerieSeasonAPIDB, SerieSeasonAPIDBObject} from "@/app/_types/SerieSeasonAPIDB";
import {DEFAULT_ARRAY_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import {SerieAPI} from "@/app/_types/SerieAPI";
import {SerieDb} from "@/app/_types/PrismaTypes";
import {SeasonSerie} from "@/app/_types/SeasonSerie";

export interface SerieAPIDBObject {
    created_by: Array<CreatedByObject>;
    backdrop_path: string;
    genres: Array<GenreAPIObject>;
    overview: string;
    poster_path: string;
    first_air_date: string;
    tagline: string;
    name: string;
    networks: Array<NetworkObject>;
    pegi: string;
    credits: CreditsSerieObject;
    seasons: Array<SerieSeasonAPIDBObject>;
}

export class SerieAPIDB {
    constructor(private _createdBy: Array<CreatedBy>, private _backdropPath: string, private _genres: Array<GenreAPI>, private _overview: string, private _posterPath: string, private _firstAirDate: string, private _tagline: string, private _name: string, private _networks: Array<Network>, private _pegi: string, private _credits: CreditsSerie, private _seasons: Array<SerieSeasonAPIDB>) {
    }

    static getInstance(object: SerieAPIDBObject): SerieAPIDB {
        const createdBy: Array<CreatedBy> = object?.created_by.map((createdByObject: CreatedByObject) => CreatedBy.getInstance(createdByObject)) || DEFAULT_ARRAY_VALUE;
        const backdropPath: string = object?.backdrop_path || DEFAULT_STRING_VALUE;
        const genres: Array<GenreAPI> = object?.genres.map((genreAPIObject: GenreAPIObject) => GenreAPI.getInstance(genreAPIObject)) || DEFAULT_ARRAY_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const firstAirDate: string = object?.first_air_date || DEFAULT_STRING_VALUE;
        const tagline: string = object?.tagline || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const networks: Array<Network> = object?.networks.map((networkObject: NetworkObject) => Network.getInstance(networkObject)) || DEFAULT_ARRAY_VALUE;
        const pegi: string = object?.pegi || DEFAULT_STRING_VALUE;
        const credits: CreditsSerie = CreditsSerie.getInstance(object?.credits);
        const seasons: Array<SerieSeasonAPIDB> = object?.seasons.map((serieSeasonAPIDBObject: SerieSeasonAPIDBObject) => SerieSeasonAPIDB.getInstance(serieSeasonAPIDBObject)) || DEFAULT_ARRAY_VALUE;

        return new SerieAPIDB(createdBy, backdropPath, genres, overview, posterPath, firstAirDate, tagline, name, networks, pegi, credits, seasons);
    }

    static getInstanceFromSeries(serieApi: SerieAPI, serieDb: SerieDb): SerieAPIDB {
        const createdBy: Array<CreatedBy> = serieApi.createdBy;
        const backdropPath: string = serieApi.backdropPath;
        const genres: Array<GenreAPI> = serieApi.genres;
        const overview: string = serieDb.overview;
        const posterPath: string = serieApi.posterPath;
        const firstAirDate: string = serieApi.firstAirDate;
        const tagline: string = serieDb.tagline;
        const name: string = serieDb.name;
        const networks: Array<Network> = serieApi.networks;
        const pegi: string = serieDb.pegi;
        const credits: CreditsSerie = serieApi.aggregateCredits;

        let index: number = 0;
        const seasons: Array<SerieSeasonAPIDB> = serieApi.seasons.map((seasonSerie: SeasonSerie) => {
            if (seasonSerie.isSeasonNumber()) {
                const serieSeasonApiDb: SerieSeasonAPIDB = SerieSeasonAPIDB.getInstanceFromSeasons(seasonSerie, index < serieDb.Season.length ? serieDb.Season[index] : null)
                index += 1;
                return serieSeasonApiDb;
            }
        }).filter((serieSeasonApiDb: SerieSeasonAPIDB | undefined): serieSeasonApiDb is SerieSeasonAPIDB => serieSeasonApiDb !== undefined)!;

        return new SerieAPIDB(createdBy, backdropPath, genres, overview, posterPath, firstAirDate, tagline, name, networks, pegi, credits, seasons);
    }

    get createdBy(): Array<CreatedBy> {
        return this._createdBy;
    }

    get backdropPath(): string {
        return this._backdropPath;
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

    get firstAirDate(): string {
        return this._firstAirDate;
    }

    get tagline(): string {
        return this._tagline;
    }

    get name(): string {
        return this._name;
    }

    get networks(): Array<Network> {
        return this._networks;
    }

    get pegi(): string {
        return this._pegi;
    }

    get credits(): CreditsSerie {
        return this._credits;
    }

    get seasons(): Array<SerieSeasonAPIDB> {
        return this._seasons;
    }

    isBackdropPath(): boolean {
        return this._backdropPath !== DEFAULT_STRING_VALUE;
    }

    isCreatedBy(): boolean {
        return this._createdBy !== DEFAULT_ARRAY_VALUE;
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

    genresToString(): string {
        let genresString: string = "";
        this._genres.forEach((genreAPI: GenreAPI) => {
            genresString = genresString + genreAPI.name + ", ";
        })

        return genresString.slice(0, -2);
    }
}