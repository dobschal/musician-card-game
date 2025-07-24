import type {Optional} from "../classes/Optional.ts";

export default function <T>(arr: Array<T>): Optional<T> {
    if (arr.length === 0) {
        return;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
