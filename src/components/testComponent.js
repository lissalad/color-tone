class Logo {
constructor(p5, x, y) {
  this.x = x;
  this.y = y;
}

  drawLogo(p5) {
    p5.fill(234, 31, 81);
    p5.noStroke();
    p5.rect(this.x, this.y, 250, 250);
    p5.fill(255);
    p5.textStyle(p5.BOLD);
    p5.textSize(140);
    p5.text("p5*", 60, 250);
  }
}

export default Logo
