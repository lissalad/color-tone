import { useRef, useState } from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import { getColor } from "../lib/scripts";

class Tone {
  constructor(
    p5,
    note,
    y = 20,
    color = "teal",
    x = 20,
    radius = 16,
    yellow = true
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 4;
    this.dy = -2;
    this.note = note;
  }

  draw(p5) {
    p5.fill(this.color);
    p5.noStroke();
    p5.circle(this.x, this.y, this.radius * 2);
    this.x += this.dx;
    this.bounceIfWall(p5);
  }

  toggleYellow() {
    if (this.yellow) {
      this.color = "yellow";
    } else {
      this.color = "blue";
    }
    this.yellow = !this.yellow;
  }

  mouseHover(p5) {
    if (
      p5.mouseX > this.x - 8 &&
      p5.mouseX < this.x + 8 &&
      p5.mouseY > this.y - 8 &&
      p5.mouseY < this.y + 8
    ) {
      console.log("HOVERING!!");
    }
  }

  bounceIfWall(p5) {
    if (this.x === p5.width - this.radius || this.x === this.radius) {
      this.dx = -this.dx;
      // this.note.play(); // UNCOMMENT FOR SOUND
    }
  }
}

function Canvas(props) {
  let toneC, toneD, toneE, toneF, toneG, toneA, toneB;
  let p5;
  let c, d, e, f, g, a, b;
  let playing;
  let isLooping;
  // const [playing, setPlaying] = useState(false); // SET TO FALSE WHEN USING SOUND

  function setup(p5, canvasParentRef) {
    p5.createCanvas(380, 750).parent(canvasParentRef);
    p5.soundFormats("wav");
    createScaleC(p5);
  }

  function draw(p5) {
    p5.background(0, 80);
    toneC.draw(p5);
    toneC.mouseHover(p5);
    // toneE.draw(p5);
    // toneG.draw(p5);
    // playing = p5.isLooping();
    drawLines(p5);
    drawToggle(p5);
    isLooping = true;
  }

  function drawLines(p5) {
    p5.stroke(255);
    p5.strokeWeight(8);
    p5.line(0, 0, 0, 400);
    p5.line(380, 0, 380, 400);
  }

  function drawToggle(p5) {
    let button = p5.createButton("click me");
    button.position(0, 0);
    button.mousePressed(please);
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

  function please() {
    console.log("ok");
    if (!isLooping) {
    p5.framerate(20);
      isLooping = true;

    } else {
      p5.framerate(0);
      isLooping = false;

    }
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
    <div className="flex flex-col space-y-5 items-center">
      <Sketch
        setup={setup}
        draw={draw}
        preload={preload}
        className="shadow-2xl"
      />
    </div>
  );
}
export default Canvas;
