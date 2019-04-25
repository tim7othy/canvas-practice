class DrawBoard extends Canvas {
  constructor(options) {
    super(options)
    this.setupBackground()
    this.setupTools()
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
      [CIRCLE, new Circle(this)]
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
        this.layer.
      }
    })
  }

  mount() {
    super.mount()
    // 添加与用户交互的canvas层和背景层
    this.addLayer(UILAYER, this.zIndex + 1, false)
    this.addLayer(BACKGROUNDLAYER, this.zIndex - 1, false)
  }
}