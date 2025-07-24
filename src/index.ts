import {allCards} from "./cards.ts";
import Player from "./classes/Player";
import Stack from "./classes/Stack";
import createElement from "./helpers/createElement.ts";
import ensure from "./helpers/ensure.ts";
import showMessage from "./helpers/showMessage.ts";
import Card, {CardFace} from "./classes/Card.ts";
import delay from "./helpers/delay.ts";
import type {Optional} from "./classes/Optional.ts";
import Action from "./classes/Action.ts";
import {actions} from "./actions.ts";
import randomItem from "./helpers/randomItem.ts";


console.log("Game started...");

const UI_ROOT = ensure(document.querySelector("main"));
const AMOUNT_START_HAND = 11;

const drawStack = new Stack(allCards, createElement({id: "draw-stack", target: UI_ROOT})).shuffle();
const discardStack = new Stack([], createElement({id: "discard-stack", target: UI_ROOT}), CardFace.Up);

createElement({
    target: UI_ROOT,
    className: "game-info",
    tag: "button",
    innerHTML: "Anleitung",
    onClick() {
        openTutorial();
    }
});

const players = [
    new Player("Du", drawStack.drawCards(AMOUNT_START_HAND), true, createElement({
        id: "player1",
        className: "player",
        target: UI_ROOT
    }), "blue", drawStack, discardStack),
    new Player("Computer (1)", drawStack.drawCards(AMOUNT_START_HAND), false, createElement({
        id: "player2",
        className: "player",
        target: UI_ROOT
    }), "red", drawStack, discardStack),
    new Player("Computer (2)", drawStack.drawCards(AMOUNT_START_HAND), false, createElement({
        id: "player3",
        className: "player",
        target: UI_ROOT
    }), "green", drawStack, discardStack)
];

// We want to avoid that players have action cards on their start hand
// In the real game, those players would immediately play their action cards
// Here we add the action cards to the draw stack after giving the players
// their start hand
actions.forEach((actionCard) => {
    drawStack.addCard(actionCard);
});
drawStack.shuffle();

delay(2000).then(() => {

    // Action cards are executed when drawn from the draw stack
    drawStack.on("draw", (card: Optional<Card>) => {
        if (!(card instanceof Action)) {
            return;
        }
        const activePlayer = ensure(players.find((player) => player.isActive));
        const otherPlayers = players.filter((player) => !player.isActive);
        card.logic(activePlayer, otherPlayers);
        activePlayer.discardCard(card);
    });

    players.forEach((player) => {

        // On game start each player plays their action cards
        // they have on their start hand
        player.handCards.filter(card => card instanceof Action).forEach((actionCard) => {
            const otherPlayers = players.filter(p => p !== player);
            actionCard.logic(player, otherPlayers);
            player.discardCard(actionCard);
        });

        player.on("endTurn", async (discardedCard: Optional<Card>) => {

            if (discardedCard) {
                discardStack.addCard(discardedCard);
            }
            player.setInactive();

            if (player.handCards.length === 0) {
                showMessage(`${player.name} hat das Spiel beendet!`, "info");
                let bestPlayer: Optional<Player>;
                players.forEach((p) => {
                    if (!bestPlayer) {
                        bestPlayer = p;
                    } else {
                        if (p.calculatePoints() > bestPlayer.calculatePoints()) {
                            bestPlayer = p;
                        }
                    }
                });
                alert(`\`${player.name} hat das Spiel beendet! ${bestPlayer?.name} hat gewonnen mit ${bestPlayer?.calculatePoints()} Punkten!`);
                return;
            }

            const nextPlayer = players[(players.indexOf(player) + 1) % players.length];
            showMessage(`${nextPlayer.name} ist am Zug!`);

            nextPlayer.setActive();
            if (!nextPlayer.isHuman) {
                await nextPlayer.makeBotMoves();
            } else {
                await delay(1000);
                showMessage("Ziehe zu Beginn deines Zuges eine Karte.");
            }
        });
    });

    ensure(randomItem(players)).emit("endTurn", undefined);

});

function openTutorial() {
    createElement({
        target: UI_ROOT,
        className: "tutorial",
        innerHTML: `
        <div>
            <h2>Willkommen zum Spiel Kafümu!</h2>
            <p>Ziel des Kartenspiels Kafümu ist es Songs mit dazugehörigen Musikern und Instrumenten vor sich auszulegen.</p>
            <p>Jede(r) Spieler*in startet mit 11 Handkarten und ist nacheinander im Uhrzeigersinn am Zug.<br>
            Zu Beginn jeden Zuges zieht man eine Karte. Danach kann man, beginnend mit einem Song, Karten auslegen. Es müssen mindestens 3 Karten ausgelegt werden (Z.B. Song + Musiker + Instrument).<br>
            Im Laufe des Spiels solltet ihr versuchen mindestens einen Song zu komplettieren.<br>
            Man beendet den Zug durch das Ablegen einer Handkarte (Ablagestapel). Danach ist der nächste Spieler dran.</p>
            <p>Wer zuerst keine Handkarten mehr hat, beendet das Spiel. Alle ausgespielten Karten geben dann Punkte. Falls man es nicht geschafft hat einen Song zu komplettieren, sind alle Punkte negativ.
            Die Spieler*in mit der höchsten Punktzahl gewinnt.</p>        
            <button onclick="document.querySelector('.tutorial').remove()">Spiel starten</button>
            <h3>Beispiel</h3>
            <p>Komplettierter Song Ball And Biscuit von The White Stripes:</p>
            <p>
                <img src="/song-ball-and-biscuit.png" alt="Song Ball And Biscuit" class="tutorial-example">
                <img src="/musician-the-white-stripes-jack-white.png" alt="Musician Jack White" class="tutorial-example">
                <img src="/instrument-guitar-montgomery-ward-airline.png" alt="Instrument Guitar" class="tutorial-example">
                <img src="/instrument-vocals-sm58.png" alt="Instrument Vocals" class="tutorial-example">
                <img src="/instrument-drums-ludwig.png" alt="Instrument Drums" class="tutorial-example">
                <img src="/musician-the-white-stripes-meg-white.png" alt="Musician Meg White" class="tutorial-example">            
            </p>
            <h3>Die Regeln</h3>
            <img src="/tutorial.png" alt="Tutorial" style="width: 100%">
            <h4>Das Auslegen</h4>
            <p>
                Pro Zug darf man einen Song auslegen, der aus mindestens 3 Karten besteht. <br>
                Ein Musiker kann nur an einen Song angelegt werden, wenn er zu diesem passt (Band und Instrumente) und man das entsprechende Instrument auf der Hand hält.<br>
                Ein Instrument wiederum kann nur ausgespielt werden, wenn es zu dem Musiker passt.<br>
                Ein Song ist komplett wenn alle benötigten Instrumente und dazugehörigen Musiker ausliegen (i.d.R Vocals, Gitarre, Bass und Schlagzeug). Manche Musiker können mehrere Instrumente gleichzeitig spielen, z.B. Jack White kann Gitarre und Vocals spielen.<br>
            </p>
            <h4>Der Ablagestapel</h4>
            <p>
                Am Ende eines jeden Zuges muss eine Handkarte auf den Ablagestapel gelegt werden. <br>
                Der nächste Spieler kann nun diese Karte aufnehmen und in seinem Zug verwenden. Er muss die Karte aber sofort auslegen und die Voraussetzungen dafür haben.<br>
                Möchte der Spieler z.B. einen Musiker vom Ablagestapel nehmen, muss er das passende Instrument auf der Hand haben und den Musiker an einen bereits ausgelegten Song anlegen können.<br>
            </p>
            <h4>Das Spielende</h4>     
            <p>
                Das Spiel endet, wenn ein Spieler keine Handkarten mehr hat. <br>
                Alle ausgelegten Karten werden gezählt und Punkte vergeben. <br>
                Die Karten haben folgende Punktwerte:<br>
                <ul>
                    <li>Song: 20 Punkte</li>
                    <li>Musiker: 10 Punkte</li>
                    <li>Instrument: 5 Punkt</li>
                </ul>
                Alle Handkarten, die nicht ausgelegt wurden, werden ebenfalls gezählt und abgezogen!<br>
                Für jeden komplettierten Song gibt es 300 Punkte! <br>
                Schafft man nicht es einen Song zu komplettieren, werden alle Punkte negativ!
            </p>
            <p>
                <b>Originalbesetzung:</b> Schafft man es, einen Song mit der Originalbesetzung zu komplettieren (alle Musiker und Instrumente sind in der Originalbesetzung), gibt es 500 statt 300 Punkte!    
            </p>   
            <h3>Der Name</h3>
            <p>Kafümu steht für "<b>KA</b>rtenspiel <b>FÜ</b>r <b>MU</b>siker*innen.</p>
            <button onclick="document.querySelector('.tutorial').remove()" style="float:right">Spiel starten</button>
        </div>
    `
    });
}


