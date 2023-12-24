import {DEFAULT_ARRAY_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";

export interface ReleaseDateObject {
    certification: string;
    descriptors: Array<any>;
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
}

export class ReleaseDate {
    constructor(private _certification: string, private _descriptors: Array<any>, private _iso639_1: string, private _note: string, private _releaseDate: string, private _type: number) {
    }

    static getInstance(object: ReleaseDateObject): ReleaseDate {
        const certification: string = object?.certification || DEFAULT_STRING_VALUE;
        const descriptors: Array<any> = object?.descriptors || DEFAULT_ARRAY_VALUE;
        const iso639_1: string = object?.iso_639_1 || DEFAULT_STRING_VALUE;
        const note: string = object?.note || DEFAULT_STRING_VALUE;
        const releaseDate: string = object?.release_date || DEFAULT_STRING_VALUE;
        const type: number = object?.type || DEFAULT_NUMBER_VALUE;
        return new ReleaseDate(certification, descriptors, iso639_1, note, releaseDate, type);
    }

    get certification(): string {
        return this._certification;
    }

    get descriptors(): Array<any> {
        return this._descriptors;
    }

    get iso639_1(): string {
        return this._iso639_1;
    }

    get note(): string {
        return this._note;
    }

    get releaseDate(): string {
        return this._releaseDate;
    }

    get type(): number {
        return this._type;
    }

    getFormatedDate(): string {
        const date: Date = new Date(this._releaseDate);
        return format(date, 'dd/MM/yyyy', {locale: frLocale});
    }

    getYear(): string {
        const date: Date = new Date(this._releaseDate);
        return format(date, 'yyyy', {locale: frLocale});
    }
}