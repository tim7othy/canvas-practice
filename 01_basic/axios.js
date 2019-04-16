class AxiosSystem extends Canvas {
  constructor(options) {
    super(options)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H)
    this.drawSystem()
    this.drawVector()
  }

  // 绘制直角坐标系
  drawSystem() {
    this.ctx.save()
    this.ctx.lineWidth = 1.5
    this.ctx.strokeStyle = "#111"
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.H/2)
    this.ctx.lineTo(this.W, this.H/2)
    this.ctx.moveTo(this.W/2, 0)
    this.ctx.lineTo(this.W/2, this.H)
    this.ctx.stroke()
    this.ctx.restore()
  }
  
  // 绘制坐标系原点到鼠标的线段
  drawVector() {
    if (!this.pos) {
      return
    }
    var x = this.pos.x - this.W / 2
    var y = this.pos.y - this.H / 2
    var rad = Math.atan2(y, x)
    this.ctx.save()
    this.ctx.lineWidth = 1.5
    this.ctx.strokeStyle = "#555"
    this.ctx.beginPath()
    this.ctx.moveTo(this.W/2, this.H/2)
    this.ctx.lineTo(this.pos.x, this.pos.y)
    this.ctx.stroke()
    this.ctx.fillText(rad, this.pos.x, this.pos.y)
    this.ctx.restore()
  }

}