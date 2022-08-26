import React, { Component } from "react";
import Board from "./Board";

export default class GameView extends Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
        nextPlay: "X",
        moveTo: null
      }
    ],
    stepNo: 0
  };

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNo + 1);
    const current = history[this.state.stepNo];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = current.nextPlay;
    const nextPlay = current.nextPlay === "X" ? "O" : "X";
    this.setState({
      history: history.concat({ squares, nextPlay, moveTo: i }),
      stepNo: history.length
    });
  };

  jumpTo = step => {
    this.setState({ stepNo: step });
  };

  render() {
    const { history, stepNo } = this.state;
    const current = history[stepNo];

    const moves = history.map((step, i) => {
      const move = computeMove(step.moveTo);
      const desc = i
        ? `Go to move #${i} at location (${move.x}, ${move.y})`
        : "Start game";
      return (
        <li key={i} className={stepNo === i ? "current-move" : null}>
          <button className="menu-btn" onClick={() => this.jumpTo(i)}>
            {desc}
          </button>
        </li>
      );
    });

    const winnerCells = calculateWinner(current.squares);
    let status;
    if (winnerCells) {
      status = `Winner: ${current.squares[winnerCells[0]]}`;
    } else {
      status = stepNo !== 9 ? `Next player: ${current.nextPlay}` : "Draw";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            handleClick={this.handleClick}
            winnerCells={winnerCells}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

function computeMove(i) {
  const row = Math.floor(i / 3);
  const col = i % 3;
  return { x: col + 1, y: row + 1 };
}
