import React from "react";
import Card from "./Card";
import "./CardSelect.css";
import Rank from "./Rank";
import Suit from "./Suit";

class CardSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownHidden: true,
        };
    }

    getCardRender(card) {
        const cardName = card.shown
            ? card.getRank().toString() + "_of_" + card.getSuit().toString()
            : "back";

        const cardImagePath = "./cards/" + cardName + ".svg";

        return (
            <img
                className="grid-item"
                onClick={() => this.props.onSelectCard(card)}
                key={Math.random()}
                src={cardImagePath}
                alt={cardName}
            ></img>
        );
    }

    render() {
        let cardRenders = [];

        for (const suit in Suit) {
            for (const rank in Rank) {
                cardRenders.push(
                    this.getCardRender(new Card(Rank[rank], Suit[suit]))
                );
            }
        }

        return (
            <>
                <div className="container">
                    <div
                        className="option"
                        onMouseEnter={() =>
                            this.setState({ dropdownHidden: false })
                        }
                        onClick={() => this.props.clickFunction()}
                        onMouseUp={() =>
                            this.setState({ dropdownHidden: true })
                        }
                    >
                        <span>{this.props.children}</span>
                    </div>
                    <div
                        className="dropdown"
                        hidden={this.state.dropdownHidden}
                    >
                        <div className="grid-container">{cardRenders}</div>
                    </div>
                </div>
            </>
        );
    }
}

export default CardSelect;
