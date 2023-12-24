import {DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface ProductionCountryObject {
    iso_3166_1: string;
    name: string;
}

export class ProductionCountry {
    constructor(private _iso3166_1: string, private _name: string) {
    }

    static getInstance(object: ProductionCountryObject): ProductionCountry {
        const iso3166_1: string = object?.iso_3166_1 || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        return new ProductionCountry(iso3166_1, name);
    }

    get iso3166_1(): string {
        return this._iso3166_1;
    }

    get name(): string {
        return this._name;
    }
}