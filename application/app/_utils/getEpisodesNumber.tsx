import {Episode, TypeStream} from "@prisma/client";

export function getEpisodesNumber(episodes: Array<Episode & { TypeStream: Array<TypeStream> }>) {
    let episodesNumber: Array<number> = [];
    episodes.forEach(episode => {
        episodesNumber.push(episode["episodeNumber"]);
    });

    return episodesNumber;
}