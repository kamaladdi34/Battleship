const Ship = require("./ship");

class GameBoard {
  #board = null;
  constructor(size) {
    this.generateBoard(size);
  }
  placeShip(coordinates, shipLength) {
    let { x, y } = coordinates;
    return new Promise((resolve, reject) => {
      if (this.#coordinatesInRange(coordinates)) {
        reject("Coordinates out of range");
        return;
      }
      if (this.#board[x][y] !== "") {
        reject("Target coordinates not empty");
        return;
      }
      let newShip = new Ship(shipLength);
      for (let i = 0; i < shipLength; i++) {
        this.#board[x][y + i] = newShip;
      }
      resolve(newShip);
    });
  }
  #coordinatesInRange(coordinates) {
    let { x, y } = coordinates;
    return x < 0 || y < 0 || x > this.#board.length || y > this.#board.length;
  }
  receiveAttack() {}
  allShipsAreSunk() {}
  getCell(coordinates) {
    return this.#board[coordinates.x][coordinates.y];
  }
  generateBoard(size) {
    this.#board = new Array(size).fill("").map((_) => new Array(size).fill(""));
  }
}

module.exports = GameBoard;
