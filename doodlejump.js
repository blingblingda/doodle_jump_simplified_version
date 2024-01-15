//board
let board;
let boardWidth = 360;
let boardHeight = 576;
let ctx;

window.onload = () => {
  //set up the board
  let board = document.querySelector("#board");
  board.width = boardWidth;
  board.height = boardHeight;
  cxt = board.getContext("2d");
};
