import PokerHandRank from "./PokerHandRank";

class Flush extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        for (const suit of this.uniqueSuits) {
            let count = 0;

            this.cards.forEach((c) => {
                if (c.getSuit() === suit) count++;
            });

            if (count > 4) {
                this.suit = suit;
                return true;
            }
        }

        return false;
    }

    getRankedCards() {
        let cards = this.cards.filter((c) => c.getSuit() === this.suit);
        return super.getRankedCards(cards);
    }

    beatsEqualTypeHand(hand) {
        return (
            this.getRankedCards()[0].getRank().getValue() >
            hand.getRankedCards()[0].getRank().getValue()
        );
    }

    getName() {
        return "Flush";
    }
}

export default Flush;
