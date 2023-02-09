import { WIN_COUNT, BOARD_DIMENSIONS } from "../constants/index.js";

function checkWinner(board, row, col, playerChoice) {
  return (
    checkHorizontal(board, row, col, playerChoice) ||
    checkVertical(board, row, col, playerChoice) ||
    checkDiagonally(board, row, col, playerChoice) ||
    checkAntiDiagonally(board, row, col, playerChoice)
  );
}

function checkHorizontal(board, row, col, choice) {
  let count = 0;
  for (let i = 0; i < BOARD_DIMENSIONS.COLUMNS; i++) {
    if (board[row][i] === choice) {
      count++;
    } else {
      count = 0;
    }
    if (count === WIN_COUNT) {
      return true;
    }
  }
  return false;
}

function checkVertical(board, row, col, choice) {
  let count = 0;
  for (let i = 0; i < BOARD_DIMENSIONS.ROWS; i++) {
    if (board[i][col] === choice) {
      count++;
    } else {
      count = 0;
    }
    if (count === WIN_COUNT) {
      return true;
    }
  }
  return false;
}

function checkDiagonally(board, row, col, choice) {
  let count = 0;
  const lowerBound = -WIN_COUNT + 1;
  const upperBound = WIN_COUNT - 1;
  for (let i = lowerBound; i <= upperBound; i++) {
    if (
      ifRowInRange(i + row) &&
      ifCoumnInRange(i + col) &&
      board[i + row][i + col] === choice
    ) {
      count++;
    } else {
      count = 0;
    }
    if (count === WIN_COUNT) {
      return true;
    }
  }
  return false;
}

function checkAntiDiagonally(board, row, col, choice) {
  let count = 0;
  const lowerBound = -WIN_COUNT + 1;
  const upperBound = WIN_COUNT - 1;
  for (let i = lowerBound; i <= upperBound; i++) {
    if (
      ifRowInRange(i + row) &&
      ifCoumnInRange(col - i) &&
      board[i + row][col - i] === choice
    ) {
      count++;
    } else {
      count = 0;
    }
    if (count === WIN_COUNT) {
      return true;
    }
  }
  return false;
}

function ifCoumnInRange(colNumber) {
  return colNumber >= 0 && colNumber < BOARD_DIMENSIONS.COLUMNS;
}

function ifRowInRange(rowNumber) {
  return rowNumber >= 0 && rowNumber < BOARD_DIMENSIONS.ROWS;
}

export default checkWinner;
