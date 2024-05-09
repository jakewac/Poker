import Rank from "./Rank";
import Suit from "./Suit";

class Card {
    constructor(rank, suit, faceUp = true) {
        if (!(rank instanceof Rank)) {
            throw new Error("Invalid card rank");
        }
        if (!(suit instanceof Suit)) {
            throw new Error("Invalid card suit");
        }

        this.rank = rank;
        this.suit = suit;
        this.faceUp = faceUp;
    }

    getRank() {
        return this.rank;
    }

    getSuit() {
        return this.suit;
    }

    isFaceUp() {
        return this.faceUp;
    }

    setSuit(suit) {
        this.suit = suit;
    }

    setRank(rank) {
        this.rank = rank;
    }

    setFaceUp(faceUp) {
        this.faceUp = faceUp;
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
