const GameBoard = require("./gameBoard");
const Player = require("./player");

class GameManager {
  constructor() {
    this.player = null;
    this.otherPlayer = null;
    this.playerBoard = null;
    this.otherBoard = null;
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
      resolve("Game initiated");
    });
  }
}
module.exports = GameManager;
