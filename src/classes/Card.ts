import imageExists from "../helpers/imageExists.ts";

let __cardId = 0;

export enum CardFace {
    Up = "face-up",
    Down = "face-down",
}

export enum CardType {
    Musician,
    Instrument,
    Song,
    Action
}

export default class Card {
    cardType: CardType;
    name: string;
    imageUrl: string;
    imageExists: boolean = false;
    id: number = __cardId++;

    constructor(cardType: CardType, name: string, imageUrl: string) {
        this.cardType = cardType;
        this.name = name;
        this.imageUrl = imageUrl;
        imageExists(imageUrl).then(exists => {
            this.imageExists = exists;
            if (!exists) {
                console.warn(`Image not found for card: ${name} (${imageUrl})`);
            }
        });
    }

    render(cardFace: CardFace = CardFace.Up): HTMLElement {
        const el = document.createElement("div");
        el.className = "card " + cardFace;
        if (cardFace === CardFace.Up) {
            el.style.backgroundImage = `url(${this.imageUrl})`;
            // if (!this.imageExists) {
            //     el.innerHTML = `<div class="card-name">${this.name}</div>`;
            // }
        }
        return el;
    }
}
