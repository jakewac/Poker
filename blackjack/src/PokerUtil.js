import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";

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
        this.uniqueRanks = Array.from(new Set(cards.map((c) => c.rank))).sort(
            (a, b) => b.value - a.value
        );
    }

    getPair() {
        let bestPairRank = null;

        this.uniqueRanks.every((rank) => {
            if (this.getEqualRankCardCount(rank) == 2) {
                bestPairRank = rank;
                return false;
            }

            return true;
        });

        return bestPairRank;
    }

    getTwoPair() {
        let bestPairRank = null;
        let secondBestPairRank = null;

        this.uniqueRanks.every((rank) => {
            if (this.getEqualRankCardCount(rank) == 2) {
                if (bestPairRank == null) {
                    bestPairRank = rank;
                } else {
                    secondBestPairRank = rank;
                    return false;
                }
            }

            return true;
        });

        return bestPairRank != null && secondBestPairRank != null
            ? [bestPairRank, secondBestPairRank]
            : null;
    }

    getThreeOfAKind() {
        let bestTripleRank = null;

        this.uniqueRanks.every((rank) => {
            if (this.getEqualRankCardCount(rank) == 3) {
                bestTripleRank = rank;
                return false;
            }

            return true;
        });

        return bestTripleRank;
    }

    getStraight() {
        let bestStraight = null;

        let checkRanks = this.uniqueRanks;
        if (checkRanks[0] == Rank.ACE) {
            checkRanks.push(new Rank("baby_ace", 1));
        }

        for (let r = 1; r < checkRanks.length; r++) {
            let count = 0;

            for (let i = r; i < checkRanks.length; i++) {
                if (checkRanks[i - 1].value - checkRanks[i].value == 1) {
                    count++;
                } else break;
            }

            if (count == 4) {
                bestStraight = checkRanks[r - 1];
            }
        }

        return bestStraight;
    }

    getFlush() {
        let flushSuit = null;

        Object.keys(Suit)
            .reverse()
            .every((suit) => {
                let count = 0;

                this.cards.forEach((c) => {
                    if (c.suit == Suit[suit]) count++;
                });

                if (count > 4) {
                    flushSuit = suit;
                    return false;
                }

                return true;
            });

        return flushSuit;
    }

    getFullHouse() {
        let bestTripleRank = null;
        let bestPairRank = null;

        this.uniqueRanks.every((rank) => {
            let count = this.getEqualRankCardCount(rank);

            if (count > 2) {
                if (bestTripleRank == null) {
                    bestTripleRank = rank;
                } else {
                    bestPairRank = rank;
                }
            } else if (count == 2) {
                bestPairRank = rank;
            }

            return bestTripleRank == null || bestPairRank == null;
        });

        return bestTripleRank != null && bestPairRank != null
            ? [bestTripleRank, bestPairRank]
            : null;
    }

    getFourOfAKind() {
        let bestQuadRank = null;

        this.uniqueRanks.every((rank) => {
            if (this.getEqualRankCardCount(rank) == 4) {
                bestQuadRank = rank;
                return false;
            }

            return true;
        });

        return bestQuadRank;
    }

    getStraightFlush() {}

    getEqualRankCardCount(rank) {
        let count = 0;

        this.cards.forEach((c) => {
            if (c.rank.equals(rank)) count++;
        });

        return count;
    }
}

export default PokerUtil;
