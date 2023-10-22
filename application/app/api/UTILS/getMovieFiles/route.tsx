import {NextRequest, NextResponse} from "next/server";
import {lstatSync, readdirSync} from "fs";
import {extname} from "path";
import {fileMovieDir} from "@/app/_utils/localVariables";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    let files: Array<String> = [];
    readdirSync(fileMovieDir).forEach(file => {
        if (lstatSync(`${fileMovieDir}/${file}`).isFile() && extname(`${fileMovieDir}/${file}`) === '.mp4') {
            files.push(file);
        }
    });
    return NextResponse.json({ "files": files }, { status: 200 });
}