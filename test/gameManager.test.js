const GameManager = require("../src/gameManager");
test("Game manager has a newGame() funciton", () => {
  expect(GameManager.prototype.newGame).toBeDefined();
});
test("Game manager has a startGame() funciton", () => {
  expect(GameManager.prototype.startGame).toBeDefined();
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
});

test("startGame() doesn't starts game when boards set up", async () => {
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
