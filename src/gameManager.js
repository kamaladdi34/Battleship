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

  newGame(boardSize, players, playerCoords) {
    return new Promise(async (resolve, reject) => {
      if (!boardSize || !players || boardSize <= 0) {
        reject("Incorrect game info");
      }

      this.player = new Player(players[0].name, players[0].isComputer);
      this.otherPlayer = new Player(players[1].name, players[1].isComputer);
      this.#playerBoard = new GameBoard(boardSize);
      this.#otherBoard = new GameBoard(boardSize);

      for (let i = 0; i < playerCoords.length; i++) {
        this.#playerBoard
          .placeShip(playerCoords[i].coords, playerCoords[i].length)
          .catch((error) => {
            console.log(error);
          });
      }
      if (!this.#playerBoard.allShipsPlaced()) {
        reject("Wrong ship coordinates");
      }
      // this.#otherBoard.placeShip({ x: 0, y: 0 }, 5);
      // this.#otherBoard.placeShip({ x: 1, y: 0 }, 4);
      // this.#otherBoard.placeShip({ x: 2, y: 0 }, 3);
      // this.#otherBoard.placeShip({ x: 3, y: 0 }, 3);
      // this.#otherBoard.placeShip({ x: 4, y: 0 }, 2);
      await this.generateComputerBoard();
      resolve("Game initiated");
    });
  }
  async generateComputerBoard() {
    let shipLengths = [5, 4, 3, 3, 2];
    let currentShip = 0;
    while (!this.#otherBoard.allShipsPlaced()) {
      let coordinates = this.generateCoordinates();
      try {
        await this.#otherBoard.placeShip(
          coordinates,
          shipLengths[currentShip],
          Math.floor(Math.random() * 2)
        );
        console.log(
          `placed ship with length ${shipLengths[currentShip]} at ${coordinates.y},${coordinates.x}`
        );
        currentShip++;
      } catch (error) {
        console.log(
          `failed to place ship ${shipLengths[currentShip]} at ${coordinates.y},${coordinates.x}, ${error}`
        );
      }
    }
  }
  generateCoordinates = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return { x, y };
  };
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
      let result = this.#otherBoard.receiveAttack(coordinates);
      if (!result.error) {
        this.#playerTurn = false;
      }
      return result;
    } else {
      let result = this.#playerBoard.receiveAttack(coordinates);
      if (!result.error) {
        this.#playerTurn = true;
      }
      return result;
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
