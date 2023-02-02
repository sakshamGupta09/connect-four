import {
  BOARD_DIMENSIONS,
  SLOT_DIMENSIONS,
  GRID_GAP,
} from "../constants/index.js";

// State

// DOM elements

const BOARD_ELEMENT = document.querySelector(".board");

const SLIDER_ELEMENT = document.querySelector(".slider");

// Event Listeners

// Functions

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

// On Load

createBoard();
