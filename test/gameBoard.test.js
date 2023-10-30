const GameBoard = require("../src/gameBoard");
const Ship = require("../src/ship");
describe("Tests for GameBoard class and it's methods", () => {
  test("GameBoard class exists", () => {
    expect(GameBoard).toBeDefined();
  });

  test("GameBoard has placeShip() method", () => {
    expect(GameBoard.prototype.placeShip).toBeDefined();
  });

  test("GameBoard has receiveAttack() method", () => {
    expect(GameBoard.prototype.receiveAttack).toBeDefined();
  });

  test("GameBoard has allShipsAreSunk() method", () => {
    expect(GameBoard.prototype.allShipsAreSunk).toBeDefined();
  });

  test("GameBoard has getCell() method", () => {
    expect(GameBoard.prototype.getCell).toBeDefined();
  });

  test("GameBoard has getCell() method", () => {
    expect(GameBoard.prototype.allShipsPlaced).toBeDefined();
  });
});

describe("Tests for GameBoard placeShip() method", () => {
  test("GameBoard places ship with length of 2 at [0,0]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 2);
    let ship = new Ship(2);
    expect(gameBoard.getCell({ x: 0, y: 0 }).ship).toEqual(ship);
    expect(gameBoard.getCell({ x: 0, y: 1 }).ship).toEqual(ship);
  });

  test("GameBoard places ship with length of 2 at [1,1]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 1, y: 1 }, 2);
    let ship = new Ship(2);
    expect(gameBoard.getCell({ x: 1, y: 1 }).ship).toEqual(ship);
    expect(gameBoard.getCell({ x: 1, y: 2 }).ship).toEqual(ship);
  });

  test("GameBoard places doesn't place a ship when target is not empty", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 2);
    gameBoard.placeShip({ x: 0, y: 0 }, 2).catch((error) => {
      expect(error).toBe("Target coordinates not empty");
    });
  });

  test("GameBoard returns error when providing incorrect coordinates", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 22, y: 22 }, 2)).rejects.toMatch(
      "Coordinates out of range"
    );
  });

  test("GameBoard places ship with length of 2 at [0,0]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 2);
    let ship = new Ship(2);
    expect(gameBoard.getCell({ x: 0, y: 0 }).ship).toEqual(ship);
    expect(gameBoard.getCell({ x: 0, y: 1 }).ship).toEqual(ship);
  });

  test("GameBoard places ship with length of 3 at [0,0]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 3);
    let ship = new Ship(3);
    expect(gameBoard.getCell({ x: 0, y: 0 }).ship).toEqual(ship);
    expect(gameBoard.getCell({ x: 0, y: 1 }).ship).toEqual(ship);
    expect(gameBoard.getCell({ x: 0, y: 2 }).ship).toEqual(ship);
  });

  test("GameBoard doesn't place ship when there is no space for it", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 0, y: 8 }, 3)).rejects.toMatch(
      "Not enough space"
    );
  });

  test("GameBoard doesn't place ship when there is no space for it", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 9, y: 0 }, 5, true)).rejects.toMatch(
      "Not enough space"
    );
  });

  test("GameBoard doesn't place two ships of length 5", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 5);
    return expect(gameBoard.placeShip({ x: 1, y: 0 }, 5)).rejects.toMatch(
      "No ship found"
    );
  });
  test("GameBoard places two ships of length 3", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 3);
    return expect(gameBoard.placeShip({ x: 1, y: 0 }, 3)).resolves.toEqual(
      new Ship(3)
    );
  });

  test("GameBoard places ship with length 3 vertically", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 3, true);
    let ship = new Ship(3);
    expect(gameBoard.getCell({ x: 0, y: 0 }).ship).toEqual(ship);
    expect(gameBoard.getCell({ x: 1, y: 0 }).ship).toEqual(ship);
    expect(gameBoard.getCell({ x: 2, y: 0 }).ship).toEqual(ship);
  });

  test("GameBoard doesn't place ship when there is no space for it", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 6, y: 0 }, 5, true)).rejects.toMatch(
      "Not enough space"
    );
  });

  test("GameBoard places ship at [6,1] with a length of 3", async () => {
    let gameBoard = new GameBoard(10);
    await expect(gameBoard.placeShip({ x: 6, y: 1 }, 3, true)).resolves.toEqual(
      { length: 3 }
    );
    expect(gameBoard.getCell({ x: 6, y: 1 }).ship).toEqual({ length: 3 });
    expect(gameBoard.getCell({ x: 7, y: 1 }).ship).toEqual({ length: 3 });
    expect(gameBoard.getCell({ x: 8, y: 1 }).ship).toEqual({ length: 3 });
    expect(gameBoard.getCell({ x: 9, y: 1 }).ship).toBe(null);
  });
});

describe("Tests for receiveAttack() method", () => {
  let gameBoard = null;

  beforeEach(() => {
    gameBoard = new GameBoard(10);
    let coords = { x: 5, y: 5 };
    gameBoard.placeShip(coords, 3, false);
  });

  afterEach(() => {
    gameBoard = null;
  });

  test("Ship gets hit when calling receiveAttack()", () => {
    let coords = { x: 5, y: 5 };
    gameBoard.receiveAttack(coords);
    let cell = gameBoard.getCell(coords);
    expect(cell.ship.hits).toBeGreaterThan(0);
    expect(cell.isHit).toBe(true);
  });

  test("Board cell registers hit", () => {
    let coords = { x: 0, y: 0 };
    gameBoard.receiveAttack(coords);
    let cell = gameBoard.getCell(coords);
    expect(cell.isHit).toBe(true);
    expect(cell.ship).toBeNull();
  });
});

describe("Tests for allShipsAreSunk() method", () => {
  test("allShipsAreSunk() with one Ship with a length of 1 returns true", () => {
    let gameBoard = null;
    gameBoard = new GameBoard(10);
    let coords = { x: 5, y: 5 };
    gameBoard.placeShip(coords, 2, false);
    gameBoard.receiveAttack({ x: 5, y: 5 });
    gameBoard.receiveAttack({ x: 5, y: 6 });
    expect(gameBoard.allShipsAreSunk()).toBe(true);
  });

  test("allShipsAreSunk() with two Ships with a length of 2 returns true", () => {
    let gameBoard = null;
    gameBoard = new GameBoard(10);
    let coords = { x: 0, y: 0 };
    gameBoard.placeShip(coords, 2, false);
    gameBoard.receiveAttack({ x: 0, y: 0 });
    gameBoard.receiveAttack({ x: 0, y: 1 });
    gameBoard.placeShip({ x: 1, y: 0 }, 3, false);
    gameBoard.receiveAttack({ x: 1, y: 0 });
    gameBoard.receiveAttack({ x: 1, y: 1 });
    gameBoard.receiveAttack({ x: 1, y: 2 });
    expect(gameBoard.allShipsAreSunk()).toBe(true);
  });

  test("allShipsAreSunk() with one ship sunk and one not sunk returns false", () => {
    let gameBoard = null;
    gameBoard = new GameBoard(10);
    let coords = { x: 0, y: 0 };
    gameBoard.placeShip(coords, 2, false);
    gameBoard.receiveAttack({ x: 0, y: 0 });
    gameBoard.receiveAttack({ x: 0, y: 1 });
    gameBoard.placeShip({ x: 1, y: 0 }, 3, false);
    gameBoard.receiveAttack({ x: 1, y: 0 });
    expect(gameBoard.allShipsAreSunk()).toBe(false);
  });
});

describe("Test for allShipsArePlaced()", () => {
  test("allShipsArePlaced() returnes true when all ships are placed", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 5);
    gameBoard.placeShip({ x: 1, y: 0 }, 4);
    gameBoard.placeShip({ x: 2, y: 0 }, 3);
    gameBoard.placeShip({ x: 3, y: 0 }, 3);
    gameBoard.placeShip({ x: 4, y: 0 }, 2);
    expect(gameBoard.allShipsPlaced()).toBe(true);
  });
  test("allShipsArePlaced() returnes false when no ship is placed", () => {
    let gameBoard = new GameBoard(10);
    expect(gameBoard.allShipsPlaced()).toBe(false);
  });
});
