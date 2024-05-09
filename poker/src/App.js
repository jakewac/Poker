import "./App.css";

import Board from "./Board";
import PokerGame from "./poker/PokerGame";

const game = new PokerGame(4);

function App() {
    return (
        <div className="App">
            <Board game={game}></Board>
        </div>
    );
}

export default App;
