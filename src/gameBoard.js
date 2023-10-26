const Ship = require("./ship");

class GameBoard {
  #board = null;
  constructor(size) {
    this.generateBoard(size);
  }
  placeShip(coordinates, shipLength) {
    let newShip = new Ship(shipLength);
    this.#board[coordinates.x][coordinates.y] = newShip;
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
