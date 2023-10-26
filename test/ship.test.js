const Ship = require("../src/ship");

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
