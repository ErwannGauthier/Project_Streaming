import {callApi, createDirectory, removeDirectory} from "@/app/api/_services/UtilService";
import {SeasonAPIObject} from "@/app/_types/SeasonAPI";
import {SeasonDb, SerieDb} from "@/app/_types/PrismaTypes";
import {PrismaClient, Season} from "@prisma/client";
import {bodyAddSeason} from "@/app/api/season/[id]/route";
import {watchSerieDir} from "@/app/_utils/localVariables";
import {addSerie, deleteSerie, getSerieApiById, getSerieById} from "@/app/api/_services/SerieService";
import {SerieAPI, SerieAPIObject} from "@/app/_types/SerieAPI";
import {bodyAddSerie} from "@/app/api/serie/[id]/route";
import {GenreAPI} from "@/app/_types/GenreAPI";

export async function getSeasonApiById(serieId: number, seasonNumber: number): Promise<SeasonAPIObject> {
    const url: string = `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?language=fr`;
    return await callApi(url);
}

export async function getSeasons(): Promise<SeasonDb[]> {
    const prisma = new PrismaClient();

    try {
        return await prisma.season.findMany({
            include: {
                Episode: {
                    include: {
                        TypeStream: true
                    }
                }
            }
        });
    } catch
        (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return [];
}

export async function getSeasonById(id: number): Promise<SeasonDb | null> {
    const prisma = new PrismaClient();

    try {
        return await prisma.season.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Episode: {
                    include: {
                        TypeStream: true
                    }
                }
            }
        });
    } catch (error: any) {
        console.error(error)
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function addSeason(body: bodyAddSeason): Promise<Season | null> {
    const prisma = new PrismaClient();

    try {
        const season: Season = await prisma.season.create({
            data: {
                id: Number(body.id),
                seasonNumber: Number(body.seasonNumber),
                serieId: Number(body.serieId),
            }
        });

        createDirectory(`${watchSerieDir}/${body.serieId}/${body.seasonNumber}`);
        return season;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return null;
}

export async function safeAddSeason(body: bodyAddSeason): Promise<Season | null> {
    const serie: SerieDb | null = await getSerieById(Number(body.serieId));
    if (!serie) {
        const serieApiObject: SerieAPIObject = await getSerieApiById(Number(body.serieId));
        const serieApi: SerieAPI = SerieAPI.getInstance(serieApiObject);
        const genres: { _id: number, _name: string }[] = serieApi.genres.map((genre: GenreAPI) => {
            return {"_id": Number(genre.id), "_name": genre.name};
        });

        const serieBody: bodyAddSerie = {
            id: Number(serieApi.id),
            name: serieApi.name,
            firstAirDate: serieApi.firstAirDate,
            pegi: serieApi.getPegi(),
            overview: serieApi.overview,
            tagline: serieApi.tagline,
            posterPath: serieApi.posterPath,
            backdropPath: serieApi.backdropPath,
            genres: genres
        }

        await addSerie(serieBody);
    }

    return await addSeason(body);
}

export async function deleteSeason(id: number): Promise<boolean> {
    const prisma = new PrismaClient();

    try {
        const season: SeasonDb | null = await getSeasonById(Number(id));
        // Check if season still contains episodes
        if (!season || season.Episode.length > 0) {
            return false;
        }

        await prisma.season.delete({where: {id: Number(season.id)}});

        removeDirectory(`${watchSerieDir}/${season.serieId}/${season.seasonNumber}`);
        return true;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return false;
}

export async function safeDeleteSeason(seasonId: number, serieId: number): Promise<boolean> {
    const isDeleted: boolean = await deleteSeason(Number(seasonId));
    await deleteSerie(Number(serieId));

    return isDeleted;
}