import {GenreAPI} from "../api/TMDB/_types/GenreAPI";

export function setGenresToString(genres: Array<GenreAPI>) {
    let genresString = new String();
    genres.forEach(genre => {
        genresString = genresString + genre["name"] + ", "
    });
    genresString = genresString.slice(0, -2);

    return genresString;
}