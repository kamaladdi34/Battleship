const GameBoard = require("./gameBoard");
const Player = require("./player");

class GameManager {
  #gameStarted = false;
  constructor() {
    this.player = null;
    this.otherPlayer = null;
    this.playerBoard = null;
    this.otherBoard = null;
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
      this.playerBoard = new GameBoard(boardSize);
      this.otherBoard = new GameBoard(boardSize);

      this.playerBoard.placeShip({ x: 0, y: 0 }, 5);
      this.playerBoard.placeShip({ x: 1, y: 0 }, 4);
      this.playerBoard.placeShip({ x: 2, y: 0 }, 3);
      this.playerBoard.placeShip({ x: 3, y: 0 }, 3);
      this.playerBoard.placeShip({ x: 4, y: 0 }, 2);

      this.otherBoard.placeShip({ x: 0, y: 0 }, 5);
      this.otherBoard.placeShip({ x: 1, y: 0 }, 4);
      this.otherBoard.placeShip({ x: 2, y: 0 }, 3);
      this.otherBoard.placeShip({ x: 3, y: 0 }, 3);
      this.otherBoard.placeShip({ x: 4, y: 0 }, 2);
      resolve("Game initiated");
    });
  }
  startGame() {
    if (this.#gameStarted) {
      return;
    }
    if (!this.playerBoard || !this.otherBoard) {
      return false;
    }
    return (this.#gameStarted =
      this.playerBoard.allShipsPlaced() && this.otherBoard.allShipsPlaced());
  }
}
module.exports = GameManager;
