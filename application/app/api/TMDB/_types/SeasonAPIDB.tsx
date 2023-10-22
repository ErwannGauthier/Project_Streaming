import {SeasonEpisodeAPIDB} from "./SeasonEpisodeAPIDB";

export type SeasonAPIDB = {
    _id: string;
    air_date: string;
    episodes: Array<SeasonEpisodeAPIDB>;
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}