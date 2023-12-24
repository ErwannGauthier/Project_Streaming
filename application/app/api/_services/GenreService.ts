import {PrismaClient} from "@prisma/client";
import {GenreDb} from "@/app/_types/PrismaTypes";

export async function getGenres(): Promise<GenreDb[]> {
    const prisma = new PrismaClient();

    try {
        return await prisma.genre.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {
                Movie: {
                    include: {
                        TypeStream: true,
                        Genre: true
                    }
                },
                Serie: {
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
                }
            }
        });
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return [];
}