import {CastMovie} from "./CastMovie";
import {CrewMovie} from "./CrewMovie";

export type CreditsMovie = {
    cast: Array<CastMovie>,
    crew: Array<CrewMovie>,
}