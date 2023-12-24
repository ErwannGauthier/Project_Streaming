import {ReleaseDate, ReleaseDateObject} from "@/app/_types/ReleaseDate";
import {DEFAULT_ARRAY_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface ReleaseDatesObject {
    iso_3166_1: string;
    release_dates: Array<ReleaseDateObject>;
}

export class ReleaseDates {
    constructor(private _iso3166_1: string, private _releaseDates: Array<ReleaseDate>) {
    }

    static getInstance(object: ReleaseDatesObject): ReleaseDates {
        const iso3166_1: string = object?.iso_3166_1 || DEFAULT_STRING_VALUE;
        const releaseDates: Array<ReleaseDate> = object?.release_dates.map((releaseDate: ReleaseDateObject) => ReleaseDate.getInstance(releaseDate)) || DEFAULT_ARRAY_VALUE;
        return new ReleaseDates(iso3166_1, releaseDates);
    }

    get iso3166_1(): string {
        return this._iso3166_1;
    }

    get releaseDates(): Array<ReleaseDate> {
        return this._releaseDates;
    }
}