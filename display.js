let tone1, tone2, tone3, tone4, tone5, tone6, tone7;
let c, d, e, f, g, a, b;
let i, ii, iii, iv, v, vi;

// const windowWidth = 1200;
const windowHeight = 700;
const ground = 340;

function setKey() { // sets only to C for now
  tone1 = new Tone(c, 40, "gold");
  tone2 = new Tone(d, 80, "green");
  tone3 = new Tone(e, 120, "teal");
  tone4 = new Tone(f, 160, "orange");
  tone5 = new Tone(g, 200, "olive");
  tone6 = new Tone(a, 240, "red");
  tone7 = new Tone(b, 280, "blue");
}

function createChords() {
  i = [tone1, tone3, tone5];
  ii = [tone2, tone4, tone6];
  iii = [tone3, tone5, tone7];
  iv = [tone4, tone6, tone1];
  v = [tone5, tone7, tone2];
  vi = [tone6, tone1, tone3];
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(displayWidth, windowHeight);
  soundFormats("wav");
  setKey();
  createChords();
  setChordSpeed(v, 4);
  tone4.dy = 6;
  noLoop();
 }

function draw() {
  background(20, 30);
  // toneC.move();
  // toneD.move();
  // toneE.move();
  // tone4.move();
  // toneG.move();
  // toneA.move();
  // toneB.move();
  // playChord(i);
  playChord(iii);
  drawControls();
}

function drawControls() {
  fill(200);
  rect(0, windowHeight - ground, windowWidth, ground);
}

function playChord(tones) {
  for (let i = 0; i < tones.length; i += 1) {
    tones[i].move();
    // console.log("CHORD!");
  }
}

function setChordSpeed(tones, speed) {
  for (let i = 0; i < tones.length; i += 1) {
    tones[i].dy = speed;
    console.log(tones[i]);
  }
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
  constructor(note, x = 100, color = "teal", dy = 4, y = 17, radius = 16) {
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

  goTo(y) {
    this.y = y;
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
