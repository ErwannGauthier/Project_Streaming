import {bodyDeleteMovie} from "@/app/api/movie/[id]/route";

export async function fetchDeleteIdMovie(body: bodyDeleteMovie): Promise<boolean> {
    const response: Response = await fetch(`/api/movie/${body.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.ok;
}