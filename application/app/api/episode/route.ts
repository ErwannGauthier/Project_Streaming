import {NextRequest, NextResponse} from "next/server";
import {EpisodeDb} from "@/app/_types/PrismaTypes";
import {getEpisodes} from "@/app/api/_services/EpisodeService";

export async function GET(request: NextRequest) {
    const episodes: EpisodeDb[] = await getEpisodes();
    return NextResponse.json({...episodes}, {status: 200});
}