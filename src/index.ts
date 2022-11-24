import "./index.css";
import image1 from "./assets/img/layer-1.png";
import image2 from "./assets/img/layer-2.png";
import image3 from "./assets/img/layer-3.png";
import image4 from "./assets/img/layer-4.png";
import image5 from "./assets/img/layer-5.png";
import { controls } from "./ui/controls";
import { canvas } from "./ui/canvas";

const container = document.createElement("div");
container.id = "container";
container.appendChild(canvas);
container.appendChild(controls);

document.body.appendChild(container);

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
const backgroundLayer1 = new Image();
backgroundLayer1.src = image1;

const backgroundLayer2 = new Image();
backgroundLayer2.src = image2;

const backgroundLayer3 = new Image();
backgroundLayer3.src = image3;

const backgroundLayer4 = new Image();
backgroundLayer4.src = image4;

const backgroundLayer5 = new Image();
backgroundLayer5.src = image5;

let gameSpeed = 2;
// let gameFrame = 0;

class Layer {
  x = 0;
  y = 0;
  width = 2400;
  height = 700;
  speed: number;

  constructor(public image: HTMLImageElement, public speedModifier: number) {
    this.speed = gameSpeed * speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;

    if (this.x <= -this.width) {
      this.x = 0;
    }

    this.x = Math.floor(this.x - this.speed);

    // This single line replace the condition above
    // But it generates jumps in the background
    // this.x = (gameFrame * this.speed) % this.width;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

const gameObjects = [
  new Layer(backgroundLayer1, 0.2),
  new Layer(backgroundLayer2, 0.4),
  new Layer(backgroundLayer3, 0.6),
  new Layer(backgroundLayer4, 0.8),
  new Layer(backgroundLayer5, 1),
];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  gameObjects.forEach((item) => {
    item.update();
    item.draw();
  });

  // gameFrame--;
  requestAnimationFrame(animate);
}

window.addEventListener("load", () => {
  const slider = document.getElementById("slider") as HTMLInputElement;
  const showGameSpeed = document.getElementById(
    "showGameSpeed"
  ) as HTMLSpanElement;

  slider.addEventListener("change", (e: any) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerText = String(gameSpeed);
  });

  animate();
});
