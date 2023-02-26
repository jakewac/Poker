import "./App.css";

import Board from "./Board";
import Game from "./Game";

const game = new Game(5);

function App() {
    return (
        <div className="App">
            <Board game={game}></Board>
        </div>
    );
}

export default App;
