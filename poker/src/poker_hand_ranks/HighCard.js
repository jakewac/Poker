import PokerHandRank from "./PokerHandRank";

class HighCard extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        return this.cards.length;
    }

    getRankedCards() {
        return super.getRankedCards();
    }

    beatsEqualTypeHand(hand) {
        return (
            this.getRankedCards()[0].getRank().getValue() >
            hand.getRankedCards()[0].getRank().getValue()
        );
    }

    getName() {
        return "High Card";
    }
}

export default HighCard;
