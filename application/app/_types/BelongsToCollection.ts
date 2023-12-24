import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface BelongsToCollectionObject {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export class BelongsToCollection {
    constructor(private _id: number, private _name: string, private _posterPath: string, private _backdropPath: string) {
    }

    static getInstance(object: BelongsToCollectionObject): BelongsToCollection {
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const posterPath: string = object?.poster_path || DEFAULT_STRING_VALUE;
        const backdropPath: string = object?.backdrop_path || DEFAULT_STRING_VALUE;
        return new BelongsToCollection(id, name, posterPath, backdropPath);
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get posterPath(): string {
        return this._posterPath;
    }

    get backdropPath(): string {
        return this._backdropPath;
    }
}