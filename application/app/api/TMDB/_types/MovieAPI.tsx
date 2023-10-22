import {BelongsToCollection} from "./BelongsToCollection";
import {CreditsMovie} from "./CreditsMovie";
import {GenreAPI} from "./GenreAPI";
import {ProductionCompany} from "./ProductionCompany";
import {ProductionCountry} from "./ProductionCountry";
import {ReleaseDates} from "./ReleaseDates";
import {SpokenLanguage} from "./SpokenLanguage";

export type MovieAPI = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection;
    budget: number;
    genres: Array<GenreAPI>;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<ProductionCompany>;
    production_coutries: Array<ProductionCountry>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<SpokenLanguage>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credits: CreditsMovie;
    release_dates: { results: Array<ReleaseDates> };
}