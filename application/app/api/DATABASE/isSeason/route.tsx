import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";

const prisma = prismaClient;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const serieId = Number(searchParams.get("id"));
    const seasonNumber = Number(searchParams.get("seasonNumber"));
    const result = await prisma.season.findMany({
        where: {
            seasonNumber: seasonNumber,
            serieId: serieId
        },
        include: {
            Episode: {
                include: {
                    TypeStream: true
                }
            }
        }
    });
    if (result.length === 0) {
        return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({ result: result[0] }, { status: 200 });
}