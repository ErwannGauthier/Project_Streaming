import { ReleaseDates } from "../api/TMDB/_types/ReleaseDates";

export default function getPegiMovie(releaseDates: { results: Array<ReleaseDates> }) {
    let pegi = "-";
    if (releaseDates) {
        const resultDates = releaseDates.results;
        for (let i = 0; i < resultDates.length; i++) {
            if (resultDates[i].iso_3166_1.toLocaleLowerCase() === "fr") {
                for (let j = 0; j < resultDates[i].release_dates.length; j++) {
                    let releaseDate = resultDates[i].release_dates[j];
                    if ((releaseDate.type === 3 || releaseDate.type === 4 || releaseDate.type === 5) && releaseDate.certification !== "") {
                        pegi = releaseDate.certification;
                        break;
                    } else if (releaseDate.certification !== "") {
                        pegi = releaseDate.certification;
                    }
                }
                break;
            }
        }
    }

    return pegi;
}