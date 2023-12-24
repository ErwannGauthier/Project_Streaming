import {bodyAddEpisode} from "@/app/api/episode/[id]/route";

export async function fetchPostIdEpisode(body: bodyAddEpisode): Promise<boolean> {
    const response: Response = await fetch(`/api/episode/${body.episodeId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.ok;
}