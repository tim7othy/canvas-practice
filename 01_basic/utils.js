class Canvas {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    this.pos = {x: 0, y: 0}
    this.H = this.canvas.height
    this.W = this.canvas.width
    this.getOffset()
    this.drawSystem()
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H)
    this.drawSystem()
    this.drawVector()
  }

  // 实时获取鼠标在canvas上的坐标
  getOffset() {
    this.canvas.addEventListener("mousemove", (ev) => {
      var {pageX, pageY, target} = ev
      var rect = target.getBoundingClientRect()
      var x = pageX - rect.left
      var y = pageY - rect.top
      this.pos.x = x
      this.pos.y = y
    })
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

var c = document.getElementById("canvas")
var canvas = new Canvas(c)
var loop = function() {
  window.requestAnimationFrame(function() {
    canvas.draw()
    loop()
  })
}
loop()