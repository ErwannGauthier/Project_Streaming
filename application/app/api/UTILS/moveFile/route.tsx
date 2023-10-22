import {NextRequest, NextResponse} from "next/server";
import {rename} from "fs";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const oldPath = searchParams.get("old");
    const newPath = searchParams.get("new");

    if (!oldPath || !newPath) {
        return NextResponse.json({ status: 400 });
    }

    try {
        await new Promise((resolve, reject) => {
            rename(oldPath, newPath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve("");
                }
            });
        });
    } catch (error) {
        return NextResponse.json({ status: 400 });
    }

    return NextResponse.json({ status: 200 });
}