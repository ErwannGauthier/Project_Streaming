import { ContentRating } from "../api/TMDB/_types/ContentRating";

export default function getPegiSerie(contentRatings: { results: Array<ContentRating> }) {
    let pegi = "-";
    if (contentRatings) {
        const resultContentRatings = contentRatings.results;
        for (let i = 0; i < resultContentRatings.length; i++) {
            if (resultContentRatings[i].iso_3166_1.toLocaleLowerCase() === "fr") {
                pegi = resultContentRatings[i].rating;
                break;
            }
        }
    }

    return pegi;
}