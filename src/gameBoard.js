const Ship = require("./ship");

class GameBoard {
  #board = null;
  constructor(size) {
    this.generateBoard(size);
  }
  placeShip(coordinates, shipLength, isVertical = false) {
    let { x, y } = coordinates;
    return new Promise((resolve, reject) => {
      if (!this.#coordinatesInRange(coordinates)) {
        reject("Coordinates out of range");
        return;
      }
      if (this.#board[x][y] !== "") {
        reject("Target coordinates not empty");
        return;
      }
      if (!this.#checkForSpace(coordinates, shipLength, isVertical)) {
        reject("Not enough space");
        return;
      }
      let newShip = new Ship(shipLength);
      if (!isVertical) {
        for (let i = 0; i < shipLength; i++) {
          this.#board[x][y + i] = newShip;
        }
      } else {
        for (let i = 0; i < shipLength; i++) {
          this.#board[x + i][y] = newShip;
        }
      }
      resolve(newShip);
    });
  }
  #checkForSpace(coordinates, shipLength, isVertical) {
    let { x, y } = coordinates;
    let canPlaceShip = true;
    if (!isVertical) {
      for (let i = 0; i < shipLength; i++) {
        let coords = { x: x, y: y + i };
        if (!this.#coordinatesInRange(coords) || this.#board[x][y + i] !== "") {
          canPlaceShip = false;
        }
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        let coords = { x: x + i, y: y };
        if (!this.#coordinatesInRange(coords) || this.#board[x + i][y] !== "") {
          console.log(coords);
          canPlaceShip = false;
        }
      }
    }
    return canPlaceShip;
  }
  #coordinatesInRange(coordinates) {
    let { x, y } = coordinates;
    return !(
      x < 0 ||
      y < 0 ||
      x >= this.#board.length ||
      y >= this.#board.length
    );
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
