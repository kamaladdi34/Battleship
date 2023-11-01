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
updateBoardDom(gameManager.getPlayerBoard(), playerBoardDOM);
updateBoardDom(gameManager.getOtherBoard(), otherPlayerBoardDOM);
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
function updateBoardDom(board, boardDOM) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let content = board[i][j];
      if (content == "ship") {
        boardDOM[i][j].classList.add("ship");
      }
      if (content == "hit") {
        boardDOM[i][j].classList.add("hit");
      }
      if (content == "miss") {
        boardDOM[i][j].classList.add("miss");
      }
      if (content == "miss") {
        boardDOM[i][j].classList.add("miss");
      }
    }
  }
}
