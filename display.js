let toneC, toneD, toneE, toneF, toneG, toneA, toneB;
let c, d, e, f, g, a, b;
const windowWidth = 900;
const windowHeight = 700;
const ground = 340;

function createScaleC() {
  toneC = new Tone(c, 40, "gold");
  // toneD = new Tone(d, 80, "green", 6);
  toneE = new Tone(e, 120, "teal");
  // toneF = new Tone(f, 160, "orange");
  toneG = new Tone(g, 200, "olive");
  // toneA = new Tone(a, 240, "red", 8);
  // toneB = new Tone(b, 280, "blue");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  soundFormats("wav");
  createScaleC();
  noLoop();
}

function draw() {
  chordC();
  background(20, 30);
  // toneC.move();
  // toneD.move();
  // toneE.move();
  // toneF.move();
  // toneG.move();
  // toneA.move();
  // toneB.move();

  drawControls();
}

function drawControls() {
  fill(200);
  rect(0, windowHeight - ground, windowWidth, ground);
}

function chordC() {
  toneC.move();
  toneE.move();
  toneG.move();
}

function keyPressed() {
  if ((key = " ")) {
    console.log("SPACEBAR");
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
}

function preload() {
  c = loadSound("/sounds/c.wav");
  d = loadSound("/sounds/d.wav");
  e = loadSound("/sounds/e.wav");
  f = loadSound("/sounds/f.wav");
  g = loadSound("/sounds/g.wav");
  a = loadSound("/sounds/a.wav");
  b = loadSound("/sounds/b.wav");
}

class Tone {
  constructor(note, x = 100, color = "teal", dy = 4, y = 100, radius = 16) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 4;
    this.dy = dy;
    this.note = note;
  }

  draw() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    // this.x += this.dx;
    this.draw();
    this.y += this.dy;
    this.bounceIfWall();
    // console.log("MOVING!!!");
  }

  bounceIfWall() {
    if (this.x === windowWidth - this.radius || this.x === this.radius) {
      this.dx = -this.dx;
      this.note.play(); // UNCOMMENT FOR SOUND
    }
    if (
      this.y >= windowHeight - ground - this.radius ||
      this.y <= this.radius
    ) {
      this.dy = -this.dy;
      this.note.play(); // UNCOMMENT FOR SOUND
    }
  }
}
