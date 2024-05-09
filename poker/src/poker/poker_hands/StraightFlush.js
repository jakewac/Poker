import RankSequence from "./RankSequence";

class StraightFlush extends RankSequence {
    constructor(value, count = 5, name = "Straight Flush") {
        super(value, count, name);
    }

    makesHand(hand) {
        if (super.makesHand(hand)) {
            let filteredCards = this.cards.filter((c) =>
                this.ranks.includes(c.getRank())
            );

            for (const suit of this.uniqueSuits) {
                let count = 0;
                filteredCards.forEach((c) => {
                    if (c.getSuit() === suit) count++;
                });

                if (count >= this.count) {
                    this.suit = suit;
                    return true;
                }
            }
        }

        return false;
    }

    getHandCards() {
        let cards = [];

        for (const rank of this.ranks) {
            for (const card of this.cards) {
                if (card.getRank() === rank && card.getSuit() === this.suit) {
                    cards.push(card);
                    break;
                }
            }
        }

        return cards;
    }

    compareEqualTypeHand(hand) {
        if (this.ranks[0].getValue() > hand.ranks[0].getValue()) return 1;
        else if (this.ranks[0].getValue() < hand.ranks[0].getValue()) return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getDetailedName() {
        return `${this.getName()} (${this.suit}, ${this.ranks[0]})`;
    }
}

export default StraightFlush;
