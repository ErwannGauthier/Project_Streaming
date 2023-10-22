import {EpisodeAPI} from "./EpisodeAPI";

export type SeasonAPI = {
    _id: string;
    air_date: string;
    episodes: Array<EpisodeAPI>;
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}