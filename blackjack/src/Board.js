import React from "react";

import "./Board.css";

import Deck from "./Deck";
import Hand from "./Hand";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.deck = new Deck();

        let deck_hand = new Hand();

        for (let c of this.deck.cards) {
            deck_hand.addCard(c);
        }

        let dealt_hand = new Hand();

        this.state = {
            deck_hand: deck_hand,
            dealt_hand: dealt_hand,
        };
    }

    dealCard() {
        let card = this.deck.deal();
        this.state.dealt_hand.addCard(card);
        this.state.deck_hand.removeCard(card);
        this.setState({});
    }

    shuffleDeck() {
        this.deck.reset();
        this.state.deck_hand.clearHand();
        this.state.dealt_hand.clearHand();

        for (let c of this.deck.cards) {
            this.state.deck_hand.addCard(c);
        }

        this.setState({});
    }

    render() {
        return (
            <div>
                <div className="hand">{this.state.dealt_hand.getCards()}</div>
                <br></br>
                <button onClick={() => this.dealCard()}>Deal</button>
                <div className="hand">{this.state.deck_hand.getCards()}</div>
                <br></br>
                <button onClick={() => this.shuffleDeck()}>Shuffle</button>
            </div>
        );
    }
}

export default Board;
