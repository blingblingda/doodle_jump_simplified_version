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

//scores
let score = 0;
let maxScore = 0;
let gameOver = false;

//Draw on the canvas
window.onload = () => {
  //set up the canvas
  let board = document.querySelector("#board");
  board.width = boardWidth;
  board.height = boardHeight;
  ctx = board.getContext("2d");

  //load images
  doodlerRightImg = new Image();
  doodlerRightImg.src = "./assets/doodler-right.png";
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

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "./assets/doodler-left.png";

  platformImg = new Image();
  platformImg.src = "./assets/platform.png";

  velocityY = initialVelocityY;
  placePlatforms(); //place initial platforms on the canvas
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveDoodler);
};

const update = () => {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  ctx.clearRect(0, 0, boardWidth, boardHeight);

  //draw a doodler on the canvas over and over again
  doodler.x += velocityX;
  if (doodler.x > boardWidth) {
    doodler.x = 0;
  } else if (doodler.x + doodler.width < 0) {
    doodler.x = boardWidth;
  }
  velocityY += gravity;
  doodler.y += velocityY;
  if (doodler.y > boardHeight) {
    gameOver = true;
  }
  ctx.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );

  //draw platforms on the canvas
  for (let i = 0; i < platformArr.length; i++) {
    let platform = platformArr[i];
    if (velocityY < 0 && doodler.y < (boardHeight * 3) / 4) {
      //doodler is moving up and higher than the 3/4 of the board height
      platform.y -= initialVelocityY; //slide platform down
    }
    if (detectCollision(doodler, platform) && velocityY >= 0) {
      velocityY = initialVelocityY; //go through every platform and check if it collision with the doodler and the doodler currently falling down
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

  // score
  updateScore();
  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(score, 5, 20); //position

  // game over message
  if (gameOver) {
    ctx.fillText(
      "Game Over: Press 'Space' to Restart",
      boardWidth / 7,
      (boardHeight * 7) / 8
    );
  }
};

const moveDoodler = (e) => {
  if (e.code === "KeyD" || e.code === "ArrowRight") {
    velocityX = 4;
    doodler.img = doodlerRightImg;
  } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
    velocityX = -4;
    doodler.img = doodlerLeftImg;
  } else if (e.code === "Space" && gameOver) {
    //reset
    doodler = {
      img: doodlerRightImg,
      x: doodlerX,
      y: doodlerY,
      width: doodlerWidth,
      height: doodlerHeight,
    };

    velocityX = 0;
    velocityY = initialVelocityY;
    score = 0;
    maxScore = 0;
    gameOver = false;
    placePlatforms();
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

  //create 6 platforms randomly
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
    a.x < b.x + b.width && //a的左边没有超过b的右边
    a.x + a.width > b.x && //a的右边超过了b的左边
    a.y < b.y + b.height && //a的上边高于b的下边
    a.y + a.height > b.y //a的下边低于b的上边
  );
};

const updateScore = () => {
  let points = Math.floor(50 * Math.random());
  if (velocityY < 0) {
    //doodler going up
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (velocityY >= 0) {
    maxScore -= points;
  }
};
