import {RoleSerie, RoleSerieObject} from "@/app/_types/RoleSerie";
import Credit, {CreditObject} from "@/app/_types/Credit";
import {
    DEFAULT_ARRAY_VALUE,
    DEFAULT_BOOLEAN_VALUE,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_STRING_VALUE
} from "@/app/_types/_constants";

export interface CastSerieObject extends CreditObject {
    roles: Array<RoleSerieObject>;
    total_episode_count: number;
    order: number;
}

export class CastSerie extends Credit {
    constructor(_adult: boolean, _gender: number, _id: number, _knownForDepartment: string, _name: string, _originalName: string, _popularity: number, _profilePath: string, private _roles: Array<RoleSerie>, private _totalEpisodeCount: number, private _order: number) {
        super(_adult, _gender, _id, _knownForDepartment, _name, _originalName, _popularity, _profilePath);
    }

    static getInstance(object: CastSerieObject): CastSerie {
        const adult: boolean = object?.adult || DEFAULT_BOOLEAN_VALUE;
        const gender: number = object?.gender || DEFAULT_NUMBER_VALUE;
        const id: number = object?.id || DEFAULT_NUMBER_VALUE;
        const knownForDepartment: string = object?.known_for_department || DEFAULT_STRING_VALUE;
        const name: string = object?.name || DEFAULT_STRING_VALUE;
        const originalName: string = object?.original_name || DEFAULT_STRING_VALUE;
        const popularity: number = object?.popularity || DEFAULT_NUMBER_VALUE;
        const profilePath: string = object?.profile_path || DEFAULT_STRING_VALUE;
        const roles: Array<RoleSerie> = object?.roles.map((roleSerieObject: RoleSerieObject) => RoleSerie.getInstance(roleSerieObject)) || DEFAULT_ARRAY_VALUE;
        const totalEpisodeCount: number = object?.total_episode_count || DEFAULT_NUMBER_VALUE;
        const order: number = object?.order || DEFAULT_NUMBER_VALUE;
        return new CastSerie(adult, gender, id, knownForDepartment, name, originalName, popularity, profilePath, roles, totalEpisodeCount, order);
    }

    get roles(): Array<RoleSerie> {
        return this._roles;
    }

    get totalEpisodeCount(): number {
        return this._totalEpisodeCount;
    }

    get order(): number {
        return this._order;
    }

    isRoles(): boolean {
        return this._roles !== DEFAULT_ARRAY_VALUE;
    }
}