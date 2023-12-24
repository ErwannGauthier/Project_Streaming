import {bodyAddMovie} from "@/app/api/movie/[id]/route";

export async function fetchPostIdMovie(body: bodyAddMovie): Promise<boolean> {
    const response: Response = await fetch(`/api/movie/${body.id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.ok;
}