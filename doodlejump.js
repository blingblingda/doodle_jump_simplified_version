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

//platforms
let platformArr = [];
let platformImg;
let platformWidth = 60;
let platformHeight = 18;

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

  //load platform img
  platformImg = new Image();
  platformImg.src = "./assets/platform.png";
  placePlatforms();

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

  //draw platforms
  for (let i = 0; i < platformArr.length; i++) {
    let platform = platformArr[i];
    ctx.drawImage(
      platform.img,
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
  }
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

const placePlatforms = () => {
  platformArr = [];

  //starting platform
  platform = {
    img: platformImg,
    x: boardWidth / 2,
    y: boardHeight - 50,
    width: platformWidth,
    height: platformHeight,
  };

  platformArr.push(platform);

  for (let i = 0; i < 6; i++) {
    let randomX = Math.floor((Math.random() * boardWidth * 3) / 4);
    platform = {
      img: platformImg,
      x: randomX,
      y: boardHeight - i * 75 - 150,
      width: platformWidth,
      height: platformHeight,
    };

    platformArr.push(platform);
  }
};
