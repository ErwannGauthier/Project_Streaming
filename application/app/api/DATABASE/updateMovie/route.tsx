import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";
import {fileMovieDir, watchMovieDir} from "@/app/_utils/localVariables";

const prisma = prismaClient;

async function callMoveFile(source: string, destination: string, origin: string) {
    const fetchResult = await fetch(`${origin}/api/UTILS/moveFile?old=${source}&new=${destination}`);
    const data = await fetchResult.json();
    return fetchResult.ok;
}

export async function POST(request: NextRequest) {
    const origin = request.nextUrl.origin;
    const data = await request.json();
    const id: number = data["id"];
    const title: string = data["title"];
    const overview: string = data["overview"];
    const typesStream: Array<number> = data["typesStream"];
    const wasStreaming: boolean = data["wasStreaming"];
    const file: string | null = data["file"];

    await prisma.movie.update({
        where: { id: id },
        data: {
            title: title,
            overview: overview,
            TypeStream: {
                disconnect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },]
            }
        }
    })

    typesStream.forEach(async (type) => {
        await prisma.typeStream.update({
            where: { id: type },
            data: {
                Movie: {
                    connect: { id: id }
                }
            }
        })
    });


    const newTitle = title.replaceAll(/[^a-zA-Z0-9]/g, '_');
    const timestamp = (new Date()).getTime();
    const fileName = `ancien-${newTitle}-${timestamp}.mp4`;
    let moveFileOut: boolean = true;
    let moveFileIn: boolean = true;
    if (wasStreaming && !typesStream.includes(4)) {
        moveFileOut = await callMoveFile(`${watchMovieDir}/${id}.mp4`, `${fileMovieDir}/${fileName}`, origin);
    } else if (wasStreaming && typesStream.includes(4) && file) {
        moveFileOut = await callMoveFile(`${watchMovieDir}/${id}.mp4`, `${fileMovieDir}/${fileName}`, origin);
        moveFileIn = await callMoveFile(`${fileMovieDir}/${file}`, `${watchMovieDir}/${id}.mp4`, origin);
    } else if (!wasStreaming && typesStream.includes(4) && file) {
        moveFileIn = await callMoveFile(`${fileMovieDir}/${file}`, `${watchMovieDir}/${id}.mp4`, origin);
    }

    if (!moveFileOut || !moveFileIn) {
        return NextResponse.json({ message: "Une erreur s'est produite lors du déplacement de fichier." }, { status: 400 });
    }

    return NextResponse.json({ message: "Le film a été modifié dans la base de données." }, { status: 200 });
}