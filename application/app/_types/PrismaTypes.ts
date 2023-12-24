import {Episode, Genre, Movie, Season, Serie, TypeStream} from "@prisma/client";

export type MovieDb = Movie & { TypeStream: TypeStream[], Genre: Genre[] };

export type EpisodeDb = Episode & { TypeStream: TypeStream[] };

export type SeasonDb = Season & { Episode: EpisodeDb[] };

export type SerieDb = Serie & {
    Season: SeasonDb[],
    Genre: Genre[]
}

export type GenreDb = Genre & {
    Movie: MovieDb[],
    Serie: SerieDb[]
}