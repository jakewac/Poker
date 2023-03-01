import Hand from "./Hand";
import Flush from "./poker_hand_ranks/Flush";
import FullHouse from "./poker_hand_ranks/FullHouse";
import HighCard from "./poker_hand_ranks/HighCard";
import Pair from "./poker_hand_ranks/Pair";
import Straight from "./poker_hand_ranks/Straight";
import StraightFlush from "./poker_hand_ranks/StraightFlush";
import ThreeOfAKind from "./poker_hand_ranks/ThreeOfAKind";
import TwoPair from "./poker_hand_ranks/TwoPair";

class PokerUtil {
    constructor(hands, board) {
        this.hands = hands;
        this.board = board;

        this.rankedHands = [];
        for (const hand of this.hands) {
            this.rankedHands.push(this.getRankedHand(hand));
        }
    }

    getRankedHand(hand) {
        const handRanks = [
            new HighCard(0),
            new Pair(1),
            new TwoPair(2),
            new ThreeOfAKind(3),
            new Straight(4),
            new Flush(5),
            new FullHouse(6),
            new StraightFlush(7),
        ];

        const combinedHand = new Hand(
            hand.getCards().concat(this.board.getCards())
        );

        for (const rank of handRanks.sort(
            (a, b) => b.getHandTypeValue() - a.getHandTypeValue()
        )) {
            if (rank.makesHand(combinedHand)) return rank;
        }
    }

    getBestHand() {
        let winner = this.rankedHands[0];

        for (let i = 1; i < this.rankedHands.length; i++) {
            if (!winner.beatsHand(this.rankedHands[i])) {
                winner = this.rankedHands[i];
            }
        }

        const boardRanked = this.getRankedHand(new Hand());
        if (boardRanked.beatsHand(winner)) winner = boardRanked;

        return winner;
    }
}

export default PokerUtil;
