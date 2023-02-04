import { WIN_COUNT, BOARD_DIMENSIONS } from "../constants/index.js";

function checkWinner(board, row, col, playerChoice) {
  return (
    checkHorizontal(board, row, col, playerChoice) ||
    checkVertical(board, row, col, playerChoice) ||
    checkDiagonally(board, row, col, playerChoice) ||
    checkAntiDiagonally(board, row, col, playerChoice)
  );
}

function checkHorizontal(board, row, col, choice) {}

function checkVertical(board, row, col, choice) {}

function checkDiagonally(board, row, col, choice) {}

function checkAntiDiagonally(board, row, col, choice) {}

export default checkWinner;
