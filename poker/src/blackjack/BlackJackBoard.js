import React from "react";

import "../Board.css";

import Player from "../Player";

class BlackJackBoard extends React.Component {
    constructor(props) {
        super(props);

        this.game = this.props.game;

        this.state = {
            playerHands: [],
            dealerHand: this.game.getDealerHand(),
            deck: this.game.getDeck(),
            status: "",
        };
    }

    newHand() {
        this.game.reset();
        this.game.dealCards();

        this.setState({
            playerHands: this.getPlayerHands(true),
            dealerHand: this.game.getDealerHand(),
            deck: this.game.getDeck(),
            status: "",
        });
    }

    stand() {
        this.game.dealerAction();

        this.setState({
            playerHands: this.getPlayerHands(false),
            dealerHand: this.game.getDealerHand(),
            deck: this.game.getDeck(),
            status: this.game.calculateHandValue(this.game.getDealerHand()),
        });
    }

    hit(hand) {
        if (this.game.playerHit(hand)) {
            this.setState({
                playerHands: this.getPlayerHands(false),
                deck: this.game.getDeck(),
                status: "Bust!",
            });
        } else {
            this.setState({
                playerHands: this.getPlayerHands(true),
                deck: this.game.getDeck(),
            });
        }
    }

    getPlayerHands(actionable) {
        let playerHands = [];

        let id = Math.random();
        for (const hand of this.game.getPlayerHands()) {
            const cards = hand.getCards();

            playerHands.push(
                <div key={id}>
                    <Player cards={cards} status={this.game.calculateHandValue(hand)}></Player>
                    <button onClick={() => this.hit(hand)} disabled={!actionable}>Hit</button>
                    <button onClick={() => this.stand()} disabled={!actionable}>Stand</button>
                </div>
            );
            id += 1;
        }

        return playerHands;
    }

    getCardRender(card, id) {
        const cardName = card.isFaceUp()
            ? card.getRank().toString() + "_of_" + card.getSuit().toString()
            : "back";

        const cardImagePath = "./deck/" + cardName + ".svg";

        return <img className="cardRender" key={id} src={cardImagePath} alt={cardName}></img>;
    }

    getDealerHandRender() {
        let cardRenders = [];
        let id = 0;
        for (const card of this.state.dealerHand.getCards()) {
            cardRenders.push(this.getCardRender(card, id));
            id += 1;
        }

        return (
            <div className="hand" style={{gridTemplateColumns: `repeat(${this.state.dealerHand.getCards().length}, auto)`}}>{cardRenders}</div>
        );
    }

    getDeckRender() {
        let cardRenders = [];
        let id = 0;
        for (const card of this.state.deck.getCards()) {
            cardRenders.push(this.getCardRender(card, id));
            id += 1;
        }
        return <div className="hand" style={{gridTemplateColumns: `repeat(13, auto)`}}>{cardRenders}</div>;
    }

    render() {
        return (
            <>
                <div>
                    <button onClick={() => this.newHand()}>New Hand</button>
                </div>
                <div className="handList">{this.state.playerHands}</div>
                <br />
                {this.state.status}
                <br />
                {this.getDealerHandRender()}
                <br />
                {this.getDeckRender()}
                <br />
            </>
        );
    }
}

export default BlackJackBoard;
