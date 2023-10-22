export type MovieSearch = {
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
    title: string;
    original_title: string;
    release_date: string;
    video: boolean;
}