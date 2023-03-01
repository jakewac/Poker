import Rank from "../Rank";
import PokerHandRank from "./PokerHandRank";

class Straight extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        let checkRanks = this.uniqueRanks;

        const babyAce = new Rank("baby_ace", 1);
        if (checkRanks[0] === Rank.ACE) checkRanks.push(babyAce);

        for (let r = 1; r < checkRanks.length; r++) {
            let bestStraight = [checkRanks[r - 1]];
            let count = 0;

            for (let i = r; i < checkRanks.length; i++) {
                if (checkRanks[i - 1].value - checkRanks[i].value === 1) {
                    count++;
                    if (checkRanks[i] === babyAce) bestStraight.push(Rank.ACE);
                    else bestStraight.push(checkRanks[i]);
                } else break;
            }

            if (count > 3) {
                this.ranks = bestStraight.slice(0, 5);
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

    beatsEqualTypeHand(hand) {
        if (this.ranks[0].getValue() > hand.ranks[0].getRank().getValue())
            return true;
        else if (this.ranks[0].getValue() < hand.ranks[0].getRank().getValue())
            return false;
        else return super.beatsEqualTypeHand(hand);
    }

    getName() {
        return "Straight";
    }
}

export default Straight;
