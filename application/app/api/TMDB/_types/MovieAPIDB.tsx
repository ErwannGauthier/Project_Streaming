import {TypeStream} from "@prisma/client";
import {CreditsMovie} from "./CreditsMovie";
import {GenreAPI} from "./GenreAPI";

export type MovieAPIDB = {
    id: number,
    backdrop_path: string;
    budget: number;
    genres: Array<GenreAPI>;
    overview: string;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    tagline: string;
    title: string;
    typesStream: Array<TypeStream>,
    credits: CreditsMovie;
    pegi: string;
}