import {SeasonEpisodeAPIDB} from "../api/TMDB/_types/SeasonEpisodeAPIDB";

export function getEpisodesStreaming(episodes: Array<SeasonEpisodeAPIDB>) {
    let episodesStreaming: Array<SeasonEpisodeAPIDB> = [];
    episodes.forEach(episode => {
        const types = episode["typesStream"];
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            if (type["name"].toLocaleLowerCase() === "streaming") {
                episodesStreaming.push(episode);
                break;
            }
        }
    });

    return episodesStreaming;
}