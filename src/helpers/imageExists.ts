import type {Optional} from "../classes/Optional.ts";

export default async function (url: Optional<string>) {
    if (!url) {
        return false;
    }
    const rawResponse = await fetch(url);
    if (!rawResponse.ok) {
        return false;
    }
    const contentType = rawResponse.headers.get("Content-Type");
    if (!contentType || !contentType.startsWith("image/")) {
        return false;
    }
    const blob = await rawResponse.blob();
    return blob.size > 0;
}
