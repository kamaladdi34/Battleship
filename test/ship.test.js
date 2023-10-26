const Ship = require("../src/ship");

let exampleShip = null;

describe("Test ship class and properties", () => {
  beforeAll(() => {
    exampleShip = new Ship(3);
  });

  afterAll(() => {
    exampleShip = null;
  });
  test("Ship class exists", () => {
    expect(Ship).toBeDefined();
  });

  test("Ship has length", () => {
    expect(exampleShip.length).toBe(3);
  });

  test("Ship has hit() method", () => {
    expect(exampleShip.hit).toBeDefined();
  });

  test("Ship has isSunk() method", () => {
    expect(exampleShip.isSunk).toBeDefined();
  });
});

describe("Tests for Ship's length", () => {
  test("Ship constructor makes negative length values positive", () => {
    exampleShip = new Ship(-3);
    expect(exampleShip.length).toBe(3);
  });

  test("Ship length defaults to 1 when passed 0", () => {
    exampleShip = new Ship(0);
    expect(exampleShip.length).toBe(1);
  });

  test("Ship length defaults to 1 when passed an non integer value", () => {
    exampleShip = new Ship("foo");
    expect(exampleShip.length).toBe(1);
  });

  test("Ship length is floored when passed decimal values", () => {
    exampleShip = new Ship(2.1);
    expect(exampleShip.length).toBe(2);
  });
});
