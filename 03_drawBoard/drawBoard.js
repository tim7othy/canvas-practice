const PEN = "PEN"
const ERASER = "ERASER"
const RECT = "RECT"
class DrawBoard extends Canvas {
  constructor(options) {
    super(options)
    this.setup()
    this.setupTools()
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
      b.isMouseDown = true
    })
    this.canvas.addEventListener("mousemove", function(ev) {
      var lastOffsetX = b.offsetX
      var lastOffsetY = b.offsetY
      b.updateMouseOffset(ev)
      if (!b.isMouseDown) {
        return
      }
      if (b.tool === PEN) {
        b.drawLine(lastOffsetX, lastOffsetY, b.offsetX, b.offsetY)
      } else if (b.tool === ERASER) {
        b.ctx.clearRect(b.offsetX, b.offsetY, 20, 20)
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

  update() {
    super.update()
    log(this.tool)
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
    root.insertAdjacentHTML("afterbegin", toolPane)
  }
}