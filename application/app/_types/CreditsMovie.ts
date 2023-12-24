import {CastMovie, CastMovieObject} from "./CastMovie";
import {CrewMovie, CrewMovieObject} from "./CrewMovie";
import {DEFAULT_ARRAY_VALUE} from "@/app/_types/_constants";

export interface CreditsMovieObject {
    cast: Array<CastMovieObject>,
    crew: Array<CrewMovieObject>,
}

export class CreditsMovie {
    constructor(private _cast: Array<CastMovie>, private _crew: Array<CrewMovie>) {
    }

    static getInstance(object: CreditsMovieObject): CreditsMovie {
        const cast: Array<CastMovie> = object?.cast.map((castObject: CastMovieObject) => CastMovie.getInstance(castObject)) || DEFAULT_ARRAY_VALUE;
        const crew: Array<CrewMovie> = object?.crew.map((crewObject: CrewMovieObject) => CrewMovie.getInstance(crewObject)) || DEFAULT_ARRAY_VALUE;
        return new CreditsMovie(cast, crew);
    }

    get cast(): Array<CastMovie> {
        return this._cast;
    }

    get crew(): Array<CrewMovie> {
        return this._crew;
    }

    isCast(): boolean {
        return this._cast !== DEFAULT_ARRAY_VALUE;
    }

    isCrew(): boolean {
        return this._crew !== DEFAULT_ARRAY_VALUE;
    }

    getCasting(): Array<CastMovie> {
        const maxCast: number = 10;
        return this._cast.length > maxCast ? this._cast.slice(0, maxCast) : this._cast;
    }

    getDirectorName(): string {
        const directors: Array<CrewMovie> = this._crew.filter((crewMovie: CrewMovie) => crewMovie.job.toLocaleLowerCase() === "director");
        return directors.length > 0 ? directors[0].name : "-";
    }
}