class PokerHandRank {
    constructor(value) {
        this.handTypeValue = value;

        this.cards = [];
        this.uniqueRanks = [];
        this.uniqueSuits = [];
    }

    getHandTypeValue() {
        return this.handTypeValue;
    }

    getCards() {
        return this.cards;
    }

    makesHand(hand) {
        this.cards = hand
            .getCards()
            .sort((a, b) => b.rank.value - a.rank.value);

        this.uniqueRanks = Array.from(
            new Set(this.cards.map((c) => c.getRank()))
        );
        this.uniqueSuits = Array.from(
            new Set(this.cards.map((c) => c.getSuit()))
        );
    }

    isDraw(hand) {
        if (this.beatsHand(hand) || hand.beatsHand(this)) return false;
        else return true;
    }

    beatsHand(hand) {
        if (this.handTypeValue > hand.getHandTypeValue()) return true;
        else if (this.handTypeValue < hand.getHandTypeValue()) return false;

        if (this.beatsEqualTypeHand(hand)) return true;
        else return false;
    }

    beatsEqualTypeHand(hand) {
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
                return true;
            else if (
                bestCards[i].getRank().getValue() <
                handBestCards[i].getRank().getValue()
            )
                return false;
            else continue;
        }

        return false;
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

        while (rankedCards.length < 5) {
            rankedCards.push(availableCards.shift());
        }

        return rankedCards;
    }

    getName() {
        throw new Error(
            "Method 'getName() : string' must be implemented in concrete class"
        );
    }

    getDetailedName() {
        throw new Error(
            "Method 'getDetailedName() : string' must be implemented in concrete class"
        );
    }
}

export default PokerHandRank;
