import {NextRequest, NextResponse} from "next/server";
import {addTypestream} from "@/app/api/_services/TypestreamService";

export async function POST(request: NextRequest) {
    const isCreated: boolean = await addTypestream();
    if (!isCreated) {
        return NextResponse.json(({message: "Une erreur est survenue lors de la créations des types."}))
    }

    return NextResponse.json({result: "Les types ont été créés avec succès."}, {status: 201});
}