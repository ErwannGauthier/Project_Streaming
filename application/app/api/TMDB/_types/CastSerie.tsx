import {RoleSerie} from "./RoleSerie";

export type CastSerie = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    roles: Array<RoleSerie>;
    total_episode_count: number;
    order: number;
}