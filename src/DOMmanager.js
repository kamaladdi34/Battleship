const GameManager = require("./gameManager.js");
const boardsContainer = document.querySelector(".boards-container");
const formButton = document.querySelector(".player-info > button");
const playerNameInput = document.querySelector(".player-info > #player-name");
const otherNameInput = document.querySelector(".player-info > #other-name");
const info = document.querySelector("body > h3");
const ship5Input = document.querySelector("#ship-5");
const ship4Input = document.querySelector("#ship-4");
const ship3Input = document.querySelector("#ship-3");
const ship3Input2 = document.querySelector("#ship-3-2");
const ship2Input = document.querySelector("#ship-2");
let gameManager = null;
let playerBoardDOM = null;
let otherPlayerBoardDOM = null;
formButton.addEventListener("click", (event) => {
  event.preventDefault();
  let playerName = playerNameInput.value;
  let otherName = otherNameInput.value;
  if (!playerName) {
    playerNameInput.reportValidity();
    return;
  }
  if (!otherName) {
    otherNameInput.reportValidity();
    return;
  }
  let players = [
    { name: playerName, isComputer: false },
    { name: otherName, isComputer: true },
  ];
  newGame(players);
});
document.addEventListener("click", (event) => {
  if (event.target.parentNode.id == "other") {
    let coords = event.target.getAttribute("data-coordinates").split(":");
    playTurn(coords);
  }
});

async function newGame(players) {
  gameManager = new GameManager();
  boardsContainer.innerHTML = "";
  let result = await gameManager
    .newGame(10, players, getCoordinatesInput())
    .catch((error) => {
      console.log(error);
      window.alert("Wrong coordinates");
    });
  if (result != "Game initiated") {
    return;
  }
  gameManager.startGame();

  playerBoardDOM = createBoardDOM(10, "player");
  otherPlayerBoardDOM = createBoardDOM(10, "other");

  updateBoardDom(gameManager.getPlayerBoard(), playerBoardDOM, true);
  updateBoardDom(gameManager.getOtherBoard(), otherPlayerBoardDOM);
}

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
    return;
  }

  gameManager.playTurn(getComputerCoordinates());
  updateBoardDom(gameManager.getOtherBoard(), otherPlayerBoardDOM);
  updateBoardDom(gameManager.getPlayerBoard(), playerBoardDOM, true);
  let winner = gameManager.checkForWinner();
  if (winner) {
    info.innerText = `🎉 Winner is ${winner.name}`;
  }
}

let computerCoords = [];
function getComputerCoordinates() {
  let coordinates = generateCoordinates();
  while (checkCoordinates(coordinates)) {
    coordinates = generateCoordinates();
  }
  computerCoords.push(coordinates);
  return coordinates;
}

function checkCoordinates(coords) {
  let included = false;
  for (let coordinates of computerCoords) {
    if (coordinates.x == coords.x && coordinates.y == coords.y) {
      included = true;
    }
  }
  return included;
}

function generateCoordinates() {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  return { x, y };
}

function formatArray(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(...array[i]);
  }
  return result;
}

function getCoordinatesInput() {
  let coordinates = [];
  let ship5 = ship5Input.value.split("-");
  coordinates.push({ length: 5, coords: { x: +ship5[1], y: +ship5[0] } });
  let ship4 = ship4Input.value.split("-");
  coordinates.push({ length: 4, coords: { x: +ship4[1], y: +ship4[0] } });
  let ship3 = ship3Input.value.split("-");
  coordinates.push({ length: 3, coords: { x: +ship3[1], y: +ship3[0] } });
  let ship3_2 = ship3Input2.value.split("-");
  coordinates.push({ length: 3, coords: { x: +ship3_2[1], y: +ship3_2[0] } });
  let ship2 = ship2Input.value.split("-");
  coordinates.push({ length: 2, coords: { x: +ship2[1], y: +ship2[0] } });
  return coordinates;
}

function updateBoardDom(board, boardDOM, displayships = false) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let content = board[i][j];
      if (content == "ship" && displayships) {
        boardDOM[i][j].classList.add("ship");
        boardDOM[i][j].setAttribute("draggable", true);
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
