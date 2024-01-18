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
let velocityY = 0;
let initialVelocityY = -8;
let gravity = 0.4;

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

  velocityY = initialVelocityY;

  //Game loop
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveDoodler);
};

const update = () => {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, boardWidth, boardHeight);

  //draw a doodler over and over again
  velocityY += gravity;
  doodler.y += velocityY;
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
    if (velocityY < 0 && doodler.y < (boardHeight * 3) / 4) {
      platform.y -= initialVelocityY;
    }
    if (detectCollision(doodler, platform) && velocityY >= 0) {
      velocityY = initialVelocityY;
    }
    ctx.drawImage(
      platform.img,
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
  }

  // clear platforms and add new platform
  while (platformArr.length > 0 && platformArr[0].y >= boardHeight) {
    platformArr.shift();
    newPlatform();
  }

  //score
  updateScore();
  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(score, 5, 20);
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

const newPlatform = () => {
  let randomX = Math.floor((Math.random() * boardWidth * 3) / 4);
  platform = {
    img: platformImg,
    x: randomX,
    y: -platformHeight,
    width: platformWidth,
    height: platformHeight,
  };

  platformArr.push(platform);
};

const detectCollision = (a, b) => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};

const updateScore = () => {
  let points = Math.floor(50 * Math.random());
  if (verlocityY < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (velocityY >= 0) {
    maxScore -= points;
  }
};
