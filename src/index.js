import React from "react";
import ReactDOM from "react-dom";
import GameView from "./GameView";
import "./styles.css";

const App = () => (
  <main id="main-content">
    <section id="sect-intro">
      <h1>tic-tac-toe</h1>
      <p>
        Based on{" "}
        <a href="https://reactjs.org/tutorial/tutorial.html">React tutorial</a>{" "}
        with all the extra stuff in it.
      </p>
    </section>
    <section id="sect-game">
      <GameView />
    </section>
  </main>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
