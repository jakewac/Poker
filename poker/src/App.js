import "./App.css";
import BlackJackBoard from "./blackjack/BlackJackBoard";
import BlackJackGame from "./blackjack/BlackJackGame";

import Board from "./Board";
import PokerGame from "./poker/PokerGame";

const game = new PokerGame(4);
// const game = new BlackJackGame(1);

function App() {
    return (
        <div className="App">
            <Board game={game}></Board>
            {/* <BlackJackBoard game={game}></BlackJackBoard> */}
        </div>
    );
}

export default App;
