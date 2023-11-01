const GameManager = require("./gameManager.js");
const boardsContainer = document.querySelector(".boards-container");
document.addEventListener("click", (event) => {
  console.dir(event.target.parentNode.id);
});
let players = [
  { name: "player one", isComputer: false },
  { name: "player two", isComputer: false },
];
const gameManager = new GameManager();
gameManager.newGame(10, players);
let playerBoardDOM = createBoardDOM(10, "player");
let otherPlayerBoardDOM = createBoardDOM(10, "other");
updateBoardDom(gameManager.getPlayerBoard(), playerBoardDOM);
updateBoardDom(gameManager.getOtherBoard(), otherPlayerBoardDOM);
function createBoardDOM(size, id) {
  let boardDOM = new Array(size).fill("").map((_) => new Array(size).fill(""));

  let board = document.createElement("div");
  board.id = id;
  board.classList.add("board");
  let cells = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coordinates", `${i}:${j}`);
      boardDOM[i][j] = cell;
      row.push(cell);
    }
    cells.push(row);
  }
  cells.reverse();
  cells = formatArray(cells);
  board.append(...cells);
  boardsContainer.appendChild(board);
  return boardDOM;
}
function formatArray(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(...array[i]);
  }
  return result;
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
