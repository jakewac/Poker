import React from "react";

import "./Board.css";

import CardSelect from "./CardSelect";
import Hand from "./Hand";
import PokerUtil from "./PokerUtil";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.game = this.props.game;

        this.state = {
            game: this.game,
            status: "",
        };
    }

    newHand() {
        this.game.reset();
        this.game.dealCards();

        this.setState({
            game: this.game,
            status: "",
        });
    }

    dealCard() {
        if (this.game.getBoard().getCards().length < 5) {
            this.game.dealBoardCard();
        }

        this.setState({
            game: this.game,
        });
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
                game: this.game,
                status: label,
            });
        }
    }

    selectCard(card, hand) {
        if (hand.isInHand(card)) {
            hand.removeCard(card);
        } else {
            hand.addCard(card);
        }

        this.setState({
            game: this.game,
        });
    }

    getPlayerHands(hands, board, deck) {
        let playerHands = [];

        let id = Math.random();
        for (const hand of hands) {
            const cards = hand.getCards();

            let status = "";
            if (cards.length) {
                const combinedHand = new Hand(cards.concat(board));

                status =
                    PokerUtil.getRankedHand(combinedHand).getDetailedName();
            }

            let cardsRender = [];
            for (const card of hand.getCards()) {
                cardsRender.push(this.getCardRender(card, "card"));
            }

            playerHands.push(
                <div key={id}>
                    <div className="handCondensed">{cardsRender}</div>
                    <div className="handStatusLabel">{status}</div>

                    <CardSelect
                        cards={deck}
                        onSelectCard={(card) => this.selectCard(card, hand)}
                    >
                        Card
                    </CardSelect>
                </div>
            );

            id += 1;
        }

        return playerHands;
    }

    getCardRender(card, className) {
        const cardName = card.shown
            ? card.getRank().toString() + "_of_" + card.getSuit().toString()
            : "back";

        const cardImagePath = "./cards/" + cardName + ".svg";

        return (
            <img
                className={className}
                key={Math.random()}
                src={cardImagePath}
                alt={cardName}
            ></img>
        );
    }

    getCardListRender(cards) {
        let cardRenders = [];

        for (const card of cards) {
            cardRenders.push(this.getCardRender(card, "card"));
        }

        return cardRenders;
    }

    render() {
        const game = this.state.game;

        const playerHandsRender = this.getPlayerHands(
            game.getHands(),
            game.getBoard().getCards(),
            game.getDeck().getCards()
        );

        const boardRender = this.getCardListRender(game.getBoard().getCards());

        const deckRender = this.getCardListRender(game.getDeck().getCards());

        return (
            <>
                <div>
                    <button onClick={() => this.newHand()}>New Hand</button>
                    <br />
                    <button onClick={() => this.dealCard()}>Deal</button>

                    <button onClick={() => this.checkHands()}>Check</button>
                </div>
                <div className="handList">{playerHandsRender}</div>
                <br />
                {this.state.status}
                <br />
                <div className="hand">{boardRender}</div>
                <br />
                <CardSelect
                    cards={this.game.getDeck().getCards()}
                    onSelectCard={(card) =>
                        this.selectCard(card, this.game.getBoard())
                    }
                >
                    Card
                </CardSelect>
                <br />
                <div className="hand">{deckRender}</div>
                <br />
            </>
        );
    }
}

export default Board;
