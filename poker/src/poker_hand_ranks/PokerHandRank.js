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

    beatsHand(hand) {
        if (this.handTypeValue > hand.getHandTypeValue()) return true;
        else if (this.handTypeValue < hand.getHandTypeValue()) return false;
        return this.beatsEqualTypeHand(hand);
    }

    beatsEqualTypeHand(hand) {
        throw new Error(
            "Method 'beatsEqualTypeHand(Hand) : boolean' must be implemented in concrete class"
        );
    }

    getRankedCards(cards = []) {
        let rankedCards = cards;

        let availableCards = this.cards.filter((c) => !rankedCards.includes(c));

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
}

export default PokerHandRank;
