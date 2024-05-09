import PokerHand from "./PokerHand";

class TwoPair extends PokerHand {
    constructor(value) {
        super(value, "Two Pair");
    }

    makesHand(hand) {
        super.makesHand(hand);

        let bestPairRank = null;

        for (const rank of this.uniqueRanks) {
            let count = 0;
            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count === 2) {
                if (bestPairRank == null) {
                    bestPairRank = rank;
                } else {
                    this.highPair = bestPairRank;
                    this.lowPair = rank;
                    return true;
                }
            }
        }

        return false;
    }

    getHandCards() {
        return this.cards.filter(
            (c) => c.getRank() === this.highPair || c.getRank() === this.lowPair
        );
    }

    compareEqualTypeHand(hand) {
        if (this.highPair.getValue() > hand.highPair.getValue()) return 1;
        else if (this.highPair.getValue() < hand.highPair.getValue()) return -1;

        if (this.lowPair.getValue() > hand.lowPair.getValue()) return 1;
        else if (this.lowPair.getValue() < hand.lowPair.getValue()) return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getDetailedName() {
        return `${this.getName()} (${this.highPair}, ${this.lowPair})`;
    }
}

export default TwoPair;
