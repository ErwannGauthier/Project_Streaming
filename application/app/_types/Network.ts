import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface NetworkObject {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export class Network {
    constructor(private _id: number, private _logoPath: string, private _name: string, private _originCountry: string) {
    }

    static getInstance(object: NetworkObject): Network {
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const logoPath: string = object?.logo_path || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originCountry = object?.origin_country || DEFAULT_STRING_VALUE;
        return new Network(id, logoPath, name, originCountry);
    }

    get id(): number {
        return this._id;
    }

    get logoPath(): string {
        return this._logoPath;
    }

    get name(): string {
        return this._name;
    }

    get originCountry(): string {
        return this._originCountry;
    }
}