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

    getRankedCards() {
        let cards = this.cards.filter((c) => c.getRank() === this.bestTriple);
        return super.getRankedCards(cards);
    }

    beatsEqualTypeHand(hand) {
        return this.bestTriple > hand.bestTriple;
    }

    getName() {
        return "Three Of A Kind";
    }
}

export default ThreeOfAKind;
