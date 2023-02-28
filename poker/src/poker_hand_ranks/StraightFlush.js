import Rank from "../Rank";
import PokerHandRank from "./PokerHandRank";

class StraightFlush extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        let checkRanks = this.uniqueRanks;

        const babyAce = new Rank("baby_ace", 1);
        if (checkRanks[0] === Rank.ACE) checkRanks.push(babyAce);

        for (let r = 1; r < checkRanks.length; r++) {
            let bestStraightFlush = [checkRanks[r - 1]];
            let count = 0;

            for (let i = r; i < checkRanks.length; i++) {
                if (checkRanks[i - 1].value - checkRanks[i].value === 1) {
                    count++;
                    if (checkRanks[i] === babyAce)
                        bestStraightFlush.push(Rank.ACE);
                    else bestStraightFlush.push(checkRanks[i]);
                } else break;
            }

            if (count > 3) {
                bestStraightFlush = bestStraightFlush.slice(0, 5);

                let filteredCards = this.cards.filter((c) =>
                    bestStraightFlush.includes(c.getRank())
                );

                for (const suit of this.uniqueSuits) {
                    let count = 0;

                    filteredCards.forEach((c) => {
                        if (c.getSuit() === suit) count++;
                    });

                    if (count > 4) {
                        this.suit = suit;
                        this.ranks = bestStraightFlush;
                        return true;
                    }
                }
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
        return "Straight Flush";
    }
}

export default StraightFlush;
