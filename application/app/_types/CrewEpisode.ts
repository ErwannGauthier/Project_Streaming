import {DEFAULT_BOOLEAN_VALUE, DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface CrewEpisodeObject {
    department: string;
    job: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export class CrewEpisode {
    constructor(private _department: string, private _job: string, private _creditId: string, private _adult: boolean, private _gender: number, private _id: number, private _knownForDepartment: string, private _name: string, private _originalName: string, private _popularity: number, private _profilePath: string) {
    }


    static getInstance(object: CrewEpisodeObject): CrewEpisode {
        const department: string = object?.department || DEFAULT_STRING_VALUE;
        const job: string = object?.job || DEFAULT_STRING_VALUE;
        const creditId: string = object?.credit_id || DEFAULT_STRING_VALUE;
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const knownForDepartment: string = object?.known_for_department || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        return new CrewEpisode(department, job, creditId, adult, gender, id, knownForDepartment, name, originalName, popularity, profilePath)
    }

    get department(): string {
        return this._department;
    }

    get job(): string {
        return this._job;
    }

    get creditId(): string {
        return this._creditId;
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