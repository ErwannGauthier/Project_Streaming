import {NextRequest, NextResponse} from "next/server";
import {lstatSync, readdirSync} from "fs";
import {extname} from "path";
import {fileSerieDir} from "@/app/_utils/localVariables";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    let files: Array<String> = [];
    readdirSync(fileSerieDir).forEach(file => {
        if (lstatSync(`${fileSerieDir}/${file}`).isFile() && extname(`${fileSerieDir}/${file}`) === '.mp4') {
            files.push(file);
        }
    });

    return NextResponse.json({ "files": files }, { status: 200 });
}