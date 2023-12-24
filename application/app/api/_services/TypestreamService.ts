import {PrismaClient, TypeStream} from "@prisma/client";

export async function addTypestream(): Promise<boolean> {
    const prisma = new PrismaClient();

    try {
        const isCreated: TypeStream[] = await prisma.typeStream.findMany();
        if (isCreated.length !== 0) {
            return false;
        }

        const types: { id: number, name: string }[] = [
            {id: 1, name: "DVD"},
            {id: 2, name: "DVD Gravé"},
            {id: 3, name: "K7"},
            {id: 4, name: "Streaming"}
        ];

        await prisma.typeStream.createMany({
            data: types,
        });

        return true;
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return false;
}