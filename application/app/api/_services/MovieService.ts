import {MovieAPIObject} from "@/app/_types/MovieAPI";
import {callApi, moveDirectory} from "@/app/api/_services/UtilService";
import {MovieDb} from "@/app/_types/PrismaTypes";
import {Movie, PrismaClient} from "@prisma/client";
import {fileMovieDir, watchMovieDir} from "@/app/_utils/localVariables";
import {removeSpecialChars} from "@/app/_utils/utilsFunctions";
import {bodyAddMovie, bodyDeleteMovie, bodyUpdateMovie} from "@/app/api/movie/[id]/route";

export async function getMovieApiById(id: number): Promise<MovieAPIObject> {
    const url: string = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Crelease_dates&language=fr`;
    return await callApi(url);
}

export async function getMovies(): Promise<MovieDb[]> {
    const prisma = new PrismaClient();

    try {
        return await prisma.movie.findMany({
            include: {TypeStream: true, Genre: true}
        });
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return [];
}

export async function getMovieByID(id: number): Promise<MovieDb | null> {
    const prisma = new PrismaClient();

    try {
        return await prisma.movie.findUnique({
            where: {id: Number(id)},
            include: {TypeStream: true, Genre: true},
        });
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function addMovie(body: bodyAddMovie): Promise<Movie | null> {
    const prisma = new PrismaClient();

    try {
        if (await prisma.movie.findUnique({where: {id: Number(body.id)}})) {
            return null;
        }

        const movie = await prisma.movie.create({
            data: {
                id: Number(body.id),
                title: body.title,
                releaseDate: body.releaseDate,
                pegi: body.pegi,
                runtime: body.runtime,
                overview: body.overview,
                tagline: body.tagline,
                posterPath: body.posterPath,
                backdropPath: body.backdropPath,
            }
        });

        for (const genre of body.genres) {
            await prisma.genre.upsert({
                where: {id: Number(genre._id)},
                update: {
                    Movie: {
                        connect: {id: Number(movie.id)}
                    }
                },
                create: {
                    id: Number(genre._id),
                    name: genre._name,
                    Movie: {
                        connect: {id: Number(movie.id)}
                    }
                },
            });
        }

        for (const typeId of body.typesStream) {
            await prisma.typeStream.update({
                where: {id: Number(typeId)},
                data: {
                    Movie: {
                        connect: {id: Number(movie.id)}
                    }
                }
            });
        }

        if (body.directory) {
            const moveDir: boolean = await moveDirectory(`${fileMovieDir}/${body.directory}`, `${watchMovieDir}/${movie.id}`);
            if (!moveDir) {
                return null;
            }
        }

        return movie;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return null;
}


export async function updateMovie(body: bodyUpdateMovie): Promise<Movie | null> {
    const prisma = new PrismaClient();

    try {
        const movie = await prisma.movie.update({
            where: {id: Number(body.id)},
            data: {
                title: body.title,
                overview: body.overview,
                TypeStream: {
                    disconnect: [{id: 1}, {id: 2}, {id: 3}, {id: 4},]
                }
            }
        });

        for (const typeId of body.typesStream) {
            await prisma.typeStream.update({
                where: {id: Number(typeId)},
                data: {
                    Movie: {
                        connect: {id: Number(movie.id)}
                    }
                }
            });
        }

        const newTitle: string = removeSpecialChars(body.title);
        const timestamp: number = (new Date()).getTime();
        const directoryName: string = `ancien-${newTitle}-${timestamp}`;
        let moveDirOut: boolean = true;
        let moveDirIn: boolean = true;
        if (body.wasStreaming && !body.typesStream.includes(4)) {
            moveDirOut = await moveDirectory(`${watchMovieDir}/${body.id}`, `${fileMovieDir}/${directoryName}`);
        } else if (body.wasStreaming && body.typesStream.includes(4) && body.directory) {
            moveDirOut = await moveDirectory(`${watchMovieDir}/${body.id}`, `${fileMovieDir}/${directoryName}`);
            moveDirIn = await moveDirectory(`${fileMovieDir}/${body.directory}`, `${watchMovieDir}/${body.id}`);
        } else if (!body.wasStreaming && body.typesStream.includes(4) && body.directory) {
            moveDirIn = await moveDirectory(`${fileMovieDir}/${body.directory}`, `${watchMovieDir}/${body.id}`);
        }

        if (!moveDirOut || !moveDirIn) {
            return null;
        }

        return movie;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function deleteMovie(body: bodyDeleteMovie): Promise<boolean> {
    const prisma = new PrismaClient();

    try {
        await prisma.movie.delete({where: {id: Number(body.id)}});

        if (body.isStreaming) {
            const newTitle: string = removeSpecialChars(body.title);
            const timestamp: number = (new Date()).getTime();
            const directoryName: string = `ancien-${newTitle}-${timestamp}`;
            const moveDir: boolean = await moveDirectory(`${watchMovieDir}/${body.id}`, `${fileMovieDir}/${directoryName}`);
            if (!moveDir) {
                return false;
            }
        }

        return true;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return false;
}