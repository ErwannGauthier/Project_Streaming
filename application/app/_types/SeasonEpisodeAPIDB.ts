import {TypeStream} from "@prisma/client";
import {CrewEpisode, CrewEpisodeObject} from "@/app/_types/CrewEpisode";
import {GuestStar, GuestStarObject} from "@/app/_types/GuestStar";
import {DEFAULT_ARRAY_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import {EpisodeAPI} from "@/app/_types/EpisodeAPI";
import {EpisodeDb} from "@/app/_types/PrismaTypes";

export interface SeasonEpisodeAPIDBObject {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: Array<CrewEpisodeObject>;
    guest_stars: Array<GuestStarObject>;
    typesStream: Array<TypeStream>;
}

export class SeasonEpisodeAPIDB {
    constructor(private _airDate: string, private _episodeNumber: number, private _episodeType: string, private _id: number, private _name: string, private _overview: string, private _productionCode: string, private _runtime: number, private _seasonNumber: number, private _showId: number, private _stillPath: string, private _voteAverage: number, private _voteCount: number, private _crew: Array<CrewEpisode>, private _guestStars: Array<GuestStar>, private _typesStream: Array<TypeStream>) {
    }

    static getInstance(object: SeasonEpisodeAPIDBObject): SeasonEpisodeAPIDB {
        const airDate: string = object?.air_date || DEFAULT_STRING_VALUE;
        const episodeNumber: number = object?.episode_number || DEFAULT_NUMBER_VALUE;
        const episodeType: string = object?.episode_type || DEFAULT_STRING_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const productionCode: string = object?.production_code || DEFAULT_STRING_VALUE;
        const runtime: number = object?.runtime || DEFAULT_NUMBER_VALUE;
        const seasonNumber: number = object?.season_number || DEFAULT_NUMBER_VALUE;
        const showId: number = object?.show_id || DEFAULT_NUMBER_VALUE;
        const stillPath: string = object?.still_path || DEFAULT_STRING_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;
        const voteCount: number = object?.vote_count || DEFAULT_NUMBER_VALUE;
        const crew: Array<CrewEpisode> = object?.crew.map((crewEpisodeObject: CrewEpisodeObject) => CrewEpisode.getInstance(crewEpisodeObject)) || DEFAULT_ARRAY_VALUE;
        const guestStars: Array<GuestStar> = object?.guest_stars.map((guestStarObject: GuestStarObject) => GuestStar.getInstance(guestStarObject)) || DEFAULT_ARRAY_VALUE;
        const typesStream: Array<TypeStream> = object?.typesStream || DEFAULT_ARRAY_VALUE;

        return new SeasonEpisodeAPIDB(airDate, episodeNumber, episodeType, id, name, overview, productionCode, runtime, seasonNumber, showId, stillPath, voteAverage, voteCount, crew, guestStars, typesStream);
    }

    static getInstanceFromEpisodes(episodeApi: EpisodeAPI, episodeDb: EpisodeDb | null): SeasonEpisodeAPIDB {
        const airDate: string = episodeApi.airDate;
        const episodeNumber: number = episodeApi.episodeNumber;
        const episodeType: string = episodeApi.episodeType;
        const id: number = episodeApi.id;
        const name: string = episodeApi.name;
        const overview: string = episodeApi.overview;
        const productionCode: string = episodeApi.productionCode;
        const runtime: number = episodeApi.runtime;
        const seasonNumber: number = episodeApi.seasonNumber;
        const showId: number = episodeApi.showId;
        const stillPath: string = episodeApi.stillPath;
        const voteAverage: number = episodeApi.voteAverage;
        const voteCount: number = episodeApi.voteCount;
        const crew: Array<CrewEpisode> = episodeApi.crew;
        const guestStars: Array<GuestStar> = episodeApi.guestStars;
        const typesStream: Array<TypeStream> = episodeDb ? episodeDb.TypeStream : [];

        return new SeasonEpisodeAPIDB(airDate, episodeNumber, episodeType, id, name, overview, productionCode, runtime, seasonNumber, showId, stillPath, voteAverage, voteCount, crew, guestStars, typesStream);
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

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get overview(): string {
        return this._overview;
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

    get voteAverage(): number {
        return this._voteAverage;
    }

    get voteCount(): number {
        return this._voteCount;
    }

    get crew(): Array<CrewEpisode> {
        return this._crew;
    }

    get guestStars(): Array<GuestStar> {
        return this._guestStars;
    }

    get typesStream(): Array<TypeStream> {
        return this._typesStream;
    }

    isAirDate(): boolean {
        return this._airDate !== DEFAULT_STRING_VALUE;
    }

    isEpisodeNumber(): boolean {
        return this._episodeNumber !== DEFAULT_NUMBER_VALUE;
    }

    isEpisodeType(): boolean {
        return this._episodeType !== DEFAULT_STRING_VALUE;
    }

    isName(): boolean {
        return this._name !== DEFAULT_STRING_VALUE;
    }

    isOverview(): boolean {
        return this._overview !== DEFAULT_STRING_VALUE;
    }

    isRuntime(): boolean {
        return this._runtime !== DEFAULT_NUMBER_VALUE;
    }

    isStillPath(): boolean {
        return this._stillPath !== DEFAULT_STRING_VALUE;
    }

    getFormattedDate(): string {
        const date: Date = new Date(this._airDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getHours(): string {
        return new Date(this._runtime * 1000).toISOString().substring(15, 16);
    }

    getMinutes(): string {
        return new Date(this._runtime * 1000).toISOString().substring(17, 19);
    }
}