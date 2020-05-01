let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let screenWidth = 1000;
let screenHeight = 500;

class GameCharacter {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

let rectangle = new GameCharacter(50, 50, 50, 50, "rgb(0, 0 ,255)");

const draw = () => {
  ctx.clearRect(0, 0, screenWidth, screenHeight);

  ctx.fillStyle = rectangle.color;
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

  ctx.fillStyle = rectangle.color;
  ctx.fillRect(
    rectangle.x + 200,
    rectangle.y,
    rectangle.width,
    rectangle.height
  );
};

const step = () => {
  draw();
  window.requestAnimationFrame(step);
};

step();
