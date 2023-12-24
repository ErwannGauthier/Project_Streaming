import {bodyDeleteEpisode} from "@/app/api/episode/[id]/route";

export async function fetchDeleteIdEpisode(body: bodyDeleteEpisode): Promise<boolean> {
    const response: Response = await fetch(`/api/episode/${body.episodeId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.ok;
}