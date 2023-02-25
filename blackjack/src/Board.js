import React from "react";

import "./Board.css";

import Deck from "./Deck";
import Hand from "./Hand";

import PokerUtil from "./PokerUtil";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.deck = new Deck();

        let deckHand = new Hand();

        for (let c of this.deck.cards) {
            deckHand.addCard(c);
        }

        let dealtHand = new Hand();

        this.state = {
            deckHand: deckHand,
            dealtHand: dealtHand,
        };
    }

    shuffleDeck() {
        this.deck.reset();
        this.state.deckHand.clearHand();
        this.state.dealtHand.clearHand();

        for (let c of this.deck.cards) {
            this.state.deckHand.addCard(c);
        }

        this.setState({});
    }

    dealCard() {
        let card = this.deck.deal();
        if (card != null) {
            this.state.dealtHand.addCard(card);
            this.state.deckHand.removeCard(card);
            this.setState({});
        }
    }

    checkDealtHand() {
        const pokerUtil = new PokerUtil(this.state.dealtHand.cards);

        console.log("Checking Hand...");

        console.log("Pair -------------------------");
        console.log(pokerUtil.getPair());
        console.log("Two Pair ---------------------");
        console.log(pokerUtil.getTwoPair());
        console.log("Three Of A Kind --------------");
        console.log(pokerUtil.getThreeOfAKind());
        console.log("Straight ---------------------");
        console.log(pokerUtil.getStraight());
        console.log("Flush ------------------------");
        console.log(pokerUtil.getFlush());
        console.log("Full House -------------------");
        console.log(pokerUtil.getFullHouse());
        console.log("Four Of A Kind ---------------");
        console.log(pokerUtil.getFourOfAKind());
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.shuffleDeck()}>Shuffle</button>
                    <br></br>
                    <button onClick={() => this.dealCard()}>Deal</button>
                    <br></br>
                    <button onClick={() => this.checkDealtHand()}>Check</button>
                </div>
                <div className="hand">{this.state.dealtHand.getRendered()}</div>
                <br></br>

                <div className="hand">{this.state.deckHand.getRendered()}</div>
                <br></br>
            </div>
        );
    }
}

export default Board;
