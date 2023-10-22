import {NextRequest, NextResponse} from "next/server";
import {existsSync, mkdirSync} from "fs";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const directory = searchParams.get("dir");

    if (!directory) {
        return NextResponse.json({ status: 400 });
    }

    try {
        if (!existsSync(directory)) {
            mkdirSync(directory);
        }
    } catch (error) {
        return NextResponse.json({ status: 400 });
    }

    return NextResponse.json({ status: 200 });
}