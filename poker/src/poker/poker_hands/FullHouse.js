import PokerHand from "./PokerHand";

class FullHouse extends PokerHand {
    constructor(value) {
        super(value, "Full House");
    }

    makesHand(hand) {
        super.makesHand(hand);

        let bestTripletRank = null;
        let bestPairRank = null;

        for (const rank of this.uniqueRanks) {
            let count = 0;
            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count > 2) {
                if (bestTripletRank == null) {
                    bestTripletRank = rank;
                } else if (bestPairRank == null) {
                    bestPairRank = rank;
                }
            } else if (count === 2 && bestPairRank == null) {
                bestPairRank = rank;
            }

            if (bestTripletRank != null && bestPairRank != null) {
                this.tripletRank = bestTripletRank;
                this.pairRank = bestPairRank;
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        let cards = this.cards.filter((c) => this.tripletRank === c.getRank());

        cards = cards.concat(
            this.cards.filter((c) => this.pairRank === c.getRank())
        );

        return cards.slice(0, 5);
    }

    compareEqualTypeHand(hand) {
        if (this.tripletRank.getValue() > hand.tripletRank.getValue()) return 1;
        else if (this.tripletRank.getValue() < hand.tripletRank.getValue())
            return -1;

        if (this.pairRank.getValue() > hand.pairRank.getValue()) return 1;
        else if (this.pairRank.getValue() < hand.pairRank.getValue()) return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getDetailedName() {
        return `${this.getName()} (${this.tripletRank}, ${this.pairRank})`;
    }
}

export default FullHouse;
