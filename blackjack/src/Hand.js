class Hand {
    constructor(cards = []) {
        this.cards = cards;
    }

    addCard(card) {
        this.cards.push(card);
    }

    removeCard(card) {
        let index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }

    getCards() {
        return this.cards;
    }

    clearHand() {
        while (this.cards.length > 0) {
            this.cards.pop();
        }
    }

    toString() {
        let str = "Hand: ";

        for (const card of this.cards) {
            str += card;
        }

        return str;
    }
}

export default Hand;
