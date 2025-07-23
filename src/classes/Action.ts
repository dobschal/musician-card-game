import Card, {CardType} from "./Card.ts";

export default class extends Card {

    logic: () => void;

    constructor(name: string, imageUrl: string, logic: () => void) {
        super(CardType.Action, name, imageUrl);
        this.logic = logic;
    }
}
