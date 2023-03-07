import React from "react";

import "./Board.css";

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards,
            status: this.props.status,
        };
    }

    getCardRender(card, id) {
        const cardName = card.shown
            ? card.getRank().toString() + "_of_" + card.getSuit().toString()
            : "back";

        const cardImagePath = "./deck/" + cardName + ".svg";

        return <img key={id} src={cardImagePath} alt={cardName}></img>;
    }

    render() {
        let cardsRender = [];
        let id = 0;
        for (const card of this.state.cards) {
            cardsRender.push(this.getCardRender(card, id));
            id += 1;
        }

        return (
            <>
                <div className="handCondensed">{cardsRender}</div>
                <div className="handStatusLabel">{this.state.status}</div>
            </>
        );
    }
}

export default Player;
