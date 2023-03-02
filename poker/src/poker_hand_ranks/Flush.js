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

    getHandCards() {
        return this.cards.filter((c) => c.getSuit() === this.suit).slice(0, 5);
    }

    beatsEqualTypeHand(hand) {
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
                return true;
            else if (
                bestCards[i].getRank().getValue() <
                handBestCards[i].getRank().getValue()
            )
                return false;
            else continue;
        }

        return super.beatsEqualTypeHand(hand);
    }

    getName() {
        return "Flush";
    }

    getDetailedName() {
        return (
            "Flush (" +
            this.suit +
            ", " +
            this.getHandCards()[0].getRank() +
            ")"
        );
    }
}

export default Flush;
