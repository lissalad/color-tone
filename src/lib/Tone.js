class Tone {
  constructor(p5, note, x=20, y=20, radius=16, color = "teal") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 4;
    this.dy = -2;
    this.note = note
  }

  move(p5) {
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