import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface JobSerieObject {
    credit_id: string;
    job: string;
    episode_count: number;
}

export class JobSerie {
    constructor(private _creditId: string, private _job: string, private _episodeCount: number) {
    }

    static getInstance(object: JobSerieObject): JobSerie {
        const creditId: string = object?.credit_id || DEFAULT_STRING_VALUE;
        const job: string = object?.job || DEFAULT_STRING_VALUE;
        const episodeCount: number = object?.episode_count || DEFAULT_NUMBER_VALUE;
        return new JobSerie(creditId, job, episodeCount);
    }

    get creditId(): string {
        return this._creditId;
    }

    get job(): string {
        return this._job;
    }

    get episodeCount(): number {
        return this._episodeCount;
    }
}