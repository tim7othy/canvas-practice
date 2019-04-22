const PEN = "PEN"
const ERASER = "ERASER"
const RECT = "RECT"
class DrawBoard extends Canvas {
  constructor(options) {
    super(options)
    this.setup()
    this.setupTools()
  }

  setupMaskCanvas() {
    this.maskCanvas = document.getElementById(this.maskId)
    this.maskContext = this.maskCanvas.getContext("2d")
  }

  setupTools() {
    this.tool = PEN
    var penBtn = document.getElementById("pen")
    var eraserBtn = document.getElementById("eraser")
    var rectBtn = document.getElementById("rect")
    penBtn.addEventListener("click", (ev) => {
      this.tool = PEN
    })
    eraserBtn.addEventListener("click", (ev) => {
      this.tool = ERASER
    })
    rectBtn.addEventListener("click", (ev) => {
      this.tool = RECT
    })
  }

  updateMouseOffset(mouseEvent) {
    var {offsetX, offsetY} = mouseEvent
    this.offsetX = offsetX
    this.offsetY = offsetY
  }

  setup() {
    var b = this
    this.canvas.addEventListener("mousedown", function(ev) {
      b.updateMouseOffset(ev)
      b.mouseDownX = ev.offsetX
      b.mouseDownY = ev.offsetY
      b.isMouseDown = true
    })
    this.canvas.addEventListener("mousemove", function(ev) {
      var lastOffsetX = b.offsetX
      var lastOffsetY = b.offsetY
      b.updateMouseOffset(ev)
      var ctx = this.maskContext
      if (!b.isMouseDown) {
        return
      }
      if (b.tool === PEN) {
        b.drawLine(lastOffsetX, lastOffsetY, b.offsetX, b.offsetY)
      } else if (b.tool === ERASER) {
        b.ctx.clearRect(b.offsetX, b.offsetY, 20, 20)
      } else if (b.tool === RECT) {
        b.ctx.clearRect(0,0,b.W,b.H)
        var rect = new Path2D()
        rect.rect(b.mouseDownX, b.mouseDownY, b.offsetX - b.mouseDownX, b.offsetY - b.mouseDownY)
        b.drawRect(rect)
      }
    })
    this.canvas.addEventListener("mouseup", function(ev) {
      b.isMouseDown = false
    })
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.save()
    this.ctx.lineWidth = 1.5
    this.ctx.strokeStyle = "#000"
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    this.ctx.restore()
  }

  drawRect(rectPath) {
    this.ctx.save()
    this.ctx.lineWidth = 1.5
    this.ctx.strokeStyle = "#000"
    this.ctx.stroke(rectPath)
    this.ctx.restore()
  }

  update() {
    super.update()
  }

  mount(options) {
    super.mount(options)
    var root = document.getElementById(this.rootId)
    var toolPane = `
      <div id="toolPane">
        <button id="eraser">ERASER</button>
        <button id="pen">PEN</button>
        <button id="rect">RECT</button>
      </div>
    `
    var maskId = this.id + "_mask"
    var mask = `
      <canvas id="${maskId}" width="${this.W}" height="${this.H}" style="z-index:99"></canvas> 
    `
    root.insertAdjacentHTML("afterbegin", toolPane)
    root.insertAdjacentHTML("beforeend", mask)
  }
}