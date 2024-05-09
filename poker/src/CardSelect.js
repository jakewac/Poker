import React from "react";
import Card from "./cards/Card";
import Rank from "./cards/Rank";
import Suit from "./cards/Suit";

class CardSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suit: null,
            rank: null,
        };
    }

    rankSelected = (e) => {
        this.setState({
            rank: e.target.value,
        });
    };

    suitSelected = (e) => {
        this.setState({
            suit: e.target.value,
        });
    };

    cardSelected = () => {
        if (this.state.rank !== null && this.state.suit !== null) {
            this.props.onSelectCard(
                new Card(Rank[this.state.rank], Suit[this.state.suit])
            );
        }
    };

    render() {
        let ranks = [];
        for (const rank in Rank) {
            ranks.push(rank);
        }

        let suits = [];
        for (const suit in Suit) {
            suits.push(suit);
        }

        return (
            <>
                <select defaultValue="RANK" onChange={this.rankSelected}>
                    <option value="RANK" disabled>
                        Rank
                    </option>
                    {ranks.map((x, y) => {
                        return (
                            <option key={y} value={x}>
                                {Rank[x].toString()}
                            </option>
                        );
                    })}
                </select>

                <select defaultValue="SUIT" onChange={this.suitSelected}>
                    <option value="SUIT" disabled>
                        Suit
                    </option>
                    {suits.map((x, y) => {
                        return (
                            <option key={y} value={x}>
                                {Suit[x].toString()}
                            </option>
                        );
                    })}
                </select>

                <button onClick={this.cardSelected}>+</button>
            </>
        );
    }
}

export default CardSelect;
