class Suit {
    static HEARTS = new Suit("hearts");
    static CLUBS = new Suit("clubs");
    static DIAMONDS = new Suit("diamonds");
    static SPADES = new Suit("spades");

    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

export default Suit;
