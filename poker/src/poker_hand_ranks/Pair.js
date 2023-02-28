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

    getRankedCards() {
        let cards = this.cards.filter((c) => c.getRank() === this.bestPair);
        return super.getRankedCards(cards);
    }

    beatsEqualTypeHand(hand) {
        return this.bestPair > hand.bestPair;
    }

    getName() {
        return "Pair";
    }
}

export default Pair;
