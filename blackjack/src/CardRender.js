import React from "react";

import Rank from "./Rank";
import Suit from "./Suit";

class CardRender extends React.Component {
    constructor(props) {
        super(props);

        this.rank = this.props.rank;
        this.suit = this.props.suit;
        this.shown = this.props.shown;
    }

    render() {
        let cardName = "back";

        if (
            this.shown &&
            this.rank instanceof Rank &&
            this.suit instanceof Suit
        ) {
            cardName = this.rank.toString() + "_of_" + this.suit.toString();
        }

        let cardImagePath = "./deck/" + cardName + ".svg";

        return (
            <div>
                <img src={cardImagePath} alt={cardName}></img>
            </div>
        );
    }
}

export default CardRender;
