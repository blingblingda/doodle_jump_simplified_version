//board
let board;
let boardWith = 360;
let boardHeight = 576;
let context;

//doodler
let doodlerWith = 46;
let doodlerHeight = 46;
let doodlerX = boardWith / 2 - doodlerWith / 2;
let doodlerY = (boardHeight * 7) / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: doodlerWith,
  height: doodlerHeight,
};

//physics
let velocityX = 0;

window.onload = function () {
  board = document.querySelector("#board");
  board.height = boardHeight;
  board.width = boardWith;
  context = board.getContext("2d");

  //draw doodler
  // context.fillStyle = "green";
  // context.fillRect(doodler.x, doodler.y, doodler.width, doodler.height);

  //load images
  doodlerRightImg = new Image();
  doodlerRightImg.src = "./assets/doodler-right.png";
  doodler.img = doodlerRightImg;
  doodlerRightImg.onload = function () {
    context.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodler.width,
      doodler.height
    );
  };

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "./assets/doodler-left.png";

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveDoodler);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  //task logic
  doodler.x += velocityX;
  context.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );
}

function moveDoodler(e) {
  if (e.code == "ArrowRight" || e.code == "KeyD") {
    velocityX = 4;
    doodler.img = doodlerRightImg;
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    velocityX = -4;
    doodler.img = doodlerLeftImg;
  }
}
