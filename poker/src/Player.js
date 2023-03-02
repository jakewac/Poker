import React from "react";

import "./Board.css";

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.hand = this.props.hand;

        this.state = {
            cards: this.hand.getCards(),
            status: this.props.status,
        };
    }

    getHand() {
        return this.hand;
    }

    setStatus(status) {
        this.setState({
            status: status,
        });
    }

    getCardRender(card) {
        const cardName = card.shown
            ? card.getRank().toString() + "_of_" + card.getSuit().toString()
            : "back";

        const cardImagePath = "./deck/" + cardName + ".svg";

        return (
            <div key={card.getId()}>
                <img src={cardImagePath} alt={cardName}></img>
            </div>
        );
    }

    render() {
        let cardRenders = [];
        for (const card of this.state.cards) {
            cardRenders.push(this.getCardRender(card));
        }

        return (
            <div>
                <div className="handCondensed">{cardRenders}</div>
                <div className="handStatusLabel">{this.state.status}</div>
            </div>
        );
    }
}

export default Player;
