import {CreditsMovie} from "../api/TMDB/_types/CreditsMovie";

export function getCastingFromMovieCredits(credits: CreditsMovie) {
    let casting = [];
    const maxCast = credits.cast.length > 10 ? 10 : credits.cast.length;
    for (let i = 0; i < maxCast; i++) {
        casting.push(credits.cast[i]);
    }
    return casting;
}