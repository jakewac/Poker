import Rank from "./Rank";
import Suit from "./Suit";

class Card {
    constructor(id, rank, suit, shown = true) {
        if (!(rank instanceof Rank)) {
            throw new Error("Invalid card rank");
        }
        if (!(suit instanceof Suit)) {
            throw new Error("Invalid card suit");
        }

        this.id = id;
        this.rank = rank;
        this.suit = suit;
        this.shown = shown;
    }

    getId() {
        return this.id;
    }

    getRank() {
        return this.rank;
    }

    getSuit() {
        return this.suit;
    }

    isShown() {
        return this.shown;
    }

    setSuit(suit) {
        this.suit = suit;
    }

    setRank(rank) {
        this.rank = rank;
    }

    setShown(shown) {
        this.shown = shown;
    }

    toString() {
        return this.rank.name + " of " + this.suit.name;
    }
}

export default Card;
