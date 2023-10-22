import {CastSerie} from "./CastSerie";
import {CrewSerie} from "./CrewSerie";

export type CreditsSerie = {
    cast: Array<CastSerie>;
    crew: Array<CrewSerie>;
}