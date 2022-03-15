import { useRef } from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound"

class Tone {
  constructor(p5, note, y=20, color = "teal", x=20, radius=16) {
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
    p5.noStroke();
    p5.circle(this.x, this.y, this.radius*2);
    this.x += this.dx;
    this.bounceIfWall(p5);
  }

  bounceIfWall(p5) {
    if(this.x === p5.width-this.radius || this.x === this.radius) {
      this.dx = -this.dx;
      // this.note.play(); // UNCOMMENT FOR SOUND
    }
  }
}

function Canvas(props) {
  let toneC, toneD, toneE, toneF, toneG, toneA, toneB;
  let c, d, e, f, g, a, b;

  function setup(p5, canvasParentRef) {
		p5.createCanvas(300, 300).parent(canvasParentRef);
    p5.soundFormats("wav");
    createScaleC();
  }

  function draw(p5) {
      p5.background(240, 80);
      toneC.draw(p5);
      toneE.draw(p5);
      toneG.draw(p5);
  }

  function createScaleC(p5) {
    toneC = new Tone(p5, c, 30, "gold");
    toneD = new Tone(p5, d, "green");
    toneE = new Tone(p5, e, 90, "teal");
    toneF = new Tone(p5, f, "orange");
    toneG = new Tone(p5, g, 150, "olive");
    toneA = new Tone(p5, a, "red");
    toneB = new Tone(p5, b, "blue");
  }

  function preload(p5) {
    c = p5.loadSound("/sounds/c.wav");
    d = p5.loadSound("/sounds/d.wav");
    e = p5.loadSound("/sounds/e.wav");
    f = p5.loadSound("/sounds/f.wav");
    g = p5.loadSound("/sounds/g.wav");
    a = p5.loadSound("/sounds/a.wav");
    b = p5.loadSound("/sounds/b.wav");

  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} preload={preload} className="shadow-2xl" />
      <button> </button>
    </div>
  );
}
export default Canvas;
