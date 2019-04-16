class Canvas {
  constructor(options) {
    this.id = options.id || "canvas"
    this.rootId = options.root || "root"
    this.W = options.width || 800
    this.H = options.height || 600
    this.pos = {}
    this.mount(this.rootId)
    this.getOffset()
  }

  mount(id) {
    // 将canvas挂载到指定根元素下
    var {W, H, id, rootId} = this
    var elem = document.getElementById(rootId)
    var canvas = `
      <canvas id='${id}' width='${W}px' height='${H}px'></canvas>
    `
    elem.insertAdjacentHTML("beforeend", canvas)
    // 将canvas元素和canvas上下文环境保存到Canvas实例中
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext("2d")
  }
  
  draw() {
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

  loop() {
    var c = this
    window.requestAnimationFrame(function() {
      c.draw()
      c.loop()
    })
  }

  start() {
    this.loop()
  }
}

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

var system = new AxiosSystem({
  root: "root",
  id: "axiosSystem",
  width: 800,
  height: 600
})
system.start()