import React from "react";

import "./Board.css";

import CardSelect from "./CardSelect";
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
        if (this.game.getBoard().getCards().length < 5) {
            this.game.dealBoardCard();
        }

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

    selectCard(card, handId) {
        console.log(card);
    }

    getPlayerHands() {
        let playerHands = [];

        let id = Math.random();
        for (const hand of this.game.getHands()) {
            const handId = id;
            const cards = hand.getCards();

            if (!cards.length) continue;

            const combinedHand = new Hand(
                cards.concat(this.game.getBoard().getCards())
            );

            const status =
                PokerUtil.getRankedHand(combinedHand).getDetailedName();

            playerHands.push(
                <div key={id}>
                    <Player cards={cards} status={status}></Player>
                    <CardSelect
                        cards={this.game.getDeck().getCards()}
                        onSelectCard={(card) => this.selectCard(card, handId)}
                    ></CardSelect>
                </div>
            );

            id += 1;
        }

        return playerHands;
    }

    getCardRender(card, id) {
        const cardName = card.shown
            ? card.getRank().toString() + "_of_" + card.getSuit().toString()
            : "back";

        const cardImagePath = "./deck/" + cardName + ".svg";

        return <img key={id} src={cardImagePath} alt={cardName}></img>;
    }

    getBoardRender() {
        let cardRenders = [];
        let id = 0;
        for (const card of this.state.board.getCards()) {
            cardRenders.push(this.getCardRender(card, id));
            id += 1;
        }
        return cardRenders;
    }

    getDeckRender() {
        let cardRenders = [];
        let id = 0;
        for (const card of this.state.deck.getCards()) {
            cardRenders.push(this.getCardRender(card, id));
            id += 1;
        }
        return cardRenders;
    }

    render() {
        return (
            <>
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
            </>
        );
    }
}

export default Board;
