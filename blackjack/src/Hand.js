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

    getRendered() {
        let cardRenders = [];
        this.cards.forEach((card) => {
            cardRenders.push(card.getRendered());
        });
        return cardRenders;
    }

    clearHand() {
        while (this.cards.length > 0) {
            this.cards.pop();
        }
    }
}

export default Hand;
