const Ship = require("./ship");

class Cell {
  constructor() {
    this.ship = null;
    this.isHit = false;
  }
}

class GameBoard {
  #board = null;
  #ships = [];
  constructor(size) {
    this.generateBoard(size);
  }

  placeShip(coordinates, shipLength, isVertical = false) {
    let { x, y } = coordinates;
    return new Promise((resolve, reject) => {
      if (!this.#checkCoordinates(coordinates)) {
        reject("Coordinates out of range");
        return;
      }
      if (this.#board[x][y].ship !== null) {
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
          this.#board[x][y + i].ship = newShip;
        }
      } else {
        for (let i = 0; i < shipLength; i++) {
          this.#board[x + i][y].ship = newShip;
        }
      }
      resolve(newShip);
      this.#ships.push(newShip);
    });
  }

  #checkForSpace(coordinates, shipLength, isVertical) {
    let { x, y } = coordinates;
    let canPlaceShip = true;
    if (!isVertical) {
      for (let i = 0; i < shipLength; i++) {
        let coords = { x: x, y: y + i };
        if (
          !this.#checkCoordinates(coords) ||
          this.#board[x][y + i].ship !== null
        ) {
          canPlaceShip = false;
        }
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        let coords = { x: x + i, y: y };
        if (
          !this.#checkCoordinates(coords) ||
          this.#board[x + i][y].ship !== null
        ) {
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

  #checkCoordinates(coordinates) {
    if (!("x" in coordinates) || !("y" in coordinates)) {
      return false;
    }
    if (isNaN(coordinates.x) || isNaN(coordinates.y)) {
      return false;
    }
    if (!this.#coordinatesInRange(coordinates)) {
      return false;
    }
    return true;
  }

  receiveAttack(coordinates) {
    let { x, y } = coordinates;
    if (!this.#checkCoordinates(coordinates)) {
      return;
    }
    this.#board[x][y].isHit = true;
    if (this.#board[x][y].ship == null) {
      return;
    }
    this.#board[x][y].ship.hit();
  }

  allShipsAreSunk() {
    let allAreSunk = true;
    for (let i = 0; i < this.#ships.length; i++) {
      if (!this.#ships[i].isSunk()) {
        allAreSunk = false;
      }
    }
    return allAreSunk;
  }
  getCell(coordinates) {
    return this.#board[coordinates.x][coordinates.y];
  }

  generateBoard(size) {
    this.#board = new Array(size)
      .fill("")
      .map((_) => new Array(size).fill(new Cell()));
  }
}

module.exports = GameBoard;
