import {CastSerie, CastSerieObject} from "@/app/_types/CastSerie";
import {CrewSerie, CrewSerieObject} from "@/app/_types/CrewSerie";
import {DEFAULT_ARRAY_VALUE} from "@/app/_types/_constants";

export interface CreditsSerieObject {
    cast: Array<CastSerieObject>;
    crew: Array<CrewSerieObject>;
}

export class CreditsSerie {
    constructor(private _cast: Array<CastSerie>, private _crew: Array<CrewSerie>) {
    }

    static getInstance(object: CreditsSerieObject): CreditsSerie {
        const cast: Array<CastSerie> = object?.cast.map((castSerieObject: CastSerieObject) => CastSerie.getInstance(castSerieObject)) || DEFAULT_ARRAY_VALUE;
        const crew: Array<CrewSerie> = object?.crew.map((crewSerieObject: CrewSerieObject) => CrewSerie.getInstance(crewSerieObject)) || DEFAULT_ARRAY_VALUE;
        return new CreditsSerie(cast, crew);
    }

    get cast(): Array<CastSerie> {
        return this._cast;
    }

    get crew(): Array<CrewSerie> {
        return this._crew;
    }

    getCasting(): Array<CastSerie> {
        const maxCast: number = 10;
        return this._cast.length > maxCast ? this._cast.slice(0, maxCast) : this._cast;
    }
}