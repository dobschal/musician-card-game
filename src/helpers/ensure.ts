import type {Nullable} from "../classes/Optional.ts";

export default function <T>(el: Nullable<T>): T {
    if (el === undefined || el === null) {
        throw new Error("Fatal: Expected a value, but got undefined or null");
    }
    return el;
}
