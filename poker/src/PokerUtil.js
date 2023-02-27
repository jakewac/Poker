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

    getBestHand() {
        let availableCards = this.cards;

        const getBestCards = () => {
            const fourOfAKind = this.checkFourOfAKind();
            if (fourOfAKind != null) {
                console.log("FOUR OF A KIND");
                return availableCards.filter(
                    (c) => (c) => c.getRank() === fourOfAKind
                );
            }

            const fullHouse = this.checkFullHouse();
            if (fullHouse != null) {
                console.log("FULL HOUSE");
                let fullHouseCards = availableCards.filter(
                    (c) => fullHouse[0] === c.getRank()
                );
                fullHouseCards = fullHouseCards.concat(
                    availableCards.filter((c) => fullHouse[1] === c.getRank())
                );
                return fullHouseCards;
            }

            const flush = this.checkFlush();
            if (flush != null) {
                console.log("FLUSH");
                return availableCards.filter((c) => c.getSuit() === flush);
            }

            const straight = this.checkStraight();
            if (straight != null) {
                console.log("STRAIGHT");
                return availableCards.filter((c) =>
                    straight.includes(c.getRank())
                );
            }

            const threeOfAKind = this.checkThreeOfAKind();
            if (threeOfAKind != null) {
                console.log("THREE OF A KIND");
                return availableCards.filter(
                    (c) => c.getSuit() === threeOfAKind
                );
            }

            const twoPair = this.checkTwoPair();
            if (twoPair != null) {
                console.log("TWO PAIR");
                return availableCards.filter((c) =>
                    twoPair.includes(c.getRank())
                );
            }

            const pair = this.checkPair();
            if (pair != null) {
                console.log("PAIR");
                return availableCards.filter((c) => c.getRank() === pair);
            }

            console.log("HIGH CARD");
            return [this.cards[0]];
        };

        let bestCards = getBestCards();

        availableCards = this.cards.filter((c) => !bestCards.includes(c));

        while (bestCards.length < 5) {
            bestCards.push(availableCards.shift());
        }

        return bestCards;
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

            if (count === 4) {
                bestStraight.push(checkRanks[r + 1]);
                return bestStraight;
            }
        }

        return null;
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
