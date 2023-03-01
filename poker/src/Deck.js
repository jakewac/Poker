import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";

class Deck {
    constructor() {
        this.cards = [];
        this.dealt = [];

        let id = 0;
        for (const s in Suit) {
            for (const r in Rank) {
                this.cards.push(new Card(id, Rank[r], Suit[s]));
                id++;
            }
        }
    }

    getCards() {
        return this.cards;
    }

    deal() {
        if (this.cards.length > 0) {
            let card = this.cards.shift(0);
            this.dealt.push(card);
            return card;
        }
        return null;
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
