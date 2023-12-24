import Credit, {CreditObject} from "@/app/_types/Credit";
import {DEFAULT_BOOLEAN_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface CrewMovieObject extends CreditObject {
    credit_id: string;
    department: string;
    job: string;
}

export class CrewMovie extends Credit {
    constructor(_adult: boolean, _gender: number, _id: number, _knownForDepartment: string, _name: string, _originalName: string, _popularity: number, _profilePath: string, private _creditId: string, private _department: string, private _job: string) {
        super(_adult, _gender, _id, _knownForDepartment, _name, _originalName, _popularity, _profilePath);
    }

    static getInstance(object: CrewMovieObject): CrewMovie {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const knownForDepartment: string = object?.known_for_department || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        const creditId: string = object?.credit_id || DEFAULT_STRING_VALUE;
        const department: string = object?.department || DEFAULT_STRING_VALUE;
        const job: string = object?.job || DEFAULT_STRING_VALUE;
        return new CrewMovie(adult, gender, id, knownForDepartment, name, originalName, popularity, profilePath, creditId, department, job);
    }

    get creditId(): string {
        return this._creditId;
    }

    get department(): string {
        return this._department;
    }

    get job(): string {
        return this._job;
    }
}