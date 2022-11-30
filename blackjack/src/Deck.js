import Card from "./Card";
import Rank from "./Rank.ts";
import Suit from "./Suit.ts";

class Deck {
    constructor() {
        this.cards = [];
        this.dealt = [];

        let id = 0;
        for (let s in Suit) {
            for (let r in Rank) {
                this.cards.push(<Card key={id} rank={r} suit={s}></Card>);
                id++;
            }
        }
    }

    getCard(suit, rank) {
        for (let c in this.cards) {
            if (c.props.suit === suit && c.props.rank === rank) {
                this.cards.pop(this.cards.indexOf(c));
                this.deal.push(c);
            }
        }
    }

    deal() {
        if (this.cards.length > 0) {
            let card = this.cards.shift(0);
            this.dealt.push(card);
            return card;
        }
        return undefined;
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
}

export default Deck;
