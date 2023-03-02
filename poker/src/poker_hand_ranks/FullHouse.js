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

        return cards;
    }

    beatsEqualTypeHand(hand) {
        if (this.tripleRank.getValue() > hand.tripleRank.getValue())
            return true;
        else if (this.tripleRank.getValue() < hand.tripleRank.getValue())
            return false;

        if (this.pairRank.getValue() > hand.pairRank.getValue()) return true;

        return false;
    }

    getName() {
        return "Full House";
    }

    getDetailedName() {
        return "Full House (" + this.tripleRank + ", " + this.pairRank + ")";
    }
}

export default FullHouse;
