class CoordinateSystem extends Canvas {
  constructor(options) {
    super(options)
    this.center = {x: this.W/2, y: this.H/2}
    this.setup()
  }

  setup() {
    var c = this
    c.deltaX = 10
    c.deltaY = 5
    this.registerKeyAction('a', function() {
      c.center.x -= c.deltaX
    })
    this.registerKeyAction('d', function() {
      c.center.x += c.deltaX
    })
    this.registerKeyAction('w', function() {
      c.center.y -= c.deltaY
    })
    this.registerKeyAction('s', function() {
      c.center.y += c.deltaY
    })
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
    this.ctx.moveTo(0, this.center.y)
    this.ctx.lineTo(this.W, this.center.y)
    this.ctx.moveTo(this.center.x, 0)
    this.ctx.lineTo(this.center.x, this.H)
    this.ctx.stroke()
    this.ctx.restore()
  }
  
  // 绘制坐标系原点到鼠标的线段
  drawVector() {
    if (!this.pos) {
      return
    }
    var x = this.pos.x - this.center.x
    var y = this.pos.y - this.center.y
    var rad = Math.atan2(y, x)
    this.ctx.save()
    this.ctx.lineWidth = 1.5
    this.ctx.strokeStyle = "#555"
    this.ctx.beginPath()
    this.ctx.moveTo(this.center.x, this.center.y)
    this.ctx.lineTo(this.pos.x, this.pos.y)
    this.ctx.stroke()
    this.ctx.fillText(rad, this.pos.x, this.pos.y)
    this.ctx.restore()
  }

}