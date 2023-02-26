import Card from "./Card";
import Rank from "./Rank";

class PokerUtil {
    constructor(cards) {
        if (!(cards instanceof Array) || cards.length > 7)
            throw new Error(
                "Invalid type for argument 'cards', must be array of Card objects of size 7 or less"
            );

        cards.forEach((c) => {
            if (!(c instanceof Card))
                throw new Error(
                    "Invalid type for argument 'cards', must be array of Card objects"
                );
        });

        this.cards = cards.sort((a, b) => b.rank.value - a.rank.value);

        this.uniqueRanks = Array.from(
            new Set(cards.map((c) => c.getRank()))
        ).sort((a, b) => b.value - a.value);

        this.uniqueSuits = Array.from(new Set(cards.map((c) => c.getSuit())));
    }

    checkPair() {
        for (const rank of this.uniqueRanks) {
            if (this.countEqualRankCards(rank) === 2) return rank;
        }

        return null;
    }

    checkTwoPair() {
        let bestPairRank = null;

        for (const rank of this.uniqueRanks) {
            if (this.countEqualRankCards(rank) === 2) {
                if (bestPairRank == null) {
                    bestPairRank = rank;
                } else return [bestPairRank, rank];
            }
        }

        return null;
    }

    checkThreeOfAKind() {
        for (const rank of this.uniqueRanks) {
            if (this.countEqualRankCards(rank) === 3) return rank;
        }

        return null;
    }

    checkStraight() {
        let bestStraight = null;

        let checkRanks = this.uniqueRanks;
        if (checkRanks[0] === Rank.ACE) {
            checkRanks.push(new Rank("baby_ace", 1));
        }

        for (let r = 1; r < checkRanks.length; r++) {
            let count = 0;

            for (let i = r; i < checkRanks.length; i++) {
                if (checkRanks[i - 1].value - checkRanks[i].value === 1) {
                    count++;
                } else break;
            }

            if (count === 4) bestStraight = checkRanks[r - 1];
        }

        return bestStraight;
    }

    checkFlush() {
        for (const suit of this.uniqueSuits) {
            let count = 0;

            this.cards.forEach((c) => {
                if (c.getSuit() === suit) count++;
            });

            if (count > 4) return suit;
        }

        return null;
    }

    checkFullHouse() {
        let bestTripleRank = null;
        let bestPairRank = null;

        for (const rank of this.uniqueRanks) {
            let count = this.countEqualRankCards(rank);

            if (count > 2) {
                if (bestTripleRank == null) {
                    bestTripleRank = rank;
                } else {
                    bestPairRank = rank;
                }
            } else if (count === 2) {
                bestPairRank = rank;
            }

            if (bestTripleRank != null && bestPairRank != null) {
                return [bestTripleRank, bestPairRank];
            }
        }

        return null;
    }

    checkFourOfAKind() {
        for (const rank of this.uniqueRanks) {
            if (this.countEqualRankCards(rank) === 4) return rank;
        }

        return null;
    }

    checkStraightFlush() {}

    countEqualRankCards(rank) {
        let count = 0;

        this.cards.forEach((c) => {
            if (c.getRank().equals(rank)) count++;
        });

        return count;
    }
}

export default PokerUtil;
