import React, { Component } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers';

class Game extends Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });

  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;