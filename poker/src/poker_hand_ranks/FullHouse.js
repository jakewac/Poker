import PokerHandRank from "./PokerHandRank";

class FullHouse extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        let bestTripleRank = null;
        let bestPairRank = null;

        for (const rank of this.uniqueRanks) {
            let count = 0;
            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count > 2) {
                if (bestTripleRank == null) {
                    bestTripleRank = rank;
                } else {
                    bestPairRank = rank;
                }
            } else if (count === 2) {
                bestPairRank = rank;
            }

            if (bestTripleRank != null && bestPairRank != null) {
                this.tripleRank = bestTripleRank;
                this.pairRank = bestPairRank;
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        let cards = this.cards.filter((c) => this.tripleRank === c.getRank());
        cards = cards.concat(
            this.cards.filter((c) => this.pairRank === c.getRank())
        );

        return cards.slice(0, 5);
    }

    compareEqualTypeHand(hand) {
        if (this.tripleRank.getValue() > hand.tripleRank.getValue()) return 1;
        else if (this.tripleRank.getValue() < hand.tripleRank.getValue())
            return -1;

        if (this.pairRank.getValue() > hand.pairRank.getValue()) return 1;
        else if (this.pairRank.getValue() < hand.pairRank.getValue()) return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getName() {
        return "Full House";
    }

    getDetailedName() {
        return "Full House (" + this.tripleRank + ", " + this.pairRank + ")";
    }
}

export default FullHouse;
