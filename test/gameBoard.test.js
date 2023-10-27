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
});

describe("Tests for GameBoard placeShip() method", () => {
  test("GameBoard places ship with length of 1 at [0,0]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 1);
    let ship = new Ship(1);
    expect(gameBoard.getCell({ x: 0, y: 0 })).toEqual(ship);
  });

  test("GameBoard places ship with length of 1 at [1,1]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 1, y: 1 }, 1);
    let ship = new Ship(1);
    expect(gameBoard.getCell({ x: 1, y: 1 })).toEqual(ship);
  });

  test("GameBoard places doesn't place a ship when target is not empty", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 1);
    gameBoard.placeShip({ x: 0, y: 0 }, 1).catch((error) => {
      expect(error).toBe("Target coordinates not empty");
    });
  });

  test("GameBoard returns error when providing incorrect coordinates", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 22, y: 22 }, 1)).rejects.toMatch(
      "Coordinates out of range"
    );
  });

  test("GameBoard places ship with length of 2 at [0,0]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 2);
    let ship = new Ship(2);
    expect(gameBoard.getCell({ x: 0, y: 0 })).toEqual(ship);
    expect(gameBoard.getCell({ x: 0, y: 1 })).toEqual(ship);
  });

  test("GameBoard places ship with length of 3 at [0,0]", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 3);
    let ship = new Ship(3);
    expect(gameBoard.getCell({ x: 0, y: 0 })).toEqual(ship);
    expect(gameBoard.getCell({ x: 0, y: 1 })).toEqual(ship);
    expect(gameBoard.getCell({ x: 0, y: 2 })).toEqual(ship);
  });

  test("GameBoard doesn't place ship when there is no space for it", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 0, y: 8 }, 3)).rejects.toMatch(
      "Not enough space"
    );
  });

  test("GameBoard doesn't place ship when there is no space for it", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 9, y: 0 }, 11)).rejects.toMatch(
      "Not enough space"
    );
  });

  test("GameBoard places ship with length 3 vertically", () => {
    let gameBoard = new GameBoard(10);
    gameBoard.placeShip({ x: 0, y: 0 }, 3, true);
    let ship = new Ship(3);
    expect(gameBoard.getCell({ x: 0, y: 0 })).toEqual(ship);
    expect(gameBoard.getCell({ x: 1, y: 0 })).toEqual(ship);
    expect(gameBoard.getCell({ x: 2, y: 0 })).toEqual(ship);
  });

  test("GameBoard doesn't place ship when there is no space for it", () => {
    let gameBoard = new GameBoard(10);
    return expect(gameBoard.placeShip({ x: 5, y: 0 }, 6, true)).rejects.toMatch(
      "Not enough space"
    );
  });

  test("GameBoard places ship at [6,1] with a length of 3", async () => {
    let gameBoard = new GameBoard(10);
    await expect(gameBoard.placeShip({ x: 6, y: 1 }, 3, true)).resolves.toEqual(
      { length: 3 }
    );
    expect(gameBoard.getCell({ x: 6, y: 1 })).toEqual({ length: 3 });
    expect(gameBoard.getCell({ x: 7, y: 1 })).toEqual({ length: 3 });
    expect(gameBoard.getCell({ x: 8, y: 1 })).toEqual({ length: 3 });
    expect(gameBoard.getCell({ x: 9, y: 1 })).toEqual("");
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

  test("Ship gets hit", () => {
    let coords = { x: 5, y: 5 };
    gameBoard.receiveAttack(coords);
    let cell = gameBoard.getCell(coords);
    expect(cell.hits).toBeGreaterThan(0);
  });
});
