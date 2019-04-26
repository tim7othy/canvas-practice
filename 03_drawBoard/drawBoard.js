class DrawBoard extends Canvas {
  constructor(options) {
    super(options)
    this.setupBackground()
    this.setupTools()
    this.setupTextInput()
    this.setupHistory(30)
  }

  setupTextInput() {
    this.input = document.getElementById("drawboard_input")
  }

  setupHistory(capacity) {
    this.history = {
      currIndex: -1,
      capacity: capacity,
      queue: Array(capacity)
    }
  }

  setHistory(item) {
    var h = this.history
    h.currIndex++
    if (h.currIndex < h.capacity) {
      h.queue[h.currIndex] = item
    } else {
      h.queue.shift()
      h.queue.push(item)
    }
  }

  cancel() {
    var h = this.history
    h.currIndex--
    if (h.currIndex >= 0) {
      var lastDataURL = h.queue[h.currIndex]
      var img = new Image()
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.W, this.H)
        this.ctx.drawImage(img, 0, 0)
      }
      img.src = lastDataURL
    } else {
      this.ctx.clearRect(0, 0, this.W, this.H)
      h.currIndex = -1
    }
  }

  redo() {
    var h = this.history
    var nextIndex = h.currIndex + 1
    if (nextIndex < h.capacity && h.queue[nextIndex]) {
      var nextDataURL = h.queue[nextIndex]
      var img = new Image()
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.W, this.H)
        this.ctx.drawImage(img, 0, 0)
      }
      img.src = nextDataURL
      h.currIndex = nextIndex
    }
  }

  setupBackground() {
    var bgCtx = this.getCtx(BACKGROUNDLAYER)
    bgCtx.save()
    bgCtx.strokeStyle = "#369"
    bgCtx.fillStyle = "RGB(4, 19, 33)"
    bgCtx.lineWidth = 1
    bgCtx.fillRect(0, 0, this.W, this.H)
    var w = this.gridWidth || 20
    var h = this.gridHeight || 20
    var cols = Math.floor(this.W / w)
    var rows = Math.floor(this.H / h)
    for (var i = 0; i <= cols; i++) {
      bgCtx.moveTo(w*i, 0)
      bgCtx.lineTo(w*i, this.H)
    }
    for (var i = 0; i <= rows; i++) {
      bgCtx.moveTo(0, h*i)
      bgCtx.lineTo(this.W, h*i)
    }
    bgCtx.stroke()
    bgCtx.restore()
  }

  setupTools() {
    this.tools = new Map([
      [PEN, new Pen(this)],
      [ERASER, new Eraser(this)],
      [RECT, new Rect(this)],
      [LINE, new Line(this)],
      [CIRCLE, new Circle(this)],
      [TEXT, new Text(this)]
    ])
    this.tool = this.tools.get(PEN)
    this.tool.install()
    
    var toolPane = document.getElementById("toolPane")
    toolPane.addEventListener("click", (ev) => {
      // 代理每个按钮的点击事件
      var elem = ev.target
      while (elem.classList[0] != "tool") {
        if (elem.id === "toolPane") {
          return
        }
        elem = elem.parentElement
      }
      // 根据点击的按钮包含的工具的类型，切换当前使用的工具
      var toolType = elem.dataset.name
      var tool = this.tools.get(toolType)
      if (tool && toolType != this.tool.toolType) {
        this.tool.unInstall()
        this.tool = tool
        this.tool.install()
      } else if (toolType === CLEAR){
        this.ctx.clearRect(0, 0, this.W, this.H)
      } else if (toolType === DOWNLOAD) {
        var image = this.layer.toDataURL("image/png")
        var save_link = document.createElement('a');
        save_link.href = image;
        save_link.download = new Date().toUTCString() + '.png';
        save_link.click()
      } else if (toolType === CANCEL) {
        this.cancel()
      } else if (toolType === REDO) {
        this.redo()
      }
    })
  }

  mount() {
    super.mount()
    // 添加与用户交互的canvas层和背景层
    this.addLayer(UILAYER, this.zIndex + 1, false)
    this.addLayer(BACKGROUNDLAYER, this.zIndex - 1, false)
    // 添加用于绘制文本框的input元素
    var input = `<input id="drawboard_input" type="text" style="z-index=-1">`
    var root = document.getElementById(this.rootId)
    root.insertAdjacentHTML("beforeend", input)
  }
}