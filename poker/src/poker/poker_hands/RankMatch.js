import PokerHand from "./PokerHand";

class RankMatch extends PokerHand {
    constructor(value, count, name = "RankMatch") {
        super(value, name);

        this.count = count;
    }

    makesHand(hand) {
        super.makesHand(hand);

        for (const rank of this.uniqueRanks) {
            let count = 0;
            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count === this.count) {
                this.rank = rank;
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        return this.cards.filter((c) => c.getRank() === this.rank);
    }

    compareEqualTypeHand(hand) {
        if (this.rank.getValue() > hand.rank.getValue()) return 1;
        else if (this.rank.getValue() < hand.rank.getValue()) return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getDetailedName() {
        return `${this.getName()} (${this.rank})`;
    }
}

export default RankMatch;
