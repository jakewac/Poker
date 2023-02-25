class Rank {
    static TWO = new Rank("2", 2);
    static THREE = new Rank("3", 3);
    static FOUR = new Rank("4", 4);
    static FIVE = new Rank("5", 5);
    static SIX = new Rank("6", 6);
    static SEVEN = new Rank("7", 7);
    static EIGHT = new Rank("8", 8);
    static NINE = new Rank("9", 9);
    static TEN = new Rank("10", 10);
    static JACK = new Rank("jack", 11);
    static QUEEN = new Rank("queen", 12);
    static KING = new Rank("king", 13);
    static ACE = new Rank("ace", 14);

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    equals(other) {
        if (!(other instanceof Rank)) return false;
        return this.value === other.value;
    }

    toString() {
        return this.name;
    }
}

export default Rank;
