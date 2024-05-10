import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";

class Deck {
    constructor() {
        this.cards = [];
        this.dealt = [];

        for (const suit in Suit) {
            for (const rank in Rank) {
                this.cards.push(new Card(Rank[rank], Suit[suit]));
            }
        }
    }

    getCards() {
        return this.cards;
    }

    getDealt() {
        return this.dealt;
    }

    deal() {
        if (this.cards.length > 0) {
            let card = this.cards.shift(0);
            this.dealt.push(card);
            return card;
        }
        return null;
    }

    dealCard(card) {
        if (!this.isCardDealt(card) && this.isCardInDeck(card)) {
            let cards = [];
            for (const c of this.cards) {
                if (!card.equals(c)) {
                    cards.push(c);
                }
            }
            this.cards = cards;
            this.dealt.push(card);
        }
        return card
    }

    returnCard(card) {
        if (!this.isCardInDeck(card) && this.isCardDealt(card)) {
            let cards = [];
            for (const c of this.dealt) {
                if (!card.equals(c)) {
                    cards.push(c);
                }
            }
            this.dealt = cards;
            this.cards.push(card);
        }
        return card
    }

    isCardInDeck(card) {
        for (const c of this.cards) {
            if (card.equals(c)) {
                return true;
            }
        }
        return false;
    }

    isCardDealt(card) {
        for (const c of this.dealt) {
            if (card.equals(c)) {
                return true;
            }
        }
        return false;
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    reset() {
        while (this.dealt.length > 0) {
            this.cards.push(this.dealt.pop());
        }
        this.shuffle();
    }

    toString() {
        let str = "Deck: ";

        for (const card of this.cards) {
            str += card;
        }

        str += "\nDealt: ";

        for (const card of this.dealt) {
            str += card;
        }

        return str;
    }
}

export default Deck;
