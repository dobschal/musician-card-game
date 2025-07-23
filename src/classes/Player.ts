import Card, {CardFace} from "./Card.ts";
import createElement from "../helpers/createElement.ts";
import EventHandler from "./EventHandler.ts";
import type {Optional} from "./Optional.ts";
import ensure from "../helpers/ensure.ts";
import Musician from "./Musician.ts";
import Instrument, {InstrumentType} from "./Instrument.ts";
import Song from "./Song.ts";
import showMessage from "../helpers/showMessage.ts";
import type Stack from "./Stack.ts";
import delay from "../helpers/delay.ts";

let __playerId = 0;

export default class extends EventHandler<Card> {
    id: number = __playerId++;
    name: string;
    handCards: Array<Card>;
    playedCards: Array<Array<Card>> = [
        [],
        [],
        []
    ];
    isHuman: boolean;
    uiRoot: HTMLElement;
    isActive: boolean = false;
    selectedCard: Optional<Card>;
    color: string;
    isInEndPhase: Optional<boolean>;
    hasDrawnCard: boolean = false;
    endTurnButton: Optional<HTMLElement>;
    cancelButton: Optional<HTMLElement>;
    pointsElement: Optional<HTMLElement>;
    drawStack: Stack;
    discardStack: Stack;
    isTakingDiscardStack: boolean = false;
    hasPlayedASong: boolean = false;
    completedSongs: Array<boolean> = [false, false, false];

    constructor(name: string, handCards: Array<Card>, isHuman: boolean = false, uiRoot: HTMLElement, color: string, drawStack: Stack, discardStack: Stack) {
        super();
        this.name = name;
        this.handCards = handCards;
        this.isHuman = isHuman;
        this.uiRoot = uiRoot;
        this.color = color;
        this.drawStack = drawStack;
        this.discardStack = discardStack;
        this.render();
        this.handleCardDraw();
        this.handleTakeDiscardStack();
    }

    handleCardDraw() {
        this.drawStack.onClick(() => {
            if (!this.isActive || !this.isHuman || this.isInEndPhase || this.hasDrawnCard) return;
            this.hasDrawnCard = true;
            this.drawStack.highlighted = false;
            this.discardStack.highlighted = false;
            const card = this.drawStack.drawCard();
            if (!card) return;
            this.addHandCards([card]);
            if (this.isHuman) {
                const hasNoSong = this.playedCards.every(zone => zone.length === 0) && this.handCards.every(card => !(card instanceof Song));
                if (hasNoSong) {
                    showMessage("Du hast leider keinen Song zum Ausspielen auf der Hand... Beende deinen Zug.", "error");
                    return;
                }
            }
        });
    }

    handleTakeDiscardStack() {
        this.discardStack.onClick(() => {
            if (!this.isActive || !this.isHuman || this.isInEndPhase || this.hasDrawnCard) return;
            const card = this.discardStack.drawCard();
            if (!card) {
                showMessage("Der Ablagestapel ist leer.", "error");
                return;
            }
            this.isTakingDiscardStack = true;
            this.selectedCard = card;
            showMessage("Wähle aus wo die Karten abgelegt werden sollen.", "info");
            this.render();
        });
    }

    setActive() {
        this.hasPlayedASong = false;
        this.hasDrawnCard = false;
        this.isActive = true;
        this.render();
        if (this.isHuman) {
            this.drawStack.highlighted = true;
            this.discardStack.highlighted = true;
        }
        return this;
    }

    setInactive() {
        this.hasPlayedASong = false;
        this.hasDrawnCard = false;
        this.isActive = false;
        this.render();
        return this;
    }

    render() {
        this.uiRoot.style.borderColor = this.color;
        this.uiRoot.innerHTML = "";
        this.renderEndTurnButton();
        this.renderHandCards();
        this.renderCardZones();
        this.renderCancelButton();
        this.renderPoints();
        return this.uiRoot;
    }

    calculatePoints(): number {
        const points = this.playedCards.reduce((acc, zone) => {
            return acc + zone.reduce((zoneAcc, card) => {
                if (card instanceof Song) {
                    return zoneAcc + 20; // Songs are worth 3 points
                } else if (card instanceof Musician) {
                    return zoneAcc + 10; // Musicians are worth 2 points
                } else if (card instanceof Instrument) {
                    return zoneAcc + 5; // Instruments are worth 1 point
                }
                return zoneAcc;
            }, 0);
        }, 0);
        if (this.completedSongs.every(completed => !completed)) {
            return points * -1;
        }
        const pointsForCompletedSongs = this.completedSongs.reduce((acc, completed) => {
            return acc + (completed ? 300 : 0); // Completed songs are worth 10 points
        }, 0);
        return points + pointsForCompletedSongs;
    }

    renderPoints() {
        if (this.pointsElement) {
            this.pointsElement.remove();
            this.pointsElement = undefined;
        }
        const points = this.calculatePoints();
        this.pointsElement = createElement({
            target: this.uiRoot,
            className: "points" + (points > 0 ? " positive" : " negative") + (this.isActive ? " pulsed" : ""),
            text: `${this.name}: ${points}`,
        });

    }

    renderHandCards() {
        const rotationPerCard = 5;
        const rotationStart = -((this.handCards.length - 1) * rotationPerCard) / 2;
        const widthPerCard = Math.min(window.innerWidth / this.handCards.length, 50);
        const handCardsElement = createElement({
            target: this.uiRoot,
            className: "hand-cards",
            style: `width: ${this.handCards.length * widthPerCard}px`
        });
        const hasNoSongPlayedYet = this.playedCards.every(zone => zone.length === 0);
        this.handCards.forEach((card, index) => {
            const cardElement = card.render(this.isHuman ? CardFace.Up : CardFace.Down);
            cardElement.style.transform = `rotate(${rotationStart + index * rotationPerCard}deg)`;
            cardElement.style.left = `${(index * widthPerCard)}px`;
            // apply some arc offset to the top value
            cardElement.style.top = `${(Math.abs(index - this.handCards.length / 2) * 5) - 25}px`;
            cardElement.addEventListener("mouseenter", () => {
                let isBeforeHoveredCard = true;
                (Array.from(handCardsElement.children) as Array<HTMLElement>).forEach((el: HTMLElement) => {
                    if (isBeforeHoveredCard) {
                        el.style.left = `${(Array.from(handCardsElement.children).indexOf(el) * widthPerCard)}px`;
                    } else {
                        el.style.left = `${(Array.from(handCardsElement.children).indexOf(el) * widthPerCard) + widthPerCard + 10}px`;
                    }
                    if (el === cardElement) {
                        isBeforeHoveredCard = false;
                    }
                });
            });
            cardElement.addEventListener("mouseleave", () => {
                (Array.from(handCardsElement.children) as Array<HTMLElement>).forEach((el: HTMLElement) => {
                    el.style.left = `${(Array.from(handCardsElement.children).indexOf(el) * widthPerCard)}px`;
                });
            });
            if (this.selectedCard) {
                if (this.selectedCard === card) {
                    cardElement.classList.add("selected");
                    cardElement.classList.remove("not-selected");
                } else {
                    cardElement.classList.add("not-selected");
                    cardElement.classList.remove("selected");
                }
            }
            handCardsElement.appendChild(cardElement);
            if (this.isInEndPhase || (card instanceof Song && hasNoSongPlayedYet && this.hasDrawnCard)) {
                cardElement.classList.add("pulsed");
            }
            cardElement.addEventListener("click", () => {
                if (this.isTakingDiscardStack || !this.isHuman || !this.isActive) {
                    return;
                }
                if (this.isInEndPhase) {
                    this.isInEndPhase = false;
                    this.selectedCard = undefined;
                    this.handCards = this.handCards.filter(c => c !== card);
                    this.render();
                    this.emit("endTurn", card);
                    return;
                }
                this.selectedCard = card;
                this.render();
            });
        });
        return this.uiRoot;
    }

    renderCancelButton() {
        if (this.cancelButton) {
            this.cancelButton.remove();
            this.cancelButton = undefined;
        }
        if (this.selectedCard) {
            this.cancelButton = createElement({
                target: ensure(document.querySelector("main")),
                tag: "button",
                text: "Abbrechen",
                className: "cancel-button",
                style: `background-color: ${this.color};`,
                onClick: () => {
                    if (this.selectedCard && this.isTakingDiscardStack) {
                        this.isTakingDiscardStack = false;
                        this.discardStack.addCard(this.selectedCard);
                    }
                    this.selectedCard = undefined;
                    this.render();
                }
            });
        }
    }

    renderEndTurnButton() {
        if (this.endTurnButton) {
            this.endTurnButton.remove();
            this.endTurnButton = undefined;
        }
        if (!this.isHuman || !this.isActive || this.isInEndPhase || this.isTakingDiscardStack || !this.hasDrawnCard || this.selectedCard) {
            return;
        }
        this.endTurnButton = createElement({
            target: ensure(document.querySelector("main")),
            tag: "button",
            text: "Zug beenden",
            className: "end-turn-button",
            style: `background-color: ${this.color};`,
            onClick: () => {
                const message = this.areZonesValid();
                if (message) {
                    showMessage(message, "error");
                    return;
                }
                showMessage("Wähle eine Karte aus um sie abzuwerfen.");
                this.isInEndPhase = true;
                this.selectedCard = undefined;
                this.render();
            }
        });
    }

    renderCardZones() {
        const playedCardsElement = createElement({
            target: this.uiRoot,
            className: "played-cards-wrapper " + (this.selectedCard ? "active" : "")
        });
        for (let i = 0; i < 3; i++) {
            const el = createElement({
                target: playedCardsElement,
                className: "played-cards " + (this.completedSongs[i] ? "completed" : ""),
                onClick: () => {
                    const index = i;
                    if (!this.selectedCard) return;
                    const message = this.isAllowedToPlayCard(this.selectedCard, this.playedCards[index]);
                    if (message) {
                        if (this.isTakingDiscardStack) {
                            this.isTakingDiscardStack = false;
                            this.discardStack.addCard(this.selectedCard);
                        }
                        showMessage(message, "error");
                        this.selectedCard = undefined;
                        this.render();
                        return;
                    }
                    if (this.isTakingDiscardStack) {
                        this.hasDrawnCard = true;
                        this.isTakingDiscardStack = false;
                        this.drawStack.highlighted = false;
                        this.discardStack.highlighted = false;
                        const cards = this.discardStack.empty();
                        this.addHandCards(cards);
                    }
                    if (this.selectedCard instanceof Song) {
                        this.hasPlayedASong = true;
                    }
                    this.playedCards[index].push(this.selectedCard);
                    this.handCards = this.handCards.filter(card => card !== this.selectedCard);
                    this.selectedCard = undefined;
                    this.checkForCompleteSong();
                    this.render();
                }
            });
            const cardsInZone = this.playedCards[i];
            cardsInZone.forEach((card) => {
                const cardElement = card.render(CardFace.Up);
                el.appendChild(cardElement);
            });
        }
    }

    checkForCompleteSong() {
        let i = -1;
        for (const zone of this.playedCards) {
            i++;
            const song = zone.find(card => card instanceof Song);
            if (!song) continue;
            const instruments = zone.filter(card => card instanceof Instrument);
            const hasAllInstruments = (song as Song).instruments.every(instrument =>
                instruments.some(i => i.type === instrument)
            );
            if (hasAllInstruments) {
                this.completedSongs[i] = true;
                showMessage(`Song "${song.name}" wurde vervollständigt!`, "info");
            }
        }
    }

    areZonesValid(): Optional<string> {
        for (const zone of this.playedCards) {
            if (zone.length > 0 && zone.length < 3) {
                return "In jeder Zone müssen mindestens 3 Karten liegen, wenn dort Karten gespielt werden.";
            }
        }
    }

    isAllowedToPlayCard(card: Card, playedCards: Array<Card>): Optional<string> {
        switch (true) {
            case card instanceof Song:
                if (this.hasPlayedASong) {
                    return "Es kann nur ein Song pro Zug gespielt werden.";
                }
                if (playedCards.length > 0) {
                    return "Es kann nur ein Song pro Zone gespielt werden.";
                }
                const song = card as Song;
                const hasMusicianAndInstrumentForSong = this.handCards
                    .filter(handCard => handCard instanceof Musician)
                    .some(musician => {
                        const musicianIsNeeded = musician.instruments.some(instrument => song.instruments.includes(instrument));
                        if (!musicianIsNeeded) {
                            console.log(`Musician ${musician.name} is not needed for song ${song.name}`);
                            return false;
                        }
                        return this.handCards
                            .filter(handCard => handCard instanceof Instrument)
                            .some(instrumentCard => {
                                const musicianPlaysInstrument = musician.instruments.includes(instrumentCard.type);
                                console.log(`Musician ${musician.name} plays ${instrumentCard.type}: ${musicianPlaysInstrument}`);
                                return musicianPlaysInstrument && song.instruments.includes(instrumentCard.type);
                            });
                    });
                if (!hasMusicianAndInstrumentForSong) {
                    return "Du hast keinen passenden Musiker oder dazugehörige Instrument auf der Hand, um diesen Song zu spielen.";
                }
                break;
            case card instanceof Instrument:
                if (playedCards.length === 0) {
                    return "Instrumente können nur gespielt werden, wenn ein Song und dazugehöriger Musiker ausliegt.";
                }
                if (!playedCards.some(c => c instanceof Musician && c.instruments.includes(card.type))) {
                    return "Instrumente können nur gespielt werden, wenn ein Musiker ausliegt, der dieses Instrument spielt.";
                }
                if (card.type === InstrumentType.Bass && !playedCards.some(c => c instanceof Song && c.instruments.includes(InstrumentType.Bass))) {
                    return "Bass-Instrumente können nur gespielt werden, wenn der Song in der Zone auch ein Bass-Instrument braucht.";
                }
                if (playedCards.some(c => c instanceof Instrument && c.type === card.type)) {
                    return `Das Instrument ${card.name} ist in dieser Zone nicht nötig, da bereits ein Musiker mit dem Instrument gespielt wurde.`;
                }
                break;
            case card instanceof Musician:
                if (playedCards.length === 0) {
                    return "Musiker können nur gespielt werden, wenn ein Song in der Zone ist.";
                }
                if (card.instruments.length === 1 && card.instruments[0] === InstrumentType.Bass) {
                    const songInZone = playedCards.find(c => c instanceof Song);
                    if (!songInZone!!.instruments.includes(InstrumentType.Bass)) {
                        return "Bassisten können nur gespielt werden, wenn der Song in der Zone auch ein Bass-Instrument braucht.";
                    }
                }
                if (card.instruments.length === 1) {
                    const musicianNotNeeded = playedCards.some(c =>
                        c instanceof Musician && c.instruments.includes(card.instruments[0])
                    );
                    if (musicianNotNeeded) {
                        return `Der Musiker ${card.name} ist in dieser Zone nicht nötig, da bereits ein Musiker mit dem Instrument ${card.instruments[0]} gespielt wurde.`;
                    }
                }
                const hasInstrument = this.handCards.some(handCard =>
                    handCard instanceof Instrument && card.instruments.includes(handCard.type)
                );
                if (!hasInstrument) {
                    return `Du hast kein passendes Instrument auf der Hand, um ${card.name} zu spielen.`;
                }
                break;
        }
    }

    addHandCards(cards: Array<Card>) {
        this.handCards.push(...cards);
        this.render();
        return this;
    }

    async makeBotMoves() {
        const card = this.drawStack.drawCard();
        if (card) {
            this.addHandCards([card]);
            console.log(`Bot ${this.name} drew a card: ${card.name}`);
            await delay(1000); // Simulate thinking time
        }
        const song = this.handCards.find(c => c instanceof Song);
        if (song) {
            const zoneIndex = this.playedCards.findIndex(zone => zone.length === 0);
            if (zoneIndex !== -1) {
                this.playedCards[zoneIndex].push(song);
                this.handCards = this.handCards.filter(c => c !== song);
                await delay(1000); // Simulate thinking time
                this.render();
            }
        }
        let musician: Optional<Musician>;
        let instrument: Optional<Instrument>;
        for (const c of this.handCards) {
            const isMusician = c instanceof Musician;
            if (!isMusician) continue;
            const i = this.handCards.find(handCard =>
                handCard instanceof Instrument && (c as Musician).instruments.includes(handCard.type)
            );
            if (i) {
                musician = c as Musician;
                instrument = i as Instrument;
                break;
            }
        }

        // TODO: Bot should find right zone to play if already musician or instrument is played

        if (musician && instrument) {
            const zoneIndex = this.playedCards.findIndex(zone =>
                zone.length > 0
            );
            if (zoneIndex !== -1) {
                this.playedCards[zoneIndex].push(musician, instrument);
                this.handCards = this.handCards.filter(c => c !== musician && c !== instrument);
                await delay(1000); // Simulate thinking time
                this.render();
            }
        }
        await delay(1000); // Simulate thinking time
        const cardToDiscard = this.handCards[Math.floor(Math.random() * this.handCards.length)];
        this.handCards = this.handCards.filter(c => c !== cardToDiscard);
        this.emit("endTurn", cardToDiscard);
    }
}
