import Rank from "../../cards/Rank";
import StraightFlush from "./StraightFlush";

class RoyalFlush extends StraightFlush {
    constructor(value) {
        super(value, 5, "Royal Flush");
    }

    makesHand(hand) {
        if (super.makesHand(hand)) return this.ranks[0] === Rank.ACE;
        return false;
    }

    getDetailedName() {
        return `${this.getName()} (${this.suit})`;
    }
}

export default RoyalFlush;
