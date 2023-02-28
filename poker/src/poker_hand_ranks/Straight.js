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

    getRankedCards() {
        let cards = [];

        for (const rank of this.ranks) {
            for (const card of this.cards) {
                if (card.getRank() === rank) {
                    cards.push(card);
                    break;
                }
            }
        }

        return super.getRankedCards(cards);
    }

    beatsEqualTypeHand(hand) {
        return (
            this.getRankedCards()[0].getRank().getValue() >
            hand.getRankedCards()[0].getRank().getValue()
        );
    }

    getName() {
        return "Straight";
    }
}

export default Straight;
