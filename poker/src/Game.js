import Deck from "./Deck";
import Hand from "./Hand";

class Game {
    constructor(numPlayers) {
        this.deck = new Deck();
        this.board = new Hand();

        this.hands = [];
        for (let i = 0; i < numPlayers; i++) this.hands.push(new Hand());
    }

    getBoard() {
        return this.board;
    }

    getHands() {
        return this.hands;
    }

    getDeck() {
        return this.deck;
    }

    dealCards() {
        for (let i = 0; i < 2; i++) {
            for (const hand of this.hands) {
                hand.addCard(this.deck.deal());
            }
        }
    }

    dealBoardCard() {
        this.board.addCard(this.deck.deal());
    }

    reset() {
        this.deck.reset();
        this.board.clearHand();
        for (const hand of this.hands) {
            hand.clearHand();
        }
    }

    printGame() {
        for (const hand of this.hands) {
            console.log(hand.toString());
        }
        console.log(this.deck.toString());
    }
}

export default Game;
