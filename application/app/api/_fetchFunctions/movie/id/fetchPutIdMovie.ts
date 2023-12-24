import {bodyUpdateMovie} from "@/app/api/movie/[id]/route";

export async function fetchPutIdMovie(body: bodyUpdateMovie): Promise<boolean> {
    const response: Response = await fetch(`/api/movie/${body.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.ok;
}