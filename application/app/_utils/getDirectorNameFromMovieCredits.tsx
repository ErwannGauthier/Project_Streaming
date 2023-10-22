import {CreditsMovie} from "../api/TMDB/_types/CreditsMovie";

export function getDirectorNameFromMovieCredits(credits: CreditsMovie) {
    let directorName = "";
    for (let i = 0; i < credits.crew.length; i++) {
        if (credits.crew[i].job.toLocaleLowerCase() === "director") {
            directorName = credits.crew[i].name;
            break;
        }
    }

    return directorName;
}