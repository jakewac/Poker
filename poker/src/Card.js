import Rank from "./Rank";
import Suit from "./Suit";

class Card {
    constructor(rank, suit, shown = true) {
        if (!(rank instanceof Rank)) {
            throw new Error("Invalid card rank");
        }
        if (!(suit instanceof Suit)) {
            throw new Error("Invalid card suit");
        }

        this.rank = rank;
        this.suit = suit;
        this.shown = shown;
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

    equals(other) {
        if (!(other instanceof Card)) return false;
        return (
            this.rank.equals(other.getRank()) &&
            this.suit.equals(other.getSuit())
        );
    }

    toString() {
        return this.rank.name + " of " + this.suit.name;
    }
}

export default Card;
