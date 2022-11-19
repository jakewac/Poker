import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.updateCard.bind(this);
        this.state = {
            rank: "ace",
            suit: "spades",
        };
    }

    updateCard() {
        this.setState({
            rank: document.getElementById("rank_input").value,
            suit: document.getElementById("suit_input").value,
        });
    }

    render() {
        var card_image_name =
            this.state.rank.toLowerCase() +
            "_of_" +
            this.state.suit.toLowerCase();

        var card_image_path = "./deck/" + card_image_name + ".svg";

        return (
            <div>
                <img src={card_image_path} alt={card_image_name}></img>
                <button onClick={() => this.updateCard()}>Update</button>
            </div>
        );
    }
}

export default Card;
