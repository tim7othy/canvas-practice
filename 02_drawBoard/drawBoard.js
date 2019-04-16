class DrawBoard extends Canvas {
  constructor(options) {
    super(options)
    this.setup()
  }

  setup() {
    this.registerMouseAction("mousedown", (ev) => {
      this.lastPos = ev.pos
    })
    this.registerMouseAction("mousemove", (ev) => {
      var pos = ev.pos
      if (this.isMouseDown) {
        this.drawLine(this.lastPos, pos)
        this.lastPos = pos
      }
    })
  }

  drawLine(lastPos, newPos) {
    this.ctx.save()
    this.ctx.lineWidth = 1.5
    this.ctx.strokeStyle = "#000"
    this.ctx.moveTo(lastPos.x, lastPos.y)
    this.ctx.lineTo(newPos.x, newPos.y)
    this.ctx.stroke()
    this.ctx.restore()
  }
}