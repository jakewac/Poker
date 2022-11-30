class Hand {
    constructor() {
        this.cards = [];
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
}

export default Hand;
