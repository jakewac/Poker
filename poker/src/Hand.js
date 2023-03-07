class Hand {
    constructor(cards = []) {
        this.cards = cards;
    }

    isInHand(card) {
        for (const c of this.cards) {
            if (card.equals(c)) return true;
        }
        return false;
    }

    addCard(card) {
        this.cards.push(card);
    }

    removeCard(card) {
        let index = -1;
        let i = 0;
        for (const c of this.cards) {
            if (card.equals(c)) {
                index = i;
                break;
            }
            i += 1;
        }

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
            if (!other.isInHand(card)) return false;
        }

        return true;
    }

    toString() {
        return this.cards.join(" | ");
    }
}

export default Hand;
