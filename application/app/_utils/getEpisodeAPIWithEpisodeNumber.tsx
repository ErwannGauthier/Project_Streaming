import {EpisodeAPI} from "@/app/api/TMDB/_types/EpisodeAPI";

export function getEpisodeAPIWithEpisodeNumber(episodes: Array<EpisodeAPI>, episodeNumber: number) {
    let result = episodes[0];
    for (let i = 0; i < episodes.length; i++) {
        const episode = episodes[i];
        if (episode["episode_number"] === episodeNumber) {
            result = episode;
            break;
        }
    }

    return result;
}