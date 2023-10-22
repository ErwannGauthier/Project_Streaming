export type SerieSearch = {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: Array<number>;
    popularity: number;
    vote_average: number;
    vote_count: number;
    name: string;
    original_name: string;
    first_air_date: string;
    original_country: Array<string>;
}