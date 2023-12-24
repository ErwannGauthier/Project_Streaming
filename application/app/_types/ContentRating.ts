import {DEFAULT_ARRAY_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface ContentRatingObject {
    descriptors: Array<any>;
    iso_3166_1: string;
    rating: string;
}

export class ContentRating {
    constructor(private _descriptors: Array<any>, private _iso3166_1: string, private _rating: string) {
    }

    static getInstance(object: ContentRatingObject): ContentRating {
        const descriptors: Array<any> = object?.descriptors || DEFAULT_ARRAY_VALUE;
        const iso3166_1: string = object?.iso_3166_1 || DEFAULT_STRING_VALUE;
        const rating: string = object?.rating || DEFAULT_STRING_VALUE;
        return new ContentRating(descriptors, iso3166_1, rating);
    }

    get descriptors(): Array<any> {
        return this._descriptors;
    }

    get iso3166_1(): string {
        return this._iso3166_1;
    }

    get rating(): string {
        return this._rating;
    }
}