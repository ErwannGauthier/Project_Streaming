// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {watchMovieDir, watchSerieDir} from "@/app/_utils/localVariables";
import fs from "fs";

const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb

function getVideoStream(req: Request) {
    const range = req.headers.get('range');

    if (!range) {
        return new Response("No Range is provided.", { status: 400 });
    }

    const urlParams = new URLSearchParams(req.url);
    const type = urlParams.get("type");
    if (type?.toLocaleLowerCase() !== "movie" && type?.toLocaleLowerCase() !== "episode") {
        return new Response("Bad request.", { status: 400 });
    }

    let videoPath = "";
    if (type.toLocaleLowerCase() === "movie") {
        const movieId = urlParams.get("movieId");
        videoPath = `${watchMovieDir}/${movieId}.mp4`;
    } else if (type.toLocaleLowerCase() === "episode") {
        const serieId = urlParams.get("serieId");
        const seasonNumber = urlParams.get("seasonNumber");
        const episodeNumber = urlParams.get("episodeNumber");
        videoPath = `${watchSerieDir}/${serieId}/${seasonNumber}/${episodeNumber}.mp4`;
    }

    if (!fs.existsSync(videoPath)) {
        return new Response("Le fichier n'existe pas.", { status: 400 });
    }

    const videoSizeInBytes = fs.statSync(videoPath).size;

    const chunkStart = Number(range.replace(/\D/g, ''));

    const chunkEnd = Math.min(
        chunkStart + CHUNK_SIZE_IN_BYTES,
        videoSizeInBytes - 1
    );

    const contentLength = chunkEnd - chunkStart + 1;

    const headers = {
        "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength.toString(),
        "Content-Type": "video/mp4",
    } as { [key: string]: string };

    const videoStream = fs.createReadStream(videoPath, {
        start: chunkStart,
        end: chunkEnd,
    });

    return new Response(videoStream as any, {
        status: 206,
        headers,
    });
}

export async function GET(req: Request) {
    return getVideoStream(req);
}