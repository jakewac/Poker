import React from "react";

import "./Board.css";

import CardSelect from "./CardSelect";
import Hand from "./cards/Hand";
import Player from "./Player";
import PokerUtil from "./poker/PokerUtil";

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
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
        });

        this.checkHands();
    }

    dealCard() {
        if (this.game.getBoard().getCards().length < 5) {
            this.game.dealBoardCard();
        }

        this.setState({
            board: this.game.getBoard(),
            deck: this.game.getDeck(),
        });

        this.checkHands();
    }

    checkHands() {
        const bestHand = PokerUtil.getBestHand(
            this.game.getHands(),
            this.game.getBoard()
        );

        if (bestHand != null) {
            const label =
                bestHand.getName() +
                " - " +
                new Hand(bestHand.getRankedCards()).toString();

            this.setState({
                playerHands: this.getPlayerHands(),
                status: label,
            });
        }
    }

    selectCard(card, hand) {
        if (hand.isInHand(card)) {
            hand.removeCard(card);
            this.game.getDeck().returnCard(card);
        } else if (this.game.getDeck().isCardInDeck(card)) {
            hand.addCard(card);
            this.game.getDeck().dealCard(card);
        }

        this.checkHands();
    }

    getPlayerHands() {
        let playerHands = [];

        let id = Math.random();
        for (const hand of this.game.getHands()) {
            const cards = hand.getCards();

            let status = "";
            if (cards.length) {
                const combinedHand = new Hand(
                    cards.concat(this.game.getBoard().getCards())
                );

                status =
                    PokerUtil.getRankedHand(combinedHand).getDetailedName();
            }

            playerHands.push(
                <div key={id}>
                    <Player cards={cards} status={status}></Player>
                    <CardSelect
                        onSelectCard={(card) => this.selectCard(card, hand)}
                    ></CardSelect>
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

    getBoardRender() {
        let cardRenders = [];
        let id = 0;
        for (const card of this.state.board.getCards()) {
            cardRenders.push(this.getCardRender(card, id));
            id += 1;
        }

        return (
            <>
                <div className="hand" style={{gridTemplateColumns: `repeat(${this.state.board.getCards().length}, auto)`}}>{cardRenders}</div>
                <br />
                <CardSelect
                    onSelectCard={(card) =>
                        this.selectCard(card, this.game.getBoard())
                    }
                ></CardSelect>
            </>
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
                    <br />
                    <button onClick={() => this.dealCard()}>Deal</button>
                </div>
                <div className="handList">{this.state.playerHands}</div>
                <br />
                {this.state.status}
                <br />
                {this.getBoardRender()}
                <br />
                {this.getDeckRender()}
                <br />
            </>
        );
    }
}

export default Board;
