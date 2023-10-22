import {Media} from "./Media";

export type PersonSearch = {
    adult: boolean;
    name: string;
    original_name: string;
    media_type: string;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path: string;
    known_for: Array<Media>;
}