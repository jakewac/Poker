import PokerHandRank from "./PokerHandRank";

class FourOfAKind extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        for (const rank of this.uniqueRanks) {
            let count = 0;

            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count === 4) {
                this.rank = rank;
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        return this.cards.filter((c) => c.getRank() === this.rank);
    }

    beatsEqualTypeHand(hand) {
        if (this.rank.getValue() > hand.rank.getValue()) return true;
        else if (this.rank.getValue() < hand.rank.getValue()) return false;
        else return super.beatsEqualTypeHand(hand);
    }

    getName() {
        return "Four Of A Kind";
    }
}

export default FourOfAKind;
