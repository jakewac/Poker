import CardRender from "./CardRender";
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
        return (
            <CardRender
                key={this.id}
                rank={this.rank}
                suit={this.suit}
                shown={true}
            ></CardRender>
        );
    }
}

export default Card;
