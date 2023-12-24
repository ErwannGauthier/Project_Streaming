import Credit, {CreditObject} from "@/app/_types/Credit";
import {JobSerie, JobSerieObject} from "@/app/_types/JobSerie";
import {
    DEFAULT_ARRAY_VALUE,
    DEFAULT_BOOLEAN_VALUE,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_STRING_VALUE
} from "@/app/_types/_constants";

export interface CrewSerieObject extends CreditObject {
    jobs: Array<JobSerieObject>;
    department: string;
    total_episode_count: number;
}

export class CrewSerie extends Credit {
    constructor(_adult: boolean, _gender: number, _id: number, _knownForDepartment: string, _name: string, _originalName: string, _popularity: number, _profilePath: string, private _jobs: Array<JobSerie>, private _department: string, private _totalEpisodeCount: number) {
        super(_adult, _gender, _id, _knownForDepartment, _name, _originalName, _popularity, _profilePath);
    }

    static getInstance(object: CrewSerieObject): CrewSerie {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const knownForDepartment: string = object?.known_for_department || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        const jobs: Array<JobSerie> = object?.jobs.map((jobSerieObject: JobSerieObject) => JobSerie.getInstance(jobSerieObject)) || DEFAULT_ARRAY_VALUE;
        const department: string = object?.department || DEFAULT_STRING_VALUE;
        const totalEpisodeCount: number = object?.total_episode_count || DEFAULT_NUMBER_VALUE;
        return new CrewSerie(adult, gender, id, knownForDepartment, name, originalName, popularity, profilePath, jobs, department, totalEpisodeCount);
    }

    get jobs(): Array<JobSerie> {
        return this._jobs;
    }

    get department(): string {
        return this._department;
    }

    get totalEpisodeCount(): number {
        return this._totalEpisodeCount;
    }
}