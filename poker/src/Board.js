import React from "react";

import "./Board.css";

import Hand from "./Hand";
import Player from "./Player";
import PokerUtil from "./PokerUtil";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.game = this.props.game;

        this.state = {
            playerHands: this.getPlayerHands(),
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
            status: "",
        };
    }

    newHand() {
        this.game.reset();
        this.game.dealCards();

        this.setState({
            playerHands: this.getPlayerHands(),
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
            status: "",
        });
    }

    dealCard() {
        this.game.dealBoardCard();

        this.setState({
            playerHands: this.getPlayerHands(),
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
        });
    }

    checkDealtHand() {
        const bestHand = PokerUtil.getBestHand(
            this.game.getHands(),
            this.game.getBoard()
        );

        const label =
            bestHand.getName() +
            " - " +
            new Hand(bestHand.getRankedCards()).toString();

        this.setState({
            playerHands: this.getPlayerHands(),
            status: label,
        });
    }

    getPlayerHands() {
        let playerHands = [];

        let id = Math.random();
        for (const hand of this.game.getHands()) {
            if (!hand.getCards().length) continue;

            const combinedHand = new Hand(
                hand.getCards().concat(this.game.getBoard().getCards())
            );

            const status = PokerUtil.getRankedHand(combinedHand).getName();

            playerHands.push(
                <Player key={id} hand={hand} status={status}></Player>
            );

            id += 1;
        }

        return playerHands;
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

    getBoardRender() {
        let cardRenders = [];
        for (const card of this.state.board.getCards()) {
            cardRenders.push(this.getCardRender(card));
        }
        return cardRenders;
    }

    getDeckRender() {
        let cardRenders = [];
        for (const card of this.state.deck.getCards()) {
            cardRenders.push(this.getCardRender(card));
        }
        return cardRenders;
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.newHand()}>New Hand</button>
                    <br></br>
                    <button onClick={() => this.dealCard()}>Deal</button>
                    <br></br>
                    <button onClick={() => this.checkDealtHand()}>Check</button>
                </div>
                <div className="handList">{this.state.playerHands}</div>
                <br></br>
                <div>{this.state.status}</div>
                <br></br>
                <div className="hand">{this.getBoardRender()}</div>
                <br></br>
                <div className="hand">{this.getDeckRender()}</div>
                <br></br>
            </div>
        );
    }
}

export default Board;
