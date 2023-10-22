import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";

const prisma = prismaClient;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const result = await prisma.genre.findMany({ orderBy: { name: 'asc' }, include: { Movie: { include: { TypeStream: {}, Genre: {} } }, Serie: { include: { Genre: {} } } } });

    return NextResponse.json({ result: result }, { status: 200 });
}