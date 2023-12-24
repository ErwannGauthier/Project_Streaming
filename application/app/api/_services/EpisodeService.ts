import {Episode, PrismaClient, Season} from "@prisma/client";
import {EpisodeDb, SeasonDb, SerieDb} from "@/app/_types/PrismaTypes";
import {bodyAddEpisode, bodyDeleteEpisode, bodyUpdateEpisode} from "@/app/api/episode/[id]/route";
import {moveDirectory} from "@/app/api/_services/UtilService";
import {fileSerieDir, watchSerieDir} from "@/app/_utils/localVariables";
import {removeSpecialChars} from "@/app/_utils/utilsFunctions";
import {getSeasonById, safeAddSeason, safeDeleteSeason} from "@/app/api/_services/SeasonService";
import {getSerieById} from "@/app/api/_services/SerieService";

export async function getEpisodes(): Promise<EpisodeDb[]> {
    const prisma = new PrismaClient();

    try {
        return await prisma.episode.findMany({
            include: {
                TypeStream: true,
            }
        });
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return [];
}

export async function getEpisodeById(id: number): Promise<EpisodeDb | null> {
    const prisma = new PrismaClient();

    try {
        return await prisma.episode.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                TypeStream: true,
            }
        });
    } catch (error: any) {
        console.error(error)
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function addEpisode(body: bodyAddEpisode): Promise<Episode | null> {
    const prisma = new PrismaClient();

    try {
        const episode: Episode = await prisma.episode.create({
            data: {
                id: Number(body.episodeId),
                episodeNumber: Number(body.episodeNumber),
                seasonId: Number(body.seasonId)
            }
        });

        for (const typeId of body.typesStream) {
            await prisma.typeStream.update({
                where: {id: Number(typeId)},
                data: {
                    Episode: {
                        connect: {id: Number(episode.id)}
                    }
                }
            });
        }

        if (body.directory) {
            const moveDir: boolean = await moveDirectory(`${fileSerieDir}/${body.directory}`, `${watchSerieDir}/${body.serieId}/${body.seasonNumber}/${episode.episodeNumber}`);
            if (!moveDir) {
                return null;
            }
        }

        return episode;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function safeAddEpisode(body: bodyAddEpisode): Promise<Episode | null> {
    const season: SeasonDb | Season | null = await getSeasonById(Number(body.seasonId)) || await safeAddSeason({
        id: Number(body.seasonId),
        seasonNumber: Number(body.seasonNumber),
        serieId: Number(body.serieId),
    });

    return await addEpisode(body);
}

export async function updateEpisode(body: bodyUpdateEpisode): Promise<Episode | null> {
    const prisma = new PrismaClient();

    try {
        const episode: Episode = await prisma.episode.update({
            where: {id: Number(body.episodeId)},
            data: {
                TypeStream: {
                    disconnect: [{id: 1}, {id: 2}, {id: 3}, {id: 4},]
                }
            }
        });

        for (const typeId of body.typesStream) {
            await prisma.typeStream.update({
                where: {id: Number(typeId)},
                data: {
                    Episode: {
                        connect: {id: Number(episode.id)}
                    }
                }
            });
        }

        const serie: SerieDb | null = await getSerieById(Number(body.serieId));
        const newTitle: string = removeSpecialChars(serie?.name || "");
        const timestamp: number = (new Date()).getTime();
        const directoryName: string = `ancien-${newTitle}-saison${body.seasonNumber}-episode${body.episodeNumber}-${timestamp}`;
        const fullPathWatchEpisode: string = `${watchSerieDir}/${body.serieId}/${body.seasonNumber}/${body.episodeNumber}`;
        let moveDirOut: boolean = true;
        let moveDirIn: boolean = true;
        if (body.wasStreaming && !body.typesStream.includes(4)) {
            moveDirOut = await moveDirectory(`${fullPathWatchEpisode}`, `${fileSerieDir}/${directoryName}`);
        } else if (body.wasStreaming && body.typesStream.includes(4) && body.directory) {
            moveDirOut = await moveDirectory(`${fullPathWatchEpisode}`, `${fileSerieDir}/${directoryName}`);
            moveDirIn = await moveDirectory(`${fileSerieDir}/${body.directory}`, `${fullPathWatchEpisode}`);
        } else if (!body.wasStreaming && body.typesStream.includes(4) && body.directory) {
            moveDirIn = await moveDirectory(`${fileSerieDir}/${body.directory}`, `${fullPathWatchEpisode}`);
        }

        if (!moveDirOut || !moveDirIn) {
            return null;
        }

        return episode;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function deleteEpisode(body: bodyDeleteEpisode): Promise<boolean> {
    const prisma = new PrismaClient();

    try {
        await prisma.episode.delete({where: {id: Number(body.episodeId)}});

        if (body.isStreaming) {
            const serie: SerieDb | null = await getSerieById(Number(body.serieId));
            const newTitle: string = removeSpecialChars(serie?.name || "");
            const timestamp: number = (new Date()).getTime();
            const directoryName: string = `ancien-${newTitle}-saison${body.seasonNumber}-episode${body.episodeNumber}-${timestamp}`;
            const fullPathWatchEpisode: string = `${watchSerieDir}/${body.serieId}/${body.seasonNumber}/${body.episodeNumber}`;
            const moveDir: boolean = await moveDirectory(`${fullPathWatchEpisode}`, `${fileSerieDir}/${directoryName}`);
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

export async function safeDeleteEpisode(body: bodyDeleteEpisode): Promise<boolean> {
    const isDeleted: boolean = await deleteEpisode(body);
    await safeDeleteSeason(Number(body.seasonId), Number(body.serieId));

    return isDeleted;
}
