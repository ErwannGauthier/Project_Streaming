import {Episode, TypeStream} from "@prisma/client";

export function getEpisodeDBWithEpisodeNumber(episodes: Array<Episode & { TypeStream: Array<TypeStream> }>, episodeNumber: number) {
    let result = null;
    for (let i = 0; i < episodes.length; i++) {
        const episode = episodes[i];
        if (episode["episodeNumber"] === episodeNumber) {
            result = episode;
            break;
        }
    }

    return result;
}