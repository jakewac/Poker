import React from "react";

import "./Board.css";

import Hand from "./Hand";
import PokerUtil from "./PokerUtil";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.game = this.props.game;

        this.state = {
            playerHands: this.game.getHands(),
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
            status: "",
        };
    }

    newHand() {
        this.game.reset();
        this.game.dealCards();

        this.setState({
            playerHands: this.game.getHands(),
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
            status: "",
        });
    }

    dealCard() {
        this.game.dealBoardCard();

        this.setState({
            playerHands: this.game.getHands(),
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
        });
    }

    checkDealtHand() {
        const pokerUtil = new PokerUtil(
            this.state.playerHands,
            this.state.board
        );

        const bestHand = new Hand(pokerUtil.getBestHand());

        console.log(bestHand.toString());

        this.setState({
            status: bestHand.toString(),
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

    getPlayerHandsRender() {
        let playerHands = [];

        let id = 0;
        for (const hand of this.state.playerHands) {
            let cardRenders = [];
            for (const card of hand.getCards()) {
                cardRenders.push(this.getCardRender(card));
            }

            playerHands.push(
                <div key={id}>
                    <div className="handCondensed">{cardRenders}</div>
                    <div className="handStatusLabel">{hand.toString()}</div>
                </div>
            );

            id += 1;
        }

        return playerHands;
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
                <div className="handList">{this.getPlayerHandsRender()}</div>
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
