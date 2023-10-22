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
    const serieId: number = data["serieId"];
    const name: string = data["name"];
    const seasonId: number = data["seasonId"];
    const seasonNumber: number = data["seasonNumber"];
    const episodeId: number = data["episodeId"];
    const episodeNumber: number = data["episodeNumber"];
    const typesStream: Array<number> = data["typesStream"];
    const wasStreaming: boolean = data["wasStreaming"];
    const file: string | null = data["file"];

    await prisma.episode.update({
        where: { id: episodeId },
        data: {
            TypeStream: {
                disconnect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },]
            }
        }
    })

    typesStream.forEach(async (type) => {
        await prisma.typeStream.update({
            where: { id: type },
            data: {
                Episode: {
                    connect: { id: episodeId }
                }
            }
        })
    });


    const newTitle = name.replaceAll(/[^a-zA-Z0-9]/g, '_');
    const timestamp = (new Date()).getTime();
    const fileName = `ancien-${newTitle}-saison${seasonNumber}-episode${episodeNumber}-${timestamp}.mp4`;
    const fullPathWatchEpisode = `${watchSerieDir}/${serieId}/${seasonNumber}/${episodeNumber}.mp4`;
    let moveFileOut: boolean = true;
    let moveFileIn: boolean = true;
    if (wasStreaming && !typesStream.includes(4)) {
        moveFileOut = await callMoveFile(`${fullPathWatchEpisode}`, `${fileSerieDir}/${fileName}`, origin);
    } else if (wasStreaming && typesStream.includes(4) && file) {
        moveFileOut = await callMoveFile(`${fullPathWatchEpisode}`, `${fileSerieDir}/${fileName}`, origin);
        moveFileIn = await callMoveFile(`${fileSerieDir}/${file}`, `${fullPathWatchEpisode}`, origin);
    } else if (!wasStreaming && typesStream.includes(4) && file) {
        moveFileIn = await callMoveFile(`${fileSerieDir}/${file}`, `${fullPathWatchEpisode}`, origin);
    }

    if (!moveFileOut || !moveFileIn) {
        return NextResponse.json({ message: "Une erreur s'est produite lors du déplacement de fichier." }, { status: 400 });
    }

    return NextResponse.json({ message: "L'épisode a été modifié dans la base de données." }, { status: 200 });
}