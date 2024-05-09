import PokerHand from "./PokerHand";

class SuitMatch extends PokerHand {
    constructor(value, count, name = "SuitMatch") {
        super(value, name);

        this.count = count;
    }

    makesHand(hand) {
        super.makesHand(hand);

        for (const suit of this.uniqueSuits) {
            let count = 0;

            this.cards.forEach((c) => {
                if (c.getSuit() === suit) count++;
            });

            if (count >= this.count) {
                this.suit = suit;
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        return this.cards
            .filter((c) => c.getSuit() === this.suit)
            .slice(0, this.count);
    }

    compareEqualTypeHand(hand) {
        let bestCards = this.getHandCards();
        let handBestCards = hand.getHandCards();

        const limit =
            bestCards.length <= handBestCards.length
                ? bestCards.length
                : handBestCards.length;

        for (let i = 0; i < limit; i++) {
            if (
                bestCards[i].getRank().getValue() >
                handBestCards[i].getRank().getValue()
            )
                return 1;
            else if (
                bestCards[i].getRank().getValue() <
                handBestCards[i].getRank().getValue()
            )
                return -1;
            else continue;
        }

        return super.compareEqualTypeHand(hand);
    }

    getDetailedName() {
        return `${this.getName()} (${
            this.suit
        }, ${this.getHandCards()[0].getRank()})`;
    }
}

export default SuitMatch;
