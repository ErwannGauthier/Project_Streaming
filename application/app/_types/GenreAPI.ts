import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface GenreAPIObject {
    id: number;
    name: string;
}

export class GenreAPI {
    constructor(private _id: number, private _name: string) {
    }

    static getInstance(object: GenreAPIObject): GenreAPI {
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        return new GenreAPI(id, name);
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}