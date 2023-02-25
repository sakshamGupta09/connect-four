import {
  BOARD_DIMENSIONS,
  SLOT_DIMENSIONS,
  GRID_GAP,
  PLAYERS,
} from "../constants/index.js";

import debounceTime from "../utils/debounce.js";

import checkWinner from "../utils/check-winner.js";

import getModalNode from "../utils/modal.js";

// State

let boardState = [];

let filledColumns = new Array(BOARD_DIMENSIONS.COLUMNS).fill(0);

let activePlayer;

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

function displayWinnerModal() {
  const modal = getModalNode(false, false);
  modal.querySelector(".modal__body").appendChild(getWinnerModal());
  document.body.appendChild(modal);
  modal.addEventListener("click", removeModal.bind(this, modal));
}

function removeModal(modalNode) {
  modalNode.remove();
  resetState();
}

// Utils

function setDefaultActivePlayer() {
  activePlayer = PLAYERS.P1;
  displayActivePlayer();
  setSliderColor();
}

function resetState() {
  boardState = [];
  filledColumns = new Array(BOARD_DIMENSIONS.COLUMNS).fill(0);
  initBoard();
  BOARD_ELEMENT.innerHTML = ``;
  createBoard();
  setDefaultActivePlayer();
}

function getWinnerModal() {
  const node = document.createElement("div");
  node.classList.add("winner__container");
  node.innerHTML = `
    <div class="winner">
      <h2 class="winner__name">${activePlayer.name} Wins</h2>
      <button class="btn">Play again</button>
    </div>
  `;
  return node;
}

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
    displayWinnerModal();
    return;
  }
  toggleActivePlayer();
}

function initBoard() {
  for (let i = 0; i < BOARD_DIMENSIONS.ROWS; i++) {
    boardState.push(new Array(BOARD_DIMENSIONS.COLUMNS));
  }
}

// On Load

initBoard();

setDefaultActivePlayer();

createBoard();
