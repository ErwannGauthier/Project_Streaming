import {apiKey} from "@/app/_utils/localVariables";
import {existsSync, lstatSync, mkdirSync, readdirSync, rename, rmSync} from "fs";

export function bodyValidator(body: any, requiredFields: string[]): boolean {
    const missingFields: string[] = requiredFields.filter((field: string) => body[field] === undefined);
    return missingFields.length <= 0;
}

export async function callApi(url: string): Promise<any> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `'Bearer ${apiKey}`
        }
    };

    const response: Response = await fetch(url, options);
    return await response.json();
}

export function createDirectory(directoryPath: string): boolean {
    try {
        if (!existsSync(directoryPath)) {
            mkdirSync(directoryPath);
        }

        return true;
    } catch (error: any) {
        console.error(error);
    }

    return false;
}

export function removeDirectory(directoryPath: string): boolean {
    try {
        if (!existsSync(directoryPath)) {
            return false;
        }

        rmSync(directoryPath, {recursive: true});
        return true;
    } catch (error: any) {
        console.error(error);
    }

    return false;
}

export async function moveDirectory(sourcePath: string, destinationPath: string): Promise<boolean> {
    try {
        await new Promise((resolve, reject) => {
            rename(sourcePath, destinationPath, function (err: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve("");
                }
            });
        });

        return true;
    } catch (error) {
        console.error(error);
    }

    return false;
}

export function getWatchableDirectories(sourceDirectory: string): string[] {
    const directories: string[] = readdirSync(sourceDirectory).filter((name: string) => lstatSync(`${sourceDirectory}/${name}`).isDirectory() && existsSync(`${sourceDirectory}/${name}/output.m3u8`));
    return directories;
}