import PokerHandRank from "./PokerHandRank";

class Pair extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        for (const rank of this.uniqueRanks) {
            let count = 0;

            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count === 2) {
                this.bestPair = rank;
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        return this.cards.filter((c) => c.getRank() === this.bestPair);
    }

    beatsEqualTypeHand(hand) {
        if (this.bestPair.getValue() > hand.bestPair.getValue()) return true;
        else if (this.bestPair.getValue() < hand.bestPair.getValue())
            return false;
        else return super.beatsEqualTypeHand(hand);
    }

    getName() {
        return "Pair";
    }

    getDetailedName() {
        return "Pair (" + this.bestPair + ")";
    }
}

export default Pair;
