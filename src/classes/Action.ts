import Card, {CardType} from "./Card.ts";
import type Player from "./Player.ts";

export default class extends Card {

    logic: (activePlayer: Player, otherPlayers: Array<Player>) => void;

    constructor(name: string, imageUrl: string, logic: (activePlayer: Player, otherPlayers: Array<Player>) => void) {
        super(CardType.Action, name, imageUrl);
        this.logic = logic;
    }
}
