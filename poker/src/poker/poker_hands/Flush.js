import SuitMatch from "./SuitMatch";

class Flush extends SuitMatch {
    constructor(value) {
        super(value, 5, "Flush");
    }
}

export default Flush;
