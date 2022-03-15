import { useRef } from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound"

class Tone {
  constructor(p5, note, x=20, y=20, radius=16, color = "pink") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 4;
    this.dy = -2;
    this.note = note
  }

  draw(p5) {
    p5.fill(this.color);
    p5.circle(this.x, this.y, this.radius*2);
    this.x += this.dx;
    this.bounceIfWall(p5);
  }

  bounceIfWall(p5) {
    if(this.x === p5.width-this.radius || this.x === this.radius) {
      this.dx = -this.dx;
      this.note.play();
    }
  }
}

function Canvas(props) {
  let tone;
  let c;

  function setup(p5, canvasParentRef) {
		p5.createCanvas(300, 300).parent(canvasParentRef);
    p5.soundFormats("wav");
    tone = new Tone(p5, c);
  }

  function draw(p5) {
    p5.background(200);
    tone.draw(p5);
  }

  function preload(p5) {
    c = p5.loadSound("/sounds/c.wav");

  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} preload={preload} className="shadow-2xl" />
    </div>
  );
}
export default Canvas;
