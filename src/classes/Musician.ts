import {Band} from "./Band.ts";
import Card, {CardType} from "./Card.ts";
import {InstrumentType} from "./Instrument.ts";

export default class Musician extends Card {
    band: Band;
    instruments: Array<InstrumentType>;

    constructor(
        name: string,
        band: Band,
        instruments: Array<InstrumentType>,
        imageUrl: string
    ) {
        super(CardType.Musician, name, imageUrl);
        this.band = band;
        this.instruments = instruments;
    }
}
