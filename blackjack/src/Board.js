import React from "react";

import "./Board.css";

import Deck from "./Deck";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.deck = new Deck();

        let initial = [];
        for (let i = 0; i < this.deck.cards.length; i++) {
            initial.push(this.deck.getCard(i));
        }

        this.state = {
            board: initial,
        };
    }

    shuffleDeck() {
        this.deck.shuffle();
        let new_board = [];

        for (let i = 0; i < this.deck.cards.length; i++) {
            new_board.push(this.deck.getCard(i));
        }

        this.setState({ board: new_board });
    }

    render() {
        return (
            <div>
                <div className="board">{this.state.board}</div>
                <button onClick={() => this.shuffleDeck()}>Shuffle</button>
            </div>
        );
    }
}

export default Board;
