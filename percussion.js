let cha;

function setup() {
  // createCanvas(windowWidth, windowHeight);

  createCanvas(100, 100);
  background(200);

  soundFormats("wav");

}

function draw() {
  background(200, 30);

}

function preload() {
  cha = loadSound("/sounds/shaker.wav");
}