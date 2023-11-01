const GameManager = require("./gameManager.js");
const boardsContainer = document.querySelector(".boards-container");
let players = [
  { name: "player one", isComputer: false },
  { name: "player two", isComputer: false },
];
const gameManager = new GameManager();
gameManager.newGame(10, players);
let playerBoardDOM = createBoardDOM(10);
let otherPlayerBoardDOM = createBoardDOM(10);
function createBoardDOM(size) {
  let boardDOM = new Array(size).fill("").map((_) => new Array(size).fill(""));

  let board = document.createElement("div");
  board.classList.add("board");

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      boardDOM[i][j] = cell;
      board.appendChild(cell);
    }
  }
  boardsContainer.appendChild(board);
  return boardDOM;
}
