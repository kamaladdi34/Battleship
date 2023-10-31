const GameManager = require("../src/gameManager");
test("Game manager has a newGame() funciton", () => {
  expect(GameManager.prototype.newGame).toBeDefined();
});
test("Game manager has a startGame() funciton", () => {
  expect(GameManager.prototype.startGame).toBeDefined();
});
test("Game manager has a playTurn() funciton", () => {
  expect(GameManager.prototype.playTurn).toBeDefined();
});

test("Game manager newGame() initiates a new game", () => {
  let gameManager = new GameManager();
  let playerInfo = [
    { name: "player1", isComputer: false },
    { name: "player2", isComputer: true },
  ];
  return expect(gameManager.newGame(10, playerInfo)).resolves.toMatch(
    "Game initiated"
  );
});

test("startGame() doesn't start game when boards not set up", () => {
  let gameManager = new GameManager();
  expect(gameManager.startGame()).toBe(false);
  expect(gameManager.gameStarted).toBe(false);
});

test("startGame() starts game when boards set up", async () => {
  let gameManager = new GameManager();

  let playerInfo = [
    { name: "player1", isComputer: false },
    { name: "player2", isComputer: true },
  ];
  await expect(gameManager.newGame(10, playerInfo)).resolves.toMatch(
    "Game initiated"
  );
  expect(gameManager.startGame()).toBe(true);
  expect(gameManager.gameStarted).toBe(true);
});

test("startGame() doesn't starts game when playerInfo is undefined", async () => {
  let gameManager = new GameManager();

  let playerInfo = undefined;
  await expect(gameManager.newGame(10, playerInfo)).rejects.toMatch(
    "Incorrect game info"
  );
  expect(gameManager.startGame()).toBe(false);
  expect(gameManager.gameStarted).toBe(false);
});

test("playTurn() returns false when game didn't start yet", () => {
  let gameManager = new GameManager();
  expect(gameManager.playTurn({ x: 2, y: 1 })).toBe(undefined);
});
