import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/app/_utils/getPrismaClient";

const prisma = prismaClient;

export async function GET(request: NextRequest) {

    const isCreated = await prisma.typeStream.findMany();
    if (isCreated.length !== 0) {
        return NextResponse.json({ message: "TypesStream déjà créés." }, { status: 403 });
    }

    const types = [
        { id: 1, name: "DVD" },
        { id: 2, name: "DVD Gravé" },
        { id: 3, name: "K7" },
        { id: 4, name: "Streaming" }
    ];

    await prisma.typeStream.createMany({
        data: types,
    });

    return NextResponse.json({ result: "TypesStream créés." }, { status: 201 });
}