import "./App.css";

import Card from "./Card";

function App() {
    return (
        <div className="App">
            <Card></Card>
            <input id="rank_input" type="text"></input>
            <input id="suit_input" type="text"></input>
        </div>
    );
}

export default App;
