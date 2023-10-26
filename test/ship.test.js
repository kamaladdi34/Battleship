const Ship = require("../src/ship");

describe("Test ship class and properties", () => {
  let exampleShip = null;

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
    let exampleShip = new Ship(-3);
    expect(exampleShip.length).toBe(3);
  });

  test("Ship length defaults to 1 when passed 0", () => {
    let exampleShip = new Ship(0);
    expect(exampleShip.length).toBe(1);
  });

  test("Ship length defaults to 1 when passed an non integer value", () => {
    let exampleShip = new Ship("foo");
    expect(exampleShip.length).toBe(1);
  });

  test("Ship length is floored when passed decimal values", () => {
    let exampleShip = new Ship(2.1);
    expect(exampleShip.length).toBe(2);
  });
});

describe("Test ship's hit() and isSunk() method", () => {
  let exampleShip = null;
  beforeEach(() => {
    exampleShip = new Ship(3);
  });

  afterEach(() => {
    exampleShip = null;
  });

  test("Calling hit() increments ship's hits", () => {
    exampleShip.hit();
    expect(exampleShip.hits).toBe(1);
  });

  test("isSunk() returns false when hits are less than length", () => {
    exampleShip.hit();
    expect(exampleShip.hits).toBe(1);
    expect(exampleShip.isSunk()).toBe(false);
    expect(exampleShip.length > exampleShip.hits).toBe(true);
  });

  test("isSunk() returns true when hits are more than or equal", () => {
    exampleShip.hit();
    exampleShip.hit();
    exampleShip.hit();
    expect(exampleShip.length).toBe(3);
    expect(exampleShip.hits).toBe(3);
    expect(exampleShip.isSunk()).toBe(true);
    expect(exampleShip.length <= exampleShip.hits).toBe(true);
  });

  test("Ship cannot be hit when it's already sunk", () => {
    exampleShip.hit();
    exampleShip.hit();
    exampleShip.hit();
    exampleShip.hit();
    expect(exampleShip.length).toBe(3);
    expect(exampleShip.hits).toBe(3);
    expect(exampleShip.isSunk()).toBe(true);
    expect(exampleShip.length <= exampleShip.hits).toBe(true);
  });
});
