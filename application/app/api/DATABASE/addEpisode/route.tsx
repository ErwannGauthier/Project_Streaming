import {NextRequest, NextResponse} from "next/server";
import {SerieAPI} from "../../TMDB/_types/SerieAPI";
import getPegiSerie from "@/app/_utils/getPegiSerie";
import {prismaClient} from "@/app/_utils/getPrismaClient";
import {fileSerieDir, watchSerieDir} from "@/app/_utils/localVariables";

const prisma = prismaClient;

async function createSerie(serieId: number, origin: string) {
    const fetchResult = await fetch(`${origin}/api/TMDB/getSerie?id=${serieId}`);
    const serieData: SerieAPI = (await fetchResult.json())["result"];
    const genres = serieData["genres"];

    await prisma.serie.create({
        data: {
            id: serieData["id"],
            name: serieData["name"],
            firstAirDate: serieData["first_air_date"],
            pegi: getPegiSerie(serieData["content_ratings"]),
            overview: serieData["overview"],
            tagline: serieData["tagline"],
            posterPath: serieData["poster_path"],
            backdropPath: serieData["backdrop_path"],
        }
    })

    genres.forEach(async (genre) => {
        await prisma.genre.upsert({
            where: {
                id: genre["id"],
            },
            update: {
                Serie: {
                    connect: { id: serieId }
                }
            },
            create: {
                id: genre["id"],
                name: genre["name"],
                Serie: {
                    connect: { id: serieId }
                }
            },
        })
    });
}

async function callCreateDirectory(dir: string, origin: string) {
    const fetchResult = await fetch(`${origin}/api/UTILS/createDirectory?dir=${dir}`);
    const data = await fetchResult.json();
}

async function callMoveFile(source: string, destination: string, origin: string) {
    const fetchResult = await fetch(`${origin}/api/UTILS/moveFile?old=${source}&new=${destination}`);
    const data = await fetchResult.json();
}

export async function POST(request: NextRequest) {
    const origin = request.nextUrl.origin;
    const data = (await request.json())["episodeData"];

    const serieId: number = Number(data["serieId"]);
    const seasonId: number = Number(data["seasonId"]);
    const seasonNumber: number = Number(data["seasonNumber"]);
    const episodeId: number = Number(data["episodeId"]);
    const episodeNumber: number = Number(data["episodeNumber"]);
    const typesStream: Array<number> = data["typesStream"];
    const file: string = data["file"] || null;

    const season = {
        id: seasonId,
        seasonNumber: seasonNumber,
        serieId: serieId
    }

    const episode = {
        id: episodeId,
        episodeNumber: episodeNumber,
        seasonId: seasonId
    }

    const oldEpisode = await prisma.episode.findUnique({ where: { id: episodeId } })
    if (oldEpisode) {
        return NextResponse.json({ message: "L'épisode est déjà dans la base de données. Si vous souhaitez le modifier ou ajouter un type de visionnage allez ici : ........" }, { status: 403 });
    }

    const oldSerie = await prisma.serie.findUnique({ where: { id: serieId } })
    if (!oldSerie) {
        await createSerie(serieId, origin);
    }

    const oldSeason = await prisma.season.findUnique({ where: { id: seasonId } })
    if (!oldSeason) {
        await prisma.season.create({ data: season });
    }

    const newEpisode = await prisma.episode.create({ data: episode });
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

    await callCreateDirectory(`${watchSerieDir}/${serieId}`, origin);
    await callCreateDirectory(`${watchSerieDir}/${serieId}/${seasonNumber}`, origin);
    if (file) {
        await callMoveFile(`${fileSerieDir}/${file}`, `${watchSerieDir}/${serieId}/${seasonNumber}/${episodeNumber}.mp4`, origin)
    }

    return NextResponse.json({ res: newEpisode, message: "L'épisode a été ajouté à la base de données." }, { status: 200 });
}