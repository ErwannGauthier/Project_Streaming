import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";
import {fileSerieDir, watchSerieDir} from "@/app/_utils/localVariables";

const prisma = prismaClient;

async function callMoveFile(source: string, destination: string, origin: string) {
    const fetchResult = await fetch(`${origin}/api/UTILS/moveFile?old=${source}&new=${destination}`);
    const data = await fetchResult.json();
    return fetchResult.ok;
}

export async function POST(request: NextRequest) {
    const origin = request.nextUrl.origin;
    const data = await request.json();
    const serieId = Number(data["serieId"]);
    const name = data["name"];
    const seasonId = Number(data["seasonId"]);
    const seasonNumber = Number(data["seasonNumber"]);
    const episodeId = Number(data["episodeId"]);
    const episodeNumber = Number(data["episodeNumber"]);
    const isStreaming = data["isStreaming"];

    await prisma.episode.delete({ where: { id: episodeId } });
    
    const seasonSize = await prisma.episode.count({ where: { Season: { id: seasonId } } });
    if (seasonSize === 0) {
        await prisma.season.delete({ where: { id: seasonId } });
    }

    const serieSize = await prisma.season.count({ where: { Serie: { id: serieId } } });
    if (serieSize === 0) {
        await prisma.serie.delete({ where: { id: serieId } });
    }

    if (isStreaming) {
        const newTitle = name.replaceAll(/[^a-zA-Z0-9]/g, '_');
        const timestamp = (new Date()).getTime();
        const fileName = `ancien-${newTitle}-saison${seasonNumber}-episode${episodeNumber}-${timestamp}.mp4`;
        const moveFile = await callMoveFile(`${watchSerieDir}/${serieId}/${seasonNumber}/${episodeNumber}.mp4`, `${fileSerieDir}/${fileName}`, origin);
        if (!moveFile) {
            return NextResponse.json({ message: "Une erreur s'est produite lors du déplacement de fichier." }, { status: 400 });
        }
    }

    return NextResponse.json({ message: "L'épisode a été supprimé de la base de données." }, { status: 200 });
}