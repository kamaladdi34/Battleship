const GameBoard = require("./gameBoard.js");
const GameManager = require("./gameManager.js");
const boardsContainer = document.querySelector(".boards-container");

let players = [
  { name: "player one", isComputer: false },
  { name: "player two", isComputer: false },
];

const gameManager = new GameManager();

document.addEventListener("click", (event) => {
  if (event.target.parentNode.id == "other") {
    let coords = event.target.getAttribute("data-coordinates").split(":");
    playTurn(coords);
  }
});

gameManager.newGame(10, players);
gameManager.startGame();

let playerBoardDOM = createBoardDOM(10, "player");
let otherPlayerBoardDOM = createBoardDOM(10, "other");

updateBoardDom(gameManager.getPlayerBoard(), playerBoardDOM, true);
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

function playTurn(coords) {
  let result = gameManager.playTurn({ x: coords[0], y: coords[1] });
  if (result.error) {
    console.log(result.error);
    return;
  }
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  gameManager.playTurn({ x, y });
  console.log(x, y);
  updateBoardDom(gameManager.getOtherBoard(), otherPlayerBoardDOM);
  updateBoardDom(gameManager.getPlayerBoard(), playerBoardDOM, true);
  let winner = gameManager.checkForWinner();
  if (winner) {
    console.log(winner);
  }
}
function formatArray(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(...array[i]);
  }
  return result;
}

function updateBoardDom(board, boardDOM, displayships = false) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let content = board[i][j];
      if (content == "ship" && displayships) {
        boardDOM[i][j].classList.add("ship");
      }
      if (content == "hit") {
        boardDOM[i][j].classList.add("hit");
      }
      if (content == "miss") {
        boardDOM[i][j].classList.add("miss");
      }
    }
  }
}
