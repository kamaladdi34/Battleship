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
  #Allowedships = [
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
  ];
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
      let newShip = this.#getShip(shipLength);
      if (!newShip) {
        reject("No ship found");
      }
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

  #getShip(shipLength) {
    for (let i = 0; i < this.#Allowedships.length; i++) {
      if (this.#Allowedships[i].length == shipLength) {
        return this.#Allowedships.splice(i, 1)[0];
      }
    }
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
    if (this.#board[x][y].isHit == true) {
      return { success: false, shipHit: false, error: "Cell already hit" };
    }
    this.#board[x][y].isHit = true;

    if (this.#board[x][y].ship == null) {
      return { success: true, shipHit: false, error: null };
    }

    this.#board[x][y].ship.hit();
    return { success: true, shipHit: true, error: null };
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
      .map((_) => new Array(size).fill("").map((_) => new Cell()));
  }
}

module.exports = GameBoard;
