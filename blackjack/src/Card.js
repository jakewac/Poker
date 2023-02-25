import Rank from "./Rank";
import Suit from "./Suit";

class Card {
    constructor(id, rank, suit, shown = true) {
        if (!(rank instanceof Rank)) {
            throw new Error("Invalid card rank");
        }
        if (!(suit instanceof Suit)) {
            throw new Error("Invalid card suit");
        }

        this.id = id;
        this.rank = rank;
        this.suit = suit;
        this.shown = shown;
    }

    setSuit(suit) {
        this.suit = suit;
    }

    setRank(rank) {
        this.rank = rank;
    }

    setShown(shown) {
        this.shown = shown;
    }

    getRendered() {
        const cardName = this.shown
            ? this.rank.toString() + "_of_" + this.suit.toString()
            : "back";

        const cardImagePath = "./deck/" + cardName + ".svg";

        return (
            <div>
                <img src={cardImagePath} alt={cardName}></img>
            </div>
        );
    }
}

export default Card;
