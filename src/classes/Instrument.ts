import Card, {CardType} from "./Card.ts";

export enum InstrumentType {
    Guitar = "Guitar",
    Drums = "Drums",
    Bass = "Bass",
    Vocals = "Vocals",
}

export default class Instrument extends Card {
    type: InstrumentType;

    constructor(type: InstrumentType, name: string, imageUrl: string) {
        super(CardType.Instrument, name, imageUrl);
        this.type = type;
    }
}
