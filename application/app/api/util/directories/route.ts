import {NextRequest, NextResponse} from "next/server";
import {getWatchableDirectories} from "@/app/api/_services/UtilService";
import {fileMovieDir, fileSerieDir} from "@/app/_utils/localVariables";

export async function GET(request: NextRequest) {
    const searchParams: URLSearchParams = request.nextUrl.searchParams;
    const sourceName: string | null = searchParams.get('source');
    if (!sourceName || (sourceName.toLocaleLowerCase() !== "movie" && sourceName.toLocaleLowerCase() !== "serie")) {
        return NextResponse.json({message: "Une erreur est survenue lors de la récupération des dossiers."}, {status: 400});
    }

    const sourceDirectory: string = sourceName.toLocaleLowerCase() === "movie" ? fileMovieDir : fileSerieDir;
    return NextResponse.json({...getWatchableDirectories(sourceDirectory)}, {status: 200});
}