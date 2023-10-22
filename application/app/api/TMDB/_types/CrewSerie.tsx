import {JobSerie} from "./JobSerie";

export type CrewSerie = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    jobs: Array<JobSerie>;
    department: string;
    total_episode_count: number;
}