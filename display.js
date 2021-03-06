let tone1, tone2, tone3, tone4, tone5, tone6, tone7; //shaker;
let c, d, e, f, g, a, b; //cha;
let i, ii, iii, iv, v, vi;
let tones;
let ceiling = false;
let radius = 30;
let eighths = [];
let divisions = 8;
let volu = 5;
let frames = 60;
let side = 0;

const windowWidth = 1000;
const windowHeight = 300;
function setEighths() {
  const stageHeight = windowHeight;
  const eighth = (stageHeight - 2 * radius) / 8;
  // console.log(eighth);
  let coord = radius;
  for (let i = 0; i <= 7; i += 1) {
    eighths.push(coord);
    coord += eighth;
  }
  // console.log(eighths);
}

function setKey() {
  // sets only to C for now
  tone1 = new Tone(c, "#774FA6");
  tone2 = new Tone(d, "#2E65A3");
  tone3 = new Tone(e, "#5FA3B4");
  tone4 = new Tone(f, "#60C9BC");
  tone5 = new Tone(g, "#9CD169");
  tone6 = new Tone(a, "#D7E060");
  tone7 = new Tone(b, "#DB6C61");

  tones = [tone1, tone2, tone3, tone4, tone5, tone6, tone7];
  setPercussion();
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

function mouseClicked() {
  for (let i = 0; i < tones.length; i += 1) {
    if (isHovering(tones[i])) {
      toggle(tones[i]);
    }
  }
}

function doubleClicked() {
  for (let i = 0; i < tones.length; i += 1) {
    if (isHovering(tones[i])) {
      console.log(tones[i]);
    }
  }
}

function isHovering(tone) {
  // console.log(tone)
  if (mouseX > tone.x - radius && mouseX < tone.x + radius) {
    if (mouseY > tone.y - radius && mouseY < tone.y + radius) {
      return true;
    }
  }
}

function toggle(tone) {
  if (tone.muted) {
    // console.log("UNMUTING!!!");
    tone.color = tone.originalColor;
    tone.note.setVolume(1, 0.2);
  } 
  if (!tone.muted) {
    tone.color = 30;
    tone.note.setVolume(0, 0.2);
  }
  tone.muted = !tone.muted;
}

function brighten(tone) {
  let m = millis();
  let timer = 1000 + m;
  // tone.color -= 10;

  if (timer > m) {
      tone.color += .2;
      // console.log(m);
  }
}

function setPercussion() {
  shaker1 = new Tone(cha, "#D2AE87");
  shaker2 = new Tone(cha, "#D2AE87");

  shaker1.y = eighths[eighths.length/2-1];
  shaker2.y = eighths[eighths.length-1];

  
  tones.push(shaker1);
  tones.push(shaker2);
}

function setup() {
  let display = createCanvas(windowWidth, windowHeight);
  display.parent("myContainer");

  createCanvas(windowWidth, windowHeight);
  background(20);

  soundFormats("wav");
  setEighths();
  setKey();

  // setChordSpeed(v, 4);
  assignX();
  assignY();

  noLoop();
}

function draw() {
  background(20, 30);
  moveTones();
  frameRate(frames);

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
  shaker1.move();
  shaker2.move();

}

function preload() {
  c = loadSound("/sounds/c.wav");
  d = loadSound("/sounds/d.wav");
  e = loadSound("/sounds/e.wav");
  f = loadSound("/sounds/f.wav");
  g = loadSound("/sounds/g.wav");
  a = loadSound("/sounds/a.wav");
  b = loadSound("/sounds/b.wav");

  cha = loadSound("/sounds/shaker.wav");
}

class Tone {
  constructor(note, color, x = 100, y = 16) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.originalColor = color;
    this.dx = 4;
    this.dy = 1;
    this.note = note;
    this.muted = false;
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
      this.y >= windowHeight - this.radius + 1 || // hits bottom
      this.y <= this.radius - 1 // hits top
    ) {
      this.dy = -this.dy;
      this.note.pan(side);
      this.note.play(); // UNCOMMENT FOR SOUND
      // brighten(this);
      // console.log(this.y);
    }
  }
}

// ---------- VOLUME --------------------------------------------
document.getElementById("vol").addEventListener("click", (e) => {
  outputVolume(document.getElementById("vol").value / 100, 0.4);
});

// ---------- PAN --------------------------------------------
document.getElementById("pot").addEventListener("click", (e) => {
  side = document.getElementById("pot").value / 100;
});

// ---------- FRAMERATE --------------------------------------------
document.getElementById("fr").addEventListener("click", (e) => {
  frames = Math.round(document.getElementById("fr").value);
  // console.log(frames);
});

// ---------- NEW SONG --------------------------------------------
document.getElementById("new-song").addEventListener("click", (e) => {
  assignY();
  clear();
  background(20);
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
