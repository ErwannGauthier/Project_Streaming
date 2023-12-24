import {NextRequest, NextResponse} from "next/server";
import {SerieDb} from "@/app/_types/PrismaTypes";
import {getSeries} from "@/app/api/_services/SerieService";

export async function GET(request: NextRequest) {
    const series: SerieDb[] = await getSeries();
    return NextResponse.json({...series}, {status: 200});
}