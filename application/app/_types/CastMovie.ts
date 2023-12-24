import Credit, {CreditObject} from "@/app/_types/Credit";
import {DEFAULT_BOOLEAN_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface CastMovieObject extends CreditObject {
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export class CastMovie extends Credit {
    constructor(_adult: boolean, _gender: number, _id: number, _knownForDepartment: string, _name: string, _originalName: string, _popularity: number, _profilePath: string, private _castId: number, private _character: string, private _creditId: string, private _order: number) {
        super(_adult, _gender, _id, _knownForDepartment, _name, _originalName, _popularity, _profilePath);
    }

    static getInstance(object: CastMovieObject): CastMovie {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const knownForDepartment: string = object?.known_for_department || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        const castId: number = object?.cast_id || DEFAULT_NUMBER_VALUE;
        const character: string = object?.character || DEFAULT_STRING_VALUE;
        const creditId: string = object?.credit_id || DEFAULT_STRING_VALUE;
        const order: number = object?.order || DEFAULT_NUMBER_VALUE;
        return new CastMovie(adult, gender, id, knownForDepartment, name, originalName, popularity, profilePath, castId, character, creditId, order);
    }

    get castId(): number {
        return this._castId;
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

    isCharacter(): boolean {
        return this._character !== DEFAULT_STRING_VALUE;
    }
}