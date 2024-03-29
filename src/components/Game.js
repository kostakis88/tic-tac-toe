import React, { Component } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers';

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    xIsNext: true,
    stepNumber: 0
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat(
        [{
          squares: squares
        }]
      ),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });

  }

  jumpTo(move) {
    this.setState({
      xIsNext: (move % 2) === 0,
      stepNumber: move
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      let desc = move ? 'Go to step #' + move : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'The winner is ' + winner;
    } else {
      status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;