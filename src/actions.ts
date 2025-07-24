import Action from "./classes/Action.ts";
import type Player from "./classes/Player.ts";
import showMessage from "./helpers/showMessage.ts";
import randomItem from "./helpers/randomItem.ts";
import ensure from "./helpers/ensure.ts";

function adapterAction(activePlayer: Player) {
    showMessage("Wähle eine Handkarte aus, um sie abzuwerfen.");
    activePlayer.selectCardFromHand((card) => {
        activePlayer.discardCard(card);
        showMessage(`Du hast ${card.name} abgelegt.`);
        activePlayer.drawCard();
        activePlayer.drawCard();
    });
}

function beerAction(activePlayer: Player, otherPlayers: Array<Player>) {
    showMessage(activePlayer.name + " erhält eine zufällige Karte eines Gegners und zieht eine Karte.");
    activePlayer.drawCard();
    const card = ensure(randomItem(otherPlayers)).removeHandCardRandomly();
    activePlayer.giveCard(card);
}

function monitorAction(activePlayer: Player) {
    showMessage(activePlayer.name + " zieht zwei Karten.");
    activePlayer.drawCard();
    activePlayer.drawCard();
}

export const actions: Array<Action> = [
    new Action("Adapter fehlt", "action-adapter.png", adapterAction),
    new Action("Adapter fehlt", "action-adapter.png", adapterAction),
    new Action("Adapter fehlt", "action-adapter.png", adapterAction),
    new Action("Adapter fehlt", "action-adapter.png", adapterAction),
    new Action("Beer", "action-beer.png", beerAction),
    new Action("Beer", "action-beer.png", beerAction),
    new Action("Beer", "action-beer.png", beerAction),
    new Action("Beer", "action-beer.png", beerAction),
    new Action("Monitor", "action-monitor.png", monitorAction),
    new Action("Monitor", "action-monitor.png", monitorAction),
    new Action("Monitor", "action-monitor.png", monitorAction),
    new Action("Monitor", "action-monitor.png", monitorAction)
];
