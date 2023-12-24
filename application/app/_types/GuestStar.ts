import {DEFAULT_BOOLEAN_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface GuestStarObject {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export class GuestStar {
    constructor(private _character: string, private _creditId: string, private _order: number, private _adult: boolean, private _gender: number, private _id: number, private _knownForDepartment: string, private _name: string, private _originalName: string, private _popularity: number, private _profilePath: string) {
    }

    static getInstance(object: GuestStarObject): GuestStar {
        const character: string = object?.character || DEFAULT_STRING_VALUE;
        const creditId: string = object?.credit_id || DEFAULT_STRING_VALUE;
        const order: number = object?.order || DEFAULT_NUMBER_VALUE;
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const knownForDepartment: string = object?.known_for_department || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        return new GuestStar(character, creditId, order, adult, gender, id, knownForDepartment, name, originalName, popularity, profilePath);
    }

    get character(): string {
        return this._character;
    }

    get creditId(): string {
        return this._creditId;
    }

    get order(): number {
        return this._order;
    }

    get adult(): boolean {
        return this._adult;
    }

    get gender(): number {
        return this._gender;
    }

    get id(): number {
        return this._id;
    }

    get knownForDepartment(): string {
        return this._knownForDepartment;
    }

    get name(): string {
        return this._name;
    }

    get originalName(): string {
        return this._originalName;
    }

    get popularity(): number {
        return this._popularity;
    }

    get profilePath(): string {
        return this._profilePath;
    }
}