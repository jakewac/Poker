import Card from "./Card";

const ranks = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
];

const suits = ["hearts", "clubs", "diamonds", "spades"];

class Deck {
    constructor() {
        this.cards = [];

        let id = 0;
        for (let s of suits) {
            for (let r of ranks) {
                this.cards.push(<Card key={id} rank={r} suit={s}></Card>);
                id++;
            }
        }
    }

    getCard(index) {
        return this.cards[index];
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }
}

export default Deck;
