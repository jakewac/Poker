import PokerHand from "./PokerHand";

class HighCard extends PokerHand {
    constructor(value) {
        super(value, "High Card");
    }

    makesHand(hand) {
        super.makesHand(hand);

        if (this.cards.length) {
            this.bestRank = this.cards[0].getRank();
            return true;
        } else return false;
    }

    getHandCards() {
        return [this.cards[0]];
    }

    compareEqualTypeHand(hand) {
        if (this.bestRank.getValue() > hand.bestRank.getValue()) return 1;
        else if (this.bestRank.getValue() < hand.bestRank.getValue()) return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getDetailedName() {
        return `${this.getName()} (${this.bestRank})`;
    }
}

export default HighCard;
