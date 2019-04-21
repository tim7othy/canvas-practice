class TransformCanvas extends Canvas {
  constructor(options) {
    super(options)
    this.pixelWidth = 50
    this.pixelHeight = 20
    this.arrowWidth = this.pixelWidth * 3
    this.arrowHeight = this.pixelHeight * 5
    this.x = this.arrowWidth / 2
    this.y = this.arrowHeight / 2
    this.offsetX = this.x
    this.offsetY = this.y
    this.setupActions()
  }

  setupActions() {
    this.canvas.addEventListener("mousemove", (ev) => {
      this.offsetX = ev.offsetX
      this.offsetY = ev.offsetY
    })
  }
  update() {
    var easing = 0.05
    var dx = this.offsetX - this.x 
    var dy = this.offsetY - this.y
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      return
    }
    this.x += dx * easing
    this.y += dy * easing
  }
  genColor() {
    var color = []
    for (var i = 0; i < 3; i++) {
      var n = Math.random() * 255
      color.push(n)
    }
    var r = color[0]
    var g = color[1]
    var b = color[2]
    return `RGB(${r}, ${g}, ${b})`
  }

  drawArrow() {
    var x = this.x - this.arrowWidth / 2 
    var y = this.y - this.arrowHeight / 2
    for (let i = 0; i < 5; i++) {
      this.ctx.save()
      this.ctx.fillStyle = this.genColor()
      this.ctx.fillRect(x, y + i * this.pixelHeight, this.pixelWidth, this.pixelHeight)
      this.ctx.restore()
    }
    for (let i = 0; i < 3; i++) {
      this.ctx.save()
      this.ctx.fillStyle = this.genColor()
      this.ctx.fillRect(x + this.pixelWidth, y +(i+1) * this.pixelHeight, this.pixelWidth, this.pixelHeight)
      this.ctx.restore()
    }
    this.ctx.save()
    this.ctx.fillStyle = this.genColor()
    this.ctx.fillRect(x + this.pixelWidth * 2, y+this.pixelHeight * 2, this.pixelWidth, this.pixelHeight)
    this.ctx.restore()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H)
    this.drawArrow()
  }
}