import {callApi} from "@/app/api/_services/UtilService";
import {MovieSearchObject} from "@/app/_types/MovieSearch";
import {SerieSearchObject} from "@/app/_types/SerieSearch";
import {PersonSearchObject} from "@/app/_types/PersonSearch";

export interface SearchResult {
    movies: MovieSearchObject[],
    series: SerieSearchObject[],
    persons: PersonSearchObject[]
}

export async function search(query: string): Promise<SearchResult> {
    const url: string = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=fr`;
    const data = await callApi(url);
    const results = data?.results;

    let moviesArray: MovieSearchObject[] = [];
    let seriesArray: SerieSearchObject[] = [];
    let personsArray: PersonSearchObject[] = [];
    results.forEach((element: any) => {
        switch (element["media_type"]) {
            case 'movie':
                moviesArray.push(element);
                break;
            case 'tv':
                seriesArray.push(element);
                break;
            case 'person':
                personsArray.push(element);
                break;
        }
    });

    return {
        movies: moviesArray,
        series: seriesArray,
        persons: personsArray
    }
}