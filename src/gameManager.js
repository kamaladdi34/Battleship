const GameBoard = require("./gameBoard");
const Player = require("./player");

class GameManager {
  #gameStarted = false;
  #playerTurn = true;
  #playerBoard = null;
  #otherBoard = null;

  constructor() {
    this.player = null;
    this.otherPlayer = null;
  }

  get gameStarted() {
    return this.#gameStarted;
  }

  newGame(boardSize, players) {
    return new Promise((resolve, reject) => {
      if (!boardSize || !players || boardSize <= 0) {
        reject("Incorrect game info");
      }

      this.player = new Player(players[0].name, players[0].isComputer);
      this.otherPlayer = new Player(players[1].name, players[1].isComputer);
      this.#playerBoard = new GameBoard(boardSize);
      this.#otherBoard = new GameBoard(boardSize);

      this.#playerBoard.placeShip({ x: 0, y: 3 }, 5);
      this.#playerBoard.placeShip({ x: 1, y: 3 }, 4);
      this.#playerBoard.placeShip({ x: 2, y: 2 }, 3);
      this.#playerBoard.placeShip({ x: 3, y: 5 }, 3);
      this.#playerBoard.placeShip({ x: 4, y: 0 }, 2, true);

      this.#otherBoard.placeShip({ x: 0, y: 0 }, 5);
      this.#otherBoard.placeShip({ x: 1, y: 0 }, 4);
      this.#otherBoard.placeShip({ x: 2, y: 0 }, 3);
      this.#otherBoard.placeShip({ x: 3, y: 0 }, 3);
      this.#otherBoard.placeShip({ x: 4, y: 0 }, 2);
      resolve("Game initiated");
    });
  }

  startGame() {
    if (this.#gameStarted) {
      return;
    }
    if (!this.#playerBoard || !this.#otherBoard) {
      return false;
    }
    return (this.#gameStarted =
      this.#playerBoard.allShipsPlaced() && this.#otherBoard.allShipsPlaced());
  }

  playTurn(coordinates) {
    if (!this.#gameStarted) {
      return;
    }
    if (this.#playerTurn) {
      this.#playerTurn = false;
      return this.#otherBoard.receiveAttack(coordinates);
    } else {
      this.#playerTurn = true;
      return this.#playerBoard.receiveAttack(coordinates);
    }
  }

  getPlayerBoard() {
    return this.#getBoardInfo(this.#playerBoard.getBoard());
  }

  getOtherBoard() {
    return this.#getBoardInfo(this.#otherBoard.getBoard());
  }

  checkForWinner() {
    if (this.#playerBoard.allShipsAreSunk()) {
      return this.otherPlayer;
    }
    if (this.#otherBoard.allShipsAreSunk()) {
      return this.player;
    }
  }

  #getBoardInfo(targetBoard) {
    let board = new Array(10).fill("").map((_) => new Array(10).fill(""));
    for (let i = 0; i < targetBoard.length; i++) {
      for (let j = 0; j < targetBoard[i].length; j++) {
        let content = "empty";
        let cell = targetBoard[i][j];
        if (!cell.isHit && cell.ship == null) {
          content = "empty";
        }
        if (cell.isHit && cell.ship == null) {
          content = "miss";
        }
        if (cell.isHit && cell.ship != null) {
          content = "hit";
        }
        if (!cell.isHit && cell.ship != null) {
          content = "ship";
        }
        board[i][j] = content;
      }
    }
    return board;
  }
}
module.exports = GameManager;
