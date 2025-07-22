import {allCards} from "./cards.ts";
import Player from "./classes/Player";
import Stack from "./classes/Stack";
import createElement from "./helpers/createElement.ts";
import ensure from "./helpers/ensure.ts";
import showMessage from "./helpers/showMessage.ts";
import Card, {CardFace} from "./classes/Card.ts";
import delay from "./helpers/delay.ts";


console.log("Game started...");

const UI_ROOT = ensure(document.querySelector("main"));
const AMOUNT_START_HAND = 11;

const drawStack = new Stack(allCards, createElement({id: "draw-stack", target: UI_ROOT})).shuffle();
const discardStack = new Stack([], createElement({id: "discard-stack", target: UI_ROOT}), CardFace.Up);

const players = [
    new Player("Du", drawStack.drawCards(AMOUNT_START_HAND), true, createElement({
        id: "player1",
        className: "player",
        target: UI_ROOT
    }), "blue", drawStack, discardStack),
    new Player("Computer", drawStack.drawCards(AMOUNT_START_HAND), false, createElement({
        id: "player2",
        className: "player",
        target: UI_ROOT
    }), "red", drawStack, discardStack)
];

delay(1000).then(() => {
    players[0].setActive();
    showMessage("Ziehe zu Beginn deines Zuges eine Karte.");
});

players.forEach((player) => {
    player.on("endTurn", async (discardedCard: Card) => {

        discardStack.addCard(discardedCard);
        player.setInactive();

        if (player.handCards.length === 0) {
            showMessage(`${player.name} hat das Spiel beendet!`, "info");
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

createElement({
    target: UI_ROOT,
    className: "tutorial",
    innerHTML: `
        <div>
            <button onclick="document.querySelector('.tutorial').remove()" style="float:right">Schließen</button>
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
                <img src="/instrument-guitar.png" alt="Instrument Guitar" class="tutorial-example">
                <img src="/instrument-vocals.png" alt="Instrument Vocals" class="tutorial-example">
                <img src="/instrument-drums.png" alt="Instrument Drums" class="tutorial-example">
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
            <button onclick="document.querySelector('.tutorial').remove()" style="float:right">X</button>
        </div>
    `
});


