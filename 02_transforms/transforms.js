class TransformCanvas extends Canvas {
  constructor(options) {
    super(options)
    this.x = 50
    this.y = 20
    this.interval = 20
  }

  update() {
    if (this.y < this.H) {
      this.y += this.interval
    }
  }
  drawLine(x1, y1, x2, y2, color = "#000", lineWidth = 1) {
    this.ctx.save()
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = lineWidth
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    this.ctx.restore()
  }

  draw() {
    this.drawLine(this.x, this.y, this.x + 100, this.y)
  }
}