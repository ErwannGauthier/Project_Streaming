import {SeasonEpisodeAPIDB, SeasonEpisodeAPIDBObject} from "@/app/_types/SeasonEpisodeAPIDB";
import {DEFAULT_ARRAY_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import {PrismaUtils} from "@/app/_types/PrismaUtils";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import {SeasonAPI} from "@/app/_types/SeasonAPI";
import {SeasonDb} from "@/app/_types/PrismaTypes";
import {EpisodeAPI} from "@/app/_types/EpisodeAPI";

export interface SeasonAPIDBObject {
    _id: string;
    air_date: string;
    episodes: Array<SeasonEpisodeAPIDBObject>;
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export class SeasonAPIDB {
    constructor(private _id: string, private _airDate: string, private _episodes: Array<SeasonEpisodeAPIDB>, private _name: string, private _overview: string, private _id_: number, private _posterPath: string, private _seasonNumber: number, private _voteAverage: number) {
    }

    static getInstance(object: SeasonAPIDBObject): SeasonAPIDB {
        const _id: string = object?._id || DEFAULT_STRING_VALUE;
        const airDate: string = object?.air_date || DEFAULT_STRING_VALUE;
        const episodes: Array<SeasonEpisodeAPIDB> = object?.episodes.map((seasonEpisodeAPIDBObject: SeasonEpisodeAPIDBObject) => SeasonEpisodeAPIDB.getInstance(seasonEpisodeAPIDBObject)) || DEFAULT_ARRAY_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const overview: string = object?.overview || DEFAULT_STRING_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const seasonNumber: number = object?.season_number || DEFAULT_NUMBER_VALUE;
        const voteAverage: number = object?.vote_average || DEFAULT_NUMBER_VALUE;

        return new SeasonAPIDB(_id, airDate, episodes, name, overview, id, posterPath, seasonNumber, voteAverage);
    }

    static getInstanceFromSeasons(seasonApi: SeasonAPI, seasonDb: SeasonDb): SeasonAPIDB {
        const _id: string = seasonApi.id;
        const airDate: string = seasonApi.airDate;
        const episodes: Array<SeasonEpisodeAPIDB> = seasonApi.episodes.map((episodeApi: EpisodeAPI, index: number) => SeasonEpisodeAPIDB.getInstanceFromEpisodes(episodeApi, index < seasonDb.Episode.length ? seasonDb.Episode[index] : null));
        const name: string = seasonApi.name;
        const overview: string = seasonApi.overview;
        const id: number = seasonApi.id_;
        const posterPath: string = seasonApi.posterPath;
        const seasonNumber: number = seasonApi.seasonNumber;
        const voteAverage: number = seasonApi.voteAverage;

        return new SeasonAPIDB(_id, airDate, episodes, name, overview, id, posterPath, seasonNumber, voteAverage);
    }

    get id(): string {
        return this._id;
    }

    get airDate(): string {
        return this._airDate;
    }

    get episodes(): Array<SeasonEpisodeAPIDB> {
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

    isPosterPath(): boolean {
        return this._posterPath !== DEFAULT_STRING_VALUE;
    }

    isName(): boolean {
        return this._name !== DEFAULT_STRING_VALUE;
    }

    isOverview(): boolean {
        return this._overview !== DEFAULT_STRING_VALUE;
    }

    getFormattedDate(): string {
        const date: Date = new Date(this._airDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getYear(): string {
        const date: Date = new Date(this._airDate);
        return format(date, 'yyyy', {locale: frLocale});
    }

    getEpisodeByEpisodeNumber(episodeNumber: Number): SeasonEpisodeAPIDB | null {
        const episode: Array<SeasonEpisodeAPIDB> = this._episodes.filter((seasonEpisodeAPIDB: SeasonEpisodeAPIDB) => seasonEpisodeAPIDB.episodeNumber === episodeNumber);
        return episode.length > 0 ? episode[0] : null;
    }

    getEpisodesStreaming(): Array<SeasonEpisodeAPIDB> {
        return this._episodes.filter((seasonEpisodeAPIDB: SeasonEpisodeAPIDB) => PrismaUtils.hasStreaming(seasonEpisodeAPIDB.typesStream));
    }
}