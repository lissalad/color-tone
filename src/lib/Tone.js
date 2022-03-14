class Tone {
  constructor(x=20, y=20, radius=15, color = "pink") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 2;
    this.dy = -2;
  }

  move(canvas) {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}
export default Tone