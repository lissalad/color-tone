class Tone {
  constructor(ctx, x=20, y=20, radius=16, color = "pink") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 4;
    this.dy = -2;
    this.sound = new Audio('../sounds/c.wav');
  }

  move() {
    this.x += this.dx;
    // this.y += this.dy;
    // console.log("MOVE!!");
  }

  bounceIfWall(canvas) {
    if(this.x === canvas.width-this.radius || this.x === this.radius) {
      this.dx = -this.dx;
      this.sound.play();
    }
  }

  create(ctx, frameCount) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    // console.log("CREATE!!");

    
  }

}
export default Tone