class Suit {
    static HEARTS = new Suit("hearts", 0);
    static CLUBS = new Suit("clubs", 1);
    static DIAMONDS = new Suit("diamonds", 2);
    static SPADES = new Suit("spades", 3);

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    equals(other) {
        if (!(other instanceof Suit)) return false;
        return this.value === other.value;
    }

    toString() {
        return this.name;
    }
}

export default Suit;
