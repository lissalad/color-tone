let tone1, tone2, tone3, tone4, tone5, tone6, tone7;
let c, d, e, f, g, a, b;
let i, ii, iii, iv, v, vi;
let songKey;
let ceiling = false;
let radius = 16;
let eighths = [];

const windowWidth = 1000;
const windowHeight = 732;
const ground = 300;

function setEighths() {
  const stageHeight = windowHeight - ground;
  const eighth = (stageHeight - 2 * radius) / 8;
  console.log(eighth);
  let coord = radius;
  for(let i = 0; i <= 8; i += 1) {
    eighths.push(coord);
    coord += eighth;
  }
console.log(eighths);
}

function setKey() {
  // sets only to C for now
  tone1 = new Tone(c, "#774FA6");
  tone2 = new Tone(d, "#2E65A3");
  tone3 = new Tone(e, "#5599A6");
  tone4 = new Tone(f, "#5599A6");
  tone5 = new Tone(g, "#9CD169");
  tone6 = new Tone(a, "#D7E060");
  tone7 = new Tone(b, "#E08460");
  songKey = [tone1, tone2, tone3, tone4, tone5, tone6, tone7];
}

// float up until function called to come back down!
function createChords() {
  i = [tone1, tone3, tone5];
  ii = [tone2, tone4, tone6];
  iii = [tone3, tone5, tone7];
  iv = [tone4, tone6, tone1];
  v = [tone5, tone7, tone2];
  vi = [tone6, tone1, tone3];
}

function assignX(tones) {
  const increment = windowWidth / (tones.length + 1);
  let position = increment;
  for (i = 0; i < tones.length; i += 1) {
    tones[i].x = position;
    position += increment;
  }
}

function assignY(tones) {
  let position;
  for (i = 0; i < tones.length; i += 1) {
    position = Math.floor(Math.random() * eighths.length);
    tones[i].y = eighths[position];
  }
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

function setup() {
  // createCanvas(windowWidth, windowHeight);
  background(20, 30);

  createCanvas(windowWidth, windowHeight);
  soundFormats("wav");
  setKey();
  createChords();
  setEighths();

  // setChordSpeed(v, 4);
  assignX(songKey);
  assignY(songKey);

  noLoop();
  frameRate(100);

}

function draw() {
  background(20, 30);
  tone1.move();
  tone2.move();
  tone3.move();
  tone4.move();
  tone5.move();
  tone6.move();
  tone7.move();
  // playChord(i);
  // playChord(iii);
  drawControls();
  // fill("white");
  // noStroke();
  // circle(500, 200, 20);
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
  constructor(note, color = "teal", x = 100, y = 16 , radius = 16) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 4;
    this.dy = 1;
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
    if (this.y >= windowHeight - ground - this.radius + 1 || this.y <= this.radius - 1) {
      this.dy = -this.dy;
      this.note.play(); // UNCOMMENT FOR SOUND
      console.log(this.y);
    }

  }
}
