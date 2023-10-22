import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";

const prisma = prismaClient;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const serieId = Number(searchParams.get("serieId"));
    const seasonNumber = Number(searchParams.get("seasonNumber"));
    const episodeNumber = Number(searchParams.get("episodeNumber"));

    const result = await prisma.serie.findUnique({
        where: {
            id: serieId
        },
        include: {
            Season: {
                where: {
                    seasonNumber: seasonNumber
                },
                include: {
                    Episode: {
                        where: {
                            episodeNumber: episodeNumber
                        },
                        include: {
                            TypeStream: true
                        }
                    }
                }
            }
        }
    });

    if (!result) {
        return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({ result: result }, { status: 200 });
}