import {DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface CreditObject {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export default abstract class Credit {
    protected constructor(private _adult: boolean, private _gender: number, private _id: number, private _knownForDepartment: string, private _name: string, private _originalName: string, private _popularity: number, private _profilePath: string) {
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

    isProfilePath(): boolean {
        return this._profilePath !== DEFAULT_STRING_VALUE;
    }

    isName(): boolean {
        return this._name !== DEFAULT_STRING_VALUE;
    }
}