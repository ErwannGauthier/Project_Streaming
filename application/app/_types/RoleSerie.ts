import {DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE} from "@/app/_types/_constants";

export interface RoleSerieObject {
    credit_id: string;
    character: string;
    episode_count: number;
}

export class RoleSerie {
    constructor(private _creditId: string, private _character: string, private _episodeCount: number) {
    }

    static getInstance(object: RoleSerieObject): RoleSerie {
        const creditId: string = object?.credit_id || DEFAULT_STRING_VALUE;
        const character: string = object?.character || DEFAULT_STRING_VALUE;
        const episodeCount: number = object?.episode_count || DEFAULT_NUMBER_VALUE;
        return new RoleSerie(creditId, character, episodeCount);
    }

    get creditId(): string {
        return this._creditId;
    }

    get character(): string {
        return this._character;
    }

    get episodeCount(): number {
        return this._episodeCount;
    }

    isCharacter(): boolean {
        return this._character !== DEFAULT_STRING_VALUE;
    }
}