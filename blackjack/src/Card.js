import React from "react";

class Card extends React.Component {
    render() {
        var card_name =
            this.props.rank.toLowerCase() +
            "_of_" +
            this.props.suit.toLowerCase();

        var card_image_path = "./deck/" + card_name + ".svg";

        return (
            <div>
                <img src={card_image_path} alt={card_name}></img>
            </div>
        );
    }
}

export default Card;
