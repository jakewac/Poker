import React from "react";

import Rank from "./Rank.ts";
import Suit from "./Suit.ts";

class Card extends React.Component {
    render() {
        let rank = this.props.rank;
        let suit = this.props.suit;

        let card_name = "back";

        if (rank in Rank && suit in Suit) {
            card_name = Rank[rank] + "_of_" + Suit[suit];
        }

        let card_image_path = "./deck/" + card_name + ".svg";

        return (
            <div>
                <img src={card_image_path} alt={card_name}></img>
            </div>
        );
    }
}

export default Card;
