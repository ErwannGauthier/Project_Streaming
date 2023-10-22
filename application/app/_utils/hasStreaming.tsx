import {TypeStream} from "@prisma/client";

export function hasStreaming(typesStream: Array<TypeStream>) {
    let result = false;
    for (let i = 0; i < typesStream.length; i++) {
        let typeStream = typesStream[i];
        if (typeStream["name"].toLocaleLowerCase() === "streaming") {
            result = true;
            break;
        }
    }

    return result;
}