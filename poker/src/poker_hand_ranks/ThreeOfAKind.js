import PokerHandRank from "./PokerHandRank";

class ThreeOfAKind extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        for (const rank of this.uniqueRanks) {
            let count = 0;

            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count === 3) {
                this.bestTriple = rank;
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        return this.cards.filter((c) => c.getRank() === this.bestTriple);
    }

    compareEqualTypeHand(hand) {
        if (this.bestTriple.getValue() > hand.bestTriple.getValue()) return 1;
        else if (this.bestTriple.getValue() < hand.bestTriple.getValue())
            return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getName() {
        return "Three Of A Kind";
    }

    getDetailedName() {
        return "Three Of A Kind (" + this.bestTriple + ")";
    }
}

export default ThreeOfAKind;
