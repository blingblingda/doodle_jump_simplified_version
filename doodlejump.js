//board
let board;
let boardWith = 360;
let boardHeight = 576;
let context;

window.onload = function () {
  board = document.querySelector("#board");
  board.height = boardHeight;
  board.width = boardWith;
  context = board.getContext("2d");
};
