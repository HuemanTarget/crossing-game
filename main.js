let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let screenWidth = 1000;
let screenHeight = 500;
let width = 50;

class GameCharacter {
  constructor(x, y, width, height, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
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
  new GameCharacter(200, 50, width, width, "rgb(0, 0 ,255)", 2),
  new GameCharacter(450, screenHeight - 100, width, width, "rgb(0, 0 ,255)", 2),
  new GameCharacter(700, 50, width, width, "rgb(0, 0 ,255)", 2),
];

const draw = () => {
  ctx.clearRect(0, 0, screenWidth, screenHeight);

  enemies.forEach(function (element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  });
};

const update = () => {
  enemies.forEach(function (element) {
    element.moveVertical();
  });
};

const step = () => {
  update();
  draw();
  window.requestAnimationFrame(step);
};

step();
