import {bodyUpdateEpisode} from "@/app/api/episode/[id]/route";

export async function fetchPutIdEpisode(body: bodyUpdateEpisode): Promise<boolean> {
    const response: Response = await fetch(`/api/episode/${body.episodeId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.ok;
}