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
    const isStreaming: boolean = data["isStreaming"];
    const title: string = data["title"];

    await prisma.movie.delete({ where: { id: id } });

    if (isStreaming) {
        const newTitle = title.replaceAll(/[^a-zA-Z0-9]/g, '_');
        const timestamp = (new Date()).getTime();
        const fileName = `ancien-${newTitle}-${timestamp}.mp4`;
        const moveFile = await callMoveFile(`${watchMovieDir}/${id}.mp4`, `${fileMovieDir}/${fileName}`, origin);
        if (!moveFile) {
            return NextResponse.json({ message: "Une erreur s'est produite lors du déplacement de fichier." }, { status: 400 });
        }
    }

    return NextResponse.json({ message: "Le film a été supprimé de la base de données." }, { status: 200 });
}