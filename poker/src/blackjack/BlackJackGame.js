import Deck from "../cards/Deck";
import Hand from "../cards/Hand";
import Rank from "../cards/Rank";

class BlackJackGame {
    cardValues = [
        { key: Rank.TWO, value: 2 },
        { key: Rank.THREE, value: 3 },
        { key: Rank.FOUR, value: 4 },
        { key: Rank.FIVE, value: 5 },
        { key: Rank.SIX, value: 6 },
        { key: Rank.SEVEN, value: 7 },
        { key: Rank.EIGHT, value: 8 },
        { key: Rank.NINE, value: 9 },
        { key: Rank.TEN, value: 10 },
        { key: Rank.JACK, value: 10 },
        { key: Rank.QUEEN, value: 10 },
        { key: Rank.KING, value: 10 },
        { key: Rank.ACE, value: 11 },
    ]

    constructor(numPlayers) {
        this.deck = new Deck();
        this.dealerHand = new Hand();

        this.playerHands = [];
        for (let i = 0; i < numPlayers; i++) this.playerHands.push(new Hand());
    }

    getDealerHand() {
        return this.dealerHand;
    }

    getPlayerHands() {
        return this.playerHands;
    }

    getDeck() {
        return this.deck;
    }

    calculateHandValue(hand) {
        let score = 0;

        for (const card of hand.getCards()) {
            score += this.cardValues[this.cardValues.findIndex((e) => e.key === card.getRank())].value;
        }

        for (const card of hand.getCards()) {
            if (score > 21 && card.getRank() === Rank.ACE) {
                score -= 10;
            }
        }

        return score;
    }

    dealCards() {
        for (let i = 0; i < 2; i++) {
            for (const hand of this.playerHands) {
                hand.addCard(this.deck.deal());
            }
        }

        this.dealerHand.addCard(this.deck.deal());
        this.dealerHand.addCard(this.deck.deal(false));
    }

    dealerAction() {
        this.getDealerHand().revealAllCards();

        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.addCard(this.deck.deal());
        }
    }

    playerHit(playerHand) {
        playerHand.addCard(this.deck.deal());

        if (this.calculateHandValue(playerHand) > 21) {
            return true;
        }

        return false;
    }

    reset() {
        this.deck.reset();
        this.dealerHand.clearHand();
        for (const hand of this.playerHands) {
            hand.clearHand();
        }
    }

    printGame() {
        console.log(this.dealerHand.toString());
        for (const hand of this.playerHands) {
            console.log(hand.toString());
        }
        console.log(this.deck.toString());
    }
}

export default BlackJackGame;
