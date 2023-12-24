import {Media, MediaObject} from "@/app/_types/Media";
import {
    DEFAULT_ARRAY_VALUE,
    DEFAULT_BOOLEAN_VALUE,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_STRING_VALUE
} from "@/app/_types/_constants";

export interface PersonSearchObject {
    adult: boolean;
    name: string;
    original_name: string;
    media_type: string;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path: string;
    known_for: Array<MediaObject>;
}

export class PersonSearch {
    constructor(private _adult: boolean, private _name: string, private _originalName: string, private _mediaType: string, private _popularity: number, private _gender: number, private _knownForDepartment: string, private _profilePath: string, private _knownFor: Array<Media>) {
    }

    static getInstance(object: PersonSearchObject): PersonSearch {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const mediaType: string = object?.media_type || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const knownForDepartment: string = object?.known_for_department || DEFAULT_STRING_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        const knownFor: Array<Media> = object?.known_for.map((mediaObject: MediaObject) => Media.getInstance(mediaObject)) || DEFAULT_ARRAY_VALUE;
        return new PersonSearch(adult, name, originalName, mediaType, popularity, gender, knownForDepartment, profilePath, knownFor);
    }

    get adult(): boolean {
        return this._adult;
    }

    get name(): string {
        return this._name;
    }

    get originalName(): string {
        return this._originalName;
    }

    get mediaType(): string {
        return this._mediaType;
    }

    get popularity(): number {
        return this._popularity;
    }

    get gender(): number {
        return this._gender;
    }

    get knownForDepartment(): string {
        return this._knownForDepartment;
    }

    get profilePath(): string {
        return this._profilePath;
    }

    get knownFor(): Array<Media> {
        return this._knownFor;
    }
}