import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";

const prisma = prismaClient;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const serieId = Number(searchParams.get("id"));
    const result = await prisma.serie.findUnique({
        where: {
            id: serieId
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
            }
        }
    });
    if (!result) {
        return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({ result: result }, { status: 200 });
}