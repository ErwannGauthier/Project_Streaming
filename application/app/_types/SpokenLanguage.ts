import {DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface SpokenLanguageObject {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export class SpokenLanguage {
    constructor(private _englishName: string, private _iso639_1: string, private _name: string) {
    }

    static getInstance(object: SpokenLanguageObject): SpokenLanguage {
        const englishName: string = object?.english_name || DEFAULT_STRING_VALUE;
        const iso639_1: string = object?.iso_639_1 || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        return new SpokenLanguage(englishName, iso639_1, name);
    }

    get englishName(): string {
        return this._englishName;
    }

    get iso639_1(): string {
        return this._iso639_1;
    }

    get name(): string {
        return this._name;
    }
}