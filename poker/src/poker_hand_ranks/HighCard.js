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

    beatsEqualTypeHand(hand) {
        if (this.bestRank.getValue() > hand.bestRank.getValue()) return true;
        else if (this.bestRank.getValue() < hand.bestRank.getValue())
            return false;
        else return super.beatsEqualTypeHand(hand);
    }

    getName() {
        return "High Card";
    }
}

export default HighCard;
