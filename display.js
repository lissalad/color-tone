let tone1, tone2, tone3, tone4, tone5, tone6, tone7;
let c, d, e, f, g, a, b;
let i, ii, iii, iv, v, vi;
let tones;
let ceiling = false;
let radius = 50;
let eighths = [];
let divisions = 8;

const windowWidth = 1000;
const windowHeight = 650;
const ground = 400;

function setEighths() {
  const stageHeight = windowHeight - ground;
  const eighth = (stageHeight - 2 * radius) / 8;
  console.log(eighth);
  let coord = radius;
  for (let i = 0; i <= 7; i += 1) {
    eighths.push(coord);
    coord += eighth;
  }
  console.log(eighths);
}

function setKey() {
  // sets only to C for now
  tone1 = new Tone(c, "#774FA6");
  tone2 = new Tone(d, "#2E65A3");
  tone3 = new Tone(e, "#5FA3B4");
  tone4 = new Tone(f, "#60C9BC");
  tone5 = new Tone(g, "#9CD169");
  tone6 = new Tone(a, "#D7E060");
  tone7 = new Tone(b, "#E08460");
  tones = [tone1, tone2, tone3, tone4, tone5, tone6, tone7];
}

function createChords() {
  i = [tone1, tone3, tone5];
  ii = [tone2, tone4, tone6];
  iii = [tone3, tone5, tone7];
  iv = [tone4, tone6, tone1];
  v = [tone5, tone7, tone2];
  vi = [tone6, tone1, tone3];
}

function assignX() {
  const increment = windowWidth / (tones.length + 1);
  let position = increment;
  for (i = 0; i < tones.length; i += 1) {
    tones[i].x = position;
    position += increment;
  }
}

function assignY() {
  let confirmedUnique = true;
  for (i = 0; i < tones.length; i += 1) {
    let position = Math.floor(Math.random() * eighths.length);
    tones[i].y = eighths[position];
    while (!confirmedUnique) {
      position = Math.floor(Math.random() * eighths.length);
      tones[i].y = eighths[position];
      if (tones[i].y !== tones[i - 1].y) {
        if (tones[i].y !== eighths[-1] && tones[i - 1].y !== eighths[0]) {
          if (tones[i].y !== eighths[0] && tones[i - 1].y !== eighths[-1]) {
            confirmedUnique = true;
          }
        }
      }
    }
    confirmedUnique = false;
  }
}

function drawControls() {
  fill(100);
  rect(0, windowHeight - ground, windowWidth, ground);
}

function playChord() {
  for (let i = 0; i < tones.length; i += 1) {
    tones[i].move();
    // console.log("CHORD!");
  }
}

function setChordSpeed(speed) {
  for (let i = 0; i < tones.length; i += 1) {
    tones[i].dy = speed;
    console.log(tones[i]);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    // console.log("SPACEBAR");
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
}

function brighten(tone) {
  let m = millis();
  tone.color -= 10;

  if (m < 2000) {
    if (m % 5 === 0) {
      // tone.color += 5;
      console.log("BRIGHT");

    }
  }
}

function setup() {
  // createCanvas(windowWidth, windowHeight);

  createCanvas(windowWidth, windowHeight);
  background(20);

  soundFormats("wav");
  setKey();
  createChords();
  setEighths();

  // setChordSpeed(v, 4);
  assignX();
  assignY();

  noLoop();
  frameRate(90);
}

function draw() {
  background(20, 30);
  moveTones();
  drawControls();
  // fill("white");
  // noStroke();
  // circle(500, 200, 20);
}

function moveTones() {
  tone1.move();
  tone2.move();
  tone3.move();
  tone4.move();
  tone5.move();
  tone6.move();
  tone7.move();
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
  constructor(note, color = "teal", x = 100, y = 16) {
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
    // brightness(200);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    this.draw();
    this.y += this.dy;
    this.bounceIfWall();
    // this.lighten();
    // console.log("MOVING!!!");
  }

  bounceIfWall() {
    if (
      this.y >= windowHeight - ground - this.radius + 1 || // hits bottom
      this.y <= this.radius - 1 // hits top
    ) {
      this.dy = -this.dy;
      this.note.play(); // UNCOMMENT FOR SOUND
      // brighten(this);
    }
  }
}

// ---------- NEW SONG --------------------------------------------
document.getElementById("new-song").addEventListener("click", (e) => {
  assignY();
  clear();
  background(20);
  drawControls();
  moveTones();
});

// ---------- PAUSE / PLAY --------------------------------------------
document.getElementById("toggle").addEventListener("click", (e) => {
  if (isLooping()) {
    noLoop();
  } else {
    loop();
  }
});
// ---------------------------------------------------------------
