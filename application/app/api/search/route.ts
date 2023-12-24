import {NextRequest, NextResponse} from "next/server";
import {search, SearchResult} from "@/app/api/_services/SearchService";

export async function GET(request: NextRequest) {
    const searchParams: URLSearchParams = request.nextUrl.searchParams;
    const query: string | null = searchParams.get("q");
    if (!query) {
        return NextResponse.json({message: "La query ne peut pas être vide."}, {status: 400});
    }

    const searchResult: SearchResult = await search(query);
    return NextResponse.json({...searchResult}, {status: 200});
}