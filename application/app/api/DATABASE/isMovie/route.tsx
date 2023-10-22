import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";

const prisma = prismaClient;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = Number(searchParams.get("id"));

    const movie = await prisma.movie.findUnique({ where: { id: id }, include: { TypeStream: true } })
    if (!movie) {
        return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({ movie: movie }, { status: 200 });
}