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

    getRankedCards() {
        let cards = this.cards.filter((c) => c.getRank() === this.rank);
        return super.getRankedCards(cards);
    }

    beatsEqualTypeHand(hand) {
        return this.rank > hand.rank;
    }

    getName() {
        return "Four Of A Kind";
    }
}

export default FourOfAKind;
