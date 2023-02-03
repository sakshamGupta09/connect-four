import {
  BOARD_DIMENSIONS,
  SLOT_DIMENSIONS,
  GRID_GAP,
} from "../constants/index.js";

// State

const filledColumns = new Array(BOARD_DIMENSIONS.COLUMNS).fill(0);

// DOM elements

const BOARD_ELEMENT = document.querySelector(".board");

const SLIDER_ELEMENT = document.querySelector(".slider");

// Event Listeners

BOARD_ELEMENT.addEventListener("mouseover", mouseoverHandler);

BOARD_ELEMENT.addEventListener("click", boardClickHandler);

// Functions

function mouseoverHandler(e) {
  if (e.target.classList.contains("board__slot")) {
    const jCoordinate = e.target.dataset.j;
    moveSlider(jCoordinate);
  }
}

function boardClickHandler(e) {
  if (e.target.classList.contains("board__slot")) {
    const jCoordinate = e.target.dataset.j;
    computeSlotPosition(jCoordinate);
  }
}

// Utils

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

  for (let i = 0; i < BOARD_DIMENSIONS.ROWS; i++) {
    for (let j = 0; j < BOARD_DIMENSIONS.COLUMNS; j++) {
      BOARD_ELEMENT.appendChild(getSlotNode(i, j));
    }
  }
}

function moveSlider(jCoordinate) {
  const translateBy = jCoordinate * (SLOT_DIMENSIONS.WIDTH + GRID_GAP);
  SLIDER_ELEMENT.style.transform = `translateX(${translateBy}rem)`;
}

function computeSlotPosition(jValue) {
  const rowNumberToFill = BOARD_DIMENSIONS.ROWS - filledColumns[jValue] - 1;
  if (rowNumberToFill >= 0) {
    fillSlot(rowNumberToFill, jValue);
    filledColumns[jValue]++;
  }
}

function fillSlot(i, j) {
  const slotNode = document.querySelector(`[data-i='${i}'][data-j='${j}']`);
  slotNode.classList.add("active");
}

// On Load

createBoard();
