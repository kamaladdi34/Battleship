const Player = require("../src/player");

describe("Test player class and it's properties", () => {
  test("Player class is defined", () => {
    expect(Player).toBeDefined();
  });
  let player = new Player();
  test("Player class has name property", () => {
    expect(player.name).toBeDefined();
  });
  test("Player class has isComputer property", () => {
    expect(player.isComputer).toBeDefined();
  });
});
