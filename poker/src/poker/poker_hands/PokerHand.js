class PokerHand {
    constructor(value, name = "PokerHand") {
        this.handTypeValue = value;
        this.name = name;

        this.cards = [];
        this.uniqueRanks = [];
        this.uniqueSuits = [];
    }

    getHandTypeValue() {
        return this.handTypeValue;
    }

    getName() {
        return this.name;
    }

    getCards() {
        return this.cards;
    }

    makesHand(hand) {
        this.cards = hand
            .getCards()
            .slice(0)
            .sort((a, b) => b.rank.value - a.rank.value);

        this.uniqueRanks = Array.from(
            new Set(this.cards.map((c) => c.getRank()))
        );
        this.uniqueSuits = Array.from(
            new Set(this.cards.map((c) => c.getSuit()))
        );
    }

    compareHand(hand) {
        if (this.handTypeValue > hand.getHandTypeValue()) return 1;
        else if (this.handTypeValue < hand.getHandTypeValue()) return -1;
        else return this.compareEqualTypeHand(hand);
    }

    compareEqualTypeHand(hand) {
        let bestCards = this.getKickers();
        let handBestCards = hand.getKickers();

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

        return 0;
    }

    getHandCards() {
        throw new Error(
            "Method 'getHandCards() : Card[]' must be implemented in concrete class"
        );
    }

    getKickers() {
        let handCards = this.getHandCards();
        return this.cards.filter((c) => !handCards.includes(c));
    }

    getRankedCards() {
        let rankedCards = this.getHandCards();
        let availableCards = this.getKickers();

        while (rankedCards.length < 5 && availableCards.length) {
            rankedCards.push(availableCards.shift());
        }

        return rankedCards;
    }

    getDetailedName() {
        throw new Error(
            "Method 'getDetailedName() : string' must be implemented in concrete class"
        );
    }

    toString() {
        return this.getName() + ": " + this.cards.join(", ");
    }
}

export default PokerHand;
