import Rank from "../../cards/Rank";
import PokerHand from "./PokerHand";

class RankSequence extends PokerHand {
    constructor(value, count, name = "RankSequence") {
        super(value, name);

        this.count = count;
    }

    makesHand(hand) {
        super.makesHand(hand);

        let checkRanks = this.uniqueRanks;

        const babyAce = new Rank("baby_ace", 1);
        if (checkRanks[0] === Rank.ACE) checkRanks.push(babyAce);

        for (let r = 1; r < checkRanks.length; r++) {
            let bestSequence = [checkRanks[r - 1]];
            let count = 0;

            for (let i = r; i < checkRanks.length; i++) {
                if (checkRanks[i - 1].value - checkRanks[i].value === 1) {
                    count++;
                    if (checkRanks[i] === babyAce) bestSequence.push(Rank.ACE);
                    else bestSequence.push(checkRanks[i]);
                } else break;
            }

            if (count >= this.count - 1) {
                this.ranks = bestSequence.slice(0, this.count);
                return true;
            }
        }

        return false;
    }

    getHandCards() {
        let cards = [];

        for (const rank of this.ranks) {
            for (const card of this.cards) {
                if (card.getRank() === rank) {
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
        return `${this.getName()} (${this.ranks[0]})`;
    }
}

export default RankSequence;
