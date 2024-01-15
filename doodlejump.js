//board
let board;
let boardWidth = 360;
let boardHeight = 576;
let ctx;

//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = (boardHeight * 7) / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;
let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: doodlerWidth,
  height: doodlerHeight,
};

//physics
let velocityX = 0;

window.onload = () => {
  //set up the board
  let board = document.querySelector("#board");
  board.width = boardWidth;
  board.height = boardHeight;
  ctx = board.getContext("2d");

  //draw a doodler on the canvas
  doodlerRightImg = new Image();
  doodlerRightImg.src = "./assets/doodler-right.png";
  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "./assets/doodler-left.png";

  doodler.img = doodlerRightImg;
  doodlerRightImg.onload = () => {
    ctx.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodler.width,
      doodler.height
    );
  };

  //Game loop
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveDoodler);
};

const update = () => {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, boardWidth, boardHeight);

  //draw a doodler over and over again
  doodler.x += velocityX;
  if (doodler.x > boardWidth) {
    doodler.x = 0;
  } else if (doodler.x + doodler.width < 0) {
    doodler.x = boardWidth;
  }

  ctx.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );
};

const moveDoodler = (e) => {
  console.log(e.code);
  if (e.code === "KeyD" || e.code === "ArrowRight") {
    velocityX = 4;
    doodler.img = doodlerRightImg;
  } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
    velocityX = -4;
    doodler.img = doodlerLeftImg;
  }
};
