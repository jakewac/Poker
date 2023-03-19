import PokerHandRank from "./PokerHandRank";

class HighCard extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        if (this.cards.length) {
            this.bestRank = this.cards[0].getRank();
            return true;
        } else return false;
    }

    getHandCards() {
        for (const card of this.cards) {
            if (card.getRank() === this.bestRank) return [card];
        }
        return [];
    }

    compareEqualTypeHand(hand) {
        if (this.bestRank.getValue() > hand.bestRank.getValue()) return 1;
        else if (this.bestRank.getValue() < hand.bestRank.getValue()) return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getName() {
        return "High Card";
    }

    getDetailedName() {
        return "High Card (" + this.bestRank + ")";
    }
}

export default HighCard;
