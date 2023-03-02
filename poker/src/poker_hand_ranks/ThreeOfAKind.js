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

    beatsEqualTypeHand(hand) {
        if (this.bestTriple.getValue() > hand.bestTriple.getValue())
            return true;
        else if (this.bestTriple.getValue() < hand.bestTriple.getValue())
            return false;
        else return super.beatsEqualTypeHand(hand);
    }

    getName() {
        return "Three Of A Kind";
    }

    getDetailedName() {
        return "Three Of A Kind (" + this.bestTriple + ")";
    }
}

export default ThreeOfAKind;
