class Tool {
  constructor(board) {
    this.board = board
    this.color = "#fff"
    this.lineWidth = 1.5
  }

  install() {
    this.initContext()
    this.initEvents()
  }

  initContext() {
    this.uiLayer = this.board.getLayer(UILAYER)
    this.uiCtx = this.board.getCtx(UILAYER)
    this.bgLayer = this.board.getLayer(BACKGROUNDLAYER)
    this.bgCtx = this.board.getCtx(BACKGROUNDLAYER)
    this.mainLayer = this.board.layer
    this.mainCtx = this.board.ctx
  }

  initEvents() {
    this.isMouseDown = false
    this.mouseDownHandler = (ev) => { this.onMouseDown(ev) } 
    this.mouseMoveHandler = (ev) => { this.onMouseMove(ev) } 
    this.mouseUpHandler = (ev) => { this.onMouseUp(ev) } 
    this.uiLayer.addEventListener("mousedown", this.mouseDownHandler)
    this.uiLayer.addEventListener("mousemove", this.mouseMoveHandler)
    this.uiLayer.addEventListener("mouseup", this.mouseUpHandler)
  }

  unInstall() {
    this.uiLayer.removeEventListener("mousedown", this.mouseDownHandler)
    this.uiLayer.removeEventListener("mousemove", this.mouseMoveHandler)
    this.uiLayer.removeEventListener("mouseup", this.mouseUpHandler)
  }

  getPos(ev) {
    var x = ev.offsetX
    var y = ev.offsetY
    return {x, y}
  }

  onMouseDown(ev) {
    this.mouseDownPos = this.getPos(ev) 
    this.isMouseDown = true
  }

  onMouseMove(ev) {
    this.mouseMovePos = this.getPos(ev)
  }

  onMouseUp(ev) {
    this.mouseUpPos = this.getPos(ev)
    this.isMouseDown = false
  }

  drawLine(ctx, pos1, pos2) {
    ctx.save()
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.color
    ctx.beginPath()
    ctx.moveTo(pos1.x, pos1.y)
    ctx.lineTo(pos2.x, pos2.y)
    ctx.stroke()
    ctx.restore()
  }

  drawRect(ctx, pos1, pos2) {
    var w = pos2.x - pos1.x
    var h = pos2.y - pos1.y
    ctx.save()
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.color
    ctx.beginPath()
    ctx.moveTo(pos1.x, pos1.y)
    ctx.lineTo(pos1.x + w, pos1.y)
    ctx.lineTo(pos1.x + w, pos1.y + h)
    ctx.lineTo(pos1.x, pos1.y + h)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  drawCircle(ctx, center, radius) {
    ctx.save()
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.color
    ctx.beginPath()
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  drawOn() {
    // ui绘制层canvas生成图片
    var dataURL = this.uiLayer.toDataURL()
    var img = new Image()
    img.onload = () => {
      // 将图片绘制到主画板上
      this.mainCtx.drawImage(img, 0, 0) 
      this.uiCtx.clearRect(0, 0, this.board.W, this.board.H)
    }
    img.src = dataURL
  }
}

class Pen extends Tool {
  constructor(board) {
    super(board)
    this.toolType = PEN
  }

  onMouseMove(ev) {
    super.onMouseMove(ev)
    if (!this.isMouseDown) {
      return
    }
    if (!this.lastPos) {
      this.lastPos = {
        x: this.mouseDownPos.x,
        y: this.mouseDownPos.y
      }
    }
    this.drawLine(this.uiCtx, this.lastPos, this.mouseMovePos)
    this.lastPos.x = this.mouseMovePos.x
    this.lastPos.y = this.mouseMovePos.y
  }

  onMouseUp(ev) {
    super.onMouseUp(ev)
    this.lastPos = null
    this.drawOn()
  }
}

class Rect extends Tool {
  constructor(board) {
    super(board)
    this.toolType = RECT
  }

  onMouseMove(ev) {
    super.onMouseMove(ev)
    if (!this.isMouseDown) {
      return
    }
    this.uiCtx.clearRect(0, 0, this.board.W, this.board.H)
    this.drawRect(this.uiCtx, this.mouseDownPos, this.mouseMovePos)
  }

  onMouseUp(ev) {
    super.onMouseUp(ev)
    this.drawOn()
  }

}

class Eraser extends Tool {
  constructor(board) {
    super(board)
    this.toolType = ERASER
  }

  drawEraserBorder(x, y, w, h) {
    var ctx = this.uiCtx
    ctx.clearRect(0, 0, this.board.W, this.board.H)
    var pos1 = {x, y}
    var pos2 = {x:x+w, y:y+h}
    this.drawRect(ctx, pos1, pos2)
  }

  onMouseDown(ev) {
    super.onMouseDown(ev)
    var eraserWidth = 20
    var eraserHeight = 20
    var x = this.mouseDownPos.x - eraserWidth / 2
    var y = this.mouseDownPos.y - eraserHeight / 2
    this.mainCtx.clearRect(x, y, 20, 20)
  }

  onMouseMove(ev) {
    super.onMouseMove(ev)
    var eraserWidth = 20
    var eraserHeight = 20
    var x = this.mouseMovePos.x - eraserWidth / 2
    var y = this.mouseMovePos.y - eraserHeight / 2
    this.drawEraserBorder(x, y, eraserWidth, eraserHeight)
    if (!this.isMouseDown) {
      return
    }
    this.mainCtx.clearRect(x, y, eraserWidth, eraserHeight)
  }
}

class Line extends Tool {
  constructor(board) {
    super(board)
    this.toolType = LINE
  }

  onMouseMove(ev) {
    super.onMouseMove(ev)
    if (!this.isMouseDown) {
      return
    }
    this.uiCtx.clearRect(0, 0, this.board.W, this.board.H)
    this.drawLine(this.uiCtx, this.mouseDownPos, this.mouseMovePos)
  }

  onMouseUp(ev) {
    super.onMouseUp(ev)
    this.drawOn()
  }

}

class Circle extends Tool {
  constructor(board) {
    super(board)
    this.toolType = CIRCLE
  }

  onMouseMove(ev) {
    super.onMouseMove(ev)
    if (!this.isMouseDown) {
      return
    }
    var pos1 = this.mouseDownPos
    var pos2 = this.mouseMovePos
    log(pos1, pos2)
    var radius = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
    log(radius)
    this.uiCtx.clearRect(0, 0, this.board.W, this.board.H)
    this.drawCircle(this.uiCtx, this.mouseDownPos, radius)
  }

  onMouseUp(ev) {
    super.onMouseUp(ev)
    this.drawOn()
  }
}