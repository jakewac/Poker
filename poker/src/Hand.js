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

    equals(other) {
        if (!(other instanceof Hand)) return false;

        if (other.getCards().length !== this.cards.length) return false;

        for (const card of this.cards) {
            if (!other.getCards().includes(card)) return false;
        }

        return true;
    }

    toString() {
        return this.cards.join(" | ");
    }
}

export default Hand;
