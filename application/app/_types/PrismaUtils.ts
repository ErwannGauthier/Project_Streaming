import {Episode, Genre, TypeStream} from "@prisma/client";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";


export class PrismaUtils {
    static getEpisodesNumber(episodes: Array<Episode & { TypeStream: Array<TypeStream> }>): Array<number> {
        return episodes.map((episode: Episode & { TypeStream: Array<TypeStream> }) => episode.episodeNumber);
    }

    static getEpisodeDBByEpisodeNumber(episodes: Array<Episode & {
        TypeStream: Array<TypeStream>
    }>, episodeNumber: Number): Episode & { TypeStream: Array<TypeStream> } | undefined {
        return episodes.find((episode: Episode & {
            TypeStream: Array<TypeStream>
        }) => episode.episodeNumber === episodeNumber);
    }

    static getTypesStreamNumber(typesStream: Array<TypeStream>): Array<number> {
        return typesStream.map((typeStream: TypeStream) => typeStream.id);
    }

    static getFormattedDate(releaseDate: string): string {
        const date: Date = new Date(releaseDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    static getYear(releaseDate: string): string {
        const date: Date = new Date(releaseDate);
        return format(date, 'yyyy', {locale: frLocale});
    }

    static getHours(runtime: number): string {
        return new Date(runtime * 1000).toISOString().substring(15, 16);
    }

    static getMinutes(runtime: number): string {
        return new Date(runtime * 1000).toISOString().substring(17, 19);
    }

    static genresToString(genres: Genre[]): string {
        let genresString: string = "";
        genres.forEach((genre: Genre) => {
            genresString = genresString + genre.name + ", ";
        })

        return genresString.slice(0, -2);
    }

    static hasDvd(typesStream: Array<TypeStream>): boolean {
        const filter: Array<TypeStream> = typesStream.filter((typeStream: TypeStream) => typeStream.name.toLocaleLowerCase() === "dvd");
        return filter.length > 0;
    }

    static hasDvdGrave(typesStream: Array<TypeStream>): boolean {
        const filter: Array<TypeStream> = typesStream.filter((typeStream: TypeStream) => typeStream.name.toLocaleLowerCase() === "dvd gravé");
        return filter.length > 0;
    }

    static hasK7(typesStream: Array<TypeStream>): boolean {
        const filter: Array<TypeStream> = typesStream.filter((typeStream: TypeStream) => typeStream.name.toLocaleLowerCase() === "k7");
        return filter.length > 0;
    }

    static hasStreaming(typesStream: Array<TypeStream>): boolean {
        const filter: Array<TypeStream> = typesStream.filter((typeStream: TypeStream) => typeStream.name.toLocaleLowerCase() === "streaming");
        return filter.length > 0;
    }
}