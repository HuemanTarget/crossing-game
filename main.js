let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let screenWidth = 1000;
let screenHeight = 500;
let width = 50;
let isGameLive = true;

class GameCharacter {
  constructor(x, y, width, height, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.maxSpeed = 4;
  }
  moveVertical() {
    if (this.y > screenHeight - 100 || this.y < 50) {
      this.speed = -this.speed;
    }
    this.y += this.speed;
  }
  moveHorizontal() {
    this.x += this.speed;
  }
}

// let rectangle = new GameCharacter(50, 50, 50, 50, "rgb(0, 0 ,255)");
let enemies = [
  new GameCharacter(200, 225, width, width, "rgb(0, 0 ,255)", 2),
  new GameCharacter(450, screenHeight - 100, width, width, "rgb(0, 0 ,255)", 3),
  new GameCharacter(700, 50, width, width, "rgb(0, 0 ,255)", 4),
];

let player = new GameCharacter(50, 225, width, width, "rgb(0, 255, 0)", 0);

let goal = new GameCharacter(925, 140, width, 250, "rgb(128, 0, 128)", 0);

document.onkeydown = function (event) {
  let keyPressed = event.keyCode;
  if (keyPressed === 39) {
    player.speed = player.maxSpeed;
  } else if (keyPressed === 37) {
    player.speed = -player.maxSpeed;
  }
};

document.onkeyup = function (event) {
  player.speed = 0;
};

const checkCollisions = (rect1, rect2) => {
  let xOverlap =
    Math.abs(rect1.x - rect2.x) <= Math.max(rect1.width, rect2.width);
  let yOverlap =
    Math.abs(rect1.y - rect2.y) <= Math.max(rect1.height, rect2.height);
  return xOverlap && yOverlap;
};

const draw = () => {
  ctx.clearRect(0, 0, screenWidth, screenHeight);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = goal.color;
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

  enemies.forEach(function (element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  });
};

const update = () => {
  player.moveHorizontal();
  enemies.forEach(function (element) {
    if (checkCollisions(player, element)) {
      endGameLogic("Game Over!");
    }
    element.moveVertical();
  });
  if (checkCollisions(player, goal)) {
    endGameLogic("You Win!");
  }
};

const endGameLogic = (text) => {
  isGameLive = false;
  alert(text);
  window.location = "";
};

const step = () => {
  update();
  draw();
  if (isGameLive) {
    window.requestAnimationFrame(step);
  }
};

step();
