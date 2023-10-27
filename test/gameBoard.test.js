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
});
