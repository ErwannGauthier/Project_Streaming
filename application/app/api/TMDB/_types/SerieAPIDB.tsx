import {CreatedBy} from "./CreatedBy";
import {CreditsSerie} from "./CreditsSerie";
import {GenreAPI} from "./GenreAPI";
import {Network} from "./Network";
import {SerieSeasonAPIDB} from "./SerieSeasonAPIDB";

export type SerieAPIDB = {
    created_by: Array<CreatedBy>;
    backdrop_path: string;
    genres: Array<GenreAPI>;
    overview: string;
    poster_path: string;
    first_air_date: string;
    tagline: string;
    name: string;
    networks: Array<Network>;
    pegi: string;
    credits: CreditsSerie;
    seasons: Array<SerieSeasonAPIDB>;
}