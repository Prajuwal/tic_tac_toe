import React, { Component } from "react";
import Square from "./Square";

export default class BoardRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const nextValues = nextProps.values,
      { values } = this.props,
      nextWinnerCells = nextProps.winnerCells;

    if (nextWinnerCells !== this.props.winnerCells) {
      return true;
    }
    for (let i = 0; i < 3; i++) {
      if (values[i] !== nextValues[i]) {
        return true;
      }
    }
    return false;
  }

  isWinnerCell = (i, winnerCells) => {
    const s = new Set(winnerCells);
    return s.has(i);
  };

  render() {
    const { values, row, handleClick, winnerCells } = this.props;
    return (
      <div className="board-row">
        {values.map((v, i) => {
          const idx = row * 3 + i;
          return (
            <Square
              key={i}
              value={v}
              onClick={() => handleClick(idx)}
              isHighlight={this.isWinnerCell(idx, winnerCells)}
            />
          );
        })}
      </div>
    );
  }
}
