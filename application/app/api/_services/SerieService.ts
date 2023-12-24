import {SerieAPIObject} from "@/app/_types/SerieAPI";
import {callApi, createDirectory, removeDirectory} from "@/app/api/_services/UtilService";
import {PrismaClient, Serie} from "@prisma/client";
import {SerieDb} from "@/app/_types/PrismaTypes";
import {bodyAddSerie} from "@/app/api/serie/[id]/route";
import {watchSerieDir} from "@/app/_utils/localVariables";

export async function getSerieApiById(id: number): Promise<SerieAPIObject> {
    const url: string = `https://api.themoviedb.org/3/tv/${id}?append_to_response=aggregate_credits%2Ccontent_ratings&language=fr`;
    return await callApi(url);
}

export async function getSeries(): Promise<SerieDb[]> {
    const prisma = new PrismaClient();

    try {
        return await prisma.serie.findMany({
            include: {
                Season: {
                    include: {
                        Episode: {
                            include: {
                                TypeStream: true
                            }
                        }
                    }
                },
                Genre: true
            }
        });
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return [];
}

export async function getSerieById(id: number): Promise<SerieDb | null> {
    const prisma = new PrismaClient();

    try {
        return await prisma.serie.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Season: {
                    include: {
                        Episode: {
                            include: {
                                TypeStream: true
                            }
                        }
                    }
                },
                Genre: true
            }
        });
    } catch (error: any) {
        console.error(error)
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function addSerie(body: bodyAddSerie): Promise<Serie | null> {
    const prisma = new PrismaClient();

    try {
        const serie: Serie = await prisma.serie.create({
            data: {
                id: Number(body.id),
                name: body.name,
                firstAirDate: body.firstAirDate,
                pegi: body.pegi,
                overview: body.overview,
                tagline: body.tagline,
                posterPath: body.posterPath,
                backdropPath: body.backdropPath,
            }
        });

        for (const genre of body.genres) {
            await prisma.genre.upsert({
                where: {
                    id: Number(genre._id),
                },
                update: {
                    Serie: {
                        connect: {id: Number(serie.id)}
                    }
                },
                create: {
                    id: Number(genre._id),
                    name: genre._name,
                    Serie: {
                        connect: {id: Number(serie.id)}
                    }
                },
            });
        }

        createDirectory(`${watchSerieDir}/${serie.id}`);
        return serie;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function deleteSerie(id: number): Promise<boolean> {
    const prisma = new PrismaClient();

    try {
        const serie: SerieDb | null = await getSerieById(Number(id));
        // Check if serie still contains seasons
        if (!serie || serie.Season.length > 0) {
            return false;
        }

        await prisma.serie.delete({where: {id: Number(serie.id)}});

        removeDirectory(`${watchSerieDir}/${serie.id}`);
        return true;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return false;
}
