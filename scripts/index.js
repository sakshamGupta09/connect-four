import {
  BOARD_DIMENSIONS,
  SLOT_DIMENSIONS,
  GRID_GAP,
  PLAYERS,
} from "../constants/index.js";

import debounceTime from "../utils/debounce.js";

import checkWinner from "../utils/check-winner.js";

// State

const boardState = [];

const filledColumns = new Array(BOARD_DIMENSIONS.COLUMNS).fill(0);

let activePlayer = PLAYERS.P1;

// DOM elements

const BOARD_ELEMENT = document.querySelector(".board");

const SLIDER_ELEMENT = document.querySelector(".slider");

const PLAYER = document.querySelector(".player");

// Event Listeners

BOARD_ELEMENT.addEventListener("mouseover", mouseoverHandler);

BOARD_ELEMENT.addEventListener("click", debounceTime(boardClickHandler, 200));

// Functions

function mouseoverHandler(e) {
  if (e.target.classList.contains("board__slot")) {
    const jCoordinate = e.target.dataset.j;
    moveSlider(jCoordinate);
  }
}

function boardClickHandler(e) {
  if (e.target.classList.contains("board__slot")) {
    const jCoordinate = parseInt(e.target.dataset.j);
    computeSlotPosition(jCoordinate);
  }
}

// Utils

function toggleActivePlayer() {
  if (activePlayer.name === PLAYERS.P1.name) {
    activePlayer = { ...PLAYERS.P2 };
  } else {
    activePlayer = { ...PLAYERS.P1 };
  }
  setSliderColor();
  displayActivePlayer();
}

function getSlotNode(i, j) {
  const DIV = document.createElement("div");

  DIV.classList.add("board__slot");

  DIV.style.width = SLOT_DIMENSIONS.WIDTH + "rem";
  DIV.style.height = SLOT_DIMENSIONS.HEIGHT + "rem";

  DIV.dataset.i = i;
  DIV.dataset.j = j;

  return DIV;
}

function createBoard() {
  BOARD_ELEMENT.style.gridTemplateRows = `repeat(${BOARD_DIMENSIONS.ROWS}, ${SLOT_DIMENSIONS.HEIGHT}rem)`;
  BOARD_ELEMENT.style.gridTemplateColumns = `repeat(${BOARD_DIMENSIONS.COLUMNS}, ${SLOT_DIMENSIONS.WIDTH}rem)`;
  BOARD_ELEMENT.style.gap = GRID_GAP + "rem";

  SLIDER_ELEMENT.style.width = SLOT_DIMENSIONS.WIDTH + "rem";
  SLIDER_ELEMENT.style.height = SLOT_DIMENSIONS.HEIGHT + "rem";

  PLAYER.querySelector(".board__slot").style.width =
    SLOT_DIMENSIONS.WIDTH + "rem";
  PLAYER.querySelector(".board__slot").style.height =
    SLOT_DIMENSIONS.HEIGHT + "rem";

  setSliderColor();
  displayActivePlayer();

  for (let i = 0; i < BOARD_DIMENSIONS.ROWS; i++) {
    for (let j = 0; j < BOARD_DIMENSIONS.COLUMNS; j++) {
      BOARD_ELEMENT.appendChild(getSlotNode(i, j));
    }
  }
}

function setSliderColor() {
  SLIDER_ELEMENT.style.color = activePlayer.color;
}

function moveSlider(jCoordinate) {
  const translateBy = jCoordinate * (SLOT_DIMENSIONS.WIDTH + GRID_GAP);
  SLIDER_ELEMENT.style.transform = `translateX(${translateBy}rem)`;
}

function displayActivePlayer() {
  PLAYER.querySelector(".player__name").textContent =
    activePlayer.name + " turn";
  PLAYER.querySelector(".board__slot").style.backgroundColor =
    activePlayer.color;
}

function computeSlotPosition(jValue) {
  const rowNumberToFill = BOARD_DIMENSIONS.ROWS - filledColumns[jValue] - 1;
  if (rowNumberToFill >= 0) {
    fillSlot(rowNumberToFill, jValue);
    filledColumns[jValue]++;
  }
}

function fillSlot(i, j) {
  boardState[i][j] = activePlayer.name;
  const slotNode = document.querySelector(`[data-i='${i}'][data-j='${j}']`);
  slotNode.style.backgroundColor = activePlayer.color;
  if (checkWinner(boardState, i, j, activePlayer.name)) {
    console.log("[Winner found]");
  }
  toggleActivePlayer();
}

function initState() {
  for (let i = 0; i < BOARD_DIMENSIONS.ROWS; i++) {
    boardState.push(new Array(BOARD_DIMENSIONS.COLUMNS));
  }
}

// On Load

createBoard();

initState();
