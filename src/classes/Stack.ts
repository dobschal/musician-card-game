import Card, {CardFace} from "./Card.ts";
import type {Optional} from "./Optional.ts";

export default class {
    cards: Array<Card>;
    uiRoot: HTMLElement;
    face: CardFace = CardFace.Down;
    _isHighlighted: boolean = false;

    constructor(cards: Array<Card>, uiRoot: HTMLElement, face: CardFace = CardFace.Down) {
        this.cards = cards;
        this.uiRoot = uiRoot;
        this.face = face;
        this.render();
    }

    set highlighted(val: boolean) {
        this._isHighlighted = val;
        this.render();
    }

    get highlighted(): boolean {
        return this._isHighlighted;
    }

    shuffle() {
        let currentIndex = this.cards.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [
                this.cards[randomIndex],
                this.cards[currentIndex],
            ];
        }
        this.render();
        return this;
    }

    drawCard(): Optional<Card> {
        const card = this.cards.pop();
        this.render();
        return card;
    }

    drawCards(amount: number): Array<Card> {
        const cards: Array<Card> = [];
        for (let i = 0; i < amount; i++) {
            const card = this.drawCard(); // this is triggering the render event
            if (!card) return cards;
            cards.push(card);
        }
        return cards;
    }

    addCard(card: Card) {
        this.cards.push(card);
        this.render();
        return this;
    }

    render() {
        this.uiRoot.innerHTML = "";
        if (this.highlighted && this.cards.length > 0) {
            this.uiRoot.classList.add("pulsed");
        } else {
            this.uiRoot.classList.remove("pulsed");
        }
        this.cards.forEach((card) => {
            const cardElement = card.render(this.face);
            this.uiRoot.appendChild(cardElement);
        });
        return this.uiRoot;
    }

    onClick(callback: () => void) {
        this.uiRoot.addEventListener("click", callback);
        return this;
    }

    empty(): Array<Card> {
        const cards = this.cards;
        this.cards = [];
        this.render();
        return cards;
    }
}
