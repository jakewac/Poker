import PokerHandRank from "./PokerHandRank";

class TwoPair extends PokerHandRank {
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
                    this.bestPair = bestPairRank;
                    this.secondPair = rank;
                    return true;
                }
            }
        }

        return false;
    }

    getRankedCards() {
        let cards = this.cards.filter(
            (c) =>
                c.getRank() === this.bestPair || c.getRank() === this.secondPair
        );
        return super.getRankedCards(cards);
    }

    beatsEqualTypeHand(hand) {
        if (this.bestPair > hand.bestPair) return true;
        else if (this.bestPair < hand.bestPair) return false;

        if (this.secondPair > hand.secondPair) return true;

        return false;
    }

    getName() {
        return "Two Pair";
    }
}

export default TwoPair;
