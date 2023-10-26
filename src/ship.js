class Ship {
  #hits = 0;
  constructor(length) {
    this.length = this.#setLength(length);
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#hits >= this.length;
  }

  #setLength(length) {
    if (isNaN(length)) {
      return 1;
    }
    let shipLength = Math.floor(Math.abs(length));
    if (shipLength == 0) {
      return 1;
    }
    return shipLength;
  }
}

module.exports = Ship;
