import {CreditsSerie} from "../api/TMDB/_types/CreditsSerie";

export function getCastingFromSerieCredits(credits: CreditsSerie) {
    let casting = [];
    const maxCast = credits.cast.length > 10 ? 10 : credits.cast.length;
    for (let i = 0; i < maxCast; i++) {
        casting.push(credits.cast[i]);
    }
    return casting;
}