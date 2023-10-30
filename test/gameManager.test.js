const GameManager = require("../src/gameManager");
test("Game manager has a newGame() funciton", () => {
  expect(GameManager.prototype.newGame).toBeDefined();
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
