import {NextRequest, NextResponse} from "next/server";
import {SeasonDb} from "@/app/_types/PrismaTypes";
import {getSeasons} from "@/app/api/_services/SeasonService";

export async function GET(request: NextRequest) {
    const seasons: SeasonDb[] = await getSeasons();
    return NextResponse.json({...seasons}, {status: 200});
}