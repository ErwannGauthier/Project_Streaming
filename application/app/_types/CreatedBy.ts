import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface CreatedByObject {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

export class CreatedBy {
    constructor(private _id: number, private _creditId: string, private _name: string, private _gender: number, private _profilePath: string) {
    }

    static getInstance(object: CreatedByObject): CreatedBy {
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const creditId: string = object?.credit_id || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        return new CreatedBy(id, creditId, name, gender, profilePath);
    }

    get id(): number {
        return this._id;
    }

    get creditId(): string {
        return this._creditId;
    }

    get name(): string {
        return this._name;
    }

    get gender(): number {
        return this._gender;
    }

    get profilePath(): string {
        return this._profilePath;
    }
}