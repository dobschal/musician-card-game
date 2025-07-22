import {Band} from "./Band.ts";
import Card, {CardType} from "./Card.ts";

export default class extends Card {
    band: Band;
    instruments: Array<string> = [];

    constructor(name: string, band: Band, imageUrl: string, instruments: Array<string> = []) {
        super(CardType.Song, name, imageUrl);
        this.band = band;
        this.instruments = instruments;
    }
}
