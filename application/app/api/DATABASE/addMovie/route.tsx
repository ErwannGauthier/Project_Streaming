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
    const data = (await request.json())["movieData"];

    const id: number = data["id"];
    const title: string = data["title"];
    const overview: string = data["overview"];
    const releaseDate: string = data["releaseDate"];
    const pegi: string = data["pegi"];
    const runtime: number = data["runtime"];
    const tagline: string = data["tagline"];
    const posterPath: string = data["posterPath"];
    const backdropPath: string = data["backdropPath"];
    const genres: Array<{ id: number, name: string }> = data["genres"];
    const typesStream: Array<number> = data["typesStream"];
    const file: string = data["file"] || null;

    const oldMovie = await prisma.movie.findUnique({
        where: { id: id }
    });

    if (oldMovie) {
        return NextResponse.json({ message: `Le film est déjà dans la base de données. Si vous souhaitez le modifier ou ajouter un type de visionnage allez ici : ${origin}/update/movie/${id}` }, { status: 403 });
    }

    const newMovie = await prisma.movie.create({
        data: {
            id: id,
            title: title,
            releaseDate: releaseDate,
            pegi: pegi,
            runtime: runtime,
            overview: overview,
            tagline: tagline,
            posterPath: posterPath,
            backdropPath: backdropPath,
        }
    });

    // Ajouter les genres
    genres.forEach(async (genre) => {
        await prisma.genre.upsert({
            where: {
                id: genre["id"],
            },
            update: {
                Movie: {
                    connect: { id: newMovie.id }
                }
            },
            create: {
                id: genre["id"],
                name: genre["name"],
                Movie: {
                    connect: { id: newMovie.id }
                }
            },
        })
    });

    // Ajouter les typesStream
    typesStream.forEach(async (type) => {
        await prisma.typeStream.update({
            where: { id: type },
            data: {
                Movie: {
                    connect: { id: newMovie.id }
                }
            }
        })
    });

    // Déplacer le file
    if (file) {
        const moveFile = await callMoveFile(`${fileMovieDir}/${file}`, `${watchMovieDir}/${id}.mp4`, origin)
        if (!moveFile) {
            return NextResponse.json({ message: "Une erreur s'est produite lors du déplacement de fichier." }, { status: 400 });
        }
    }

    return NextResponse.json({ res: newMovie, message: "Le film a été ajouté à la base de données." }, { status: 201 });
}